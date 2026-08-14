/**
 * Amthromax Global Privacy Engine & Jurisdiction Router
 * Supports EU GDPR, UK GDPR, US CCPA/CPRA, India DPDP, Brazil LGPD, Canada PIPEDA, Australia Privacy Act, & Global Baseline.
 * 
 * IMPORTANT:
 * - This engine provides technical mechanisms to support multi-jurisdictional privacy rights.
 * - Software controls DO NOT constitute formal legal compliance without qualified legal counsel review.
 * - Items requiring legal confirmation are tagged with "LEGAL REVIEW REQUIRED".
 */

export type PrivacyFrameworkId =
  | "EU_GDPR"
  | "UK_GDPR"
  | "US_CA_CCPA"
  | "INDIA_DPDP"
  | "BRAZIL_LGPD"
  | "CANADA_PIPEDA"
  | "AUSTRALIA_PRIVACY_ACT"
  | "GLOBAL_BASELINE";

export interface PrivacyFrameworkRule {
  id: PrivacyFrameworkId;
  name: string;
  regionName: string;
  badgeColor: string;
  rights: {
    access: boolean;
    rectification: boolean;
    erasure: boolean;
    portability: boolean;
    restriction: boolean;
    objection: boolean;
    consentWithdrawal: boolean;
    optOutSaleShare: boolean; // CCPA / CPRA specific
    gpcSignalRespected: boolean;
    sensitiveDataLimit: boolean;
  };
  consentModel: "OPT_IN" | "OPT_OUT" | "HYBRID_NOTICE";
  defaultRetentionDays: number;
  dpoRequired: boolean;
  legalBasisRequired: boolean;
  disclaimer: string;
}

export const PRIVACY_FRAMEWORKS: Record<PrivacyFrameworkId, PrivacyFrameworkRule> = {
  EU_GDPR: {
    id: "EU_GDPR",
    name: "General Data Protection Regulation (GDPR)",
    regionName: "European Union / EEA",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    rights: {
      access: true,
      rectification: true,
      erasure: true,
      portability: true,
      restriction: true,
      objection: true,
      consentWithdrawal: true,
      optOutSaleShare: false,
      gpcSignalRespected: true,
      sensitiveDataLimit: true,
    },
    consentModel: "OPT_IN",
    defaultRetentionDays: 90,
    dpoRequired: true,
    legalBasisRequired: true,
    disclaimer: "Provides strict opt-in consent, formal DSAR workflows, and lawful basis processing under EU Regulation 2016/679.",
  },
  UK_GDPR: {
    id: "UK_GDPR",
    name: "UK General Data Protection Regulation (UK GDPR)",
    regionName: "United Kingdom",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    rights: {
      access: true,
      rectification: true,
      erasure: true,
      portability: true,
      restriction: true,
      objection: true,
      consentWithdrawal: true,
      optOutSaleShare: false,
      gpcSignalRespected: true,
      sensitiveDataLimit: true,
    },
    consentModel: "OPT_IN",
    defaultRetentionDays: 90,
    dpoRequired: true,
    legalBasisRequired: true,
    disclaimer: "Operates under UK Data Protection Act 2018 framework with UK International Data Transfer Agreement (IDTA) safeguards.",
  },
  US_CA_CCPA: {
    id: "US_CA_CCPA",
    name: "California Consumer Privacy Act / CPRA",
    regionName: "California, United States",
    badgeColor: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    rights: {
      access: true, // Right to Know
      rectification: true, // Right to Correct
      erasure: true, // Right to Delete
      portability: true,
      restriction: false,
      objection: false,
      consentWithdrawal: true,
      optOutSaleShare: true, // Do Not Sell / Share My Personal Information
      gpcSignalRespected: true,
      sensitiveDataLimit: true,
    },
    consentModel: "OPT_OUT",
    defaultRetentionDays: 180,
    dpoRequired: false,
    legalBasisRequired: false,
    disclaimer: "Supports California 'Do Not Sell or Share My Personal Information' rights, GPC auto-detection, and non-discrimination guarantees.",
  },
  INDIA_DPDP: {
    id: "INDIA_DPDP",
    name: "Digital Personal Data Protection (DPDP) Act",
    regionName: "India",
    badgeColor: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    rights: {
      access: true,
      rectification: true,
      erasure: true,
      portability: true,
      restriction: false,
      objection: false,
      consentWithdrawal: true,
      optOutSaleShare: false,
      gpcSignalRespected: true,
      sensitiveDataLimit: false,
    },
    consentModel: "OPT_IN",
    defaultRetentionDays: 90,
    dpoRequired: true,
    legalBasisRequired: false,
    disclaimer: "Integrated DPDP framework featuring Data Principal self-service rights, Grievance Desk, and statutory 30-day deletion grace.",
  },
  BRAZIL_LGPD: {
    id: "BRAZIL_LGPD",
    name: "Lei Geral de Proteção de Dados (LGPD)",
    regionName: "Brazil",
    badgeColor: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    rights: {
      access: true,
      rectification: true,
      erasure: true,
      portability: true,
      restriction: true, // Anonymization or blocking
      objection: true,
      consentWithdrawal: true,
      optOutSaleShare: false,
      gpcSignalRespected: true,
      sensitiveDataLimit: true,
    },
    consentModel: "OPT_IN",
    defaultRetentionDays: 90,
    dpoRequired: true, // Encarregado
    legalBasisRequired: true,
    disclaimer: "Supports Brazilian LGPD data principal rights, explicit consent mechanisms, and processing transparency.",
  },
  CANADA_PIPEDA: {
    id: "CANADA_PIPEDA",
    name: "Personal Information Protection and Electronic Documents Act (PIPEDA)",
    regionName: "Canada",
    badgeColor: "bg-red-500/10 text-red-700 border-red-500/20",
    rights: {
      access: true,
      rectification: true,
      erasure: true,
      portability: true,
      restriction: false,
      objection: true,
      consentWithdrawal: true,
      optOutSaleShare: false,
      gpcSignalRespected: true,
      sensitiveDataLimit: true,
    },
    consentModel: "OPT_IN",
    defaultRetentionDays: 180,
    dpoRequired: true,
    legalBasisRequired: false,
    disclaimer: "Supports Canadian fair information principles, meaningful consent, and provincial privacy alignment.",
  },
  AUSTRALIA_PRIVACY_ACT: {
    id: "AUSTRALIA_PRIVACY_ACT",
    name: "Australia Privacy Act 1988 & APPs",
    regionName: "Australia",
    badgeColor: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
    rights: {
      access: true,
      rectification: true,
      erasure: true,
      portability: false,
      restriction: false,
      objection: true,
      consentWithdrawal: true,
      optOutSaleShare: false,
      gpcSignalRespected: true,
      sensitiveDataLimit: true,
    },
    consentModel: "HYBRID_NOTICE",
    defaultRetentionDays: 180,
    dpoRequired: false,
    legalBasisRequired: false,
    disclaimer: "Aligns with Australian Privacy Principles (APPs) for open and transparent data management.",
  },
  GLOBAL_BASELINE: {
    id: "GLOBAL_BASELINE",
    name: "Amthromax Global Privacy Baseline",
    regionName: "Global / Rest of World",
    badgeColor: "bg-zinc-500/10 text-zinc-700 border-zinc-500/20",
    rights: {
      access: true,
      rectification: true,
      erasure: true,
      portability: true,
      restriction: false,
      objection: false,
      consentWithdrawal: true,
      optOutSaleShare: false,
      gpcSignalRespected: true,
      sensitiveDataLimit: true,
    },
    consentModel: "HYBRID_NOTICE",
    defaultRetentionDays: 180,
    dpoRequired: false,
    legalBasisRequired: false,
    disclaimer: "High-standard universal privacy controls providing transparent access, export, and deletion tools for all international users.",
  },
};

