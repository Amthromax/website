import React from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../footer/Footer";

interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  overview: string;
  detailedContent: string;
  tech: string[];
  features: { title: string; description: string }[];
  deliverables: string[];
  bgImage: string;
  methodologyImage?: string;
}

const serviceDetails: Record<string, ServiceDetail> = {
  "custom-software": {
    id: "custom-software",
    title: "Custom Software Development",
    tagline: "Architecting tailored high-performance software systems built for enterprise scale.",
    overview: "We design and engineer bespoke software solutions that streamline critical business operations, replace legacy overhead, and enable seamless integration across your entire digital ecosystem.",
    detailedContent: "Our elite engineering pods partner directly with your internal stakeholders to ensure every commit drives measurable business value. Whether you require a resilient distributed backend to process millions of queues, or a beautifully crafted frontend interface built in React—we bring uncompromising quality, robust architectures, and speed to the entire software development lifecycle.",
    tech: ["React", "Node.js", "Python", "Rust", "Go", "AWS", "Docker"],
    features: [
      { title: "High-Performance Enterprise Apps", description: "Deliver snappy, ultra-responsive web experiences optimized for modern browsers and unparalleled enterprise user retention." },
      { title: "Distributed Microservices", description: "Decouple massive monoliths into resilient, scalable, and easily deployable microservice clusters utilizing Docker." },
      { title: "Legacy System Migration", description: "Safely wrap older systems with modern REST/GraphQL APIs before orchestrating a zero-downtime, ground-up migration." },
      { title: "Automated Deployment Pipelines", description: "Ship to production confidently with rock-solid CI/CD pipelines, strict code-linting, and comprehensive end-to-end testing." }
    ],
    deliverables: ["Technical Architecture Specification", "Fully Documented API Endpoints", "CI/CD Pipeline Configurations", "Complete Source Code Transfer"],
    bgImage: "/images/251b80f44a10171b3221c8e65f1c0edf.jpg"
  },
  "cloud-solutions": {
    id: "cloud-solutions",
    title: "Enterprise Cloud Architecture",
    tagline: "Architecting hyper-scalable, fault-tolerant cloud ecosystems for global enterprises.",
    overview: "Transcend legacy infrastructure constraints. We re-engineer monolithic backend systems into decentralized cloud-native architectures that dynamically self-heal, auto-scale, and deploy frictionlessly across AWS, Azure, or GCP.",
    detailedContent: "The cloud is only a force multiplier when properly architected. Our Cloud Center of Excellence (CCoE) doesn't just 'lift and shift'; we deeply refactor your workloads. By implementing rigorous FinOps protocols, strict identity perimeter defenses, and GitOps-driven IaC pipelines, we routinely reduce cloud operational costs by 40% while simultaneously achieving true 99.999% high-availability against regional outages.",
    tech: ["Kubernetes", "AWS Fargate", "GCP Anthos", "Azure Arc", "Terraform", "ArgoCD", "Datadog", "Cloudflare"],
    features: [
      { title: "Cloud-Native Modernization", description: "Shatter legacy monoliths into event-driven serverless functions and isolated Docker containers for maximum deployment agility." },
      { title: "Active-Active Deployments", description: "Engineer traffic routing geometries that seamlessly failover between geographic regions to guarantee uninterrupted service during outages." },
      { title: "FinOps & Cost Optimization", description: "Audit oversized cloud instances and eliminate idle compute waste with automated lifecycle policies and Spot instance arbitrage." },
      { title: "GitOps Infrastructure (IaC)", description: "Automate entire cloud environments from a single version-controlled repository using Terraform, entirely removing manual console changes." }
    ],
    deliverables: ["Cloud FinOps Savings Analysis", "Terraform HCL Source Code Repo", "Multi-Region DR Playbook", "Datadog Observability Dashboards"],
    bgImage: "/images/2b9888c054781328a6ffad2370ead6f4.jpg",
    methodologyImage: "/images/bbb8920d-f5bf-4af3-be52-5fe7d1aeaddc.png"
  },
  "artificial-intelligence": {
    id: "artificial-intelligence",
    title: "Applied Generative AI",
    tagline: "Engineering deterministic, context-aware AI systems that drive measurable enterprise ROI.",
    overview: "Move beyond experimental AI chatbots. We engineer production-ready cognitive systems that autonomously execute complex workflows, interpret unstructured data at scale, and provide deterministic output governance for enterprise environments.",
    detailedContent: "The true value of Generative AI lies in securely bridging foundational LLMs with your proprietary corporate knowledge bases. We architect high-performance Retrieval-Augmented Generation (RAG) pipelines that completely eliminate hallucinations by dynamically grounding requests in private vector databases. By leveraging open-weight models (LLaMA-3, Mistral) hosted entirely within your own secure VPC, we guarantee that your sensitive intellectual property never leaks to third-party APIs. From autonomous reasoning agents to computer vision NLP pipelines, we build AI that acts as a secure, scalable force multiplier.",
    tech: ["Python", "PyTorch", "LangChain", "Pinecone", "HuggingFace", "LLaMA-3", "TensorFlow", "vLLM"],
    features: [
      { title: "Autonomous Agent Clusters", description: "Deploy interconnected multi-agent systems that autonomously reason, write execution scripts, and complete multi-step business transactions." },
      { title: "Zero-Hallucination RAG", description: "Ground generative models securely in your own data lake using dynamic semantic search, ensuring 100% deterministic and citations-backed output." },
      { title: "Secure Model Quantization", description: "Compress massively capable open-source foundation models using QLoRA, allowing blazing-fast local inference on affordable enterprise hardware." },
      { title: "Computer Vision & OCR", description: "Automate manual data compliance by deploying transformer-based vision models that extract, classify, and structure data from messy PDFs and invoices." }
    ],
    deliverables: ["High-Fidelity RAG Pipeline Architecture", "Custom Finetuned Model Weights (.safetensors)", "Vector DB Semantic Search Integration", "Containerized Inference Server Checkout"],
    bgImage: "/images/5d9f8bf53cf9af46dd158c098c36f970.jpg",
    methodologyImage: "/images/6599f957-6a0c-46d3-880c-f33ecbba6aae.png"
  },
  "cybersecurity": {
    id: "cybersecurity",
    title: "Offensive Security & Zero-Trust",
    tagline: "Engineering immutable architectures that withstand advanced persistent threats (APTs).",
    overview: "Move beyond passive monitoring and standard compliance checklists. We operate as an elite extension of your DevSecOps pipeline, actively hunting vulnerabilities, auditing identity perimeters, and embedding unbreakable cryptography deep into your infrastructure.",
    detailedContent: "The modern threat landscape is automated, hostile, and constantly shifting. A reactionary perimeter is no longer sufficient. Our cybersecurity division architects strict Zero-Trust paradigms where every microservice must cryptographically prove its authorization. Through continuous red-team penetration testing and the implementation of automated SIEM telemetry, we transform your infrastructure into a proactive, self-healing fortress that instantly isolates behavioral anomalies and data exfiltration attempts.",
    tech: ["Splunk SIEM", "HashiCorp Vault", "WAF", "Metasploit", "Burp Suite", "CrowdStrike", "OAuth 2.0", "AWS KMS"],
    features: [
      { title: "Continuous Red-Team Operations", description: "Deploy tactical ethical hackers to continuously barrage your API endpoints and web apps with zero-day exploits to uncover critical architectural flaws." },
      { title: "Zero-Trust Identity Perimeters", description: "Eradicate static credentials entirely. Implement ephemeral, short-lived STS tokens and strict mutual TLS (mTLS) mapping between every internal service." },
      { title: "Automated SIEM Telemetry & Response", description: "Stream millions of cloud logs into intelligent SIEM dashboards that use machine learning to detect and automatically quarantine credential stuffing attacks." },
      { title: "Immutable Data Encryption", description: "Enforce true payload obfuscation with AES-256 at-rest and TLS 1.3 in-transit, completely shielding customer data from lateral network theft." }
    ],
    deliverables: ["Executive Penetration Test Report", "Zero-Trust Network Topography Blueprint", "Automated WAF Ruleset Configuration", "SOC2 / ISO27001 Compliance Audit"],
    bgImage: "/images/97f11a9e8437c9f1885ddedf9822bf2b.jpg",
    methodologyImage: "/images/caed3277-da33-4a44-8741-0afb045c9e99.png"
  },
  "data-analytics": {
    id: "data-analytics",
    title: "Enterprise Data & Intelligence",
    tagline: "Transforming petabytes of unstructured noise into decisive, real-time operational truth.",
    overview: "We eradicate data silos. By engineering ultra-low-latency ingestion pipelines and centralizing disparate data streams, we create a single, immutable source of truth that empowers executive leadership to act decisively.",
    detailedContent: "Data is a liability if it remains fragmented across legacy servers. Our elite data engineering teams architect massive, highly governed data lakes and automated ELT pipelines designed to handle continuous high-throughput ingestion. We deeply model unstructured metadata using modern frameworks like dbt and Snowflake, exposing clean, validated semantic layers. We replace fragile, static spreadsheets with rich, interactive executive dashboards that predict customer churn, identify bottlenecks, and expose hidden operational efficiencies in real-time.",
    tech: ["Snowflake", "Apache Kafka", "dbt", "Airflow", "Tableau", "Looker", "PostgreSQL", "Spark"],
    features: [
      { title: "High-Volume Stream Processing", description: "Deploy fault-tolerant Apache Kafka event busses to ingest, normalize, and query millions of simultaneous telemetry events with sub-second latency." },
      { title: "Modern Data Stack (ELT)", description: "Construct robust, automated data pipelines using Apache Airflow and dbt to continuously build, test, and deploy analytic models directly in the warehouse." },
      { title: "Predictive Audience Clustering", description: "Analyze historical cohorts utilizing Apache Spark to unearth predictive insights, dramatically optimizing pricing strategies and maximizing LTV." },
      { title: "Executive BI Visualization", description: "Democratize data access across your entire enterprise via sophisticated, highly optimized Looker visualization suites tailored exclusively around actionable KPIs." }
    ],
    deliverables: ["Cloud Data Warehouse Architecture", "Automated ELT Pipeline DAGs (Airflow)", "Executive KPI Dashboard Suite", "Data Governance & Lineage Maps"],
    bgImage: "/images/eccdd4f9979503f74a6ceef111f5df90.jpg",
    methodologyImage: "/images/4e8dbd5a-8a97-4bda-a27b-3b57e6f3ecd7.png"
  },
  "mobile-apps": {
    id: "mobile-apps",
    title: "High-Fidelity Mobile Engineering",
    tagline: "Engineering deterministic, native ecosystem experiences that command App Store dominance.",
    overview: "We refuse to build fragile web wrappers. Our elite mobile engineering teams architect hyper-optimized iOS and Android ecosystems that deliver 120Hz fluidic interfaces, edge-client AI execution, and offline-first resilience.",
    detailedContent: "In the enterprise mobile space, performance bottlenecks and battery drain instantly destroy user retention. We architect applications natively for zero-latency execution. By leveraging multi-threaded Swift and Kotlin modules, we implement complex offline-first synchronization via local cryptographic vaults and aggressive background data resolution. Whether integrating real-time WebRTC video, strict Bluetooth hardware polling, or deploying enterprise Mobile Device Management (MDM) security layers, we engineer mobile applications as powerful edge-compute platforms.",
    tech: ["Swift / SwiftUI", "Kotlin / Jetpack", "React Native", "WebRTC", "Core ML", "SQLite", "GraphQL", "Fastlane"],
    features: [
      { title: "Native Core Optimization", description: "Bypass bridging bottlenecks by writing computationally intense algorithms directly in Swift or Kotlin, guaranteeing buttery-smooth 120Hz rendering." },
      { title: "Offline-First Architectures", description: "Decouple the UI from network availability. We engineer encrypted local-first SQLite databases that seamlessly resolve network conflicts in the background." },
      { title: "On-Device Edge AI (Core ML)", description: "Deploy optimized Machine Learning models directly to the user's handset for zero-latency, privacy-preserving local inference without server lag." },
      { title: "Enterprise Endpoint Security", description: "Harden mobile endpoints against reverse-engineering through aggressive binary obfuscation, jailbreak detection, and strict biometric vaulting." }
    ],
    deliverables: ["Compiled Native Binaries (.ipa / .aab)", "Fastlane CI/CD Automation Pipelines", "Mobile Architecture Data Blueprint", "Endpoint Security & Penetration Audit"],
    bgImage: "/images/f69fb955aebe93c0bb4c606be8d02b8a.jpg",
    methodologyImage: "/images/83dea25f-4da2-4f92-aef2-501469ad36bf.png"
  }
};

