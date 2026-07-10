import React from "react";
import Footer from "../footer/Footer";

// Shared page header wrapper
const PageHeader: React.FC<{ category: string; title: string; subtitle: string }> = ({ category, title, subtitle }) => {
  return (
    <div className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center text-center text-white bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/65 via-zinc-950/40 to-black z-0" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
        <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
          {category}
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

// 1. FOR ENTERPRISES PAGE
export const EnterprisesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans transition-colors duration-300">
      <PageHeader
        category="AMTHROMAX ENTERPRISE"
        title="Industrial Scale. Certified Security."
        subtitle="Unify your systems with high-throughput automation engines, zero-trust cloud network frameworks, and dedicated support pipelines."
      />

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Uptime Guarantee", value: "99.99%" },
            { label: "Request Latency", value: "<15ms" },
            { label: "Data Encryption", value: "AES-256" },
            { label: "Compliance Standard", value: "SOC2 Type II" }
          ].map((stat, idx) => (
            <div key={idx} className="p-6 bg-gray-50 border border-gray-150 rounded-2xl text-center space-y-2">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{stat.label}</span>
              <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Feature Rows */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">01 / INTEGRITY</span>
            <h3 className="text-2xl font-bold text-gray-900">Zero-Trust Network Models</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Enforce granular access logs, identity federation (SAML/OIDC), and hardware-isolated key storage across every agent deployment. Prevent credential hijacking at the network root.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">02 / VELOCITY</span>
            <h3 className="text-2xl font-bold text-gray-900">Automated Pipeline Scaling</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Distribute analytical requests dynamically through load-balanced Kubernetes clusters. Experience automatic compute scaling during periods of extreme workflow traffic.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">03 / CONTINUITY</span>
            <h3 className="text-2xl font-bold text-gray-900">Dedicated SLA Commitments</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Access around-the-clock enterprise engineers via direct Slack channels and priority ticketing, backed by contractually enforced support response times.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// 2. FOR SMALL BUSINESSES PAGE
export const SmallBusinessesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans transition-colors duration-300">
      <PageHeader
        category="AMTHROMAX FOR BUSINESS"
        title="Accelerate Growth. Simplify Operations."
        subtitle="Bring the power of intelligent automated agents, integrated dashboards, and client-sync tools directly to your business."
      />

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-900">Automation Built for Small Teams</h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            You don't need a dedicated development staff to run intelligent software. Amthromax deploys serverless workflow triggers that connect directly into tools you already use, like sheets, calendars, and messengers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-gray-50 border border-gray-150 rounded-3xl space-y-4">
            <h3 className="text-xl font-bold text-gray-900">1. Instant Customer Sync</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Automatically capture emails, categorize support requests, and push contact data directly to your local tracking dashboards without copy-pasting.
            </p>
          </div>
          <div className="p-8 bg-gray-50 border border-gray-150 rounded-3xl space-y-4">
            <h3 className="text-xl font-bold text-gray-900">2. Low Operational Overhead</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our lightweight code designs run inside micro-instances, ensuring that you only pay for exactly what you use, without expensive flat hosting rates.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// 3. FOR DEVELOPERS PAGE
export const DevelopersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans transition-colors duration-300">
      <PageHeader
        category="AMTHROMAX DEVELOPER HUB"
        title="Robust APIs. Instant Integrations."
        subtitle="Access high-performance developer tools, detailed SDK packages, and modular cryptography protocols built to integrate in minutes."
      />

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-12 gap-12 items-center">
        {/* Features Info */}
        <div className="md:col-span-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900">Build with Amthromax SDK</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Initialize our client SDK in Node.js or Python to instantly query advanced models, configure post-quantum tunnels, or spin up microservices.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { title: "Universal SDK Support", desc: "Native TypeScript and Python clients complete with full autocomplete types." },
              { title: "Sandbox Environments", desc: "Develop securely with isolated sandbox API keys and comprehensive real-time query trace logs." },
              { title: "Post-Quantum Cryptography Libraries", desc: "Install our open-source CRYSTALS-Kyber key-agreement library directly from npm or pip." }
            ].map((feat, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center bg-blue-50 text-blue-600 font-bold rounded-full text-xs">{idx + 1}</span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900">{feat.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Snippet Card */}
        <div className="md:col-span-6">
          <div className="bg-[#1e1e24] text-gray-100 rounded-3xl p-6 border border-zinc-800 shadow-xl font-mono text-xs overflow-x-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-zinc-500 font-sans text-xs">javascript // app.js</span>
              <div className="flex space-x-1.5">
                <span className="w-3 h-3 bg-zinc-700 rounded-full inline-block"></span>
                <span className="w-3 h-3 bg-zinc-700 rounded-full inline-block"></span>
                <span className="w-3 h-3 bg-zinc-700 rounded-full inline-block"></span>
              </div>
            </div>
            <pre className="leading-relaxed">
{`import { AmthromaxClient } from '@amthromax/sdk';

// Initialize the API client
const client = new AmthromaxClient({
  apiKey: process.env.AMTHROMAX_API_KEY
});

// Run a secure agentic session
const response = await client.workflows.run({
  agentId: 'enterprise-neural-01',
  input: { query: 'Analyze Q3 regional logistics datasets' }
});

console.log(\`Execution complete: \${response.status}\`);`}
            </pre>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
