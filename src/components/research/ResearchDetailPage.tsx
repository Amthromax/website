import React from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../footer/Footer";

interface DiagramNode {
  step: string;
  title: string;
  description: string;
  badge?: string;
}

interface BenchmarkItem {
  metric: string;
  baseline: string;
  proposed: string;
  improvement: string;
}

interface CodeBlock {
  language: string;
  filename: string;
  code: string;
}

interface PaperChartConfig {
  type: "line" | "bar";
  title: string;
  subtitle: string;
  legend: Array<{ label: string; color: string }>;
  xLabels: string[];
  yLabel: string;
  series: Array<{
    name: string;
    color: string;
    values: number[]; // values range 0 - 100 for SVG rendering
    displayValues: string[];
  }>;
}

interface ResearchPaperDetail {
  id: string;
  category: string;
  title: string;
  tagline: string;
  abstract: string;
  introduction: string[];
  systemArchitectureDescription: string;
  diagramTitle: string;
  diagramNodes: DiagramNode[];
  flowSummary: string;
  chartConfig: PaperChartConfig;
  methodology: string[];
  mathematicalFormulation?: {
    title: string;
    explanation: string;
    equations: string[];
  };
  benchmarkData?: BenchmarkItem[];
  codeSnippet?: CodeBlock;
  results: string[];
  date: string;
  readTime: string;
  tags: string[];
}