const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? serviceDetails[serviceId] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-gray-950 font-sans">
        <div className="py-24 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Service not found</h2>
          <Link to="/services" className="text-indigo-600 dark:text-indigo-400 underline mt-4 inline-block">
            Back to Services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      {/* Hero Header */}
      <div className="relative py-24 md:py-36 overflow-hidden flex items-center justify-center text-center text-white bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-[10s] hover:scale-105"
          style={{ backgroundImage: `url(${service.bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-0" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 space-y-8 mt-8 md:mt-12">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/90 font-bold bg-white/[0.08] border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            Capabilities & Expertise
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight drop-shadow-lg">
            {service.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
            {service.tagline}
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid lg:grid-cols-12 gap-16 md:gap-24">
        
        {/* Left Side: Overview & Features */}
        <div className="lg:col-span-8 space-y-24">
          <section className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Service Overview
            </h2>
            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
                {service.overview}
              </p>
              <div className="w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full my-6"></div>
              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
                {service.detailedContent}
              </p>
            </div>
          </section>

          <section className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Key Capabilities
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {service.features.map((feature, i) => (
                <div
                  key={i}
                  className="group p-8 bg-gray-50 dark:bg-[#161617] rounded-[28px] border border-gray-150 dark:border-white/[0.04] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 space-y-6"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 border border-gray-200/50 dark:border-gray-700/50 shadow-inner text-lg font-black tracking-tighter">
                    0{i + 1}
                  </span>
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">{feature.title}</h4>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Side: Tech Stack & CTA */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Tech Stack widget */}
          <div className="bg-gray-50 dark:bg-[#121213] rounded-[32px] p-8 md:p-10 border border-gray-200/60 dark:border-white/[0.05] shadow-sm space-y-8">
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-white/10 pb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <h3 className="text-sm font-black uppercase tracking-[0.15em] text-gray-900 dark:text-gray-100">
                Technology Stack
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs text-gray-700 dark:text-gray-300 font-bold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

           {/* Deliverables widget */}
           <div className="bg-gray-50 dark:bg-[#121213] rounded-[32px] p-8 md:p-10 border border-gray-200/60 dark:border-white/[0.05] shadow-sm space-y-8">
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-white/10 pb-6">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <h3 className="text-sm font-black uppercase tracking-[0.15em] text-gray-900 dark:text-gray-100">
                Project Deliverables
              </h3>
            </div>
            <ul className="space-y-4">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="text-blue-500 font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA widget */}
          <div className="bg-blue-600 rounded-[32px] p-8 md:p-10 space-y-8 shadow-xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/4 -translate-y-1/4 transition-transform duration-500 group-hover:scale-110">
               <svg width="120" height="120" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-extrabold tracking-tight">Ready to build?</h3>
              <p className="text-sm text-blue-100 leading-relaxed font-medium">
                Partner with our team of elite engineers to design, scale, and deploy your next-generation technical product securely.
              </p>
            </div>
            <Link
              to="/contact"
              className="relative z-10 block w-full text-center py-4 bg-white text-blue-600 hover:bg-gray-50 rounded-2xl text-sm font-black transition-all shadow-md"
            >
              Contact Engineering
            </Link>
          </div>

        </div>
      </div>

      {/* Universal Methodology Section */}
      <div className="bg-gray-50 dark:bg-[#09090a] border-y border-gray-200 dark:border-white/[0.03] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 max-w-2xl">
              <span className="text-blue-600 dark:text-blue-500 font-black tracking-[0.2em] uppercase text-xs border border-blue-600/30 px-3 py-1.5 rounded-full inline-block">Deployment Framework</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Our Implementation Methodology
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
                We don't just write code; we engineer solutions built to withstand extreme production environments. Our rigorous five-stage deployment protocol ensures zero-downtime rollouts, uncompromising security audits, and absolute architectural clarity from day one.
              </p>
            </div>
            
            <div className="relative group lg:ml-auto w-full max-w-md mx-auto lg:mx-0">
               <div className="absolute inset-0 bg-blue-600 rounded-[32px] transform translate-x-4 translate-y-4 lg:translate-x-6 lg:translate-y-6 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 opacity-15 dark:opacity-30"></div>
               <img src={service.methodologyImage || "/images/4288b43b-4cf5-4ca3-8452-f9f3e85c8dc4.png"} alt="Engineering Leadership" className="relative z-10 w-full h-[320px] md:h-[400px] object-cover object-top rounded-[32px] shadow-xl group-hover:shadow-2xl transition-all duration-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 relative pt-4">
            {/* Desktop Connecting horizontal line */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-gray-200 dark:bg-gray-800"></div>

            {[
              { step: "01", title: "Discovery", desc: "Deep technical audits of your existing infrastructure and business logic to map absolute constraints." },
              { step: "02", title: "Architecture", desc: "Drafting rigorous topological blueprints, UML diagrams, and selecting resilient technology stacks." },
              { step: "03", title: "Agile Engineering", desc: "Executing iterative, test-driven development cycles with continuous daily stakeholder feedback." },
              { step: "04", title: "Security Auditing", desc: "Comprehensive penetration testing and compliance validation across the entire network attack surface." },
              { step: "05", title: "Production Release", desc: "Zero-downtime CI/CD deployment via canary releases, backed by continuous post-launch monitoring." }
            ].map((phase, i) => (
              <div key={i} className="relative z-10 flex flex-row md:flex-col items-start gap-6 md:gap-0 group">
                <div className="flex-shrink-0 w-14 h-14 bg-white dark:bg-[#121213] border-[3px] border-gray-150 dark:border-gray-800 rounded-full flex items-center justify-center text-lg font-black text-gray-900 dark:text-white shadow-sm group-hover:border-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500 md:mb-6">
                  {phase.step}
                </div>
                <div className="space-y-3 pt-2 md:pt-0">
                  <h4 className="text-xl md:text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">{phase.title}</h4>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed md:max-w-[90%]">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enterprise Standards Guarantee */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-[40px] p-10 md:p-16 lg:p-20 text-white overflow-hidden relative shadow-2xl">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black opacity-20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
           
           <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8">
               <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">The Amthromax Enterprise Guarantee.</h2>
               <p className="text-blue-100 text-lg md:text-xl leading-relaxed font-medium">
                 When you partner with our engineering teams, you gain more than just code. You acquire a resilient technological foundation designed to scale exponentially, protected by military-grade security parameters, and backed by contractually enforced continuous support.
               </p>
             </div>
             <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { value: "99.99%", label: "Uptime SLA Guarantee" },
                  { value: "<25ms", label: "Average Response Latency" },
                  { value: "AES-256", label: "Payload Encryption Standard" },
                  { value: "24/7/365", label: "Priority Live Support" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[28px] space-y-3 hover:bg-white/20 transition-colors duration-300">
                    <div className="text-4xl font-black tracking-tighter shadow-sm">{stat.value}</div>
                    <div className="text-sm font-bold text-blue-200 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
export { serviceDetails };
export type { ServiceDetail };