export const JURISDICTION_STORAGE_KEY = "amthromax_user_jurisdiction_override";

/**
 * Infers user jurisdiction based on browser locale, timezone, stored override, or default.
 */
export function detectUserJurisdiction(): PrivacyFrameworkRule {
  try {
    // 1. Check user manual override in local storage
    const saved = localStorage.getItem(JURISDICTION_STORAGE_KEY);
    if (saved && PRIVACY_FRAMEWORKS[saved as PrivacyFrameworkId]) {
      return PRIVACY_FRAMEWORKS[saved as PrivacyFrameworkId];
    }

    // 2. Infer from browser timezone & locale
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const languages = navigator.languages || [navigator.language || ""];
    const primaryLang = languages[0]?.toLowerCase() || "";

    if (timeZone.startsWith("Europe/London")) {
      return PRIVACY_FRAMEWORKS.UK_GDPR;
    }
    if (timeZone.startsWith("Europe/")) {
      return PRIVACY_FRAMEWORKS.EU_GDPR;
    }
    if (timeZone.includes("Los_Angeles") || timeZone.includes("San_Francisco") || timeZone.includes("America/Tijuana")) {
      return PRIVACY_FRAMEWORKS.US_CA_CCPA;
    }
    if (timeZone.includes("Kolkata") || timeZone.includes("Calcutta") || primaryLang.includes("-in")) {
      return PRIVACY_FRAMEWORKS.INDIA_DPDP;
    }
    if (timeZone.includes("Sao_Paulo") || timeZone.includes("Fortaleza") || primaryLang.includes("pt-br")) {
      return PRIVACY_FRAMEWORKS.BRAZIL_LGPD;
    }
    if (timeZone.includes("Toronto") || timeZone.includes("Vancouver") || timeZone.includes("Montreal")) {
      return PRIVACY_FRAMEWORKS.CANADA_PIPEDA;
    }
    if (timeZone.includes("Sydney") || timeZone.includes("Melbourne") || timeZone.includes("Brisbane")) {
      return PRIVACY_FRAMEWORKS.AUSTRALIA_PRIVACY_ACT;
    }
  } catch {
    // Fallback to Global Baseline
  }

  return PRIVACY_FRAMEWORKS.GLOBAL_BASELINE;
}

export function setUserJurisdictionOverride(frameworkId: PrivacyFrameworkId): void {
  try {
    localStorage.setItem(JURISDICTION_STORAGE_KEY, frameworkId);
    window.dispatchEvent(new Event("amthromax_jurisdiction_change"));
  } catch {
    // Ignore storage error
  }
}
