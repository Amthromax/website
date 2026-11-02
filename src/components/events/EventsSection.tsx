import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ProductBullet {
  title: string;
  desc: string;
}

interface ProductIdeaItem {
  id: string;
  badge: string;
  title: string;
  specs: string;
  location: string;
  type: string;
  link: string;
  category: string;
  modalTitle: string;
  description: string;
  bullets: ProductBullet[];
  icon: string;
}

const productIdeasData: ProductIdeaItem[] = [
  {
    id: "idea-1",
    badge: "Product 01",
    title: "OrarQlow.Ai Swarm Orchestration Engine",
    specs: "v1.4 Core Architecture · Latency <15ms",
    location: "Amthromax Core Lab, San Francisco, CA",
    type: "Autonomous Agent System",
    link: "/products",
    category: "Autonomous Swarm Systems",
    modalTitle: "Orchestrating multi-agent intelligence at hyper-scale",
    description: "OrarQlow.Ai orchestrates autonomous agent swarms across distributed cloud infrastructure with sub-15ms execution latency and zero-trust memory state synchronization.",
    bullets: [
      { title: "Prevent", desc: "We are careful what memory states are shared across agent instances. We isolate and encrypt tenant memory contexts using zero-trust hardware enclaves." },
      { title: "Protect", desc: "We always stay vigilant and observant. We monitor execution pipelines for dynamic agent divergence and automatically terminate unauthorized sub-tasks." },
      { title: "Scale", desc: "Autonomous auto-scaling automatically provisions and balances up to 10,000 parallel execution threads without cold-start delays." }
    ],
    icon: "users"
  },
  {
    id: "idea-2",
    badge: "Product 02",
    title: "CodeHoomer.Ai High-Throughput Analytics",
    specs: "PostgreSQL & VectorDB Native · 100M+ Inferences",
    location: "Amthromax Data Systems, New York, NY",
    type: "Neural Data Grid",
    link: "/products",
    category: "Neural Data Analytics",
    modalTitle: "High-throughput neural data processing & vector telemetry",
    description: "Built natively on PostgreSQL & VectorDB clusters, CodeHoomer.Ai handles over 100M+ real-time inferences daily with sub-5ms semantic retrieval.",
    bullets: [
      { title: "Analyze", desc: "Stream telemetry logs, neural model embeddings, and runtime execution metrics in real-time." },
      { title: "Optimize", desc: "Automated vector index compaction reduces storage footprint by 60% while boosting query throughput." },
      { title: "Secure", desc: "Strict row-level security (RLS) and encrypted vector stores ensure complete customer data isolation." }
    ],
    icon: "chart"
  },
  {
    id: "idea-3",
    badge: "Product 03",
    title: "Helleious.Ai Zero-Code Workflow Triggers",
    specs: "Serverless Kubernetes · SOC2 Certified",
    location: "Amthromax Cloud, Austin, TX",
    type: "Event-Driven Automation",
    link: "/products",
    category: "Event-Driven Automation",
    modalTitle: "Event-driven workflow triggers with zero-code complexity",
    description: "Helleious.Ai allows engineering teams to deploy resilient event-driven AI workflows on serverless Kubernetes clusters backed by SOC2 Type II security.",
    bullets: [
      { title: "Trigger", desc: "Instantaneous execution on WebHooks, Kafka streams, and REST API events with guaranteed delivery." },
      { title: "Automate", desc: "Visual node graph editor with strict TypeScript payload validation and automated retry handlers." },
      { title: "Audit", desc: "Immutable cryptographic audit trails capture every state change, input payload, and output response." }
    ],
    icon: "zap"
  },
  {
    id: "idea-4",
    badge: "Product 04",
    title: "Open Rower Ai Deep Engine",
    specs: "Deep Reasoning Core · Extended Context Windows",
    location: "Amthromax Research Lab, San Francisco, CA",
    type: "Deep Reasoning System",
    link: "/products",
    category: "Deep Reasoning Systems",
    modalTitle: "Sustained multi-step reasoning over long-running context",
    description: "Open Rower Ai is the deep reasoning core behind Amthromax agents. It holds a problem open across many steps, revisits its own intermediate work, and keeps a traceable record of how an answer was reached.",
    bullets: [
      { title: "Reason", desc: "Multi-step chains are planned, executed and revised in place, so a later step can correct an earlier one instead of compounding the error." },
      { title: "Remember", desc: "Extended context windows carry the full working state of a task, letting long investigations continue without losing earlier findings." },
      { title: "Explain", desc: "Every conclusion keeps the reasoning trace that produced it, so the path from input to answer stays open to review." }
    ],
    icon: "mesh"
  },
  {
    id: "idea-5",
    badge: "Product 05",
    title: "Amthromax SDKs & Edge API Gateway",
    specs: "REST & WebSockets · OpenAPI 3.1",
    location: "Amthromax Developer Hub, Seattle, WA",
    type: "Developer Infrastructure",
    link: "/developers",
    category: "Developer Infrastructure",
    modalTitle: "High-speed edge routing & developer SDK ecosystem",
    description: "Amthromax Edge Gateway delivers global REST and WebSocket routing backed by official TypeScript, Python, and Go SDK client packages.",
    bullets: [
      { title: "Connect", desc: "Global edge points of presence route inference calls to nearest GPU clusters in under 10ms." },
      { title: "Develop", desc: "Typed SDK libraries feature automatic exponential backoff, WebSocket streaming, and connection pooling." },
      { title: "Govern", desc: "Fine-grained API key permission scopes, billing quotas, and rate limiting protect production systems." }
    ],
    icon: "code"
  },
  {
    id: "idea-6",
    badge: "Product 06",
    title: "Vector Context Mesh & Dynamic RAG",
    specs: "Sub-5ms Semantic Search · HNSW Indexing",
    location: "Amthromax AI Core, Palo Alto, CA",
    type: "Cognitive Vector Engine",
    link: "/products",
    category: "Cognitive Vector Engine",
    modalTitle: "Sub-5ms semantic vector retrieval & dynamic RAG mesh",
    description: "High-dimensional vector mesh architecture providing instant dynamic context retrieval and knowledge injection for enterprise LLMs.",
    bullets: [
      { title: "Retrieve", desc: "HNSW vector indexing provides 99.8% recall accuracy across multi-gigabyte document collections." },
      { title: "Inject", desc: "Context window optimization compresses raw documents into dense neural representations." },
      { title: "Sync", desc: "Real-time vector synchronization updates knowledge repositories without costly model fine-tuning." }
    ],
    icon: "mesh"
  }
];

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case "users":
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case "chart":
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case "zap":
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "shield":
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "code":
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case "mesh":
    default:
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
  }
};