const researchPapersDetails: Record<string, ResearchPaperDetail> = {
  "predictive-autoscaling": {
    id: "predictive-autoscaling",
    category: "Artificial Intelligence",
    title: "Predictive Autoscaling in Kubernetes via Deep LSTM Networks",
    tagline: "A proactive resource scaling model using recurrent neural networks to forecast request density.",
    abstract: "This paper introduces a proactive autoscaling mechanism that leverages Long Short-Term Memory (LSTM) neural networks to forecast API request volumes. By anticipating traffic spikes up to 15 minutes in advance, our architecture reduces latency spikes by 42% compared to reactive CPU/memory threshold scalers.",
    introduction: [
      "Modern web microservices experience rapidly fluctuating traffic patterns influenced by global user activity, automated jobs, and unexpected event-driven spikes. Standard Kubernetes Horizontal Pod Autoscalers (HPA) rely on reactive metrics—such as CPU utilization or memory usage thresholds—to trigger scaling operations.",
      "However, reactive scaling creates a fundamental lag: container images take time to pull, initialize, and pass health checks, while virtual machines in node pools can take up to several minutes to join the cluster. During this provisioning gap, incoming HTTP/gRPC requests experience severe latency degradation or rate-limiting drops. We propose a predictive forecasting architecture powered by lightweight Deep LSTM recurrent networks to eliminate container cold-start penalties."
    ],
    systemArchitectureDescription: "The predictive autoscaling pipeline operates alongside standard Kubernetes controllers. It ingests ingress traffic telemetry in real-time, projects future load via an ONNX-compiled LSTM inference module, and directly alters HPA target replica configurations ahead of forecasted demand surges.",
    diagramTitle: "Predictive LSTM Ingestion & HPA Dispatch Pipeline",
    diagramNodes: [
      {
        step: "01",
        title: "Ingress Log Stream",
        description: "Aggregates real-time HTTP/gRPC metric streams from envoy gateways at 1,000+ events/sec.",
        badge: "Real-time Telemetry"
      },
      {
        step: "02",
        title: "Sliding Window Feature Store",
        description: "Transforms raw request rates into 60-second normalized temporal sequence tensors.",
        badge: "Feature Engineering"
      },
      {
        step: "03",
        title: "Deep LSTM Model (ONNX Engine)",
        description: "Executes 12-layer recurrent forward pass forecasting request volume for t + 15 min.",
        badge: "Inference Horizon (+15m)"
      },
      {
        step: "04",
        title: "Kubernetes HPA Controller",
        description: "Applies predictive replica targets to pod specs 10 minutes before actual peak traffic hits.",
        badge: "Zero Cold-Start"
      }
    ],
    flowSummary: "Ingress Stream (1k req/s) → 60s Sliding Windows → Deep LSTM Inference (+15m) → HPA Pod Replica Dispatch",
    chartConfig: {
      type: "line",
      title: "FIG 1.1 • Real-Time Traffic Spike vs Response Latency (P99 ms)",
      subtitle: "Comparison of P99 response times during sudden 5x traffic surges.",
      legend: [
        { label: "Reactive CPU HPA (Legacy)", color: "#f43f5e" },
        { label: "Predictive LSTM Model (Proposed)", color: "#059669" }
      ],
      xLabels: ["T-30m", "T-15m (Predict)", "T=0 (Spike)", "T+15m", "T+30m"],
      yLabel: "Latency (ms)",
      series: [
        {
          name: "Reactive CPU HPA",
          color: "#f43f5e",
          values: [20, 25, 95, 45, 22],
          displayValues: ["180ms", "210ms", "840ms", "420ms", "190ms"]
        },
        {
          name: "Predictive LSTM Model",
          color: "#059669",
          values: [20, 24, 52, 28, 20],
          displayValues: ["180ms", "200ms", "487ms", "240ms", "180ms"]
        }
      ]
    },
    methodology: [
      "We developed a 3-layer LSTM neural network trained on over 14 million historical HTTP request logs collected across multi-region Kubernetes clusters. The input feature tensor incorporates moving averages of request rates, error codes (5xx/4xx), day-of-week periodic embeddings, and latency percentile distributions.",
      "To run inference inside the cluster without consuming heavy GPU resources, the trained PyTorch model was exported to ONNX format and executed via a C++ sidecar container. The sidecar exposes an internal gRPC endpoint consumed by a custom Kubernetes External Metrics Provider."
    ],
    mathematicalFormulation: {
      title: "Recurrent Cell State & Prediction Formulation",
      explanation: "The LSTM cell updates its hidden state vector h_t using input gate i_t, forget gate f_t, and output gate o_t to model multi-scale temporal dependencies without suffering from vanishing gradients:",
      equations: [
        "f_t = σ(W_f · [h_{t-1}, x_t] + b_f)",
        "i_t = σ(W_i · [h_{t-1}, x_t] + b_i)",
        "C̃_t = tanh(W_c · [h_{t-1}, x_t] + b_c)",
        "C_t = f_t * C_{t-1} + i_t * C̃_t",
        "h_t = o_t * tanh(C_t)",
        "ŷ_{t+k} = W_y · h_t + b_y   (where k = 15 min)"
      ]
    },
    benchmarkData: [
      {
        metric: "Peak P99 Latency During Spikes",
        baseline: "840 ms",
        proposed: "487 ms",
        improvement: "-42.0%"
      },
      {
        metric: "Autoscaling Lead Time",
        baseline: "0 s (Reactive)",
        proposed: "900 s (15 min lead)",
        improvement: "Infinite"
      },
      {
        metric: "Over-provisioning Cost Overhead",
        baseline: "34% waste",
        proposed: "16% waste",
        improvement: "-18.0%"
      },
      {
        metric: "Prediction Root Mean Square Error (RMSE)",
        baseline: "N/A",
        proposed: "0.041",
        improvement: "High Accuracy"
      }
    ],
    codeSnippet: {
      language: "python",
      filename: "predictive_hpa_scaler.py",
      code: `import torch
import torch.nn as nn
import onnxruntime as ort
import numpy as np

class LSTMTrafficPredictor(nn.Module):
    def __init__(self, input_dim=6, hidden_dim=64, num_layers=3, horizon=15):
        super(LSTMTrafficPredictor, self).__init__()
        self.lstm = nn.LSTM(input_dim, hidden_dim, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_dim, horizon)

    def forward(self, x):
        h0 = torch.zeros(3, x.size(0), 64).to(x.device)
        c0 = torch.zeros(3, x.size(0), 64).to(x.device)
        out, _ = self.lstm(x, (h0, c0))
        predicted_traffic = self.fc(out[:, -1, :])
        return predicted_traffic

def calculate_target_replicas(predicted_qps: float, qps_per_pod: int = 150) -> int:
    """Proactively calculate required pod count 15 mins ahead"""
    return int(np.ceil(predicted_qps / qps_per_pod))`
    },
    results: [
      "In production validation across a 1,200-node Kubernetes cluster handling 45 million daily API calls, the predictive LSTM model successfully anticipated 94.2% of bursty traffic events.",
      "The average P99 response time during high-volume transitions dropped from 840ms to 487ms, representing a 42% decrease in user-perceived latency. Concurrently, compute infrastructure costs were optimized by 18% due to reduced over-provisioning during off-peak hours."
    ],
    date: "June 2026",
    readTime: "8 min read",
    tags: ["Machine Learning", "Kubernetes", "DevOps"]
  },
  "zero-trust-protocol": {
    id: "zero-trust-protocol",
    category: "Cybersecurity",
    title: "Zero-Trust Protocol and Edge Identity Authentication",
    tagline: "Securing enterprise edge endpoints through cryptographically signed lightweight tokens.",
    abstract: "An examination of cryptographically verified edge nodes for enterprise networks. We present a lightweight identity validation protocol that achieves zero-trust isolation without the high CPU overhead traditional in distributed ledger validations.",
    introduction: [
      "Enterprise zero-trust network architectures dictate that no device or service account inside or outside the network boundary can be trusted implicitly. Every payload, API request, and telemetry packet must be independently authenticated and authorized.",
      "However, executing full asymmetric cryptographic checks (e.g. RSA-4096 or standard TLS 1.3 handshakes) at every microservice hop or low-power IoT gateway introduces significant latency and battery consumption. This paper introduces an optimized, sub-millisecond Zero-Trust Token Verification (ZT-TV) protocol tailored for edge compute topologies."
    ],
    systemArchitectureDescription: "The ZT-TV protocol relies on short-lived, ephemerally signed ed25519 identity tokens verified by hardware-backed Trusted Execution Environments (TEEs) at the network edge.",
    diagramTitle: "Zero-Trust Edge Verification & Enclave Handshake",
    diagramNodes: [
      {
        step: "01",
        title: "Edge Client Device",
        description: "Generates low-overhead Ed25519 payload signature with ephemeral nonce.",
        badge: "Ed25519 Signature"
      },
      {
        step: "02",
        title: "Ingress Edge Node",
        description: "Intercepts request in Linux kernel socket layer via eBPF probe.",
        badge: "Sub-ms Intercept"
      },
      {
        step: "03",
        title: "Hardware Enclave (TEE)",
        description: "Verifies cryptographic validity against root key cache in secure enclave memory.",
        badge: "Hardware Verification"
      },
      {
        step: "04",
        title: "Microservice Target",
        description: "Grants granular zero-trust request routing with zero identity overhead.",
        badge: "Zero-Trust Verified"
      }
    ],
    flowSummary: "Edge Payload Sign → eBPF Kernel Probe → TEE Enclave Verification → Zero-Trust Route",
    chartConfig: {
      type: "bar",
      title: "FIG 1.1 • Cryptographic Handshake Verification Latency (ms)",
      subtitle: "Benchmark of signature validation latency across standard protocols vs ZT-TV Ed25519.",
      legend: [
        { label: "Legacy Asymmetric Validation", color: "#6e6e73" },
        { label: "ZT-TV Protocol (Proposed)", color: "#0066cc" }
      ],
      xLabels: ["TLS 1.3 RSA-4096", "ECDSA P-256", "JWT HMAC-SHA256", "ZT-TV Ed25519 (eBPF)"],
      yLabel: "Latency (ms)",
      series: [
        {
          name: "Verification Speed",
          color: "#0066cc",
          values: [95, 48, 22, 5],
          displayValues: ["14.2 ms", "6.8 ms", "2.1 ms", "0.32 ms"]
        }
      ]
    },
    methodology: [
      "We engineered a zero-copy validation pipeline operating in kernel space via eBPF programs. Identity tokens are validated before HTTP header parsing occurs, dropping unauthorized connection attempts before memory allocation.",
      "Root keys are periodically refreshed using threshold cryptography (3-of-5 secret sharing), guaranteeing that node compromise does not compromise global enterprise identity roots."
    ],
    mathematicalFormulation: {
      title: "Ed25519 Schnorr Verification Formulation",
      explanation: "Given public key A, signature (R, S), and message hash k = H(R || A || M), signature validation verifies the group point equality:",
      equations: [
        "k = SHA-512(R || A || M)",
        "2^b S · B = R + k · A   (in 𝔽_q)",
        "Latency Check: T_verify < 0.35ms"
      ]
    },
    benchmarkData: [
      {
        metric: "Token Verification Speed",
        baseline: "14.2 ms (TLS/RSA)",
        proposed: "0.32 ms (eBPF/Ed25519)",
        improvement: "44x Faster"
      },
      {
        metric: "CPU Utilization at 10k req/s",
        baseline: "28.4%",
        proposed: "3.8%",
        improvement: "-86.6%"
      },
      {
        metric: "Unauthorized Packet Drop Latency",
        baseline: "1.8 ms",
        proposed: "0.04 ms",
        improvement: "Instant Drop"
      }
    ],
    codeSnippet: {
      language: "rust",
      filename: "edge_verifier.rs",
      code: `use ed25519_dalek::{PublicKey, Signature, Verifier};

pub fn verify_edge_token(pub_key_bytes: &[u8; 32], msg: &[u8], sig_bytes: &[u8; 64]) -> bool {
    if let (Ok(public_key), Ok(signature)) = (
        PublicKey::from_bytes(pub_key_bytes),
        Signature::from_bytes(sig_bytes),
    ) {
        public_key.verify(msg, &signature).is_ok()
    } else {
        false
    }
}`
    },
    results: [
      "The ZT-TV protocol was deployed across 8,500 edge gateways, achieving average token verification latency of 0.32ms per payload.",
      "CPU consumption during high-throughput DDoS mitigation dropped by 86.6%, allowing edge hardware to process up to 44x more concurrent connections per gateway."
    ],
    date: "April 2026",
    readTime: "12 min read",
    tags: ["Zero Trust", "Cryptography", "Edge Computing"]
  },
  "distributed-query-execution": {
    id: "distributed-query-execution",
    category: "Cloud Architecture",
    title: "Distributed Query Execution Across Hybrid Multi-Cloud Clusters",
    tagline: "A low-latency SQL routing middleware designed for federated databases.",
    abstract: "A novel routing database middleware designed to orchestrate complex JOIN queries across heterogeneous databases hosted dynamically on AWS, Google Cloud, and on-premises centers, achieving sub-100ms federated response times.",
    introduction: [
      "Modern enterprise architectures frequently split data across multiple cloud vendors to comply with sovereignty laws, manage cost, and maintain vendor independence. However, querying across isolated relational databases (e.g. AWS Aurora, GCP Cloud Spanner, and on-prem PostgreSQL) introduces massive cross-cloud network latency during JOIN operations.",
      "Standard federated query engines pull large raw tables over the public internet before executing JOINs locally, resulting in high egress fees and high query times. We present a dynamic query optimization engine that pushes filtering and partial aggregation down to remote nodes."
    ],
    systemArchitectureDescription: "The engine decomposes SQL Abstract Syntax Trees (ASTs) into localized execution graphs, estimating network egress costs and executing micro-JOINs on the cloud node containing the largest dataset fraction.",
    diagramTitle: "Distributed Federated Query Optimizer & Execution Graph",
    diagramNodes: [
      {
        step: "01",
        title: "SQL Query Parser",
        description: "Decomposes inbound ANSI SQL queries into relational algebra AST trees.",
        badge: "AST Decomposition"
      },
      {
        step: "02",
        title: "Cost-Based Optimizer",
        description: "Estimates network transfer costs across AWS, GCP, and local data centers.",
        badge: "Cost Optimization"
      },
      {
        step: "03",
        title: "Predicate Pushdown Engine",
        description: "Pushes WHERE filters and preliminary GROUP BY aggregations down to remote DBs.",
        badge: "Filter Pushdown"
      },
      {
        step: "04",
        title: "Federated Stream Assembler",
        description: "Merges partial binary tuple streams in parallel with sub-100ms latency.",
        badge: "Parallel Merge"
      }
    ],
    flowSummary: "ANSI SQL Query → AST Decomposition → Predicate Pushdown → Stream Merge (<100ms)",
    chartConfig: {
      type: "bar",
      title: "FIG 1.1 • Multi-Cloud Cross-Network Egress Volume (MB)",
      subtitle: "Comparison of data transferred across cloud boundaries for 3-way multi-cloud JOINs.",
      legend: [
        { label: "Standard Remote Fetch (Naive)", color: "#6e6e73" },
        { label: "Predicate Pushdown Router (Proposed)", color: "#059669" }
      ],
      xLabels: ["10k Records", "100k Records", "1M Records", "10M Records"],
      yLabel: "Egress Data (MB)",
      series: [
        {
          name: "Standard Remote Fetch",
          color: "#6e6e73",
          values: [30, 60, 85, 98],
          displayValues: ["140 MB", "620 MB", "2.1 GB", "4.2 GB"]
        },
        {
          name: "Predicate Pushdown Router",
          color: "#059669",
          values: [5, 12, 22, 30],
          displayValues: ["8 MB", "24 MB", "75 MB", "180 MB"]
        }
      ]
    },
    methodology: [
      "We engineered a cost-based query optimizer that measures inter-cloud latency and egress pricing in real-time. By applying hyper-log-log cardinality estimation, the optimizer dynamically decides whether to execute semi-JOINs or hash-JOINs at the target database node.",
      "All inter-cloud communication is compressed using Arrow IPC stream buffers over gRPC, reducing cross-cloud network bandwidth consumption."
    ],
    benchmarkData: [
      {
        metric: "Multi-Cloud 3-Way JOIN Latency",
        baseline: "1,450 ms",
        proposed: "88 ms",
        improvement: "16.4x Faster"
      },
      {
        metric: "Cross-Cloud Network Egress Data",
        baseline: "4.2 GB",
        proposed: "180 MB",
        improvement: "-95.7%"
      }
    ],
    results: [
      "In benchmark tests spanning AWS US-East, GCP Europe-West, and an on-premises data center in Tokyo, federated SQL queries completed with an average response time of 88ms.",
      "Data egress volume across cloud provider boundaries was reduced by 95.7%, saving enterprise operations over $40,000 monthly in network egress charges."
    ],
    date: "January 2026",
    readTime: "10 min read",
    tags: ["Multi-Cloud", "SQL Federation", "Big Data"]
  },
  "lattice-based-cryptography": {
    id: "lattice-based-cryptography",
    category: "Quantum Security",
    title: "Lattice-Based Cryptography in Modern Web API Layers",
    tagline: "Post-quantum defense configurations for high-throughput transactional REST APIs.",
    abstract: "A production case study detailing the deployment of post-quantum lattice cryptography to secure sensitive banking REST APIs. We evaluate handshake overheads and client-side computational footprints on mobile hardware.",
    introduction: [
      "The advent of fault-tolerant quantum computing poses an existential threat to current public-key cryptosystems such as RSA and ECDSA, which rely on the hardness of integer factorization and discrete logarithms.",
      "Post-quantum lattice cryptography relies on the hardness of high-dimensional geometric lattice problems, such as Learning With Errors (LWE). This paper details the real-world integration of NIST-standardized CRYSTALS-Kyber key encapsulation in financial web APIs."
    ],
    systemArchitectureDescription: "Our architecture wraps standard TLS 1.3 handshakes with hybrid post-quantum key exchanges, combining ECDH with CRYSTALS-Kyber-768 to provide immediate quantum defense while maintaining backwards compatibility.",
    diagramTitle: "Hybrid Quantum-Safe Handshake Architecture",
    diagramNodes: [
      {
        step: "01",
        title: "Client Hello",
        description: "Sends hybrid ECDH X25519 + Kyber-768 key encapsulation proposal.",
        badge: "Kyber-768 Encap"
      },
      {
        step: "02",
        title: "Quantum Proxy Ingress",
        description: "Validates lattice key parameters and computes shared secret K.",
        badge: "Lattice Verification"
      },
      {
        step: "03",
        title: "Session Key KDF",
        description: "Combines classical and lattice secrets via HKDF-SHA256.",
        badge: "Hybrid KDF"
      },
      {
        step: "04",
        title: "Encrypted API Channel",
        description: "Secures REST payloads with quantum-proof AES-256-GCM keys.",
        badge: "Post-Quantum Safe"
      }
    ],
    flowSummary: "Hybrid Key Proposal → Kyber-768 Encapsulation → HKDF HKDF-SHA256 → Quantum-Safe Channel",
    chartConfig: {
      type: "line",
      title: "FIG 1.1 • Post-Quantum Handshake Latency vs Client Load (ms)",
      subtitle: "Overhead of hybrid post-quantum key exchanges across concurrent REST sessions.",
      legend: [
        { label: "Classical TLS 1.3 (ECDH X25519)", color: "#6e6e73" },
        { label: "Hybrid PQC (X25519 + Kyber-768)", color: "#7c3aed" }
      ],
      xLabels: ["1k QPS", "5k QPS", "10k QPS", "20k QPS", "50k QPS"],
      yLabel: "Latency (ms)",
      series: [
        {
          name: "Classical TLS 1.3",
          color: "#6e6e73",
          values: [15, 18, 22, 28, 45],
          displayValues: ["1.1ms", "1.3ms", "1.6ms", "2.0ms", "3.2ms"]
        },
        {
          name: "Hybrid PQC (Kyber)",
          color: "#7c3aed",
          values: [18, 21, 26, 33, 50],
          displayValues: ["1.25ms", "1.5ms", "1.8ms", "2.3ms", "3.6ms"]
        }
      ]
    },
    methodology: [
      "We benchmarked CRYSTALS-Kyber-768 and Dilithium-3 signatures inside a high-throughput banking gateway handling 20,000 transactions/sec.",
      "Optimized vector extensions (AVX-512 and ARM Neon) were implemented to accelerate polynomial multiplication, minimizing CPU utilization overhead."
    ],
    benchmarkData: [
      {
        metric: "Handshake Overhead",
        baseline: "1.1 ms (Classical)",
        proposed: "1.25 ms (Hybrid PQC)",
        improvement: "+0.15ms (Negligible)"
      },
      {
        metric: "Client Mobile RAM Footprint",
        baseline: "1.2 MB",
        proposed: "2.1 MB",
        improvement: "Mobile Ready"
      }
    ],
    results: [
      "The hybrid post-quantum deployment passed rigorous compliance testing with zero disruption to active banking sessions.",
      "Handshake latency increased by a negligible 0.15ms, proving that post-quantum security can be achieved in high-performance enterprise applications today."
    ],
    date: "November 2025",
    readTime: "15 min read",
    tags: ["Post-Quantum", "Web Security", "API Design"]
  }
};

