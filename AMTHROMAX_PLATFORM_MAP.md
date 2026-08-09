# AMTHROMAX PLATFORM MAP & WORKSPACE DISCOVERY

## Ecosystem Overview
The **AMTHROMAX** ecosystem is architected as an integrated enterprise AI platform comprising five core surface interfaces backed by a unified database and AI execution layer.

```
                    AMTHROMAX PLATFORM
                            |
       +--------------------+--------------------+
       |                    |                    |
   PUBLIC WEB            CONSOLE               ADMIN
(Amthromax Web)     (Amthromax Console)   (Amthromax Admin)
       |                    |                    |
       +--------------------+--------------------+
                            |
                     API GATEWAY (/api/v1)
                            |
              +-------------+-------------+
              |                           |
        AI PLATFORM                    CORE DATA
  (Model Router / Agents)        (Supabase / PostgreSQL / Redis)
              |                           |
       +------+------+             +------+------+
       |      |      |             |      |      |
    Models Agents   MCP          Auth   Users  Usage
```

---

## 1. Application Map

| Application | Location | Framework / Tech | Default Port | Entry Point | Backend Dependency | Database / Auth Dependency | Environment Variables | Current Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Amthromax Web** | `d:\Amthromax Website` | React 19, Vite 8, Tailwind CSS, Framer Motion | 3000 (Dev Server) | `src/main.tsx` | Supabase API (`v1`), Internal Mock Gateway | Supabase Auth (PKCE / Google OAuth / Fallback LocalStorage) | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | **PRODUCTION READY** |
| **Amthromax Console** | `src/components/profile/ProfilePage.tsx`, `src/components/platform/PlatformPage.tsx` | React 19, Vite 8, Tailwind CSS, Framer Motion | Shared Port 3000 (`/profile`, `/platform`) | `src/components/platform/PlatformPage.tsx` | Model Dispatcher, Telemetry Stream | Supabase User Metadata, LocalStorage Profile Cache | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | **PARTIAL INTEGRATION** |
| **Amthromax Admin** | `src/components/overview/OverviewPage.tsx`, `src/components/profile/ProfilePage.tsx` | React 19, Vite 8, Tailwind CSS | Shared Port 3000 (`/overview`, `/profile`) | `src/components/overview/OverviewPage.tsx` | System Telemetry, Compute Endpoint Stream | Supabase `app_metadata` (`role: authenticated`) | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | **PARTIAL / MOCK** |
| **Amthromax Developer Docs** | `src/components/docs/DocsPage.tsx` | React 19, Vite 8, Tailwind CSS | Shared Port 3000 (`/docs`, `/docs/:section`) | `src/components/docs/DocsPage.tsx` | None (Static TechArticles & Code Integration Snippets) | None | None | **PRODUCTION READY** |
| **Amthromax AI Platform** | `src/components/platform/PlatformPage.tsx`, `src/config/company.ts` | TypeScript, Model Dispatcher, Semantic Cache Engine | Shared Port 3000 (`/platform`) | `src/components/platform/PlatformPage.tsx` | Ephemeral Sandbox Runtime, Upstream LLM Endpoints | LocalStorage Route Session History / Vector Similarity Cache | `AMTHROMAX_API_KEY` (client simulation) | **PARTIAL / SIMULATED** |

---

## 2. Component & File Hierarchy

### Public Web & Marketing Surfaces
- `src/App.tsx`: Central React Router v7 configuration & master layout handler.
- `src/components/hero/HeroSection.tsx`: Primary brand presentation banner.
- `src/components/about/AboutPage.tsx`: SEO-optimized company profile & mission statement.
- `src/components/solutions/SolutionsPage.tsx` & `WhyPages.tsx`: Enterprise, SMB, and Developer targeted pages.
- `src/components/products/ProductsPage.tsx` & `ProductDetailPage.tsx`: Deep-link product architecture suite (`/products/:productId`).

### Developer Documentation Surface
- `src/components/docs/DocsPage.tsx`: Developer documentation router supporting `/docs/getting-started`, `/docs/authentication`, `/docs/api`, `/docs/sdks`, `/docs/guides`, `/docs/changelog`.

### Developer & Admin Console Surface
- `src/components/platform/PlatformPage.tsx`: Interactive Model Dispatcher, Semantic Cache Layer, and Real-time Execution Flow Log.
- `src/components/overview/OverviewPage.tsx`: System overview, latency metrics, and deployed intelligence model registry (MORFIX, INTOX, COTISES, VERKOX).
- `src/components/profile/ProfilePage.tsx`: Account management, API secret handling, user UUID tracking, and workspace compute endpoints.

### Core Utilities & Configuration
- `src/config/company.ts`: Enterprise Brand, Product, and Entity single source of truth.
- `src/lib/supabase.ts`: Supabase client initialization (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) with PKCE auth flow.
- `src/lib/security.ts`: Input sanitization (XSS prevention), key masking (`maskApiKey`), email masking (`maskEmail`), and malicious payload detection (SQLi/XSS/Command injection).
- `src/context/AuthContext.tsx`: Universal authentication context with Supabase PKCE session listener and robust LocalStorage fallback mechanism.

### Scripts & Automation
- `scripts/generate-sitemap.cjs`: Build-time sitemap generator (indexes 41 active routes).
- `scripts/verify-seo.cjs`: Pre-production SEO & architectural audit validator.
