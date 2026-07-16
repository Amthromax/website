import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

// Define log level types and structure
interface LogEntry {
  timestamp: string;
  level: "info" | "success" | "warning" | "error";
  system: string;
  message: string;
}

const SecurityPage: React.FC = () => {
  // Console state
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      timestamp: new Date().toLocaleTimeString(),
      level: "info",
      system: "SYSTEM",
      message: "Amthromax Security Daemon v2.4.0-quantum initialized."
    },
    {
      timestamp: new Date().toLocaleTimeString(),
      level: "success",
      system: "SHIELD",
      message: "Zero-Trust gateway active. Edge monitoring enabled."
    }
  ]);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Settings state
  const [sandboxEnabled, setSandboxEnabled] = useState<boolean>(true);
  const [pqcEnabled, setPqcEnabled] = useState<boolean>(true);
  const [ledgerEnabled, setLedgerEnabled] = useState<boolean>(true);
  const [shieldEnabled, setShieldEnabled] = useState<boolean>(true);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Auto scroll console to bottom
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Scenarios triggers
  const runScenario = (scenario: string) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveScenario(scenario);
    setLogs((prev) => [
      ...prev,
      {
        timestamp: new Date().toLocaleTimeString(),
        level: "info",
        system: "USER",
        message: `Triggered manual test scenario: [${scenario.toUpperCase()}]`
      }
    ]);

    let step = 0;

    const sandboxSteps: Omit<LogEntry, "timestamp">[] = [
      { level: "info", system: "SYSTEM", message: "Spawning isolated sandbox node: sb-worker-91a..." },
      { level: "info", system: "SANDBOX", message: "Applying container limits: CPU=1 Core, Memory=512MB." },
      { level: "info", system: "SANDBOX", message: "Mounting read-only file system overlay." },
      { level: "success", system: "AGENT", message: "Invoking secure agent tool: run_code_interpreter" },
      { level: "warning", system: "SANDBOX", message: "Tool completed code run. Releasing environment..." },
      { level: "success", system: "SYSTEM", message: "Sandbox node sb-worker-91a successfully destroyed." }
    ];

    const pqcSteps: Omit<LogEntry, "timestamp">[] = [
      { level: "info", system: "CRYPTO", message: "Initiating quantum-safe key exchange handshake." },
      { level: "info", system: "CRYPTO", message: "Exchanging CRYSTALS-Kyber-1024 lattice public keys." },
      { level: "success", system: "CRYPTO", message: "ML-KEM Shared secret encapsulated: 256 bits of entropy." },
      { level: "info", system: "TUNNEL", message: "Encrypting communication channel via AES-256-GCM." },
      { level: "success", system: "TUNNEL", message: "PQC Secured Tunnel established between Edge and Core Nodes." }
    ];

    const ledgerSteps: Omit<LogEntry, "timestamp">[] = [
      { level: "info", system: "AUDIT", message: "Hashing agent execution trace chunk #491..." },
      { level: "info", system: "AUDIT", message: "Payload SHA-256: 3c9b1f7d5e4b2a8c..." },
      { level: "info", system: "LEDGER", message: "Signing ledger entry with node key: val-us-east-1" },
      { level: "success", system: "LEDGER", message: "Block committed to cryptographically chained trace ledger." },
      { level: "success", system: "SYSTEM", message: "Ledger validation check passed: Merkle Root Hash match." }
    ];

    const threatSteps: Omit<LogEntry, "timestamp">[] = [
      { level: "info", system: "MONITOR", message: "Inspecting outbound network sockets on active agents." },
      { level: "warning", system: "MONITOR", message: "Suspicious API socket request intercepted: GET 10.99.1.5" },
      { level: "error", system: "SHIELD", message: "Threat policy triggered: NETWORK_ISOLATION_VIOLATION." },
      { level: "warning", system: "SHIELD", message: "Severing socket instantly. Revoking session token." },
      { level: "error", system: "SYSTEM", message: "Sandbox node quarantined. Log exported to admin dashboard." }
    ];

    const currentSteps = 
      scenario === "sandbox" ? sandboxSteps :
      scenario === "pqc" ? pqcSteps :
      scenario === "ledger" ? ledgerSteps : threatSteps;

    const runNextStep = () => {
      if (step < currentSteps.length) {
        const nextEntry: LogEntry = {
          timestamp: new Date().toLocaleTimeString(),
          level: currentSteps[step].level as any,
          system: currentSteps[step].system,
          message: currentSteps[step].message
        };
        setLogs((prev) => [...prev, nextEntry]);
        step++;
        setTimeout(runNextStep, 900);
      } else {
        setIsSimulating(false);
        setActiveScenario(null);
      }
    };

    setTimeout(runNextStep, 600);
  };

  // Calculate readiness score
  const getSecurityScore = () => {
    let score = 0;
    if (sandboxEnabled) score += 25;
    if (pqcEnabled) score += 25;
    if (ledgerEnabled) score += 25;
    if (shieldEnabled) score += 25;
    return score;
  };

  const getScoreColor = (score: number) => {
    if (score === 100) return "text-emerald-500 dark:text-emerald-400";
    if (score >= 75) return "text-blue-500 dark:text-blue-400";
    if (score >= 50) return "text-amber-500 dark:text-amber-400";
    return "text-rose-500 dark:text-rose-400";
  };

  const getScoreGrade = (score: number) => {
    if (score === 100) return "Grade: A+ (Maximum Defense)";
    if (score >= 75) return "Grade: B (High Security)";
    if (score >= 50) return "Grade: C (Moderate Risk)";
    return "Grade: F (Critical Exposure)";
  };

  const faqItems = [
    {
      q: "Where is my proprietary agent data stored?",
      a: "All credentials and API keys are stored in encrypted vaults using AES-256-GCM with daily automated key rotation managed by hardware security modules (HSMs). Action logs are written to an immutable local ledger and are never shared or processed by third-party LLM providers."
    },
    {
      q: "How does the ephemeral sandbox execution work?",
      a: "When an agent executes custom scripts, Python commands, or queries databases, the workspace is loaded into an isolated micro-container. The container has CPU/RAM caps and has zero host network permissions. Once output is generated, the container is destroyed."
    },
    {
      q: "What is Post-Quantum Cryptography (PQC) and why use it?",
      a: "Modern encryption algorithms like RSA are vulnerable to decryption by future quantum supercomputers. Amthromax uses CRYSTALS-Kyber algorithms (lattice-based ML-KEM) to secure long-term communications and ensure future-proof security."
    },
    {
      q: "Is Amthromax compliant with industry standards?",
      a: "Yes. Amthromax undergoes annual external audits to verify SOC2 Type II criteria across security, confidentiality, and availability. We also strictly support GDPR compliance and offer local data residency in multiple global cloud regions."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300 antialiased">
      <SEO 
        title="Amthromax Security Hub | Trust, Compliance & Sandbox Execution" 
        description="Learn how Amthromax safeguards your enterprise data. Zero-trust sandboxed agent execution, post-quantum ML-KEM encryption, and SOC2 compliant trace logs." 
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:py-32 overflow-hidden flex items-center justify-center bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900 transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.06),transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/40 px-4 py-1.5 rounded-full backdrop-blur-md">
            <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Zero-Trust System Integrity
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-black dark:from-white dark:via-gray-200 dark:to-gray-400">
            Trust & Compliance Systems
          </h1>
          <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Discover how we protect proprietary log outputs, active agent runtimes, and local enterprise network interfaces.
          </p>
        </div>
      </section>

      {/* Main Grid: Features and Interactive Dashboard */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: 4 Core Pillars */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">Security Infrastructure</h2>
            <p className="text-gray-500 dark:text-gray-450 text-sm">Four foundational defense systems guarding your agent network.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1 */}
            <div className="p-6 bg-white dark:bg-[#161617] rounded-3xl border border-gray-200/50 dark:border-white/[0.04] shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">1. Ephemeral Sandbox</h3>
              <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed mt-2">
                All custom code executions trigger isolated micro-containers configured with restricted memory boundaries, destroyed instantly upon task completion.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-white dark:bg-[#161617] rounded-3xl border border-gray-200/50 dark:border-white/[0.04] shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">2. Lattice Encryption</h3>
              <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed mt-2">
                Securing data routes with CRYSTALS-Kyber (ML-KEM) lattice key exchange, mitigating potential future decryption risks from quantum computation.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-white dark:bg-[#161617] rounded-3xl border border-gray-200/50 dark:border-white/[0.04] shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">3. Immutable Ledger</h3>
              <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed mt-2">
                Reasoning traces, database connections, and tool logs are signed and recorded into cryptographically chained ledgers to prevent data tampering.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 bg-white dark:bg-[#161617] rounded-3xl border border-gray-200/50 dark:border-white/[0.04] shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">4. Compliance Ready</h3>
              <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed mt-2">
                Certified SOC2 Type II standards, ISO 27001 policies, and full GDPR compliance ensuring customer control over localization and data residency.
              </p>
            </div>

          </div>
        </div>

        {/* Right Side: Security Simulation Console & System Control Center */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Section Heading */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">Security Command Center</h2>
            <p className="text-gray-500 dark:text-gray-450 text-sm">Simulate active threats, verify sandbox integrity, and configure defenses.</p>
          </div>

          {/* Interactive Control Switches */}
          <div className="p-6 bg-white dark:bg-[#161617] rounded-3xl border border-gray-200/50 dark:border-white/[0.04] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">Dynamic Policies</h3>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 ${getScoreColor(getSecurityScore())}`}>
                {getScoreGrade(getSecurityScore())}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <label className="flex items-center justify-between p-3 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 cursor-pointer select-none">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Sandbox Shield</span>
                <input 
                  type="checkbox" 
                  checked={sandboxEnabled} 
                  onChange={(e) => setSandboxEnabled(e.target.checked)} 
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 cursor-pointer select-none">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Kyber ML-KEM PQC</span>
                <input 
                  type="checkbox" 
                  checked={pqcEnabled} 
                  onChange={(e) => setPqcEnabled(e.target.checked)} 
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 cursor-pointer select-none">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Trace Logs Sign</span>
                <input 
                  type="checkbox" 
                  checked={ledgerEnabled} 
                  onChange={(e) => setLedgerEnabled(e.target.checked)} 
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 cursor-pointer select-none">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Outbound Firewall</span>
                <input 
                  type="checkbox" 
                  checked={shieldEnabled} 
                  onChange={(e) => setShieldEnabled(e.target.checked)} 
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Interactive Console UI */}
          <div className="bg-[#0b0b0c] text-zinc-300 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl font-mono text-xs flex flex-col h-[350px]">
            {/* Console Header */}
            <div className="bg-[#161617] px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-[10px] text-zinc-400 font-bold ml-2">secure-telemetry-daemon</span>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-bold">
                {activeScenario ? `SIMULATING: ${activeScenario.toUpperCase()}` : "PROD-NODE-ACTIVE"}
              </span>
            </div>

            {/* Console Screen */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2 select-text custom-scrollbar">
              {logs.map((log, index) => (
                <div key={index} className="flex gap-2 items-start leading-relaxed">
                  <span className="text-zinc-500 select-none">[{log.timestamp}]</span>
                  <span className={`font-bold select-none min-w-[55px] ${
                    log.level === "success" ? "text-emerald-450" : 
                    log.level === "warning" ? "text-amber-450" : 
                    log.level === "error" ? "text-rose-450" : "text-blue-450"
                  }`}>
                    {log.system}:
                  </span>
                  <span className="text-zinc-150">{log.message}</span>
                </div>
              ))}
              {isSimulating && (
                <div className="flex gap-1 items-center py-1">
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
              <div ref={consoleEndRef} />
            </div>

            {/* Console Actions (Bottom) */}
            <div className="bg-[#121213] p-3 border-t border-zinc-800 flex flex-wrap gap-2 justify-end">
              <button
                disabled={isSimulating}
                onClick={() => runScenario("sandbox")}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-750 disabled:opacity-50 text-white font-bold transition-all text-[11px] cursor-pointer"
              >
                Run Sandbox Demo
              </button>
              <button
                disabled={isSimulating}
                onClick={() => runScenario("pqc")}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-750 disabled:opacity-50 text-white font-bold transition-all text-[11px] cursor-pointer"
              >
                PQC Handshake
              </button>
              <button
                disabled={isSimulating}
                onClick={() => runScenario("ledger")}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-750 disabled:opacity-50 text-white font-bold transition-all text-[11px] cursor-pointer"
              >
                Trace Sign Block
              </button>
              <button
                disabled={isSimulating}
                onClick={() => runScenario("threat")}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-750 disabled:opacity-50 text-white font-bold transition-all text-[11px] cursor-pointer"
              >
                Simulate Threat
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* Accordion FAQ Section */}
      <section className="bg-white dark:bg-gray-950 py-16 md:py-24 border-t border-gray-150 dark:border-gray-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Security & Auditing FAQ</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
              Answers to technical questions regarding local encryption parameters, sandbox isolation thresholds, and data localization.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-gray-50 dark:bg-[#161617] rounded-2xl border border-gray-150 dark:border-white/[0.04] transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-sm md:text-base text-gray-900 dark:text-white hover:opacity-90 select-none cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <span className={`text-lg text-gray-450 transform transition-transform duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                      ＋
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-850">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SecurityPage;
