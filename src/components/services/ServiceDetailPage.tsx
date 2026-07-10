import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../footer/Footer";

interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  overview: string;
  tech: string[];
  features: string[];
  bgImage: string;
}

const serviceDetails: Record<string, ServiceDetail> = {
  "custom-software": {
    id: "custom-software",
    title: "Custom Software Development",
    tagline: "Architecting tailored high-performance software systems built for enterprise scale.",
    overview: "We design and engineer bespoke software solutions that streamline critical business operations, replace legacy overhead, and enable seamless integration across your entire digital ecosystem. From responsive web platforms to robust backends, our code is built to evolve with your business.",
    tech: ["React", "Node.js", "Python", "Rust", "Go", "AWS", "Docker"],
    features: [
      "High-Performance Web & Enterprise Apps",
      "Distributed Microservices Architecture",
      "Legacy System Migration & API Wrappers",
      "Continuous Integration & Automated Testing"
    ],
    bgImage: "/images/251b80f44a10171b3221c8e65f1c0edf.jpg"
  },
  "cloud-solutions": {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    tagline: "Engineering secure, scalable, and cost-effective cloud architectures.",
    overview: "Accelerate your digital transformation with our comprehensive cloud engineering solutions. We build secure, multi-region containerized infrastructure, manage automated orchestration, and optimize running costs to support high-throughput operations under any demand level.",
    tech: ["Kubernetes", "AWS", "GCP", "Azure", "Terraform", "Helm", "Docker"],
    features: [
      "Multi-Cloud Orchestration & Governance",
      "Infrastructure as Code (IaC) Pipelines",
      "Serverless Architectures & Edge Computing",
      "Real-time Observability & Monitoring"
    ],
    bgImage: "/images/2b9888c054781328a6ffad2370ead6f4.jpg"
  },
  "artificial-intelligence": {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    tagline: "Deploying production-grade machine learning models and intelligent workflows.",
    overview: "Leverage state-of-the-art cognitive compute systems to automate decision-making, optimize production pipelines, and extract predictive value. We build custom transformer pipelines, fine-tuned agent models, and integrated LLM workflows designed for real business tasks.",
    tech: ["OpenAI", "PyTorch", "TensorFlow", "LangChain", "Hugging Face", "Python"],
    features: [
      "Enterprise LLM Fine-Tuning & Integration",
      "Automated Document Analysis & Extraction",
      "Predictive Maintenance & Forecasting Models",
      "Conversational AI & Specialized Agents"
    ],
    bgImage: "/images/5d9f8bf53cf9af46dd158c098c36f970.jpg"
  },
  "cybersecurity": {
    id: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Protecting critical digital assets with advanced defense frameworks.",
    overview: "Secure your operations, protect confidential customer data, and meet stringent regulatory requirements. Our security engineering team conducts comprehensive risk assessments, implements zero-trust parameters, and establishes real-time threat response dashboards.",
    tech: ["SIEM", "AWS Security", "Wireshark", "Metasploit", "Cryptography", "Zero Trust"],
    features: [
      "Comprehensive Penetration Testing & Auditing",
      "Zero-Trust Network Architecture Design",
      "Real-Time SIEM Monitoring & Incident Alerts",
      "Data Encryption & IAM Compliance"
    ],
    bgImage: "/images/97f11a9e8437c9f1885ddedf9822bf2b.jpg"
  },
  "data-analytics": {
    id: "data-analytics",
    title: "Data Analytics",
    tagline: "Transforming complex raw data streams into actionable intelligence.",
    overview: "Unlock the true power of your telemetry and business records. We construct modern, real-time data warehouses, design low-latency aggregation pipelines, and build interactive dashboards to help leadership make sound, data-driven decisions.",
    tech: ["Snowflake", "Spark", "Python Pandas", "Tableau", "Power BI", "D3.js"],
    features: [
      "Real-time Stream Processing & Aggregation",
      "Data Warehouse Architecture & ETL Pipelines",
      "Custom Business Intelligence Dashboards",
      "Statistical Analytics & Cohort Profiling"
    ],
    bgImage: "/images/eccdd4f9979503f74a6ceef111f5df90.jpg"
  },
  "mobile-apps": {
    id: "mobile-apps",
    title: "Mobile App Development",
    tagline: "Building seamless native and cross-platform mobile experiences.",
    overview: "Engage your users on the go with high-performance, polished mobile interfaces. We specialize in cross-platform framework efficiency, native device integrations, offline-first sync operations, and smooth interactive animations.",
    tech: ["React Native", "Flutter", "Swift", "Kotlin", "GraphQL", "SQLite"],
    features: [
      "Cross-Platform Performance Tuning",
      "Native API & Hardware Integrations",
      "Offline-First Database Synchronization",
      "Polished UI Micro-Animations & Gesture Support"
    ],
    bgImage: "/images/f69fb955aebe93c0bb4c606be8d02b8a.jpg"
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
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${service.bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-xs uppercase tracking-widest text-white/70 font-semibold bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            Capabilities & Expertise
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {service.tagline}
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-12 gap-12 md:gap-20">
        {/* Left Side: Overview & Features */}
        <div className="md:col-span-8 space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-850">
              Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
              {service.overview}
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-850">
              Key Focus Areas
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {service.features.map((feature, i) => (
                <div
                  key={i}
                  className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-white/[0.03] space-y-2"
                >
                  <span className="text-xs font-bold text-black dark:text-white">0{i + 1}</span>
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100">{feature}</h4>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Side: Tech Stack & CTA */}
        <div className="md:col-span-4 space-y-8">
          {/* Tech Stack widget */}
          <div className="bg-gray-55 dark:bg-[#161617] rounded-3xl p-8 border border-gray-150 dark:border-white/[0.04] shadow-sm space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-1 rounded-xl text-gray-700 dark:text-gray-300 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA widget */}
          <div className="bg-black dark:bg-white text-white dark:text-black rounded-3xl p-8 space-y-6 shadow-md">
            <h3 className="text-lg font-bold">Have a project in mind?</h3>
            <p className="text-xs text-gray-350 dark:text-gray-650 leading-relaxed">
              Partner with our team of elite engineers to design, build, and deploy your next-generation product.
            </p>
            <Link
              to="/contact"
              className="block w-full text-center py-3 bg-white text-black dark:bg-black dark:text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:opacity-90"
            >
              Contact Our Engineers
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
export { serviceDetails };
export type { ServiceDetail };
