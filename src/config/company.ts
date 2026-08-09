export interface CompanyProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: string;
  features: string[];
}

export interface CompanyConfig {
  name: string;
  officialName: string;
  legalName: string;
  url: string;
  category: string;
  description: string;
  tagline: string;
  logo: string;
  ogImage: string;
  email: string;
  socialProfiles: string[];
  founder: string | null;
  foundingDate: string;
  headquarters: {
    addressCountry: string;
    addressLocality: string;
  } | null;
  products: CompanyProduct[];
}

export const COMPANY_CONFIG: CompanyConfig = {
  name: "Amthromax",
  officialName: "AMTHROMAX",
  legalName: "Amthromax Inc.",
  url: "https://amthromax.com",
  category: "AI Software Company",
  description:
    "Amthromax is an AI software and technology company building enterprise AI platforms, intelligent agents, intelligent automation, developer infrastructure, APIs, and next-generation software systems.",
  tagline: "Enterprise AI Platforms & Intelligent Automation Systems",
  logo: "https://amthromax.com/images/logo.png",
  ogImage: "https://amthromax.com/images/desktop_setup.png",
  email: "contact@amthromax.com",
  socialProfiles: [
    "https://linkedin.com/company/amthromax",
    "https://github.com/amthromax",
    "https://x.com/amthromax"
  ],
  founder: null, // Publicly unconfirmed facts kept null per entity consistency policy
  foundingDate: "2024",
  headquarters: {
    addressCountry: "US",
    addressLocality: "San Francisco, CA"
  },
  products: [
    {
      id: "ai-platform",
      name: "Enterprise AI Platform",
      tagline: "High-throughput cognitive infrastructure for enterprise applications",
      description:
        "Comprehensive enterprise AI orchestration platform featuring auto-scaling inference pipelines, state management, and SOC2-certified security controls.",
      url: "https://amthromax.com/products/ai-platform",
      category: "AI Infrastructure",
      features: [
        "Distributed Model Inference",
        "Zero-Latency State Synchronization",
        "Role-Based Access Control & SAML SSO",
        "Hardware Key Isolation & Encryption"
      ]
    },
    {
      id: "ai-agents",
      name: "AI Agents Runtime",
      tagline: "Autonomous multi-agent orchestration swarms for complex workflows",
      description:
        "Autonomous multi-agent framework designed to execute, reason, retrieve, and automate multi-step enterprise operations with full observability.",
      url: "https://amthromax.com/products/ai-agents",
      category: "Autonomous Agents",
      features: [
        "Multi-Agent Swarm Planning",
        "Real-Time Step Inspection & Playback",
        "Custom Tool Binding & Execution",
        "Self-Healing Error Recovery"
      ]
    },
    {
      id: "automation",
      name: "Intelligent Automation Engine",
      tagline: "Event-driven workflow triggers and semantic document parsing",
      description:
        "High-performance workflow engine that connects enterprise event streams with semantic reasoning to automate unstructured document and data processing.",
      url: "https://amthromax.com/products/automation",
      category: "Workflow Automation",
      features: [
        "Event-Driven Micro-Triggers",
        "Cognitive Document Mining",
        "Cross-System CRM & ERP Sync",
        "Real-Time Telemetry & Audit Trails"
      ]
    },
    {
      id: "developer-platform",
      name: "Developer Infrastructure & APIs",
      tagline: "Typed SDKs, low-latency REST & WebSocket endpoints, and developer tooling",
      description:
        "Unified developer hub providing REST/WebSocket APIs, TypeScript, Python, and Go SDKs, sandboxed testing environments, and post-quantum security libraries.",
      url: "https://amthromax.com/products/developer-platform",
      category: "Developer Tools",
      features: [
        "Typed TypeScript, Python & Go SDKs",
        "Streaming WebSockets API",
        "Post-Quantum Cryptography Libraries",
        "Idempotent Request Handling"
      ]
    },
    {
      id: "enterprise-ai",
      name: "Enterprise Systems Architecture",
      tagline: "Mission-critical zero-trust AI architecture for global organizations",
      description:
        "Tailored enterprise architecture deployments with dedicated compute isolation, 99.999% SLA guarantees, and strict regional data residency compliance.",
      url: "https://amthromax.com/products/enterprise-ai",
      category: "Enterprise Software",
      features: [
        "Dedicated Bare-Metal Compute",
        "Multi-Region Redundancy & Disaster Recovery",
        "Post-Quantum Lattice Encryption",
        "24/7 Dedicated Engineering Support"
      ]
    }
  ]
};
