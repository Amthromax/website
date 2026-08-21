/**
 * Amthromax Data Processing & Subprocessor Registry
 * Maps actual technical subprocessors, legal basis, and international transfer mechanisms.
 * 
 * IMPORTANT:
 * - Items requiring legal confirmation are marked with "LEGAL REVIEW REQUIRED".
 */

export interface SubprocessorEntry {
  id: string;
  name: string;
  category: "Cloud Infrastructure" | "Authentication & Database" | "LLM Inference Provider" | "Payment Gateway" | "Telemetry & Logging";
  purpose: string;
  dataShared: string[];
  region: string;
  transferMechanism: string;
  dpaStatus: string;
  privacyPolicyUrl: string;
}

export const SUBPROCESSORS: SubprocessorEntry[] = [
  {
    id: "aws_cloud",
    name: "Amazon Web Services (AWS)",
    category: "Cloud Infrastructure",
    purpose: "Micro-VM isolated execution, knowledge base vector storage, and edge API hosting",
    dataShared: ["Encrypted vector embeddings", "Ephemeral execution payloads", "Isolated files"],
    region: "US-East (N. Virginia) / EU-Central (Frankfurt)",
    transferMechanism: "EU Standard Contractual Clauses (SCCs) & UK IDTA",
    dpaStatus: "AWS DPA Executed [LEGAL REVIEW REQUIRED]",
    privacyPolicyUrl: "https://aws.amazon.com/privacy/",
  },
  {
    id: "supabase_db",
    name: "Supabase Inc.",
    category: "Authentication & Database",
    purpose: "User authentication, profile database storage, and Row Level Security (RLS) enforcement",
    dataShared: ["User Email", "Full Name", "Hashed Passwords / OAuth Tokens", "Workspace Memberships"],
    region: "AWS us-east-1 / eu-west-1",
    transferMechanism: "EU Standard Contractual Clauses (SCCs)",
    dpaStatus: "Supabase DPA Executed [LEGAL REVIEW REQUIRED]",
    privacyPolicyUrl: "https://supabase.com/privacy",
  },
  {
    id: "openai_llm",
    name: "OpenAI LLC",
    category: "LLM Inference Provider",
    purpose: "Generative AI task execution and model reasoning for Simifig / Ligivor agent suites",
    dataShared: ["Redacted prompt text", "Task execution context"],
    region: "United States",
    transferMechanism: "Data Processing Addendum (Zero Data Retention for API execution)",
    dpaStatus: "Enterprise Zero Data Retention DPA active",
    privacyPolicyUrl: "https://openai.com/privacy",
  },
  {
    id: "anthropic_llm",
    name: "Anthropic PBC",
    category: "LLM Inference Provider",
    purpose: "Claude model reasoning for complex code synthesis and document analysis",
    dataShared: ["Redacted prompt text", "Document snippets"],
    region: "United States",
    transferMechanism: "Commercial API Terms (No training on customer API inputs)",
    dpaStatus: "Commercial API Agreement active",
    privacyPolicyUrl: "https://www.anthropic.com/privacy",
  },
  {
    id: "google_gemini",
    name: "Google LLC (Gemini API)",
    category: "LLM Inference Provider",
    purpose: "Multimodal AI agent execution and fast context analysis",
    dataShared: ["Redacted prompt text", "Multimodal inputs"],
    region: "Global / United States",
    transferMechanism: "Google Cloud DPA & EU SCCs",
    dpaStatus: "Google Cloud DPA Executed [LEGAL REVIEW REQUIRED]",
    privacyPolicyUrl: "https://policies.google.com/privacy",
  },
  {
    id: "stripe_payments",
    name: "Stripe Inc.",
    category: "Payment Gateway",
    purpose: "Subscription billing, payment card tokenization, and tax compliance",
    dataShared: ["Billing Email", "Payment Token", "Subscription Tier", "Invoice Records"],
    region: "United States & Global",
    transferMechanism: "Stripe DPA & Standard Contractual Clauses",
    dpaStatus: "Stripe DPA Executed",
    privacyPolicyUrl: "https://stripe.com/privacy",
  },
];

export interface ProcessingActivityEntry {
  id: string;
  name: string;
  purpose: string;
  legalBasisGDPR: "CONSENT" | "CONTRACT" | "LEGITIMATE_INTERESTS" | "LEGAL_OBLIGATION";
  dataCategories: string[];
  retentionPolicy: string;
  transferMechanism: string;
  legalReviewStatus: string;
}

export const PROCESSING_ACTIVITIES: ProcessingActivityEntry[] = [
  {
    id: "pa_account_mgmt",
    name: "Account Creation & Identity Management",
    purpose: "Providing user authentication, enterprise workspace access, and role assignment",
    legalBasisGDPR: "CONTRACT",
    dataCategories: ["Name", "Email", "Profile Picture", "Workspace Memberships"],
    retentionPolicy: "Account Lifetime + 30 Days statutory grace",
    transferMechanism: "EU SCCs / UK IDTA",
    legalReviewStatus: "CONFIRMED - Necessary for performance of contract",
  },
  {
    id: "pa_ai_execution",
    name: "Autonomous AI Agent Workflow Execution",
    purpose: "Processing user prompts and executing AI tools across connected APIs",
    legalBasisGDPR: "CONTRACT",
    dataCategories: ["Redacted Prompt Content", "Agent Tool Outputs"],
    retentionPolicy: "Default: 90 Days (User-customizable in Privacy Settings)",
    transferMechanism: "Zero Data Retention API DPAs",
    legalReviewStatus: "CONFIRMED - Core SaaS service execution",
  },
  {
    id: "pa_telemetry",
    name: "Operational Telemetry & Performance Monitoring",
    purpose: "Ensuring system stability, monitoring API latencies, and detecting security anomalies",
    legalBasisGDPR: "LEGITIMATE_INTERESTS",
    dataCategories: ["Anonymized IP Address", "Browser User Agent", "Latency Metrics"],
    retentionPolicy: "180 Days rolling log window",
    transferMechanism: "Encrypted In-transit",
    legalReviewStatus: "LEGAL REVIEW REQUIRED - Validate balancing test for legitimate interest",
  },
  {
    id: "pa_billing",
    name: "Subscription Processing & Tax Compliance",
    purpose: "Invoicing, payment verification, and mandatory statutory financial reporting",
    legalBasisGDPR: "LEGAL_OBLIGATION",
    dataCategories: ["Invoice Records", "Tax Identifiers", "Subscription Tier"],
    retentionPolicy: "7 Years (Mandatory statutory financial recordkeeping)",
    transferMechanism: "Stripe DPA",
    legalReviewStatus: "CONFIRMED - Statutory tax compliance requirement",
  },
];