const ResearchDetailPage: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const paper = paperId ? researchPapersDetails[paperId] : null;

  if (!paper) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-black text-gray-900 dark:text-white font-sans transition-colors duration-300">
        <div className="py-32 text-center space-y-4">
          <h2 className="text-3xl font-normal text-gray-900 dark:text-white">Research Paper Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">The requested publication could not be located in our scientific repository.</p>
          <Link to="/research" className="text-blue-600 dark:text-blue-400 hover:underline inline-block pt-4">
            &larr; Back to Scientific Repository
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { chartConfig } = paper;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-sans transition-colors duration-300 antialiased">
      
      {/* Hero Header Section */}
      <section className="relative pt-24 pb-16 px-6 sm:px-12 max-w-5xl mx-auto text-center border-b border-gray-200 dark:border-white/10">
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-gray-900 dark:text-white leading-tight max-w-4xl mx-auto">
            {paper.title}
          </h1>

          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-normal">
            {paper.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {paper.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Article Body */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 space-y-16">
        
        {/* Abstract Box */}
        <section className="bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-white/15 rounded-2xl p-8 sm:p-10 space-y-3 shadow-sm">
          <h2 className="text-xs font-sans uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold">
            Abstract
          </h2>
          <p className="text-gray-900 dark:text-gray-100 text-base sm:text-lg leading-relaxed italic font-sans">
            "{paper.abstract}"
          </p>
        </section>

        {/* Introduction Section */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white tracking-tight border-b border-gray-200 dark:border-white/10 pb-4">
            1. Introduction & Problem Statement
          </h2>
          {paper.introduction.map((paragraph, index) => (
            <p key={index} className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Dynamic Interactive System Architecture Diagram Component */}
        <section className="space-y-6 border-t border-gray-200 dark:border-white/10 pt-12">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white tracking-tight">
              2. System Architecture & Node Topology
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-normal">
              {paper.systemArchitectureDescription}
            </p>
          </div>

          {/* Interactive Topology Graph Flowcard */}
          <div className="bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-gray-200 dark:border-white/10 pb-4">
              <span className="text-xs font-sans font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                FIG 1.0 &bull; {paper.diagramTitle}
              </span>
            </div>

            {/* Step-by-Step Connected Node Flowchart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              {paper.diagramNodes.map((node, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-black border border-gray-200 dark:border-white/15 hover:border-gray-400 dark:hover:border-white/30 rounded-xl p-5 space-y-3 transition-all duration-300 group shadow-sm relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-black text-white dark:bg-white dark:text-black font-sans text-xs font-semibold flex items-center justify-center">
                      {node.step}
                    </span>
                    {node.badge && (
                      <span className="text-[10px] font-sans font-medium bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-md">
                        {node.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {node.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {node.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Visual Connected Arrow Pipeline (SVG Flow Line) */}
            <div className="hidden sm:block pt-4 border-t border-gray-200 dark:border-white/10">
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 font-sans font-medium">
                <span>{paper.flowSummary}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Paper-Specific Chart Section */}
        <section className="space-y-6 border-t border-gray-200 dark:border-white/10 pt-12">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white tracking-tight">
              3. Empirical Performance Chart & Visual Analytics
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-normal">
              {chartConfig.subtitle}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4 flex-wrap gap-4">
              <span className="text-xs font-sans font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                {chartConfig.title}
              </span>
              <div className="flex items-center gap-4 text-xs font-sans">
                {chartConfig.legend.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-900 dark:text-white font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Render Line Chart vs Bar Chart */}
            <div className="w-full bg-white dark:bg-black border border-gray-200 dark:border-white/15 rounded-xl p-4 sm:p-6 space-y-4">
              {chartConfig.type === "line" ? (
                <div className="h-64 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                    {/* Grid Lines */}
                    <line x1="0" y1="40" x2="500" y2="40" className="stroke-gray-200 dark:stroke-white/10" strokeDasharray="4 4" />
                    <line x1="0" y1="90" x2="500" y2="90" className="stroke-gray-200 dark:stroke-white/10" strokeDasharray="4 4" />
                    <line x1="0" y1="140" x2="500" y2="140" className="stroke-gray-200 dark:stroke-white/10" strokeDasharray="4 4" />
                    
                    {/* Series Lines */}
                    {chartConfig.series.map((s, idx) => {
                      // Generate SVG path points
                      const stepX = 500 / (chartConfig.xLabels.length - 1);
                      const points = s.values.map((v, i) => `${i * stepX},${180 - (v * 1.5)}`).join(" L ");
                      return (
                        <g key={idx}>
                          <path
                            d={`M ${points}`}
                            fill="none"
                            stroke={s.color}
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          {s.values.map((v, i) => (
                            <g key={i}>
                              <circle cx={i * stepX} cy={180 - (v * 1.5)} r="4" fill={s.color} />
                              <text
                                x={i * stepX}
                                y={180 - (v * 1.5) - 10}
                                className="fill-gray-900 dark:fill-white"
                                fontSize="9"
                                fontWeight="bold"
                                textAnchor="middle"
                                fontFamily="sans-serif"
                              >
                                {s.displayValues[i]}
                              </text>
                            </g>
                          ))}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              ) : (
                /* Bar Chart Render */
                <div className="space-y-4 py-2">
                  {chartConfig.series.map((s, idx) => (
                    <div key={idx} className="space-y-3">
                      {chartConfig.xLabels.map((xLabel, xIdx) => {
                        const val = s.values[xIdx] || 0;
                        const disp = s.displayValues[xIdx] || "";
                        return (
                          <div key={xIdx} className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-900 dark:text-white font-sans font-medium">
                              <span>{xLabel}</span>
                              <span className="font-bold" style={{ color: s.color }}>{disp}</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-white/10 h-3 rounded-full overflow-hidden border border-gray-200 dark:border-white/10">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(val, 100)}%`, backgroundColor: s.color }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}

              {/* X-Axis Timeline Labels for Line Charts */}
              {chartConfig.type === "line" && (
                <div className="flex justify-between text-[11px] font-sans text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-white/10">
                  {chartConfig.xLabels.map((lbl, idx) => (
                    <span key={idx} className="font-medium text-gray-900 dark:text-white">{lbl}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Methodology & Algorithmic Formulation */}
        <section className="space-y-6 border-t border-gray-200 dark:border-white/10 pt-12">
          <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white tracking-tight border-b border-gray-200 dark:border-white/10 pb-4">
            4. Technical Methodology & Formulation
          </h2>
          {paper.methodology.map((paragraph, index) => (
            <p key={index} className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
              {paragraph}
            </p>
          ))}

          {/* Mathematical Formulation Display if present */}
          {paper.mathematicalFormulation && (
            <div className="bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-white/15 rounded-xl p-6 sm:p-8 space-y-4 font-sans text-sm">
              <h3 className="text-gray-900 dark:text-white font-sans text-lg font-semibold">
                {paper.mathematicalFormulation.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-sans text-xs sm:text-sm">
                {paper.mathematicalFormulation.explanation}
              </p>
              <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/15 rounded-lg p-4 space-y-2 text-gray-900 dark:text-white overflow-x-auto text-xs sm:text-sm font-semibold">
                {paper.mathematicalFormulation.equations.map((eq, i) => (
                  <div key={i} className="py-0.5 font-sans">
                    {eq}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Benchmark Results Table & Visual Bar Chart */}
        {paper.benchmarkData && (
          <section className="space-y-6 border-t border-gray-200 dark:border-white/10 pt-12">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white tracking-tight border-b border-gray-200 dark:border-white/10 pb-4">
              5. Experimental Performance & Benchmark Results
            </h2>

            {/* Detailed Table */}
            <div className="overflow-x-auto border border-gray-200 dark:border-white/15 rounded-xl bg-white dark:bg-black shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                <thead className="bg-gray-50 dark:bg-[#121214] text-gray-500 dark:text-gray-400 text-xs font-sans font-semibold uppercase border-b border-gray-200 dark:border-white/15">
                  <tr>
                    <th className="p-4">Performance Metric</th>
                    <th className="p-4">Baseline (Legacy)</th>
                    <th className="p-4">Proposed Model</th>
                    <th className="p-4 text-right">Delta / Improvement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10 font-sans">
                  {paper.benchmarkData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/60 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 font-sans font-medium text-gray-900 dark:text-white">{row.metric}</td>
                      <td className="p-4 text-gray-500 dark:text-gray-400">{row.baseline}</td>
                      <td className="p-4 text-gray-900 dark:text-white font-bold">{row.proposed}</td>
                      <td className="p-4 text-right text-emerald-600 dark:text-emerald-400 font-bold">{row.improvement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Runnable Code Snippet implementation if present */}
        {paper.codeSnippet && (
          <section className="space-y-6 border-t border-gray-200 dark:border-white/10 pt-12">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white tracking-tight border-b border-gray-200 dark:border-white/10 pb-4">
              6. Production Code Implementation
            </h2>
            <div className="bg-gray-900 dark:bg-[#161618] border border-gray-800 dark:border-gray-800 rounded-xl overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-5 py-3 bg-gray-950 dark:bg-white/5 border-b border-gray-800 text-xs font-mono text-gray-400">
                <span>{paper.codeSnippet.filename}</span>
                <span className="uppercase text-[10px] bg-gray-800 dark:bg-white/10 px-2 py-0.5 rounded text-gray-300">
                  {paper.codeSnippet.language}
                </span>
              </div>
              <pre className="p-6 text-xs sm:text-sm font-mono text-gray-200 overflow-x-auto leading-relaxed">
                <code>{paper.codeSnippet.code}</code>
              </pre>
            </div>
          </section>
        )}

        {/* Conclusion / Impact Results */}
        <section className="space-y-6 border-t border-gray-200 dark:border-white/10 pt-12">
          <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white tracking-tight border-b border-gray-200 dark:border-white/10 pb-4">
            7. Production Impact & Conclusion
          </h2>
          {paper.results.map((paragraph, index) => (
            <p key={index} className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Bottom Navigation */}
        <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
          <Link
            to="/research"
            className="text-xs font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>&larr; Back to Research Index</span>
          </Link>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Back to Top &uarr;
          </a>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default ResearchDetailPage;
export { researchPapersDetails };
export type { ResearchPaperDetail };
