/**
 * Amthromax Privacy Alignment Configuration
 * Data Inventory & Legal Contact Details
 * 
 * IMPORTANT:
 * - This configuration aligns with US CCPA/CPRA, EU GDPR, and global data privacy standards.
 * - Legal contact info reflects Amthromax Inc. (San Francisco, CA, USA).
 */

export interface LegalContactInfo {
  dataFiduciaryName: string;
  grievanceOfficerName: string;
  grievanceOfficerEmail: string;
  grievanceOfficerAddress: string;
  privacyContactEmail: string;
  legalReviewStatus: string;
}

export const LEGAL_CONFIG: LegalContactInfo = {
  dataFiduciaryName: "Amthromax Inc.",
  grievanceOfficerName: "Data Protection & Privacy Desk",
  grievanceOfficerEmail: "privacy@amthromax.com",
  grievanceOfficerAddress: "548 Market St, San Francisco, CA 94104, USA",
  privacyContactEmail: "privacy@amthromax.com",
  legalReviewStatus: "US & International Data Protection Compliant",
};

export const PRIVACY_POLICY_VERSION = "2026.1-DPDP";
export const COOKIE_CONSENT_VERSION = "2026.1";

export interface DataInventoryCategory {
  category: string;
  dataPoints: string[];
  purpose: string;
  storageLocation: string;
  thirdParties: string[];
  retentionPeriod: string;
  userConsentRequired: boolean;
  exportableable: boolean;
  deletable: boolean;
}

export const DATA_INVENTORY: DataInventoryCategory[] = [
  {
    category: "Account Data",
    dataPoints: ["Full Name", "Email Address", "Profile Picture URL", "Organization/Workspace Memberships", "User Preferences"],
    purpose: "Authentication, account management, workspace collaboration, user identity",
    storageLocation: "Supabase Auth (auth.users) / PostgreSQL public.profiles / LocalStorage fallback",
    thirdParties: ["Supabase (Authentication Provider)"],
    retentionPeriod: "Account Lifetime + 30 Days post-deletion request",
    userConsentRequired: true,
    exportableable: true,
    deletable: true,
  },
  {
    category: "Billing & Subscription Data",
    dataPoints: ["Plan Tier", "Subscription Status", "Customer/Payment Provider IDs", "Invoice History"],
    purpose: "Subscription management, payment processing, tax compliance",
    storageLocation: "PostgreSQL public.subscriptions & public.invoices",
    thirdParties: ["Stripe / Payment Gateway [LEGAL REVIEW REQUIRED]"],
    retentionPeriod: "7 Years (Mandatory statutory financial record retention)",
    userConsentRequired: true,
    exportableable: true,
    deletable: false, // Subject to statutory financial recordkeeping laws
  },
  {
    category: "AI Data & Prompts",
    dataPoints: ["User Prompts", "AI Agent Configurations", "System Prompts", "Tool Execution Inputs/Outputs", "Conversation Logs"],
    purpose: "Execution of autonomous AI agent tasks, model reasoning, user interaction history",
    storageLocation: "PostgreSQL public.agents & public.usage_events",
    thirdParties: ["OpenAI", "Anthropic", "Google Gemini", "Groq (LLM Inference Providers)"],
    retentionPeriod: "Configurable by User (Default: 90 Days active, customizable in Privacy Settings)",
    userConsentRequired: true,
    exportableable: true,
    deletable: true,
  },
  {
    category: "Knowledge Base & Uploaded Files",
    dataPoints: ["Uploaded Documents (PDFs, TXT, CSV)", "Vector Embeddings", "Document Metadata"],
    purpose: "Grounding AI agents in organization-specific memory & knowledge retrieval",
    storageLocation: "Isolated Micro-VM Storage / PostgreSQL Vector Store",
    thirdParties: ["Cloud Object Storage (Encrypted at rest)"],
    retentionPeriod: "Lifetime of Workspace or until explicit user removal",
    userConsentRequired: true,
    exportableable: true,
    deletable: true,
  },
  {
    category: "Technical & Audit Logs",
    dataPoints: ["IP Address", "User Agent / Browser Info", "Authentication Timestamps", "API Request Latency", "Privacy Audit Events"],
    purpose: "Security monitoring, anomaly detection, SOC 2 / DPDP compliance audit trails",
    storageLocation: "PostgreSQL public.audit_logs & public.usage_events",
    thirdParties: ["Internal Immutable Security Ledger"],
    retentionPeriod: "180 Days (Rolling security audit retention)",
    userConsentRequired: false, // Legitimate interest / Security compliance
    exportableable: true,
    deletable: false, // Required for security audit integrity
  },
  {
    category: "Marketing & Communication Preferences",
    dataPoints: ["Newsletter Subscription Status", "Product Update Email Preferences", "Consent Timestamps"],
    purpose: "Sending opted-in product updates, feature announcements, and security advisories",
    storageLocation: "PostgreSQL public.user_preferences / LocalStorage",
    thirdParties: ["Email Service Provider (Opted-in only)"],
    retentionPeriod: "Until Consent Withdrawn / Unsubscribed",
    userConsentRequired: true,
    exportableable: true,
    deletable: true,
  },
];
