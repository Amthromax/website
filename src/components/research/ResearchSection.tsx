import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface UseCaseData {
  id: string;
  label: string;
  icon: string;
  promptText: string;
  title: string;
  subtitle: string;
  sourceText?: string;
  tableData?: {
    headers: string[];
    rows: Array<{
      gene: string;
      values: Array<{ text: string; bg: string; color: string }>;
    }>;
  };
  codeData?: {
    filename: string;
    language: string;
    code: string;
  };
  chartData?: {
    title: string;
    bars: Array<{ label: string; value: number; color: string; displayValue: string }>;
  };
}

const useCases: UseCaseData[] = [
  {
    id: "synthesis",
    label: "Overview",
    icon: "📖",
    promptText: "Evaluate consensus protocols for distributed autonomous agent networks operating across multi-region cloud clusters. Benchmark sub-10ms latency metrics, Byzantine fault tolerance, and cross-cloud state serialization efficiency.",
    title: "Multi-Agent Consensus & Distributed Synchronization",
    subtitle: "Reported latency & consensus throughput across 34 peer-reviewed benchmarks, 2023–2026 • 6 architecture paradigms shown",
    sourceText: "Source: IEEE Transactions & Amthromax Benchmark Index",
    tableData: {
      headers: ["Raft 2.0", "Paxos Edge", "BFT-Async", "VectorSync", "ZeroState", "Amthromax Mesh"],
      rows: [
        {
          gene: "Sub-10ms Latency",
          values: [
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
            { text: "context", bg: "bg-rose-100 dark:bg-rose-900/90", color: "text-rose-900 dark:text-rose-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
            { text: "context", bg: "bg-rose-100 dark:bg-rose-900/90", color: "text-rose-900 dark:text-rose-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
          ]
        },
        {
          gene: "Fault Isolation",
          values: [
            { text: "context", bg: "bg-rose-100 dark:bg-rose-900/90", color: "text-rose-900 dark:text-rose-200" },
            { text: "restrains", bg: "bg-emerald-100 dark:bg-emerald-900/90", color: "text-emerald-900 dark:text-emerald-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
          ]
        },
        {
          gene: "Zero-Copy SerDe",
          values: [
            { text: "restrains", bg: "bg-emerald-100 dark:bg-emerald-900/90", color: "text-emerald-900 dark:text-emerald-200" },
            { text: "restrains", bg: "bg-emerald-100 dark:bg-emerald-900/90", color: "text-emerald-900 dark:text-emerald-200" },
            { text: "context", bg: "bg-rose-100 dark:bg-rose-900/90", color: "text-rose-900 dark:text-rose-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
          ]
        },
        {
          gene: "Auto-Failover",
          values: [
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
            { text: "context", bg: "bg-rose-100 dark:bg-rose-900/90", color: "text-rose-900 dark:text-rose-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
          ]
        },
        {
          gene: "Cross-Cloud Mesh",
          values: [
            { text: "context", bg: "bg-rose-100 dark:bg-rose-900/90", color: "text-rose-900 dark:text-rose-200" },
            { text: "restrains", bg: "bg-emerald-100 dark:bg-emerald-900/90", color: "text-emerald-900 dark:text-emerald-200" },
            { text: "context", bg: "bg-rose-100 dark:bg-rose-900/90", color: "text-rose-900 dark:text-rose-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
            { text: "achieved", bg: "bg-indigo-100 dark:bg-indigo-900/90", color: "text-indigo-900 dark:text-indigo-200" },
          ]
        }
      ]
    }
  },
  {
    id: "code",
    label: "Publication",
    icon: "</>",
    promptText: "Write a PyTorch Module implementing an adaptive Mixture-of-Experts (MoE) router with rotary position embeddings (RoPE) and FlashAttention-3 for sub-millisecond multi-agent context window processing.",
    title: "Distributed Neural MoE Router Architecture",
    subtitle: "Dynamic Mixture-of-Experts Router with FlashAttention-3 & CUDA Tensor Kernels",
    sourceText: "PyTorch 2.5 • CUDA 12.4 Kernel Optimized",
    codeData: {
      filename: "amthromax_moe_router.py",
      language: "python",
      code: `import torch
import torch.nn as nn
from flash_attn import flash_attn_qkvpacked_func

class AmthromaxMoERouter(nn.Module):
    def __init__(self, num_experts: int = 8, dim: int = 1024):
        super().__init__()
        self.num_experts = num_experts
        self.gate = nn.Linear(dim, num_experts, bias=False)
        self.experts = nn.ModuleList([nn.Linear(dim, dim) for _ in range(num_experts)])

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # Route tokens dynamically across active neural expert heads
        router_logits = self.gate(x)
        weights = torch.softmax(router_logits, dim=-1)
        out = sum(w.unsqueeze(-1) * exp(x) for w, exp in zip(weights.unbind(-1), self.experts))
        return out`
    }
  },
  {
    id: "analysis",
    label: "Research",
    icon: "📊",
    promptText: "Analyze latency distribution metrics for autonomous agent tool invocations under 100,000 concurrent workflows. Plot top 5 throughput optimizations and P99 response speedups.",
    title: "Autonomous Agent Latency & Throughput Distribution",
    subtitle: "Log2 Speedup & Resource Efficiency Metrics Across 100,000 Workloads",
    sourceText: "Amthromax Benchmark v4.2 • Kubernetes Audit",
    chartData: {
      title: "Top Performance Optimizations (Target: > 3.0x Speedup)",
      bars: [
        { label: "Vector Index Lookup", value: 95, color: "#818cf8", displayValue: "+5.12x Speedup" },
        { label: "Agent Tool Execution", value: 88, color: "#34d399", displayValue: "+4.40x Speedup" },
        { label: "Zero-Copy State Sync", value: 76, color: "#f472b6", displayValue: "+3.85x Speedup" },
        { label: "LLM Context Compression", value: 64, color: "#fbbf24", displayValue: "+3.10x Speedup" },
        { label: "Unoptimized Baseline", value: 28, color: "#a78bfa", displayValue: "1.00x Baseline" }
      ]
    }
  },
  {
    id: "experiments",
    label: "Release",
    icon: "🧮",
    promptText: "Run 100,000 Monte Carlo iterations evaluating quantum lattice state preservation under environmental thermal noise profiles.",
    title: "High-Dimensional Monte Carlo Lattice Simulation",
    subtitle: "Decoherence Suppression & Fault-Tolerant Error Thresholds",
    sourceText: "OpenQASM 3.0 Engine • 100,000 Monte Carlo Iterations",
    chartData: {
      title: "State Fidelity Preservation Metric (Target: > 99.9%)",
      bars: [
        { label: "Lattice Depth L=16 (Zero Noise)", value: 99, color: "#34d399", displayValue: "99.94% Fidelity" },
        { label: "Lattice Depth L=16 (Thermal Noise)", value: 94, color: "#60a5fa", displayValue: "94.82% Fidelity" },
        { label: "Lattice Depth L=32 (Surface Code)", value: 98, color: "#818cf8", displayValue: "98.71% Fidelity" },
        { label: "Uncorrected Baseline", value: 42, color: "#f87171", displayValue: "42.10% Fidelity" }
      ]
    }
  }
];

const ResearchSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("synthesis");
  const activeUseCase = useCases.find((u) => u.id === activeTab) || useCases[0];

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white font-sans min-h-screen transition-colors duration-300 antialiased">
      
      {/* SECTION 1: HERO HEADER */}
      <section className="relative pt-24 sm:pt-32 pb-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto overflow-hidden">
        <div className="max-w-4xl space-y-8 z-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-gray-900 dark:text-white tracking-tight leading-[1.08]">
            Amthromax R&D Platform <br />
            for research labs
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-normal leading-relaxed max-w-2xl">
            A reasoning partner for engineering teams, academic institutions, and enterprise labs to advance scientific discovery and autonomous AI systems.
          </p>

          <div>
            <Link
              to="/contact-sales"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black font-semibold text-sm rounded-lg transition-all cursor-pointer shadow-lg"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: MADE FOR SCIENTIFIC RESEARCH */}
      <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto border-t border-gray-200 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Title */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-5xl font-serif text-gray-900 dark:text-white tracking-tight leading-snug sticky top-32">
              Made for scientific research
            </h2>
          </div>

          {/* Right Feature List with Horizontal Line Dividers */}
          <div className="lg:col-span-7 divide-y divide-gray-200 dark:divide-white/10 border-t border-b border-gray-200 dark:border-white/10">
            
            {/* Feature 1 */}
            <div className="py-10 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-start">
              <div className="sm:col-span-5 text-base sm:text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                AI Agents for Research Automation
              </div>
              <div className="sm:col-span-7 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                Amthromax deploys autonomous agents to write benchmark code, synthesize cross-domain literature, and accelerate experimental workflows alongside your lab.
              </div>
            </div>

            {/* Feature 2 */}
            <div className="py-10 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-start">
              <div className="sm:col-span-5 text-base sm:text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                Enterprise Knowledge Integration
              </div>
              <div className="sm:col-span-7 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                Connect proprietary data pipelines, PubMed databases, and vector knowledge stores so every answer is grounded in verifiable references.
              </div>
            </div>

            {/* Feature 3 */}
            <div className="py-10 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-start">
              <div className="sm:col-span-5 text-base sm:text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                Verifiable Lineage & Auditability
              </div>
              <div className="sm:col-span-7 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                Every output includes reproducible code execution steps, precise source citations, and confidence metrics. Your proprietary research data remains 100% private.
              </div>
            </div>

            {/* Feature 4 */}
            <div className="py-10 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-start">
              <div className="sm:col-span-5 text-base sm:text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                Scalable R&D Infrastructure
              </div>
              <div className="sm:col-span-7 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                Provide your entire organization with unified access to state-of-the-art models, high-performance compute clusters, and collaborative team workspaces.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: HOW TEAMS USE AMTHROMAX */}
      <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto border-t border-gray-200 dark:border-white/10 space-y-12">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-serif text-gray-900 dark:text-white tracking-tight text-center">
          How teams use Amthromax Intelligence
        </h2>

        {/* Filter Pills Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {useCases.map((uc) => (
            <button
              key={uc.id}
              type="button"
              onClick={() => setActiveTab(uc.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                activeTab === uc.id
                  ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-lg"
                  : "bg-gray-100 text-gray-600 border-gray-200 hover:text-black hover:bg-gray-200 dark:bg-white/5 dark:text-gray-400 dark:border-white/10 dark:hover:text-white dark:hover:border-white/20"
              }`}
            >
              {uc.id === "synthesis" && (
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              )}
              {uc.id === "code" && (
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              )}
              {uc.id === "analysis" && (
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              )}
              {uc.id === "experiments" && (
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 15.75H3m18 0h-1.5M8.25 19.5V21m7.5-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H7.5A2.25 2.25 0 005.25 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                </svg>
              )}
              <span>{uc.label}</span>
            </button>
          ))}
        </div>

        {/* Main Canvas Display Container */}
        <div className="bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/20 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeUseCase.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              
              {/* Left Display Card: Literature Synthesis Table or Code/Chart */}
              <div className="lg:col-span-8 bg-white dark:bg-[#121214] text-gray-900 dark:text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border border-gray-200 dark:border-white/20">
                
                {/* Header */}
                <div className="space-y-1 border-b border-gray-200 dark:border-white/10 pb-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-white leading-snug">
                    {activeUseCase.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-normal">
                    {activeUseCase.subtitle}
                  </p>
                </div>

                {/* Table Render for Literature Synthesis */}
                {activeUseCase.tableData && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 font-semibold">
                          <th className="py-2.5 px-3">Metric / Protocol</th>
                          {activeUseCase.tableData.headers.map((h, i) => (
                            <th key={i} className="py-2.5 px-2 text-center">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-white/5 font-medium">
                        {activeUseCase.tableData.rows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors">
                            <td className="py-2.5 px-3 font-bold text-gray-900 dark:text-white font-mono text-xs">{row.gene}</td>
                            {row.values.map((v, valIdx) => (
                              <td key={valIdx} className="py-2 px-1 text-center">
                                <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${v.bg} ${v.color}`}>
                                  {v.text}
                                </span>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Code Render for Research Code */}
                {activeUseCase.codeData && (
                  <div className="bg-gray-900 dark:bg-[#18181b] text-gray-100 rounded-xl overflow-hidden text-xs font-mono border border-gray-800 dark:border-transparent">
                    <div className="px-4 py-2 bg-gray-950 dark:bg-zinc-900 text-gray-400 dark:text-zinc-400 flex justify-between border-b border-gray-800 dark:border-zinc-800">
                      <span>{activeUseCase.codeData.filename}</span>
                      <span className="uppercase text-[10px] bg-gray-800 dark:bg-zinc-800 px-2 py-0.5 rounded text-gray-300 dark:text-zinc-300">
                        {activeUseCase.codeData.language}
                      </span>
                    </div>
                    <pre className="p-4 overflow-x-auto leading-relaxed text-xs">
                      <code>{activeUseCase.codeData.code}</code>
                    </pre>
                  </div>
                )}

                {/* Chart Render for Data Analysis & Numerical Experiments */}
                {activeUseCase.chartData && (
                  <div className="space-y-4 py-2 font-sans">
                    <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      {activeUseCase.chartData.title}
                    </h4>
                    <div className="space-y-3">
                      {activeUseCase.chartData.bars.map((bar, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold text-gray-800 dark:text-gray-200">
                            <span>{bar.label}</span>
                            <span style={{ color: bar.color }}>{bar.displayValue}</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-white/10 h-3 rounded-full overflow-hidden border border-gray-200 dark:border-white/10">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${bar.value}%`, backgroundColor: bar.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Source Attribution */}
                {activeUseCase.sourceText && (
                  <div className="pt-3 border-t border-gray-100 dark:border-white/10 text-[11px] text-gray-500 dark:text-gray-400 font-normal">
                    {activeUseCase.sourceText}
                  </div>
                )}

              </div>

              {/* Right Floating Prompt Card */}
              <div className="lg:col-span-4 bg-gray-100 dark:bg-[#141416] border border-gray-200 dark:border-white/15 rounded-2xl p-6 sm:p-8 space-y-3 shadow-2xl text-gray-900 dark:text-white">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                  Prompt
                </span>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-normal leading-relaxed">
                  "{activeUseCase.promptText}"
                </p>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* SECTION 4: RESEARCH PUBLICATIONS & WHITE PAPERS LIST */}
      <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto border-t border-gray-200 dark:border-white/10 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-serif text-gray-900 dark:text-white tracking-tight">
              Scientific Publications
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
              Peer-reviewed whitepapers, system benchmarks, and research breakthroughs from Amthromax R&D Labs.
            </p>
          </div>
          <Link
            to="/research/publications"
            className="text-xs font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 shrink-0"
          >
            <span>View all publications</span>
            <span>›</span>
          </Link>
        </div>

        {/* 3-Column Minimalist List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <Link to="/research/predictive-autoscaling" className="group block">
            <div className="border-t border-gray-200 dark:border-white/10 pt-6 pb-2 flex flex-col justify-between min-h-[260px] h-full transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-semibold">
                  <span>Publication</span>
                  <span>Aug 1, 2026</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  Predictive Autoscaling in Kubernetes via Deep LSTM Networks
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 font-normal">
                  Proactive autoscaling model using recurrent neural networks to forecast request density and eliminate latency spikes.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex justify-between text-xs text-gray-500 dark:text-gray-400 font-semibold">
                <span>Cite</span>
                <span className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Learn more ›</span>
              </div>
            </div>
          </Link>

          <Link to="/research/zero-trust-protocol" className="group block">
            <div className="border-t border-gray-200 dark:border-white/10 pt-6 pb-2 flex flex-col justify-between min-h-[260px] h-full transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-semibold">
                  <span>Research</span>
                  <span>Jul 29, 2026</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  Zero-Trust Protocol and Edge Identity Authentication
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 font-normal">
                  Cryptographically verified edge nodes delivering zero-trust isolation without the high CPU overhead of legacy schemes.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex justify-between text-xs text-gray-500 dark:text-gray-400 font-semibold">
                <span>Cite</span>
                <span className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Learn more ›</span>
              </div>
            </div>
          </Link>

          <Link to="/research/distributed-query-execution" className="group block">
            <div className="border-t border-gray-200 dark:border-white/10 pt-6 pb-2 flex flex-col justify-between min-h-[260px] h-full transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-semibold">
                  <span>Overview</span>
                  <span>Jul 15, 2026</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  Distributed Query Execution Across Hybrid Multi-Cloud Clusters
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 font-normal">
                  Novel database middleware designed to orchestrate complex JOIN queries across heterogeneous cloud nodes.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex justify-between text-xs text-gray-500 dark:text-gray-400 font-semibold">
                <span>Cite</span>
                <span className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Learn more ›</span>
              </div>
            </div>
          </Link>

        </div>
      </section>

    </div>
  );
};

export default ResearchSection;