/* Coverflow geometry, measured off the reference: the focused card is full
   size, its neighbours step down to 0.78 and 0.55, and the gap between card
   centres is 0.95 of a card width for the first step and 0.73 for each one
   after. Anything past the second neighbour is faded out rather than laid
   out, so the track never has to be wider than the section. */
const CARD_W = 300;

const WARM_MESH =
  "radial-gradient(80% 34% at 97% 71%, #ff99d4 0%, rgba(255,153,212,0) 58%)," +
  "radial-gradient(70% 29% at 4% 69%, #ff94a9 0%, rgba(255,148,169,0) 55%)," +
  "linear-gradient(180deg," +
  " rgba(244,240,236,0) 0%, rgba(244,240,236,0) 30.3%," +
  " #f5aea6 37.2%, #f88972 42.1%, #ff8d60 46.9%, #ffb478 52.4%," +
  " #ffb7c6 57.9%, #ff6986 63.4%, #ff6986 100%)";
const SCALE_BY_DISTANCE = [1, 0.78, 0.55];
const OPACITY_BY_DISTANCE = [1, 0.85, 0.45];

const offsetFor = (distance: number) => {
  const d = Math.abs(distance);
  if (d === 0) return 0;
  return Math.sign(distance) * CARD_W * (0.95 + 0.73 * (d - 1));
};

const atDistance = <T,>(table: T[], distance: number): T =>
  table[Math.min(Math.abs(distance), table.length - 1)];

