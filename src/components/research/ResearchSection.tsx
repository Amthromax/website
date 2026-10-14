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
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
            { text: "context", bg: "bg-transparent ring-1 ring-inset ring-gray-300 dark:ring-white/20", color: "text-gray-400 dark:text-gray-500" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
            { text: "context", bg: "bg-transparent ring-1 ring-inset ring-gray-300 dark:ring-white/20", color: "text-gray-400 dark:text-gray-500" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
          ]
        },
        {
          gene: "Fault Isolation",
          values: [
            { text: "context", bg: "bg-transparent ring-1 ring-inset ring-gray-300 dark:ring-white/20", color: "text-gray-400 dark:text-gray-500" },
            { text: "restrains", bg: "bg-violet-500/12 ring-1 ring-inset ring-violet-500/40 dark:bg-violet-400/15 dark:ring-violet-400/40", color: "text-violet-700 dark:text-violet-200" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
          ]
        },
        {
          gene: "Zero-Copy SerDe",
          values: [
            { text: "restrains", bg: "bg-violet-500/12 ring-1 ring-inset ring-violet-500/40 dark:bg-violet-400/15 dark:ring-violet-400/40", color: "text-violet-700 dark:text-violet-200" },
            { text: "restrains", bg: "bg-violet-500/12 ring-1 ring-inset ring-violet-500/40 dark:bg-violet-400/15 dark:ring-violet-400/40", color: "text-violet-700 dark:text-violet-200" },
            { text: "context", bg: "bg-transparent ring-1 ring-inset ring-gray-300 dark:ring-white/20", color: "text-gray-400 dark:text-gray-500" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
          ]
        },
        {
          gene: "Auto-Failover",
          values: [
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
            { text: "context", bg: "bg-transparent ring-1 ring-inset ring-gray-300 dark:ring-white/20", color: "text-gray-400 dark:text-gray-500" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
          ]
        },
        {
          gene: "Cross-Cloud Mesh",
          values: [
            { text: "context", bg: "bg-transparent ring-1 ring-inset ring-gray-300 dark:ring-white/20", color: "text-gray-400 dark:text-gray-500" },
            { text: "restrains", bg: "bg-violet-500/12 ring-1 ring-inset ring-violet-500/40 dark:bg-violet-400/15 dark:ring-violet-400/40", color: "text-violet-700 dark:text-violet-200" },
            { text: "context", bg: "bg-transparent ring-1 ring-inset ring-gray-300 dark:ring-white/20", color: "text-gray-400 dark:text-gray-500" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
            { text: "achieved", bg: "bg-[#1b1b22] dark:bg-white", color: "text-white dark:text-[#1b1b22]" },
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
        { label: "Vector Index Lookup", value: 95, color: "#2e1065", displayValue: "+5.12x Speedup" },
        { label: "Agent Tool Execution", value: 88, color: "#5b21b6", displayValue: "+4.40x Speedup" },
        { label: "Zero-Copy State Sync", value: 76, color: "#7c3aed", displayValue: "+3.85x Speedup" },
        { label: "LLM Context Compression", value: 64, color: "#a78bfa", displayValue: "+3.10x Speedup" },
        { label: "Unoptimized Baseline", value: 28, color: "#c7c5cf", displayValue: "1.00x Baseline" }
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
        { label: "Lattice Depth L=16 (Zero Noise)", value: 99, color: "#2e1065", displayValue: "99.94% Fidelity" },
        { label: "Lattice Depth L=32 (Surface Code)", value: 98, color: "#5b21b6", displayValue: "98.71% Fidelity" },
        { label: "Lattice Depth L=16 (Thermal Noise)", value: 94, color: "#8b5cf6", displayValue: "94.82% Fidelity" },
        { label: "Uncorrected Baseline", value: 42, color: "#c7c5cf", displayValue: "42.10% Fidelity" }
      ]
    }
  }
];

/* Platform metrics shown in the hero and the figures band. */
const RESEARCH_STATS = [
  { value: "1,024", label: "Agents per swarm", note: "Concurrent reasoning agents in a single orchestrated run" },
  { value: "34", label: "Benchmark suites", note: "Internal and peer-reviewed suites tracked in the index" },
  { value: "6", label: "Regions", note: "Compute regions available for distributed experiments" },
  { value: "<10ms", label: "Consensus latency", note: "Median agreement time across the Amthromax Mesh" },
];

/* The disciplines Amthromax research is organised around. */
const RESEARCH_AREAS = [
  {
    id: "agents",
    tag: "01",
    title: "Autonomous agent systems",
    body: "Planning, tool use and self-correction across long-running tasks. We study how agent swarms divide work, reach consensus and recover when individual agents fail mid-run.",
    points: ["Multi-agent orchestration", "Task graph decomposition", "Failure recovery and replay"],
  },
  {
    id: "distributed",
    tag: "02",
    title: "Distributed inference",
    body: "Serving large models across heterogeneous clusters without sacrificing determinism. Our work covers scheduling, zero-copy serialisation and cross-region state synchronisation.",
    points: ["Mixture-of-Experts routing", "Zero-copy SerDe", "Cross-cloud mesh topology"],
  },
  {
    id: "reasoning",
    tag: "03",
    title: "Reasoning and evaluation",
    body: "Measuring whether a model actually reasoned, not just whether it answered. We build evaluation harnesses that score intermediate steps, citations and reproducibility.",
    points: ["Step-level scoring", "Citation grounding", "Reproducible eval harnesses"],
  },
  {
    id: "retrieval",
    tag: "04",
    title: "Retrieval and knowledge",
    body: "Grounding generation in private corpora. We research vector index design, hybrid retrieval and provenance tracking so every claim can be traced to a source document.",
    points: ["Hybrid dense and sparse retrieval", "Index compaction", "Provenance tracking"],
  },
  {
    id: "safety",
    tag: "05",
    title: "Safety and governance",
    body: "Policy enforcement that survives contact with production. We study guardrail architectures, red-teaming methodology and audit trails that hold up under review.",
    points: ["Policy guardrails", "Adversarial red-teaming", "Immutable audit trails"],
  },
  {
    id: "systems",
    tag: "06",
    title: "Research infrastructure",
    body: "The substrate the rest of the work runs on: experiment tracking, dataset versioning and compute scheduling built so a result from last quarter can be re-run today.",
    points: ["Experiment tracking", "Dataset versioning", "Deterministic re-runs"],
  },
];

/* Ways labs and institutions work with us. */
const COLLABORATIONS = [
  {
    title: "Academic partnerships",
    body: "Joint research programmes with university labs, including compute allocations and co-authored publications.",
  },
  {
    title: "Research residency",
    body: "A fixed-term placement for researchers and PhD candidates working alongside the Amthromax engineering teams.",
  },
  {
    title: "Compute grants",
    body: "Allocated cluster time for independent researchers running reproducible, publishable experiments.",
  },
  {
    title: "Enterprise lab programme",
    body: "Dedicated environments for corporate R&D groups, with private model hosting inside your own VPC.",
  },
];

const ResearchSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("synthesis");
  const activeUseCase = useCases.find((u) => u.id === activeTab) || useCases[0];

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white font-sans min-h-screen transition-colors duration-300 antialiased">
      
      {/* SECTION 1: HERO HEADER */}
      <section className="relative pt-20 sm:pt-28 pb-16 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-7 space-y-7 z-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-white" />
              Amthromax Research
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-gray-900 dark:text-white tracking-tight leading-[1.08]">
              Amthromax R&D Platform <br />
              for research labs
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-normal leading-relaxed max-w-2xl">
              A reasoning partner for engineering teams, academic institutions, and enterprise labs to advance scientific discovery and autonomous AI systems.
            </p>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-normal leading-relaxed max-w-2xl">
              The platform brings experiment tracking, distributed compute, agent orchestration and evaluation into one workspace, so a result produced today can be reproduced, cited and audited months later.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact-sales"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black font-semibold text-sm rounded-lg transition-all cursor-pointer shadow-lg"
              >
                Get started
              </Link>
              <Link
                to="/research/publications"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 font-semibold text-sm rounded-lg transition-all cursor-pointer"
              >
                <span>Read the publications</span>
                <span aria-hidden="true">&rsaquo;</span>
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-[#0d0d0f] shadow-[0_1px_1px_rgba(15,23,42,0.04),0_24px_60px_-28px_rgba(15,23,42,0.4)]">
              <img
                src="/images/amthromax_lab_workspace.jpg"
                alt="A researcher working in the Amthromax Lab workspace"
                loading="lazy"
                decoding="async"
                className="w-full h-[280px] sm:h-[360px] lg:h-[420px] object-cover"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.04] dark:ring-white/10 rounded-3xl" />
            </div>
          </div>

        </div>

        {/* Figures band */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
          {RESEARCH_STATS.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-black p-5 sm:p-7 space-y-1.5">
              <div className="text-2xl sm:text-4xl font-serif text-gray-900 dark:text-white tracking-tight tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{stat.label}</div>
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{stat.note}</p>
            </div>
          ))}
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

      {/* IN-BETWEEN HIGHLIGHT BOX SECTION WITH HIGH-DEFINITION METALLIC TEXTURE */}
      <section className="py-12 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto">
        <div className="relative rounded-3xl h-[240px] sm:h-[280px] w-full border border-gray-800/80 dark:border-white/20 shadow-2xl overflow-hidden group">
          {/* Main HD Sharpened Image Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-100 group-hover:scale-[1.01]"
            style={{ 
              backgroundImage: "url('/images/metallic_noise_texture.jpg')",
              filter: "contrast(125%) brightness(108%) saturate(110%)",
              WebkitFilter: "contrast(125%) brightness(108%) saturate(110%)",
            }}
          />
          {/* Lighting Vignette Overlay for Depth & Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />
          {/* Specular Inner Edge Highlight */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20 pointer-events-none" />
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Left Display Card: Literature Synthesis Table or Code/Chart */}
              <div className="lg:col-span-8 lg:min-h-[640px] bg-white dark:bg-[#121214] text-gray-900 dark:text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border border-gray-200 dark:border-white/20">
                
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
                                <span className={`inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-semibold uppercase tracking-[0.06em] ${v.bg} ${v.color}`}>
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
                  <div className="relative bg-[#0d0c12] text-gray-100 rounded-xl overflow-hidden text-xs font-mono ring-1 ring-violet-400/15">
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
                    <div className="px-4 py-2.5 bg-black/40 text-gray-400 flex items-center justify-between border-b border-white/[0.06]">
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                        {activeUseCase.codeData.filename}
                      </span>
                      <span className="uppercase text-[9px] tracking-[0.14em] border border-violet-400/30 text-violet-200 px-2 py-0.5 rounded-[4px]">
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
                    <h4 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.18em]">
                      {activeUseCase.chartData.title}
                    </h4>
                    <div className="divide-y divide-gray-100 dark:divide-white/5 border-t border-gray-100 dark:border-white/5">
                      {activeUseCase.chartData.bars.map((bar, i) => (
                        <div key={i} className="grid grid-cols-12 items-center gap-3 py-3">
                          <span className="col-span-12 sm:col-span-4 flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-gray-800 dark:text-gray-200">
                            <span className="font-mono text-[10px] text-gray-400 dark:text-gray-600 tabular-nums">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="truncate">{bar.label}</span>
                          </span>

                          <span className="col-span-8 sm:col-span-5">
                            {/* Square-ended rule on a ruled track: reads as a measurement,
                                not a progress bar. */}
                            <span className="relative block h-[7px] w-full bg-gray-100 dark:bg-white/[0.07]">
                              <span
                                className="absolute inset-y-0 left-0 transition-all duration-700 ease-out"
                                style={{ width: `${bar.value}%`, backgroundColor: bar.color }}
                              />
                              <span className="pointer-events-none absolute inset-y-[-3px] right-0 w-px bg-gray-300 dark:bg-white/20" />
                            </span>
                          </span>

                          <span className="col-span-4 sm:col-span-3 text-right font-mono text-[11px] sm:text-xs font-semibold tabular-nums text-gray-900 dark:text-white">
                            {bar.displayValue}
                          </span>
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

      {/* SECTION 3.5: RESEARCH AREAS */}
      <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto border-t border-gray-200 dark:border-white/10 space-y-12">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl sm:text-5xl font-serif text-gray-900 dark:text-white tracking-tight">
            What we research
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Amthromax research runs across six disciplines. Each one feeds the platform directly, so the methods described here are the methods the product ships with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
          {RESEARCH_AREAS.map((area) => (
            <div
              key={area.id}
              className="group bg-white dark:bg-black p-7 sm:p-9 space-y-4 transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-white/[0.03]"
            >
              <span className="block font-mono text-xs text-gray-400 dark:text-gray-600">{area.tag}</span>
              <h3 className="text-lg sm:text-xl font-serif text-gray-900 dark:text-white tracking-tight leading-snug">
                {area.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{area.body}</p>
              <ul className="pt-1 space-y-1.5">
                {area.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                    <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gray-400 dark:bg-gray-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3.6: INSIDE THE LAB */}
      <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto border-t border-gray-200 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-6 order-2 lg:order-1 space-y-8">
            <h2 className="text-3xl sm:text-5xl font-serif text-gray-900 dark:text-white tracking-tight leading-snug">
              Inside the research stack
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
              Every experiment runs on the same substrate: versioned datasets, pinned model weights and a scheduler that records exactly which hardware produced which number. Nothing is reconstructed from memory.
            </p>

            <dl className="divide-y divide-gray-200 dark:divide-white/10 border-t border-b border-gray-200 dark:border-white/10">
              {[
                { term: "Compute", desc: "Distributed GPU clusters across six regions, with reserved capacity for long-running training and evaluation jobs." },
                { term: "Datasets", desc: "Content-addressed dataset versioning, so a run always resolves the exact snapshot it was launched against." },
                { term: "Reproducibility", desc: "Pinned weights, recorded seeds and captured environments. Any published figure can be re-executed from its manifest." },
                { term: "Privacy", desc: "Private corpora stay inside your own VPC. Proprietary research data is never used to train shared models." },
              ].map((row) => (
                <div key={row.term} className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                  <dt className="sm:col-span-4 text-sm font-semibold text-gray-900 dark:text-white tracking-tight">{row.term}</dt>
                  <dd className="sm:col-span-8 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{row.desc}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/15 shadow-[0_1px_1px_rgba(15,23,42,0.04),0_24px_60px_-28px_rgba(15,23,42,0.45)]">
              <img
                src="/images/cognitive_knowledge_mining.png"
                alt="Visualisation of a neural knowledge graph drawing on indexed research documents"
                loading="lazy"
                decoding="async"
                className="w-full h-[320px] sm:h-[460px] object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3.7: COLLABORATE */}
      <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1550px] mx-auto border-t border-gray-200 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/15 shadow-[0_1px_1px_rgba(15,23,42,0.04),0_24px_60px_-28px_rgba(15,23,42,0.4)]">
              <img
                src="/images/agi_mission_team.png"
                alt="Researchers discussing a model architecture at a whiteboard in the AI research hub"
                loading="lazy"
                decoding="async"
                className="w-full h-[300px] sm:h-[420px] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl font-serif text-gray-900 dark:text-white tracking-tight leading-snug">
                Work with Amthromax Labs
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                We run a small number of collaborations at a time, chosen for the questions they answer rather than their size. Each one gets compute, engineering time and a named research contact.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
              {COLLABORATIONS.map((item) => (
                <div key={item.title} className="bg-white dark:bg-black p-6 sm:p-7 space-y-2">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">{item.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>

            <Link
              to="/contact-sales"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black font-semibold text-sm rounded-lg transition-all cursor-pointer shadow-lg"
            >
              <span>Talk to the research team</span>
              <span aria-hidden="true">&rsaquo;</span>
            </Link>
          </div>

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
