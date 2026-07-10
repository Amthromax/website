import React from "react";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

const SecurityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      <SEO 
        title="Amthromax Security | Trust & Compliance Systems" 
        description="Learn how Amthromax safeguards your enterprise data. Zero-trust networking, post-quantum encryption, sandboxed agent tools, and SOC2 audits." 
      />

      {/* Header */}
      <div className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center text-center text-white bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-zinc-950/40 to-black z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            AMTHROMAX TRUST & PROTECTION
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
            Zero-Trust System Security
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Protecting your database configurations, proprietary logs, and active agent execution nodes from advanced threats.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 space-y-12 leading-relaxed">
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Ephemeral Sandbox Execution</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Amthromax agents are designed to execute tools safely. When an agent is triggered to execute custom python code, run command line scripts, or query SQL tables, the task is automatically dispatched to an ephemeral, isolated container.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            These runtime environments are read-only, isolated from our core network nodes, and capped at strict compute thresholds. Once the agent outputs the results, the entire container is destroyed.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Post-Quantum Cryptography (PQC)</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            We are preparing for the future of computation. Amthromax uses CRYSTALS-Kyber key-agreement protocols to establish secure, encrypted data tunnels between our API platforms and your local edge networks.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            All stored credentials, authorization tokens, and vector database embeddings are protected using AES-256-GCM encryption with automated, daily key rotation managed by hardware security modules (HSMs).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Immutable Audit Trails</h2>
          <p className="text-gray-600 dark:text-gray-350 text-sm md:text-base">
            Every step in an agent's reasoning loop—including prompt evaluations, semantic cache matches, raw inputs, and tool arguments—is logged in an immutable, cryptographically chained trace ledger.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Compliance teams can verify agent activity logs without fear of tampering or record omission, facilitating SOC2 audit validations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. SOC2 Type II & GDPR Compliance</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Amthromax is audited annually to verify operational compliance. We adhere strictly to SOC2 Type II criteria across security, availability, and confidentiality. In accordance with GDPR guidelines, we offer comprehensive data residency options in the US, EU, and Asia, and honor all deletion requests immediately.
          </p>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default SecurityPage;
