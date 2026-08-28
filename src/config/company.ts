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
    "Amthromax is an artificial intelligence and software company developing advanced AI products, autonomous agents, developer tools, and intelligent software systems.",
  tagline: "Enterprise AI Platforms & Intelligent Automation Systems",
  logo: "https://amthromax.com/images/logo.png",
  ogImage: "https://amthromax.com/og-image.png",
  email: "contact@amthromax.com",
  socialProfiles: [
    "https://linkedin.com/company/amthromax",
    "https://github.com/amthromax",
    "https://x.com/amthromax"
  ],
  founder: "Kishore Kanth",
  foundingDate: "2024",
  headquarters: {
    addressCountry: "US",
    addressLocality: "San Francisco, CA"
  },
  products: [
    {
      id: "codehoomer",
      name: "Codehoomer AI",
      tagline: "Autonomous AI software engineering partner and developer studio",
      description:
        "Codehoomer AI is an autonomous AI software developer built by Amthromax to architect, refactor, test, and deploy enterprise codebases at scale.",
      url: "https://amthromax.com/codehoomer",
      category: "Developer Application",
      features: [
        "Autonomous Code Refactoring",
        "Zero-False-Positive Static Analysis",
        "Automated Pull Request Reviews",
        "Full Repository Context Engine"
      ]
    },
    {
      id: "helleious",
      name: "Helleious AI",
      tagline: "Enterprise Multi-Agent Operating System & Governance Engine",
      description:
        "Helleious AI is an enterprise multi-agent operating system developed by Amthromax providing model context protocol integration, knowledge retrieval, and zero-trust data governance.",
      url: "https://amthromax.com/helleious",
      category: "Enterprise Application",
      features: [
        "Model Context Protocol (MCP) Integration",
        "Zero-Trust Data Governance",
        "Autonomous Knowledge Engine & RAG",
        "Multi-Agent OS Kernel"
      ]
    },
    {
      id: "orarqlow",
      name: "Orarqlow AI",
      tagline: "Autonomous Agent Swarm Orchestration Engine",
      description:
        "Orarqlow AI is an autonomous agent swarm orchestration engine developed by Amthromax designed to deploy and orchestrate distributed multi-agent swarms with sub-15ms latency.",
      url: "https://amthromax.com/orarqlow",
      category: "Developer Application",
      features: [
        "Sub-15ms Swarm Coordination Latency",
        "Autonomous Swarm Mesh Topology",
        "Distributed Vector Memory",
        "Real-Time Telemetry & Health Monitoring"
      ]
    },
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
