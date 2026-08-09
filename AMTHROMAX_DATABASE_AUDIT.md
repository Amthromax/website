# AMTHROMAX DATABASE ARCHITECTURE & SCHEMA AUDIT

## 1. Executive Summary
The **Amthromax Database Architecture** currently uses **Supabase (PostgreSQL 15+)** for client authentication and profile metadata persistence, augmented by client-side state fallbacks (`LocalStorage`) for disconnected or client-only dev workflows.

This audit evaluates the database schema against the target enterprise entity model required for full multi-tenant agent execution, project isolation, API key management, model routing, usage metering, and billing.

---

## 2. Target Entity Audit Matrix

| Entity | Status in Codebase | Table Name | Key Schema Fields / Structure | Implementation Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| `users` | **PRESENT (Supabase Auth)** | `auth.users` / `public.profiles` | `id` (UUID), `email`, `user_metadata`, `created_at`, `app_metadata` | Standardize `public.profiles` trigger on `auth.users` insert. |
| `organizations` | **MOCK / SIMULATED** | `public.organizations` | `id`, `name`, `slug`, `billing_email`, `created_at`, `updated_at` | Add PostgreSQL migration for multi-tenant tenant isolation. |
| `memberships` | **MOCK / SIMULATED** | `public.organization_memberships` | `id`, `organization_id`, `user_id`, `role`, `created_at` | Enforce explicit Foreign Keys to `organizations` and `users`. |
| `roles` | **PARTIAL** | Enums (`Owner`, `Admin`, `Developer`, `Viewer`, `Billing`) | `role_name` enum in `app_metadata` | Use PostgreSQL RLS (Row Level Security) policies matching user roles. |
| `permissions` | **PARTIAL** | RBAC permission matrix | `permission_code` (e.g., `keys:write`, `models:execute`) | Map permissions to role definitions in database. |
| `projects` | **SIMULATED** | `public.projects` | `id`, `organization_id`, `name`, `environment` (`dev`/`staging`/`prod`) | Link projects to parent `organization_id`. |
| `environments` | **SIMULATED** | `public.environments` | `id`, `project_id`, `name` (`development`, `staging`, `production`) | Provide environment-specific API keys and model routing flags. |
| `api_keys` | **SIMULATED (UI Masked)** | `public.api_keys` | `id`, `project_id`, `key_hash` (SHA-256), `masked_key`, `scopes`, `last_used_at` | Store ONLY bcrypt/SHA-256 key hashes; never plaintext secrets. |
| `models` | **PRESENT (`company.ts`)** | `public.models` | `id`, `name`, `category`, `provider`, `context_window`, `pricing_per_1k` | Centralize model registry in DB with `company.ts` fallback. |
| `agents` | **PRESENT (`OverviewPage.tsx`)** | `public.agents` | `id`, `name`, `system_prompt`, `model_id`, `temperature`, `created_at` | Persist agent configurations and version history. |
| `tools` | **PRESENT (`PlatformPage.tsx`)** | `public.tools` | `id`, `name`, `description`, `parameters_schema`, `execution_type` | Standardize JSON Schema validation for tool payloads. |
| `mcp_servers` | **SIMULATED** | `public.mcp_servers` | `id`, `project_id`, `server_name`, `endpoint_url`, `auth_token_hash` | Model Context Protocol server registry and heartbeat status. |
| `usage_events` | **SIMULATED (`PlatformPage.tsx`)** | `public.usage_events` | `id`, `organization_id`, `project_id`, `user_id`, `model`, `tokens`, `latency_ms`, `cost` | High-throughput time-series table (Partitioned by month). |
| `audit_logs` | **SIMULATED** | `public.audit_logs` | `id`, `organization_id`, `actor_id`, `action`, `resource_id`, `timestamp`, `ip_address` | Immutable event log for enterprise compliance. |
| `subscriptions` | **MOCK (`ProfilePage.tsx`)** | `public.subscriptions` | `id`, `organization_id`, `plan_tier`, `status`, `current_period_end` | Link to Stripe/Billing gateway webhooks. |
| `invoices` | **MOCK** | `public.invoices` | `id`, `subscription_id`, `amount_due`, `status`, `pdf_url`, `created_at` | Record usage-based invoices and auto-top-up payments. |

---

## 3. Recommended PostgreSQL Migration Script (DDL)

To move from client-side fallback state to production-grade PostgreSQL persistence, apply the following DDL script in Supabase SQL Editor:

```sql
-- 1. Create Enums
CREATE TYPE public.user_role AS ENUM ('Owner', 'Admin', 'Developer', 'Viewer', 'Billing');
CREATE TYPE public.environment_type AS ENUM ('development', 'staging', 'production');

-- 2. Organizations Table
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Memberships Table
CREATE TABLE IF NOT EXISTS public.organization_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role public.user_role NOT NULL DEFAULT 'Developer',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    environment public.environment_type NOT NULL DEFAULT 'development',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. API Keys Table
CREATE TABLE IF NOT EXISTS public.api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    key_hash VARCHAR(255) NOT NULL UNIQUE,
    masked_key VARCHAR(32) NOT NULL,
    name VARCHAR(255) NOT NULL,
    scopes TEXT[] DEFAULT ARRAY['read', 'write'],
    last_used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Usage Events Table (Partitioned by Month)
CREATE TABLE IF NOT EXISTS public.usage_events (
    id UUID DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    project_id UUID NOT NULL,
    user_id UUID,
    request_id VARCHAR(128) NOT NULL,
    provider VARCHAR(64) NOT NULL,
    model VARCHAR(64) NOT NULL,
    input_tokens INT DEFAULT 0,
    output_tokens INT DEFAULT 0,
    latency_ms INT NOT NULL,
    cost_usd NUMERIC(10, 6) DEFAULT 0,
    timestamp TIMESTAMPTZ DEFAULT NOW()
) PARTITION BY RANGE (timestamp);

-- Enable RLS Policies
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
```

---

## 4. Database Security & Isolation Assessment
- **Row Level Security (RLS)**: Must be enabled on all tenant tables (`organizations`, `projects`, `api_keys`, `usage_events`).
- **Secret Protection**: API key secret values are NEVER stored in plaintext. SHA-256 or bcrypt hashing is mandatory.
- **Connection Pooling**: Use Supabase Transaction Pooler (Port `6543`) for serverless API Gateway endpoints to prevent connection exhaustion.