const EventsSection: React.FC = () => {
  const [selectedIdea, setSelectedIdea] = useState<ProductIdeaItem | null>(null);
  const [active, setActive] = useState(Math.floor((productIdeasData.length - 1) / 2));
  const trackRef = useRef<HTMLDivElement>(null);

  const total = productIdeasData.length;
  const step = (delta: number) =>
    setActive((i) => Math.min(total - 1, Math.max(0, i + delta)));

  /* The modal is portalled to <body>: an ancestor of this section carries a
     transform, which would otherwise make `position: fixed` resolve against
     that ancestor instead of the viewport and push the dialog off-screen. */
  useEffect(() => {
    if (!selectedIdea) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIdea(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedIdea]);

  /* Arrow keys move along the rail when it has focus, and a swipe does the
     same on touch, since the cards no longer scroll natively. */
  const onTrackKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  };

  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <section className="py-20 bg-[#f5f5f7] dark:bg-[#000000] transition-colors duration-300 antialiased overflow-hidden relative">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
        {/* Section Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1d1d1f] dark:text-white">
            Explore Amthromax Product Ideas
          </h2>
        </div>

        {/* Coverflow rail: cards sit absolutely around the focused one */}
        <div
          ref={trackRef}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Product ideas"
          onKeyDown={onTrackKey}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative h-[320px] -mx-6 sm:-mx-10 lg:-mx-12 overflow-hidden focus:outline-none"
        >
          {productIdeasData.map((idea, i) => {
            const distance = i - active;
            const isActive = distance === 0;
            const hidden = Math.abs(distance) > 2;

            return (
            <motion.button
              key={idea.id}
              type="button"
              onClick={() => (isActive ? setSelectedIdea(idea) : setActive(i))}
              aria-label={
                isActive ? `View details for ${idea.title}` : `Bring ${idea.title} into focus`
              }
              aria-hidden={hidden}
              tabIndex={hidden ? -1 : 0}
              animate={{
                x: offsetFor(distance),
                scale: atDistance(SCALE_BY_DISTANCE, distance),
                opacity: hidden ? 0 : atDistance(OPACITY_BY_DISTANCE, distance),
              }}
              transition={{ type: "spring", stiffness: 210, damping: 28, mass: 0.9 }}
              style={{
                width: CARD_W,
                zIndex: total - Math.abs(distance),
                pointerEvents: hidden ? "none" : "auto",
              }}
              className={`absolute left-1/2 top-1/2 -ml-[150px] -mt-[135px] overflow-hidden transition-shadow duration-[450ms] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d1d1f] dark:focus-visible:ring-white focus-visible:ring-offset-2 bg-white dark:bg-[#161617] rounded-2xl border border-[#e5e5e7]/80 dark:border-white/[0.08] p-6 flex flex-col justify-between min-h-[270px] cursor-pointer group ${
                isActive
                  ? "shadow-none hover:shadow-[0_26px_64px_-18px_rgba(214,95,110,0.42)] hover:border-transparent"
                  : "shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_52px_-18px_rgba(214,95,110,0.36)] hover:border-transparent"
              }`}
            >
              {/* The warm paper ground, which simply fades. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-2xl bg-[#f4f0ec] opacity-0 transition-opacity duration-[500ms] ease-out group-hover:opacity-100 group-hover:duration-[780ms]"
              />

              {/* The colour itself, rising from below. Slower and sharply
                  eased on the way up, quicker and more even on the way down. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-px -top-px h-[145%] translate-y-[28%] opacity-0 transition-[opacity,translate] duration-[500ms] ease-[cubic-bezier(0.45,0,0.55,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:duration-[780ms] group-hover:ease-[cubic-bezier(0.16,0.84,0.44,1)]"
                style={{ backgroundImage: WARM_MESH }}
              />

              {/* Rim light and inner shadow, so the slab reads as lit from
                  within rather than merely filled. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-[550ms] ease-out group-hover:opacity-100 shadow-[inset_0_-30px_60px_-34px_rgba(190,70,90,0.45)]"
              />

              {/* Mark and product number */}
              <div className="relative z-[1] flex items-start justify-between">
                <span className="text-[#1d1d1f] dark:text-white transition-colors duration-[450ms] group-hover:text-[#2b1410] dark:group-hover:text-[#2b1410] [&_svg]:w-7 [&_svg]:h-7">
                  {renderIcon(idea.icon)}
                </span>
                <span className="font-mono text-[10px] tracking-wide text-[#a3a3a8] dark:text-gray-500 transition-colors duration-[450ms] group-hover:text-[#8a6057] dark:group-hover:text-[#8a6057]">
                  {idea.badge}
                </span>
              </div>

              {/* Title and specification lines */}
              <div className="relative z-[1] space-y-3">
                <h3 className="text-[19px] sm:text-[21px] font-medium tracking-tight text-[#1d1d1f] dark:text-white leading-[1.2] transition-colors duration-[450ms] group-hover:text-[#2b1410] dark:group-hover:text-[#2b1410]">
                  {idea.title}
                </h3>

                <p className="font-mono text-[11px] leading-[1.6] text-[#86868b] transition-colors duration-[450ms] group-hover:text-[#6b4a42] dark:text-gray-400 dark:group-hover:text-[#6b4a42]">
                  {idea.specs} &middot; {idea.location}
                </p>
              </div>

              {/* Capability tag */}
              <div className="relative z-[1]">
                <span className="inline-block rounded-full border border-[#1d1d1f]/25 px-3.5 py-1.5 font-mono text-[11px] text-[#1d1d1f] transition-colors duration-[450ms] group-hover:border-[#2b1410]/45 group-hover:text-[#2b1410] dark:border-white/25 dark:text-white dark:group-hover:border-[#2b1410]/45 dark:group-hover:text-[#2b1410]">
                  {idea.type}
                </span>
              </div>
            </motion.button>
            );
          })}
        </div>

        {/* Carousel Footer Navigation Bar */}
        <div className="flex items-center justify-between pt-2">
          {/* Left Action Button */}
          <Link
            to="/products"
            className="px-6 py-2.5 bg-[#1d1d1f] hover:bg-[#333336] dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white rounded-full text-xs font-medium transition-all duration-200 shadow-xs inline-block"
          >
            View all product ideas
          </Link>

          {/* Right Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={active === 0}
              aria-label="Previous product idea"
              className="w-9 h-9 rounded-full bg-[#e8e8ed]/80 hover:bg-[#e8e8ed] dark:bg-white/10 dark:hover:bg-white/20 text-[#1d1d1f] dark:text-white flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-35 disabled:cursor-default"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              className="h-1 w-24 sm:w-32 rounded-full bg-[#d8d8dd] dark:bg-white/15 overflow-hidden"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={active + 1}
            >
              <motion.span
                className="block h-full rounded-full bg-[#1d1d1f] dark:bg-white"
                animate={{ width: `${((active + 1) / total) * 100}%` }}
                transition={{ type: "spring", stiffness: 210, damping: 28 }}
              />
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              disabled={active === total - 1}
              aria-label="Next product idea"
              className="w-9 h-9 rounded-full bg-[#e8e8ed]/80 hover:bg-[#e8e8ed] dark:bg-white/10 dark:hover:bg-white/20 text-[#1d1d1f] dark:text-white flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-35 disabled:cursor-default"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Dark Detail Modal matching Image 1 */}
      {createPortal(
        <AnimatePresence>
          {selectedIdea && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6 sm:p-10 text-white overflow-y-auto"
            onClick={() => setSelectedIdea(null)}
          >
            {/* Top Right Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdea(null);
              }}
              className="fixed top-6 right-6 sm:top-10 sm:right-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-medium transition-all cursor-pointer z-50"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full my-auto py-8 space-y-6 text-left relative"
            >
              {/* Category Icon */}
              <div className="mb-2 text-white/90">
                {renderIcon(selectedIdea.icon)}
              </div>

              {/* Subtitle / Category Label */}
              <span className="text-xs font-medium text-white/60 uppercase tracking-widest block">
                {selectedIdea.category}
              </span>

              {/* Headline / Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-snug">
                {selectedIdea.modalTitle}
              </h2>

              {/* Main Description */}
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                {selectedIdea.description}
              </p>

              {/* Bulleted Highlights */}
              <ul className="space-y-4 pt-2 text-sm sm:text-base text-white/90">
                {selectedIdea.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-white/60 text-lg leading-none mt-0.5">•</span>
                    <div className="leading-relaxed">
                      <span className="font-medium italic text-white mr-1.5">{bullet.title}:</span>
                      <span className="text-white/80">{bullet.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
};

export default EventsSection;
