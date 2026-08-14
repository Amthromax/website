import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../layout/SEO";

// Helper function to calculate SVG sector paths
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) {
  const startOuter = polarToCartesian(x, y, outerRadius, endAngle);
  const endOuter = polarToCartesian(x, y, outerRadius, startAngle);
  const startInner = polarToCartesian(x, y, innerRadius, endAngle);
  const endInner = polarToCartesian(x, y, innerRadius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", startOuter.x, startOuter.y,
    "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
    "L", endInner.x, endInner.y,
    "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
    "Z"
  ].join(" ");
}

// Generate scatter particles for the left chart
const scatterParticles = (() => {
  const columns = [18, 34, 50, 66, 82]; // Column X positions in %
  const particles: { x: number; y: number; r: number; color: string; opacity: number }[] = [];

  columns.forEach((colX, colIndex) => {
    for (let i = 0; i < 34; i++) {
      const offsetX = colX + Math.sin(i * 4 + colIndex) * 3.5;
      const y = 30 + ((i * 11 + colIndex * 23) % 320);
      const colors = ["#ffffff", "#ffffff", "#e5e7eb", "#9ca3af", "#6b7280", "#4b5563"];
      const color = colors[i % colors.length];
      const r = i % 4 === 0 ? 3.2 : i % 3 === 0 ? 2.5 : 2.0;
      particles.push({
        x: offsetX,
        y: y,
        r: r,
        color: color,
        opacity: color === "#ffffff" ? 0.95 : 0.75,
      });
    }
  });
  return particles;
})();

// Bar chart data for the right chart
const linearBarData = [
  { base: 1.9, top: 2.5 },
  { base: 1.4, top: 2.4 },
  { base: 1.0, top: 1.9 },
  { base: 0.7, top: 1.5 },
  { base: 0.3, top: 1.1 },
  { base: 0.6, top: 1.6 },
  { base: 1.2, top: 2.1 },
  { base: 1.7, top: 2.6 },
  { base: 2.3, top: 3.1 },
  { base: 2.7, top: 3.5 },
  { base: 3.1, top: 3.7 },
  { base: 3.2, top: 3.8 },
];

const SafetyArchitecturePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [activeWheelSlice, setActiveWheelSlice] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Exactly matching the user's reference diagram
  const wheelSectors = [
    {
      id: 0,
      label: "Happiness",
      score: 12,
      maxScore: 12,
      startAngle: 0,
      endAngle: 45,
      outerColor: "#3e3e44",
      innerColor: "#ece6e4",
      desc: "Optimal positive sentiment rating. Models produce uplifting, supportive, and constructively encouraging output.",
      details: [
        "Prosocial engagement score: 98.4%",
        "Toxicity suppression: 100%",
        "Empathy benchmarking: Peak alignment",
      ],
    },
    {
      id: 1,
      label: "Awe",
      score: 10,
      maxScore: 12,
      startAngle: 45,
      endAngle: 90,
      outerColor: "#484850",
      innerColor: "#e5ddf0",
      desc: "High creative wonder and intellectual depth without generating unverified or misleading claims.",
      details: [
        "Inspirational clarity index: 94.2%",
        "Hallucination threshold: <0.01%",
        "Scientific accuracy: Verified",
      ],
    },
    {
      id: 2,
      label: "Admiration",
      score: 5,
      maxScore: 12,
      startAngle: 90,
      endAngle: 135,
      outerColor: "#3e3e44",
      innerColor: "#dfd6eb",
      desc: "Balanced respect and neutrality when discussing human achievements, historical figures, and governance.",
      details: [
        "Neutrality index: 96.8%",
        "Biased praise mitigation: Active",
        "Fact-checking score: 99.1%",
      ],
    },
    {
      id: 3,
      label: "Surprise",
      score: 12,
      maxScore: 12,
      startAngle: 135,
      endAngle: 180,
      outerColor: "#484850",
      innerColor: "#e8dfee",
      desc: "Novel reasoning agility across multi-step problem solving bounded by constitutional safety rails.",
      details: [
        "Zero-shot problem solving: 97.5%",
        "Constraint adherence: 100%",
        "Out-of-distribution stability: High",
      ],
    },
    {
      id: 4,
      label: "Sadness",
      score: 6,
      maxScore: 12,
      startAngle: 180,
      endAngle: 225,
      outerColor: "#3e3e44",
      innerColor: "#dfdcde",
      desc: "Controlled emotional resonance for compassionate crisis response without encouraging self-harm or despair.",
      details: [
        "Crisis hotline redirection: 100% trigger rate",
        "Depressive tone dampening: Active",
        "Safety guardrail pass rate: 100%",
      ],
    },
    {
      id: 5,
      label: "Fear",
      score: 4,
      maxScore: 12,
      startAngle: 225,
      endAngle: 270,
      outerColor: "#484850",
      innerColor: "#ede8eb",
      desc: "Suppressed fear-mongering and panic induction during risk assessment or threat analysis tasks.",
      details: [
        "Disinformation dampening: 99.9%",
        "Alarmist language filter: Enforced",
        "Objective risk framing: Active",
      ],
    },
    {
      id: 6,
      label: "Anger",
      score: 2,
      maxScore: 12,
      startAngle: 270,
      endAngle: 315,
      outerColor: "#3e3e44",
      innerColor: "#f2ecee",
      desc: "Near-zero aggression score under extreme adversarial prompt injection, abusive inputs, and harassment.",
      details: [
        "Hostility suppression: 99.99%",
        "Adversarial red-team resilience: 100%",
        "De-escalation protocol: Active",
      ],
    },
    {
      id: 7,
      label: "Anticipation",
      score: 5,
      maxScore: 12,
      startAngle: 315,
      endAngle: 360,
      outerColor: "#484850",
      innerColor: "#eee7e6",
      desc: "Proactive user intent modeling and helpful task anticipation without invading data privacy.",
      details: [
        "Intent prediction accuracy: 92.4%",
        "Zero data retention compliance: Enforced",
        "Privacy boundary safety: 100%",
      ],
    },
  ];

  const protectionItems = [
    {
      id: 1,
      title: "Child safety",
      subtitle: "Preventing child exploitation & harm",
      description:
        "We build proactive detection models, robust content filters, and partner with national safety organizations to prevent child sexual abuse material (CSAM) and unsafe interactions.",
      icon: (
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Private information",
      subtitle: "Protecting personally identifiable data",
      description:
        "Our data scrubbing pipelines remove PII from training sets. Real-time inference filters block unauthorized access to private, financial, and medical records.",
      icon: (
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Deep fakes",
      subtitle: "Improving transparency in AI content",
      description:
        "We implement C2PA cryptographic provenance watermarks, synthetic media detection APIs, and strict verification protocols to prevent non-consensual impersonation.",
      icon: (
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Bias",
      subtitle: "Rigorously evaluating content to avoid reinforcing biases or stereotypes",
      description:
        "We benchmark model outputs against diverse global evaluation datasets, applying debiasing techniques and constitutional principles across all modalities.",
      icon: (
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 6l9-4 9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V6z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Elections",
      subtitle: "Partnering with governments to combat disinformation globally",
      description:
        "During democratic elections, we enforce heightened anti-disinformation guardrails, restrict political campaigning generation, and provide real-time threat intelligence.",
      icon: (
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black">
      <SEO
        title="Safety | Amthromax R&D Labs"
        description="Safety at every step: Explore Amthromax AI safety architecture, continuous red-teaming, constitutional alignment, and risk evaluation protocols."
      />

      {/* SECTION 1: Safety at Every Step */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-24 pb-20 text-center space-y-16">
        <div className="max-w-3xl mx-auto space-y-5">

          <h1 className="text-4xl sm:text-6xl font-normal text-white tracking-tight leading-[1.08]">
            Safety at every step
          </h1>
          <p className="text-base sm:text-lg text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto">
            We believe in AI's potential to make life better for everyone, which means making it safe for everyone
          </p>
        </div>

        {/* 3 Step Visual Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {/* Card 1: Teach */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-[#121215] border border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-2xl group cursor-pointer"
          >
            <span className="text-base font-bold text-white tracking-wide">Teach</span>

            {/* Inner Visual Box */}
            <div className="h-64 sm:h-72 rounded-2xl bg-[#1c1c20] relative overflow-hidden flex items-center justify-center p-6 border border-white/[0.05]">
              <div className="flex items-center gap-6 relative">
                {/* White Circle */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                />

                {/* Gray Circle with White Checkmark Badge */}
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#6b7280]/60" />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-[#383842] border border-white/20 flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-5 h-5 text-white stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Test */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-[#121215] border border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-2xl group cursor-pointer"
          >
            <span className="text-base font-bold text-white tracking-wide">Test</span>

            {/* Inner Visual Box */}
            <div className="h-64 sm:h-72 rounded-2xl bg-[#1c1c20] relative overflow-hidden flex items-center justify-center p-6 border border-white/[0.05]">
              <div className="w-full max-w-[210px] bg-[#2a2a30] rounded-xl p-4 space-y-2.5 relative shadow-xl border border-white/10">
                {/* White Checkmark Badge at top-left */}
                <div className="w-6 h-6 rounded-md bg-[#383842] border border-white/20 flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {/* Content Placeholders */}
                <div className="w-full h-2.5 bg-gray-400/30 rounded-full" />
                <div className="w-4/5 h-2.5 bg-gray-400/20 rounded-full" />
                <div className="w-2/3 h-2.5 bg-gray-400/20 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Share */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-[#121215] border border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-2xl group cursor-pointer"
          >
            <span className="text-base font-bold text-white tracking-wide">Share</span>

            {/* Inner Visual Box */}
            <div className="h-64 sm:h-72 rounded-2xl bg-[#1c1c20] relative overflow-hidden flex items-center justify-center p-6 border border-white/[0.05]">
              <div className="grid grid-cols-2 gap-4 relative">
                {[1, 2, 3, 4].map((user) => (
                  <div key={user} className="flex flex-col items-center space-y-1">
                    <div className="w-10 h-10 rounded-full bg-[#d1d5db]" />
                    <div className="w-12 h-5 rounded-t-full bg-[#9ca3af]/60" />
                  </div>
                ))}

                {/* White Checkmark Badge at bottom-right */}
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg bg-[#383842] border border-white/20 flex items-center justify-center shadow-lg">
                  <svg className="w-4.5 h-4.5 text-white stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Model Emotional & Behavioral Alignment Spectrum */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-white/10 space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">

          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight">
            Model Emotional & Behavioral Alignment Spectrum
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-normal leading-relaxed">
            Continuous empirical evaluation across 8 emotional dimensions to enforce prosocial bounds and suppress adversarial hostility.
          </p>
        </div>

        {/* Interactive Radial Wheel Diagram */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
          {/* SVG Wheel Graphic */}
          <div className="relative w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] flex items-center justify-center">
            <svg
              viewBox="0 0 540 540"
              className="w-full h-full drop-shadow-[0_0_50px_rgba(255,255,255,0.06)] select-none"
            >
              <g transform="translate(270, 270)">
                {wheelSectors.map((sector) => {
                  const startA = sector.startAngle + 1.5;
                  const endA = sector.endAngle - 1.5;
                  const isHovered = activeWheelSlice === sector.id;

                  // Base outer dark wedge (radius: 50 -> 240)
                  const outerPath = describeArc(0, 0, 50, 240, startA, endA);

                  // Inner expanding light petal based on score (1..12)
                  const innerRadius = 50 + (sector.score / sector.maxScore) * 185;
                  const innerPath = describeArc(0, 0, 48, innerRadius, startA + 1, endA - 1);

                  // Calculate mid angle for label placement
                  const midAngle = (sector.startAngle + sector.endAngle) / 2;

                  // Label positions
                  const labelRadiusWord = sector.score >= 8 ? 165 : 190;
                  const labelRadiusScore = sector.score >= 8 ? 130 : 140;

                  const textPosWord = polarToCartesian(0, 0, labelRadiusWord, midAngle);
                  const textPosScore = polarToCartesian(0, 0, labelRadiusScore, midAngle);

                  // Text color logic: dark text when on light petal, white text when on dark base
                  const textColorWord = sector.score >= 8 ? "#111113" : "#ffffff";
                  const textColorScore = sector.score >= 8 ? "#111113" : "#ffffff";

                  return (
                    <g
                      key={sector.id}
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setActiveWheelSlice(sector.id)}
                      onMouseLeave={() => setActiveWheelSlice(null)}
                    >
                      {/* Outer Base Dark Wedge */}
                      <path
                        d={outerPath}
                        fill={sector.outerColor}
                        stroke="#1a1a1e"
                        strokeWidth="3"
                        className={`transition-all duration-300 ${isHovered ? "brightness-125 stroke-white/50" : ""}`}
                      />

                      {/* Inner Light Petal */}
                      <path
                        d={innerPath}
                        fill={sector.innerColor}
                        opacity={isHovered ? 1 : 0.92}
                        className="transition-all duration-300"
                      />

                      {/* Label Word Text (e.g. Happiness, Anger, etc.) */}
                      <text
                        x={textPosWord.x}
                        y={textPosWord.y - 8}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={textColorWord}
                        fontSize="13"
                        fontWeight="700"
                        fontFamily="sans-serif"
                        className="pointer-events-none transition-colors duration-300"
                      >
                        {sector.label}
                      </text>

                      {/* Score Number Text (e.g. 12, 10, 5, 2) */}
                      <text
                        x={textPosScore.x}
                        y={textPosScore.y + 10}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={textColorScore}
                        fontSize="22"
                        fontWeight="900"
                        fontFamily="sans-serif"
                        className="pointer-events-none transition-colors duration-300"
                      >
                        {sector.score}
                      </text>
                    </g>
                  );
                })}

                {/* Central Star / Ring Cutout */}
                <circle r="48" fill="#000000" stroke="#1a1a1e" strokeWidth="4" />
                <circle r="16" fill="#121215" stroke="#2c2c32" strokeWidth="2" />
              </g>
            </svg>
          </div>

          {/* Interactive Dynamic Details Side Card */}
          <div className="w-full lg:w-96 bg-[#121215] border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
                SAFETY EVALUATION METRICS
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-200 text-xs font-medium">
                LIVE AUDIT
              </span>
            </div>

            {activeWheelSlice !== null ? (
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-3xl font-black text-white">
                    {wheelSectors[activeWheelSlice].label}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">
                      {wheelSectors[activeWheelSlice].score}
                    </span>
                    <span className="text-xs text-gray-400">/ 12</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  {wheelSectors[activeWheelSlice].desc}
                </p>

                {/* Empirical Metrics Checklist */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wider block font-semibold">
                    Empirical Benchmarks:
                  </span>
                  {wheelSectors[activeWheelSlice].details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-200 bg-[#1c1c22] p-3 rounded-xl border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Score Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs text-gray-400 font-medium">
                    <span>ALIGNMENT INTENSITY</span>
                    <span>{Math.round((wheelSectors[activeWheelSlice].score / 12) * 100)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#222228] rounded-full overflow-hidden p-0.5 border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(wheelSectors[activeWheelSlice].score / 12) * 100}%`,
                      }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Hover over or tap any slice of the alignment spectrum dial to view empirical score metrics, toxicity suppression rates, and behavioral safety details.
                </p>

                {/* Grid of all 8 sectors quick-select pills */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {wheelSectors.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      onMouseEnter={() => setActiveWheelSlice(sec.id)}
                      onClick={() => setActiveWheelSlice(sec.id)}
                      className="px-4 py-3 bg-[#1c1c22] hover:bg-white/15 border border-white/10 hover:border-white/30 text-left rounded-xl transition-all cursor-pointer flex items-center justify-between shadow-sm"
                    >
                      <span className="text-xs font-semibold text-gray-200">{sec.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* NEW SECTION: Best Practices for Designing Linear Dashboards (Matching User Image) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-white/10 space-y-16 text-center">
        {/* Header Breadcrumb & Title */}
        <div className="max-w-3xl mx-auto space-y-4">

          <h2 className="text-4xl sm:text-6xl font-normal text-white tracking-tight leading-[1.08]">
            Best practices for designing <br className="hidden sm:inline" />
            Linear Dashboards
          </h2>
        </div>

        {/* Dual Side-by-Side Dashboard Chart Containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pt-4 text-left">
          {/* Left Container: Particle Cluster Scatter Plot */}
          <div className="bg-[#000000] border border-white/10 rounded-2xl p-6 sm:p-7 relative aspect-[4/3] flex flex-col justify-between shadow-2xl overflow-hidden group">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Y-Axis Horizontal Dashed Gridlines & Labels */}
              {["4.0", "3.5", "3.0", "2.5", "2.0", "1.5", "1.0", "0.5", "0.0"].map((label, idx) => {
                const yPos = 20 + idx * 31;
                return (
                  <g key={label}>
                    <line
                      x1="15"
                      y1={yPos}
                      x2="350"
                      y2={yPos}
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeDasharray="2 3"
                    />
                    <text
                      x="385"
                      y={yPos + 3}
                      textAnchor="end"
                      fill="#6b7280"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {label}
                    </text>
                  </g>
                );
              })}

              {/* Particle Cluster Plot */}
              {scatterParticles.map((pt, idx) => (
                <circle
                  key={idx}
                  cx={`${pt.x}%`}
                  cy={pt.y * 0.82 + 15}
                  r={pt.r}
                  fill={pt.color}
                  opacity={pt.opacity}
                />
              ))}
            </svg>
          </div>

          {/* Right Container: Stacked Volatility Bar Chart */}
          <div className="bg-[#000000] border border-white/10 rounded-2xl p-6 sm:p-7 relative aspect-[4/3] flex flex-col justify-between shadow-2xl overflow-hidden group">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Y-Axis Horizontal Dashed Gridlines & Labels */}
              {["4.0", "3.5", "3.0", "2.5", "2.0", "1.5", "1.0", "0.5", "0.0"].map((label, idx) => {
                const yPos = 20 + idx * 31;
                return (
                  <g key={label}>
                    <line
                      x1="15"
                      y1={yPos}
                      x2="350"
                      y2={yPos}
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeDasharray="2 3"
                    />
                    <text
                      x="385"
                      y={yPos + 3}
                      textAnchor="end"
                      fill="#6b7280"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {label}
                    </text>
                  </g>
                );
              })}

              {/* 12 Vertical Bars */}
              {linearBarData.map((bar, idx) => {
                const xPos = 28 + idx * 27;
                // Convert values (0..4) to Y coordinates (268 -> 20)
                const baseH = (bar.base / 4.0) * 248;
                const topH = (bar.top / 4.0) * 248;
                const gap = 5;

                return (
                  <g key={idx}>
                    {/* Base Dark Gray Segment */}
                    <rect
                      x={xPos}
                      y={268 - baseH}
                      width="10"
                      height={baseH}
                      rx="1"
                      fill="#4b5563"
                    />

                    {/* Upper White Segment */}
                    <rect
                      x={xPos}
                      y={268 - topH}
                      width="10"
                      height={Math.max(4, topH - baseH - gap)}
                      rx="1"
                      fill="#ffffff"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Footer Metadata */}
        <div className="pt-2 text-center">
          <span className="text-xs text-gray-500 font-medium">
            Tim Qi · October 07, 2025
          </span>
        </div>
      </section>

      {/* SECTION 4: Protecting people where it matters most */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-white/10 space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight">
            Protecting people where it matters most
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-normal leading-relaxed">
            We work with industry leaders and policymakers to reduce harm and protect people across critical areas.
          </p>
        </div>

        {/* Grid of Protection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {protectionItems.slice(0, 3).map((item) => (
            <motion.div
              key={item.id}
              onClick={() => toggleCard(item.id)}
              whileHover={{ scale: 1.01 }}
              className="bg-[#0e0e11] border border-white/10 rounded-2xl p-7 sm:p-8 flex flex-col justify-between min-h-[220px] shadow-lg cursor-pointer hover:border-white/20 transition-all relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#1c1c20] flex items-center justify-center border border-white/10">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>

                {item.subtitle && (
                  <p className="text-xs text-gray-400 font-medium">{item.subtitle}</p>
                )}

                <AnimatePresence>
                  {expandedCard === item.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-gray-300 leading-relaxed pt-2 border-t border-white/10"
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4 flex justify-start">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-[#1c1c20] hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all"
                >
                  {expandedCard === item.id ? "−" : "+"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom 2 Wide Protection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {protectionItems.slice(3, 5).map((item) => (
            <motion.div
              key={item.id}
              onClick={() => toggleCard(item.id)}
              whileHover={{ scale: 1.01 }}
              className="bg-[#0e0e11] border border-white/10 rounded-2xl p-7 sm:p-8 flex flex-col justify-between min-h-[220px] shadow-lg cursor-pointer hover:border-white/20 transition-all relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#1c1c20] flex items-center justify-center border border-white/10">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>

                {item.subtitle && (
                  <p className="text-xs text-gray-400 font-medium">{item.subtitle}</p>
                )}

                <AnimatePresence>
                  {expandedCard === item.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-gray-300 leading-relaxed pt-2 border-t border-white/10"
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4 flex justify-start">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-[#1c1c20] hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all"
                >
                  {expandedCard === item.id ? "−" : "+"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 5: Go deeper on safety */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
        <div className="rounded-3xl bg-[#1c1c20] border border-white/10 p-12 sm:p-20 text-center space-y-8 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight">
            Go deeper on safety
          </h2>
          <div className="flex justify-center pt-2">
            <Link
              to="/research/publications"
              className="px-8 py-4 bg-[#2a2a30] hover:bg-[#383842] text-white font-semibold text-sm rounded-full transition-all border border-white/10 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Explore the deployment safety hub</span>
              <span className="text-xs">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SafetyArchitecturePage;
