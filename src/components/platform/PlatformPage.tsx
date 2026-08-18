import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

interface RouteHistoryItem {
  id: number;
  query: string;
  model: string;
  cacheStatus: "HIT" | "MISS";
  latency: number;
  tokens: number;
}

const PlatformPage: React.FC = () => {
  // Playground state
  const [useCache, setUseCache] = useState<boolean>(true);
  const [activeModel, setActiveModel] = useState<string>("Thalon-Nano");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [history, setHistory] = useState<RouteHistoryItem[]>([
    { id: 1, query: "Summarize Q3 balance sheets", model: "Lattice-Reasoner", cacheStatus: "MISS", latency: 2150, tokens: 4800 },
    { id: 2, query: "Extract user credentials from raw log", model: "Clio-3.5-Large", cacheStatus: "MISS", latency: 1480, tokens: 1200 },
    { id: 3, query: "Summarize Q3 balance sheets", model: "Lattice-Reasoner", cacheStatus: "HIT", latency: 14, tokens: 4800 }
  ]);

  const [simulatedQuery, setSimulatedQuery] = useState<string>("Fetch total user API requests by desk");

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep("Analyzing query intent...");

    const steps = [
      { text: "Resolving semantic embedding vector...", delay: 400 },
      { text: useCache ? "Searching semantic cache database..." : "Bypassing cache database...", delay: 800 },
      useCache 
        ? { text: "Matching cached nodes found (similarity > 0.94)...", delay: 1100 }
        : { text: `Connecting to upstream API [${activeModel}]...`, delay: 1300 },
      useCache 
        ? { text: "Encapsulating response schema...", delay: 1400 }
        : { text: "Receiving tokens from model endpoint...", delay: 1900 },
      { text: "Done!", delay: useCache ? 1600 : 2300 }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setCurrentStep(step.text);
        if (idx === steps.length - 1) {
          const latencyVal = useCache ? Math.floor(Math.random() * 8) + 8 : Math.floor(Math.random() * 600) + 1200;
          const tokenCount = activeModel === "Thalon-Nano" ? 800 : activeModel === "Clio-3.5-Large" ? 1800 : 5400;
          
          setHistory((prev) => [
            {
              id: Date.now(),
              query: simulatedQuery,
              model: useCache ? "Cache Edge Node" : activeModel,
              cacheStatus: useCache ? "HIT" : "MISS",
              latency: latencyVal,
              tokens: tokenCount
            },
            ...prev
          ]);
          setIsRunning(false);
          setCurrentStep("");
        }
      }, step.delay);
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-black text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300 antialiased">
      <SEO 
        title="Amthromax Platform | The Agentic Execution Layer" 
        description="Explore the architecture behind Amthromax: low-latency orchestration, semantic caching, and federated databases designed for agentic workflows." 
      />

      {/* Hero Header */}
      <section className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center text-center text-white bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-black z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-widest text-gray-400 font-bold"
          >
            AMTHROMAX CORE PLATFORM
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tighter leading-tight"
          >
            The Agent Execution Engine
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            A single, highly optimized orchestration layer engineered for real-time model dispatch, semantic caching, and secure tool execution.
          </motion.p>
        </div>
      </section>

      {/* Platform Architecture Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-24">
        
        {/* Core Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Model Dispatcher",
              desc: "Dynamically routes prompts and sub-tasks to the most efficient LLM or local model based on latency, cost, and safety guardrails. Pre-warmed sockets reduce handshake delays to zero."
            },
            {
              num: "02",
              title: "Semantic Caching",
              desc: "Groups queries by semantic meaning. Delivers cached answers to recurrent agent reasoning loops in under 15ms, reducing upstream API token consumption by up to 60%."
            },
            {
              num: "03",
              title: "Secure Sandbox",
              desc: "Automatically isolates all dynamic tools (SQL queries, bash scripts, API calls) in ephemeral, read-only virtual micro-containers that self-destruct upon task completion."
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15 }}
              className="p-8 bg-white dark:bg-[#161617] border border-gray-200/50 dark:border-white/[0.04] rounded-3xl space-y-4 hover:shadow-md transition-all duration-300 group"
            >
              <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest transition-transform group-hover:translate-x-1 inline-block">{item.num} / Engine</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Live Metrics & Telemetry Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "AVG CACHE LATENCY", value: "12 ms", sub: "vs 1,450ms raw model", highlight: "text-emerald-500" },
            { label: "CACHE HIT RATIO", value: "88.4%", sub: "Semantic intent matching", highlight: "text-blue-500" },
            { label: "ESTIMATED COST SAVED", value: `$${(14290 + history.length * 1.42).toFixed(2)}`, sub: "Calculated @ $0.002/1k tokens", highlight: "text-amber-500" },
            { label: "EXECUTION AUDIT TRAIL", value: "100%", sub: "Immutable SOC2 ledger", highlight: "text-purple-500" }
          ].map((kpi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 bg-white dark:bg-[#161617] border border-gray-200/50 dark:border-white/[0.04] rounded-2xl shadow-sm space-y-1 text-center md:text-left"
            >
              <span className="text-[10px] font-bold tracking-wider text-gray-400 dark:text-gray-500 block uppercase">{kpi.label}</span>
              <span className={`text-2xl md:text-3xl font-black tracking-tight ${kpi.highlight}`}>{kpi.value}</span>
              <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 block">{kpi.sub}</span>
            </motion.div>
          ))}
        </div>

        {/* Interactive Orchestrator Playground */}
        <div className="space-y-6">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Orchestrator Performance Playground</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Toggle the Semantic Cache option and trigger model queries to observe the execution pipeline's latency, vector memory retrieval, and token conservation in real time.
            </p>
          </div>

          {/* Animated Pipeline Step Diagram */}
          <div className="bg-white dark:bg-[#161617] rounded-3xl p-6 border border-gray-200/50 dark:border-white/[0.04] shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">LIVE EXECUTION DISPATCH PIPELINE</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { step: "01", name: "Query Ingestion", detail: "Vector Embedding", active: isRunning },
                { step: "02", name: "Semantic Cache", detail: useCache ? "HNSW Index (<15ms)" : "Bypassed", active: isRunning && useCache },
                { step: "03", name: "Model Dispatcher", detail: useCache ? "Cache Edge Node" : activeModel, active: isRunning },
                { step: "04", name: "Ephemeral Micro-VM", detail: "Zero-Trust Sandbox", active: isRunning }
              ].map((node, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl border transition-all ${
                    node.active 
                      ? "border-blue-500 bg-blue-50/20 dark:bg-blue-950/20 shadow-md ring-2 ring-blue-500/20" 
                      : "border-gray-150 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40 opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-bold text-gray-400">{node.step}</span>
                    <span className={`w-2 h-2 rounded-full ${node.active ? "bg-blue-500 animate-ping" : "bg-gray-300 dark:bg-gray-700"}`} />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">{node.name}</h4>
                  <p className="text-[10px] font-mono text-gray-500 dark:text-gray-400 mt-0.5">{node.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
            {/* Control Panel (left) */}
            <div className="lg:col-span-5 bg-white dark:bg-[#161617] rounded-3xl p-6 border border-gray-200/50 dark:border-white/[0.04] shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Test Prompt Query</label>
                  <input 
                    type="text"
                    disabled={isRunning}
                    value={simulatedQuery}
                    onChange={(e) => setSimulatedQuery(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all font-semibold text-gray-900 dark:text-white"
                    placeholder="Enter query..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Fallback Model Routing</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "Thalon-Nano", label: "Nano (8B)" },
                      { id: "Clio-3.5-Large", label: "Large (70B)" },
                      { id: "Lattice-Reasoner", label: "Reasoner" }
                    ].map((model) => (
                      <button
                        key={model.id}
                        type="button"
                        disabled={isRunning}
                        onClick={() => setActiveModel(model.id)}
                        className={`py-2 px-1 text-center font-bold text-[10px] rounded-lg border transition-all ${
                          activeModel === model.id 
                            ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white" 
                            : "bg-gray-55 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {model.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center justify-between p-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 cursor-pointer select-none">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">Semantic Cache Layer</span>
                      <p className="text-[10px] text-gray-400 leading-none">Avoid upstream calls for matched intents</p>
                    </div>
                    <button
                      type="button"
                      disabled={isRunning}
                      onClick={() => setUseCache(!useCache)}
                      className={`w-11 h-6 rounded-full relative p-0.5 transition-colors duration-200 ${useCache ? "bg-zinc-800 dark:bg-zinc-200" : "bg-gray-300 dark:bg-gray-700"}`}
                    >
                      <span className={`w-5 h-5 bg-white dark:bg-zinc-900 rounded-full block transition-transform duration-200 ${useCache ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={runSimulation}
                disabled={isRunning}
                className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-bold rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {isRunning ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white dark:text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Executing Dispatch...
                  </>
                ) : (
                  "Execute Dispatch Chain"
                )}
              </button>
            </div>

            {/* Performance Visualizer (right) */}
            <div className="lg:col-span-7 bg-[#0b0b0c] text-zinc-300 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl font-mono text-xs flex flex-col min-h-[360px]">
              {/* Telemetry Header */}
              <div className="bg-[#161617] px-4 py-3 border-b border-zinc-850 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 inline-block" />
                  <span className="text-[10px] text-zinc-400 font-bold">real-time-core-orchestrator</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-400">
                  CACHE_{useCache ? "OPTIMIZED" : "BYPASSED"}
                </span>
              </div>

              {/* Sandbox Display */}
              <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-zinc-550 border-b border-zinc-850 pb-2">
                    <span>EXECUTION FLOW LOG</span>
                    <span className="animate-pulse text-zinc-300 font-bold">● ONLINE</span>
                  </div>

                  {/* Execution Progress */}
                  <div className="min-h-[50px] flex items-center">
                    <AnimatePresence mode="wait">
                      {isRunning ? (
                        <motion.div 
                          key={currentStep}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="text-white font-semibold flex items-center gap-3 text-xs"
                        >
                          <span className="w-2 h-2 bg-zinc-400 rounded-full animate-ping" />
                          <span>{currentStep}</span>
                        </motion.div>
                      ) : (
                        <span className="text-zinc-550 text-xs italic">System idle. Trigger a query simulation to see execution logs...</span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* History Analytics Table */}
                <div className="space-y-2">
                  <span className="text-[10px] text-zinc-550 block font-bold">RECENT ROUTE SESSIONS</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px] text-left border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-850 text-zinc-500 pb-1">
                          <th className="py-1">Query</th>
                          <th className="py-1">Endpoint</th>
                          <th className="py-1 text-center">Cache</th>
                          <th className="py-1 text-right">Latency</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900">
                        {history.slice(0, 3).map((item) => (
                          <tr key={item.id} className="text-zinc-300">
                            <td className="py-1.5 max-w-[150px] truncate text-[11px] font-semibold">{item.query}</td>
                            <td className="py-1.5 text-zinc-400">{item.model}</td>
                            <td className="py-1.5 text-center">
                              <span className="font-mono text-[10px] font-bold text-zinc-400">
                                {item.cacheStatus}
                              </span>
                            </td>
                            <td className="py-1.5 text-right font-bold text-zinc-300">
                              {item.latency}ms
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Detail Showcase */}
        <div className="grid md:grid-cols-2 gap-12 items-center pt-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
              Built for Scale & Continuous Autonomy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
              Modern automation systems fail when they rely on single prompts. Amthromax Platform maintains long-term state across complex agentic chains. Our hybrid key-value and vector memory system lets agents preserve user history and context over days, weeks, or months of background operations.
            </p>
            <div className="space-y-3 pt-2 text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-base">✓</span>
                <span>Active load balancing across multiple server clusters</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-base">✓</span>
                <span>Immutable cryptographic trace logging for auditing</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-base">✓</span>
                <span>Bidirectional WebSockets for real-time progress indicators</span>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-[32px] bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-white/[0.04] aspect-[4/3] relative shadow-md">
            <img 
              src="/images/man_at_desk.jpg" 
              alt="Engineering Platform Metrics" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default PlatformPage;
