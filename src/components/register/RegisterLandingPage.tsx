import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../layout/SEO";
import { useAuth } from "../../context/AuthContext";





const FAQS = [
  {
    question: "What is included in the Amthromax Product Announcement?",
    answer: "The product announcement introduces Amthromax's next-generation autonomous AI architecture, including CodeHoomer AI runtime, Helleious multi-agent orchestration, enterprise reasoning guardrails, and instant model deployment capabilities.",
  },
  {
    question: "How do I get early access to the Amthromax platform?",
    answer: "Complete the registration form above to reserve your early access slot. Priority access is granted to verified enterprise organizations and developer teams on a rolling basis.",
  },
  {
    question: "Will full API access and documentation be provided upon launch?",
    answer: "Yes, all registered accounts receive full SDK access, comprehensive REST & GraphQL API documentation, pre-built agent templates, and direct sandbox testing environments.",
  },
  {
    question: "Can our engineering team deploy Amthromax on-premise or in VPC?",
    answer: "Absolutely. Amthromax supports cloud-native SaaS deployment as well as self-hosted VPC, AWS PrivateLink, and air-gapped enterprise environments with full SOC 2 compliance.",
  },
  {
    question: "What tier plans and developer grants are available?",
    answer: "Amthromax offers a free Developer tier with monthly credits, as well as Enterprise Pro and Custom Dedicated Swarm tiers tailored for scalable production workloads.",
  },
];



const RegisterLandingPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  const storedUserEmail = user?.email || (typeof window !== "undefined" ? localStorage.getItem("amthromax-user") : null);
  const storedProfile = typeof window !== "undefined" ? localStorage.getItem("amthromax-profile") : null;
  const fullName = user?.user_metadata?.full_name || (storedProfile ? JSON.parse(storedProfile)?.full_name : null) || storedUserEmail?.split("@")[0] || "User";
  const userInitial = fullName.trim().charAt(0).toUpperCase();
  const isLoggedIn = Boolean(isAuthenticated || storedUserEmail);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeBenefitIndex, setActiveBenefitIndex] = useState<number>(1);

  // Showcase Widget Tab & Category State
  const [activeHeaderTab, setActiveHeaderTab] = useState<string>("helleious");
  const [activeCategoryPill, setActiveCategoryPill] = useState<string>("Multi-Agent Swarm");
  const [activeCodeHoomerTab, setActiveCodeHoomerTab] = useState<string>("codehoomer.config.ts");
  const [isBuilding, setIsBuilding] = useState<boolean>(false);
  const [customLogs, setCustomLogs] = useState<string[]>([]);
  const [isExecutingCode, setIsExecutingCode] = useState<boolean>(false);

  // AMX API Interactive Controls State
  const [selectedLanguage, setSelectedLanguage] = useState<string>("TypeScript");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [hasRunAudio, setHasRunAudio] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#1A1815] font-sans antialiased selection:bg-[#1A1815] selection:text-white scroll-smooth">
      <SEO
        title="Register — Early Access & Product Announcement | Amthromax"
        description="Book a free consultation call with Amthromax. Discover how our autonomous AI agents and enterprise reasoning systems accelerate your business."
      />

      {/* SVG Grain Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="claura-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Header Navigation - Exact Claura Style */}
      <header className="sticky top-0 z-50 bg-[#F7F4ED]/90 backdrop-blur-md border-b border-[#E8E4DB] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-6 text-base font-bold text-[#1A1815]">
              <Link to="/about" className="hover:text-black transition-colors">About</Link>
              <Link to="/research" className="hover:text-black transition-colors">Case Studies</Link>
              <Link to="/news" className="hover:text-black transition-colors">News</Link>
            </nav>
          </div>

          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl sm:text-3xl font-serif tracking-tight text-[#1A1815] font-bold">
              Amthromax
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Right Announcement Button */}
            <a
              href="#showcase"
              className="hidden sm:flex items-center gap-2 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold text-sm sm:text-base px-5 py-2 rounded-full shadow-xs transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
              <span>Announcement</span>
            </a>

            {isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center gap-2.5 bg-[#1A1815] hover:bg-[#332E29] text-white px-4 py-2 rounded-full transition-all shadow-sm group"
                title={`Logged in as ${fullName}`}
              >
                <div className="w-7 h-7 rounded-full bg-[#F97316] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {userInitial}
                </div>
                <span className="text-xs sm:text-sm font-bold text-white pr-1">{fullName}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-[#1A1815] hover:bg-[#332E29] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-sm"
              >
                Sign up
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section - Exact Claura Color Palette & Visuals */}
      <section id="hero" className="relative flex flex-col items-center justify-center overflow-hidden pt-14 pb-20 px-4 sm:px-6 md:px-8 bg-[#F7F4ED]">
        {/* Hero Content Container */}
        <div className="relative z-10 max-w-6xl md:max-w-7xl mx-auto text-center flex flex-col items-center w-full">
          {/* Main Display Headline (Bold Elegant Serif) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#1A1815] tracking-tight leading-[1.12] mb-6 max-w-4xl font-semibold"
          >
            From raw complexity to autonomous clarity.
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-[#1A1815] max-w-3xl leading-relaxed mb-9 font-semibold"
          >
            We transform enterprise workflows into high-speed autonomous AI systems—delivering zero-latency inference, auditable reasoning, and effortless operational scale.
          </motion.p>

          {/* Dual Pill CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3.5 mb-14"
          >
            <a
              href="#showcase"
              className="bg-[#1A1815] hover:bg-[#332E29] text-white font-bold text-sm px-8 py-4 rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer transform hover:scale-105 active:scale-95 border border-black"
            >
              <span>AMX Console</span>
            </a>

            <a
              href="/docs"
              className="bg-[#EFECE6] hover:bg-[#E4E0D7] text-[#1A1815] font-bold text-sm px-7 py-4 rounded-full transition-all flex items-center gap-2.5 cursor-pointer transform hover:scale-105 active:scale-95 shadow-sm border border-[#D8D3C8]"
            >
              <span>View Platform Specs</span>
            </a>
          </motion.div>

          {/* ElevenLabs-Style Interactive AI Capabilities Showcase Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-6xl md:max-w-7xl mx-auto rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative p-4 sm:p-6 md:p-8 mb-8 bg-[#F2F1ED] flex flex-col justify-between items-center"
          >
            {/* Top Segmented Header Tabs */}
            <div className="flex items-center justify-between w-full max-w-xl mx-auto bg-[#E6E4DD]/90 p-1 sm:p-1.5 rounded-full border border-white/60 shadow-inner mb-4 sm:mb-6 overflow-x-auto no-scrollbar gap-1">
              <button
                type="button"
                onClick={() => {
                  setActiveHeaderTab("helleious");
                  setActiveCategoryPill("Multi-Agent Swarm");
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-full text-xs sm:text-base font-bold transition-all duration-300 shrink-0 ${
                  activeHeaderTab === "helleious"
                    ? "bg-white text-[#1A1815] shadow-md border border-black/5"
                    : "text-[#2D2926] hover:text-black"
                }`}
              >
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#1A1815]" />
                <span className="whitespace-nowrap">Helleious.AI</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveHeaderTab("codehoomer");
                  setActiveCategoryPill("Autonomous Agent");
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-full text-xs sm:text-base font-bold transition-all duration-300 shrink-0 ${
                  activeHeaderTab === "codehoomer"
                    ? "bg-white text-[#1A1815] shadow-md border border-black/5"
                    : "text-[#2D2926] hover:text-black"
                }`}
              >
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#1A1815]" />
                <span className="whitespace-nowrap">CodeHoomer.AI</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveHeaderTab("amxapi");
                  setActiveCategoryPill("JS / TS SDK");
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-full text-xs sm:text-base font-bold transition-all duration-300 shrink-0 ${
                  activeHeaderTab === "amxapi"
                    ? "bg-white text-[#1A1815] shadow-md border border-black/5"
                    : "text-[#2D2926] hover:text-black"
                }`}
              >
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#1A1815]" />
                <span className="whitespace-nowrap">AMX Api</span>
              </button>
            </div>

            {/* Center Showcase Visual Area (Switches based on activeHeaderTab) */}
            {activeHeaderTab === "amxapi" ? (
              <div className="w-full max-w-4xl sm:max-w-5xl mx-auto my-auto py-4 sm:py-6">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full rounded-[24px] sm:rounded-[32px] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.04)] p-6 sm:p-8 text-[#1A1815] font-mono text-sm sm:text-base select-text flex flex-col justify-between text-left items-start"
                >
                  {/* Code Block Content */}
                  <div className="w-full text-left font-mono text-sm sm:text-base font-medium space-y-3 overflow-x-auto leading-relaxed">
                    {selectedLanguage === "Python" ? (
                      <div className="text-left space-y-2 font-mono text-sm sm:text-base font-medium">
                        <div>
                          <span className="text-[#DC2626] font-semibold">from </span>
                          <span className="text-[#2563EB]">amthromax </span>
                          <span className="text-[#DC2626] font-semibold">import </span>
                          <span className="text-[#2563EB] font-bold">AmthromaxClient</span>
                        </div>
                        <div className="h-1" />
                        <div>
                          <span className="text-[#2563EB] font-bold">client </span>
                          <span className="text-[#1A1815]">= </span>
                          <span className="text-[#2563EB] font-bold">AmthromaxClient</span>
                          <span className="text-[#1A1815]">(api_key=</span>
                          <span className="text-[#DC2626] font-semibold">"amx_live_9983x"</span>
                          <span className="text-[#1A1815]">)</span>
                        </div>
                        <div className="h-1" />
                        <div>
                          <span className="text-[#2563EB] font-bold">audio_bytes </span>
                          <span className="text-[#1A1815]">= </span>
                          <span className="text-[#DC2626] font-semibold">await </span>
                          <span className="text-[#2563EB] font-bold">client.text_to_speech.convert</span>
                          <span className="text-[#1A1815]">(</span>
                        </div>
                        <div className="pl-6 space-y-1.5">
                          <div>
                            <span className="text-[#2563EB]">voice_id</span>
                            <span className="text-[#1A1815]">=</span>
                            <span className="text-[#DC2626] font-semibold">"NOpB1nGIn09m6vDvFkFC"</span>
                            <span className="text-[#1A1815]">,</span>
                          </div>
                          <div>
                            <span className="text-[#2563EB]">text</span>
                            <span className="text-[#1A1815]">=</span>
                            <span className="text-[#DC2626] font-semibold">"In the ancient land of Eldoria, where skies shimmered and fores"</span>
                            <span className="text-[#1A1815]">,</span>
                          </div>
                          <div>
                            <span className="text-[#2563EB]">model_id</span>
                            <span className="text-[#1A1815]">=</span>
                            <span className="text-[#DC2626] font-semibold">"amx_v3"</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-[#1A1815]">)</span>
                        </div>
                      </div>
                    ) : selectedLanguage === "cURL" ? (
                      <div className="text-left space-y-2 font-mono text-sm sm:text-base font-medium">
                        <div>
                          <span className="text-[#DC2626] font-bold">curl </span>
                          <span className="text-[#1A1815] font-semibold">-X POST </span>
                          <span className="text-[#DC2626] font-semibold">"https://api.amthromax.ai/v1/text-to-speech/NOpB1nGIn09m6vDvFkFC"</span>
                          <span className="text-[#1A1815]"> \</span>
                        </div>
                        <div className="pl-4">
                          <span className="text-[#1A1815] font-semibold">-H </span>
                          <span className="text-[#DC2626] font-semibold">"Authorization: Bearer amx_live_9983x"</span>
                          <span className="text-[#1A1815]"> \</span>
                        </div>
                        <div className="pl-4">
                          <span className="text-[#1A1815] font-semibold">-H </span>
                          <span className="text-[#DC2626] font-semibold">"Content-Type: application/json"</span>
                          <span className="text-[#1A1815]"> \</span>
                        </div>
                        <div className="pl-4">
                          <span className="text-[#1A1815] font-semibold">-d </span>
                          <span className="text-[#DC2626] font-semibold">{`'{ "text": "In the ancient land of Eldoria...", "model_id": "amx_v3" }'`}</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Import Line */}
                        <div className="text-left">
                          <span className="text-[#DC2626] font-bold">import </span>
                          <span className="text-[#1A1815]">{`{ `}</span>
                          <span className="text-[#2563EB] font-bold">AmthromaxClient</span>
                          <span className="text-[#1A1815]">{` }`}</span>
                          <span className="text-[#DC2626] font-bold"> from </span>
                          <span className="text-[#DC2626] font-bold">"@amthromax/amx-js"</span>
                          <span className="text-[#1A1815]">;</span>
                        </div>

                        <div className="h-1.5" />

                        {/* Instantiation Line */}
                        <div className="text-left">
                          <span className="text-[#DC2626] font-bold">const </span>
                          <span className="text-[#2563EB] font-bold">amthromax </span>
                          <span className="text-[#1A1815]">= </span>
                          <span className="text-[#DC2626] font-bold">new </span>
                          <span className="text-[#2563EB] font-bold">AmthromaxClient</span>
                          <span className="text-[#1A1815]">();</span>
                        </div>

                        {/* Method Execution Line */}
                        <div className="text-left">
                          <span className="text-[#DC2626] font-bold">const </span>
                          <span className="text-[#2563EB] font-bold">audio </span>
                          <span className="text-[#1A1815]">= </span>
                          <span className="text-[#DC2626] font-bold">await </span>
                          <span className="text-[#2563EB] font-bold">amthromax</span>
                        </div>

                        {/* Method Details */}
                        <div className="pl-6 space-y-2.5 text-left">
                          <div className="flex items-center flex-wrap gap-1.5 text-left">
                            <span className="text-[#1A1815] font-semibold">.textToSpeech.convert(</span>
                            <span className="inline-flex items-center gap-1.5 bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] px-3 py-1 rounded-md font-sans text-xs sm:text-sm font-bold shadow-2xs">
                              <span>NOpB1nGIn09m6vDvFkFC</span>
                              <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                              </svg>
                            </span>
                            <span className="text-[#1A1815] font-semibold">", {"{"}</span>
                          </div>

                          <div className="pl-6 flex items-center flex-wrap gap-1.5 text-left">
                            <span className="text-[#2563EB] font-bold">text</span>
                            <span className="text-[#1A1815] font-semibold">: "</span>
                            <span className="inline-flex items-center bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] px-3 py-1 rounded-md font-sans text-xs sm:text-sm font-medium shadow-2xs">
                              In the ancient land of Eldoria, where skies shimmered and fores
                            </span>
                            <span className="text-[#1A1815] font-semibold">",</span>
                          </div>

                          <div className="pl-6 flex items-center gap-1.5 text-left">
                            <span className="text-[#2563EB] font-bold">modelId</span>
                            <span className="text-[#1A1815] font-semibold">: "</span>
                            <span className="text-[#DC2626] font-bold">amx_v3</span>
                            <span className="text-[#1A1815] font-semibold">",</span>
                          </div>

                          <div className="pl-6 flex items-center gap-1.5 text-left">
                            <span className="text-[#2563EB] font-bold">languageCode</span>
                            <span className="text-[#1A1815] font-semibold">: "</span>
                            <span className="inline-flex items-center gap-1.5 bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] px-2.5 py-1 rounded-md font-sans text-xs sm:text-sm font-bold shadow-2xs">
                              <span>en</span>
                              <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                              </svg>
                            </span>
                            <span className="text-[#1A1815] font-semibold">",</span>
                          </div>

                          <div className="text-left">
                            <span className="text-[#1A1815] font-bold">{"});"}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Audio Player Execution Output Banner */}
                  {hasRunAudio && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full mt-5 p-3.5 bg-[#1A1815] text-white rounded-xl flex items-center justify-between gap-3 text-sm font-sans shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          ▶
                        </span>
                        <div>
                          <div className="font-bold text-white text-sm">Synthesized Audio Stream Ready</div>
                          <div className="text-xs text-[#C4BEB4]">amx_v3_neural_en.mp3 • 0.28s latency</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 h-4">
                        <span className="w-1 h-3.5 bg-[#F97316] rounded-full animate-bounce" />
                        <span className="w-1 h-4.5 bg-[#F97316] rounded-full animate-bounce delay-75" />
                        <span className="w-1 h-2.5 bg-[#F97316] rounded-full animate-bounce delay-150" />
                        <span className="w-1 h-4.5 bg-[#F97316] rounded-full animate-bounce delay-100" />
                      </div>
                    </motion.div>
                  )}

                  {/* Bottom Controls Bar */}
                  <div className="w-full mt-6 pt-4 border-t border-[#F0EEE6] flex items-center justify-between font-sans relative">
                    <div className="flex items-center gap-4">
                      {/* Copy Code Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const textToCopy = selectedLanguage === "Python"
                            ? `from amthromax import AmthromaxClient\nclient = AmthromaxClient(api_key="amx_live_9983x")\naudio_bytes = await client.text_to_speech.convert(voice_id="NOpB1nGIn09m6vDvFkFC", text="In the ancient land of Eldoria, where skies shimmered and fores", model_id="amx_v3", language_code="en")`
                            : selectedLanguage === "cURL"
                            ? `curl -X POST "https://api.amthromax.ai/v1/text-to-speech/NOpB1nGIn09m6vDvFkFC" -H "Authorization: Bearer amx_live_9983x" -d '{"text": "In the ancient land of Eldoria, where skies shimmered and fores", "model_id": "amx_v3", "language_code": "en"}'`
                            : `import { AmthromaxClient } from "@amthromax/amx-js";\n\nconst amthromax = new AmthromaxClient();\nconst audio = await amthromax.textToSpeech.convert("NOpB1nGIn09m6vDvFkFC", {\n  text: "In the ancient land of Eldoria, where skies shimmered and fores",\n  modelId: "amx_v3",\n  languageCode: "en",\n});`;
                          navigator.clipboard.writeText(textToCopy);
                          setIsCopied(true);
                          setTimeout(() => setIsCopied(false), 2000);
                        }}
                        className="p-2 rounded-lg text-[#1A1815] hover:text-black hover:bg-[#F4F2EB] transition-colors cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm font-semibold"
                        title="Copy code"
                      >
                        {isCopied ? (
                          <span className="text-[#10B981] font-bold text-xs sm:text-sm flex items-center gap-1">
                            <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Copied!</span>
                          </span>
                        ) : (
                          <svg className="w-4.5 h-4.5 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>

                      {/* Interactive Language Selector Dropdown */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1A1815] hover:text-black py-1.5 px-3 rounded-lg hover:bg-[#F4F2EB] transition-colors cursor-pointer"
                        >
                          <span>{selectedLanguage}</span>
                          <svg className={`w-4 h-4 stroke-current transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {isLangDropdownOpen && (
                          <div className="absolute bottom-full mb-2 left-0 bg-white border border-black/[0.08] rounded-xl shadow-lg py-1.5 w-40 z-30 font-sans">
                            {["TypeScript", "Python", "cURL", "Node.js"].map((lang) => (
                              <button
                                key={lang}
                                type="button"
                                onClick={() => {
                                  setSelectedLanguage(lang);
                                  setIsLangDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-[#F7F6F2] cursor-pointer transition-colors ${
                                  selectedLanguage === lang ? "font-bold text-[#1A1815] bg-[#F7F6F2]" : "text-[#2D2926] font-semibold"
                                }`}
                              >
                                <span>{lang}</span>
                                {selectedLanguage === lang && <span className="text-[#10B981] font-bold text-xs sm:text-sm">✓</span>}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <motion.button
                      type="button"
                      onClick={() => {
                        setIsExecutingCode(true);
                        setTimeout(() => {
                          setIsExecutingCode(false);
                          setHasRunAudio(true);
                        }, 1000);
                      }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="bg-[#1A1815] text-white hover:bg-black px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center min-w-[95px]"
                    >
                      {isExecutingCode ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Running...</span>
                        </span>
                      ) : (
                        "Run code"
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            ) : activeHeaderTab === "codehoomer" ? (
              /* CodeHoomer.AI Autonomous Software Engineering Studio Box */
              <div className="w-full max-w-5xl sm:max-w-6xl mx-auto my-auto py-4 sm:py-6">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full rounded-[24px] sm:rounded-[32px] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col"
                >
                  {/* Top IDE Header / File Tabs Bar */}
                  <div className="w-full bg-[#F7F6F2] border-b border-black/[0.06] px-4 py-3 flex items-center justify-between gap-4">
                    {/* Left Side: Window Controls & Active File Tabs */}
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar min-w-0">
                      {/* Window Controls - Red, Yellow, Green Dots */}
                      <div className="flex items-center gap-1.5 shrink-0 pl-1 pr-3 border-r border-black/[0.06]">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block shrink-0" />
                        <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block shrink-0" />
                        <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block shrink-0" />
                      </div>

                      {/* Dynamic Interactive File Tabs */}
                      {[
                        { id: "codehoomer.config.ts", label: "codehoomer.config.ts" },
                        { id: "agent.runner.ts", label: "agent.runner.ts" },
                        { id: "schema.prisma", label: "schema.prisma" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveCodeHoomerTab(tab.id)}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-sans font-inter font-bold transition-all shrink-0 cursor-pointer ${
                            activeCodeHoomerTab === tab.id
                              ? "bg-white text-[#1A1815] shadow-xs border border-black/[0.08] font-bold"
                              : "text-[#2D2926] hover:text-black hover:bg-[#EFECE6]"
                          }`}
                        >
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Right Side: Agent Status Badge */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="inline-flex items-center gap-2 text-[#1A1815] text-xs sm:text-sm font-sans font-inter font-bold">
                        <span>CodeHoomer Agent v4 Active</span>
                      </span>
                    </div>
                  </div>

                  {/* Main IDE Workspace: Split 2 Columns */}
                  <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#F0EEE6] min-h-[320px]">
                    {/* Left Column: Interactive Code Editor */}
                    <div className="w-full md:w-7/12 p-6 sm:p-8 bg-white font-mono text-sm sm:text-base text-[#1A1815] font-medium leading-relaxed select-text flex flex-col justify-between items-start text-left">
                      <div className="space-y-2.5 overflow-x-auto w-full text-left font-mono">
                        {activeCodeHoomerTab === "agent.runner.ts" ? (
                          <>
                            <div>
                              <span className="text-[#DC2626] font-bold">import </span>
                              <span className="text-[#1A1815]">{`{ `}</span>
                              <span className="text-[#2563EB] font-bold">AgentRunner</span>
                              <span className="text-[#1A1815]">, </span>
                              <span className="text-[#2563EB] font-bold">Telemetry</span>
                              <span className="text-[#1A1815]">{` }`}</span>
                              <span className="text-[#DC2626] font-bold"> from </span>
                              <span className="text-[#DC2626] font-bold">"@amthromax/runner"</span>
                              <span className="text-[#1A1815]">;</span>
                            </div>

                            <div className="h-1" />

                            <div>
                              <span className="text-[#4B5563] font-semibold">// Agent Lifecycle & Real-Time Stream Monitoring</span>
                            </div>
                            <div>
                              <span className="text-[#DC2626] font-bold">export class </span>
                              <span className="text-[#2563EB] font-bold">ProductionAgentRunner</span>
                              <span className="text-[#1A1815] font-semibold"> {"{"}</span>
                            </div>

                            <div className="pl-6 space-y-1.5">
                              <div>
                                <span className="text-[#DC2626] font-bold">private </span>
                                <span className="text-[#2563EB] font-bold">runner </span>
                                <span className="text-[#1A1815]">= </span>
                                <span className="text-[#DC2626] font-bold">new </span>
                                <span className="text-[#2563EB] font-bold">AgentRunner</span>
                                <span className="text-[#1A1815]">({`{ `}</span>
                                <span className="text-[#2563EB] font-bold">timeoutMs</span>
                                <span className="text-[#1A1815]">: </span>
                                <span className="text-[#059669] font-bold">30000</span>
                                <span className="text-[#1A1815]">{` });`}</span>
                              </div>

                              <div className="h-1" />

                              <div>
                                <span className="text-[#DC2626] font-bold">async </span>
                                <span className="text-[#2563EB] font-bold">executeTask</span>
                                <span className="text-[#1A1815]">(task: TaskPayload) {"{"}</span>
                              </div>
                              <div className="pl-6">
                                <span className="text-[#DC2626] font-bold">const </span>
                                <span className="text-[#2563EB] font-bold">session </span>
                                <span className="text-[#1A1815]">= </span>
                                <span className="text-[#DC2626] font-bold">await </span>
                                <span className="text-[#1A1815] font-semibold">this.runner.initialize(task);</span>
                              </div>
                              <div className="pl-6">
                                <span className="text-[#2563EB] font-bold">Telemetry</span>
                                <span className="text-[#1A1815] font-semibold">.track(</span>
                                <span className="text-[#DC2626] font-semibold">"agent_started"</span>
                                <span className="text-[#1A1815]">, {`{ `}id: session.id{` });`}</span>
                              </div>
                              <div className="pl-6">
                                <span className="text-[#DC2626] font-bold">return </span>
                                <span className="text-[#2563EB] font-bold">session</span>
                                <span className="text-[#1A1815]">.streamResults();</span>
                              </div>
                              <div>
                                <span className="text-[#1A1815] font-semibold">{"}"}</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-[#1A1815] font-semibold">{"}"}</span>
                            </div>
                          </>
                        ) : activeCodeHoomerTab === "schema.prisma" ? (
                          <>
                            <div>
                              <span className="text-[#4B5563] font-semibold">// Automated Database Migration Spec</span>
                            </div>
                            <div>
                              <span className="text-[#DC2626] font-bold">datasource </span>
                              <span className="text-[#2563EB] font-bold">db </span>
                              <span className="text-[#1A1815]">{"{"}</span>
                            </div>
                            <div className="pl-6 space-y-1.5">
                              <div>
                                <span className="text-[#2563EB] font-bold">provider </span>
                                <span className="text-[#1A1815]">= </span>
                                <span className="text-[#DC2626] font-semibold">"postgresql"</span>
                              </div>
                              <div>
                                <span className="text-[#2563EB] font-bold">url </span>
                                <span className="text-[#1A1815]">= </span>
                                <span className="text-[#1A1815]">env(</span>
                                <span className="text-[#DC2626] font-semibold">"DATABASE_URL"</span>
                                <span className="text-[#1A1815]">)</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-[#1A1815] font-semibold">{"}"}</span>
                            </div>

                            <div className="h-1" />

                            <div>
                              <span className="text-[#DC2626] font-bold">model </span>
                              <span className="text-[#2563EB] font-bold">AgentExecution </span>
                              <span className="text-[#1A1815]">{"{"}</span>
                            </div>
                            <div className="pl-6 space-y-1.5">
                              <div>
                                <span className="text-[#2563EB] font-bold">id </span>
                                <span className="text-[#1A1815]">String @id @default(uuid())</span>
                              </div>
                              <div>
                                <span className="text-[#2563EB] font-bold">status </span>
                                <span className="text-[#1A1815]">ExecutionStatus @default(PENDING)</span>
                              </div>
                              <div>
                                <span className="text-[#2563EB] font-bold">createdAt </span>
                                <span className="text-[#1A1815]">DateTime @default(now())</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-[#1A1815] font-semibold">{"}"}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <span className="text-[#DC2626] font-bold">import </span>
                              <span className="text-[#1A1815]">{`{ `}</span>
                              <span className="text-[#2563EB] font-bold">CodeHoomerEngine</span>
                              <span className="text-[#1A1815]">{` }`}</span>
                              <span className="text-[#DC2626] font-bold"> from </span>
                              <span className="text-[#DC2626] font-bold">"@amthromax/codehoomer"</span>
                              <span className="text-[#1A1815]">;</span>
                            </div>

                            <div className="h-1.5" />

                            <div>
                              <span className="text-[#4B5563] font-semibold">// Autonomous Engineering Agent Workflow</span>
                            </div>
                            <div>
                              <span className="text-[#DC2626] font-bold">export async function </span>
                              <span className="text-[#2563EB] font-bold">buildNextGenApp</span>
                              <span className="text-[#1A1815]">(spec: ProjectSpec) {"{"}</span>
                            </div>

                            <div className="pl-6 space-y-2">
                              <div>
                                <span className="text-[#DC2626] font-bold">const </span>
                                <span className="text-[#2563EB] font-bold">agent </span>
                                <span className="text-[#1A1815]">= </span>
                                <span className="text-[#DC2626] font-bold">new </span>
                                <span className="text-[#2563EB] font-bold">CodeHoomerEngine</span>
                                <span className="text-[#1A1815]">({`{`}</span>
                              </div>
                              <div className="pl-6">
                                <span className="text-[#2563EB] font-bold">autonomy</span>
                                <span className="text-[#1A1815]">: </span>
                                <span className="text-[#DC2626] font-semibold">"full_engineer"</span>
                                <span className="text-[#1A1815]">,</span>
                              </div>
                              <div className="pl-6">
                                <span className="text-[#2563EB] font-bold">model</span>
                                <span className="text-[#1A1815]">: </span>
                                <span className="text-[#DC2626] font-semibold">"amx-coder-v4"</span>
                                <span className="text-[#1A1815]">,</span>
                              </div>
                              <div className="pl-6">
                                <span className="text-[#2563EB] font-bold">capabilities</span>
                                <span className="text-[#1A1815]">: [</span>
                                <span className="text-[#DC2626] font-semibold">"fullstack"</span>
                                <span className="text-[#1A1815]">, </span>
                                <span className="text-[#DC2626] font-semibold">"autotesting"</span>
                                <span className="text-[#1A1815]">],</span>
                              </div>
                              <div>
                                <span className="text-[#1A1815]">{"});"}</span>
                              </div>

                              <div className="h-1.5" />

                              <div>
                                <span className="text-[#DC2626] font-bold">return await </span>
                                <span className="text-[#2563EB] font-bold">agent</span>
                                <span className="text-[#1A1815] font-semibold">.deployToProduction(spec);</span>
                              </div>
                            </div>

                            <div>
                              <span className="text-[#1A1815]">{"}"}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Live Agent Stream & Prompt Console */}
                    <div className="w-full md:w-5/12 p-5 sm:p-6 bg-[#FAF9F6] flex flex-col justify-between space-y-4 font-sans font-inter">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#1A1815] font-sans font-inter uppercase tracking-wider">
                            Agent Live Logs
                          </span>
                          <span className="text-xs font-sans font-inter bg-[#E0DDD5] text-[#1A1815] px-2.5 py-1 rounded font-bold tracking-wide">
                            STREAMING
                          </span>
                        </div>

                        {/* Live Terminal Log Feeds */}
                        <div className="space-y-2 font-sans font-inter text-sm text-[#1A1815]">
                          <div className="p-3 rounded-lg bg-white border border-black/[0.06] font-semibold shadow-2xs">
                            <span className="text-[#1A1815]">Analyzed 42 database models & schemas</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-black/[0.06] font-semibold shadow-2xs">
                            <span className="text-[#1A1815]">Generated 18 type-safe React components</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-black/[0.06] font-semibold shadow-2xs">
                            <span className="text-[#1A1815]">Ran automated E2E test suite (100% pass)</span>
                          </div>
                          {customLogs.map((log, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-3 rounded-lg bg-white border border-black/[0.06] text-[#1A1815] font-semibold shadow-2xs"
                            >
                              <span className="text-[#1A1815]">{log}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Interactive Command Bar */}
                      <div className="pt-3.5 border-t border-black/[0.06] flex items-center gap-2 font-sans font-inter">
                        <input
                          type="text"
                          readOnly
                          value="Build full-stack auth & billing..."
                          className="flex-1 bg-white border border-black/[0.08] rounded-full px-4 py-2.5 text-xs sm:text-sm font-sans font-inter font-semibold text-[#1A1815] outline-none shadow-xs"
                        />
                        <motion.button
                          type="button"
                          disabled={isBuilding}
                          onClick={() => {
                            setIsBuilding(true);
                            setTimeout(() => {
                              setIsBuilding(false);
                              setCustomLogs((prev) => [...prev, `Auth & Billing module compiled (0.42s)`]);
                            }, 1000);
                          }}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          className="bg-[#1A1815] hover:bg-black text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-inter font-bold shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center min-w-[85px]"
                        >
                          {isBuilding ? (
                            <span className="inline-flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Building...</span>
                            </span>
                          ) : (
                            <span>Build</span>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : activeCategoryPill === "Enterprise Reasoning" ? (
              /* Helleious.AI Enterprise Reasoning Dual-Pane Studio Box (Matching Exact Design) */
              <div className="w-full max-w-5xl sm:max-w-6xl mx-auto my-auto py-2 sm:py-3">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full rounded-[28px] sm:rounded-[36px] bg-[#F7F2EC] shadow-[0_16px_48px_rgba(0,0,0,0.04)] p-2.5 sm:p-3 text-[#1A1815] font-sans overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
                    {/* LEFT PANE: Context & Specification Notes */}
                    <div className="lg:col-span-5 bg-white rounded-[22px] sm:rounded-[28px] p-5 sm:p-6 shadow-sm flex flex-col justify-between">
                      <div className="space-y-4">
                        {/* Top Bar Controls */}
                        <div className="flex items-center justify-between gap-2 border-b border-[#F5F0EA] pb-3">
                          {/* Dropdown Version Selector */}
                          <div className="flex items-center gap-1 text-xs font-semibold text-[#4A453E] bg-[#F7F4F0] px-3 py-1.5 rounded-full border border-[#EAE4DC] cursor-pointer hover:bg-[#EFEAE2] transition-colors">
                            <span>3.1 version</span>
                            <svg className="w-3 h-3 stroke-current text-[#7A736B]" fill="none" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>

                          {/* Tab Pills */}
                          <div className="flex items-center gap-1 text-xs font-medium text-[#7A736B]">
                            <button type="button" className="px-2.5 py-1 rounded-md hover:text-[#1A1815] transition-colors">
                              Context
                            </button>
                            <button type="button" className="px-2.5 py-1 rounded-md hover:text-[#1A1815] transition-colors">
                              Plan
                            </button>
                            <button type="button" className="px-2.5 py-1 rounded-lg bg-[#FAF7F3] text-[#1A1815] font-semibold border border-[#EBE4DC] flex items-center gap-1 shadow-2xs">
                              <svg className="w-3.5 h-3.5 text-[#1A1815]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              <span>Notes</span>
                            </button>
                          </div>
                        </div>

                        {/* Automatic Update Sub-tag */}
                        <div className="flex items-center gap-1.5 text-[11px] text-[#A0988E]">
                          <svg className="w-3 h-3 text-[#A0988E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Updated automatically</span>
                        </div>

                        {/* Current Understanding Title */}
                        <h4 className="text-base font-bold text-[#1A1815] pt-1">
                          Current Understanding
                        </h4>

                        {/* Structured Specification List */}
                        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-[#2D2A26]">
                          <div>
                            <p className="font-bold text-[#1A1815]">1. Core Idea</p>
                            <p className="text-[#3A3530] font-medium mt-0.5">An app that helps bored people try one doable hobby per week.</p>
                          </div>

                          <div>
                            <p className="font-bold text-[#1A1815]">2. Target User (current focus)</p>
                            <p className="text-[#3A3530] font-medium mt-0.5">Busy adults who want low-effort hobbies.</p>
                          </div>

                          <div>
                            <p className="font-bold text-[#1A1815]">3. App Promise</p>
                            <p className="text-[#3A3530] font-medium mt-0.5">From 'I'm bored' to 'I tried something this week.'</p>
                          </div>

                          <div>
                            <p className="font-bold text-[#1A1815]">4. Habit Loop (simple)</p>
                            <p className="text-[#3A3530] font-medium mt-0.5">Check-in ➔ Suggest ➔ Try ➔ Reflect</p>
                            <p className="text-xs text-[#7A736B] italic mt-1 font-normal">Each section should look locked, not editable by default.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT PANE: Interactive AI Collaboration Studio */}
                    <div className="lg:col-span-7 bg-[#F7F2EC] rounded-[22px] sm:rounded-[28px] p-4 sm:p-5 flex flex-col justify-between space-y-4">
                      {/* Top Header Bar */}
                      <div className="flex items-center justify-between pb-2 border-b border-[#EAE3DA]">
                        <div className="flex items-center gap-2.5">
                          {/* Avatar Circle */}
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FCA5A5] via-[#F87171] to-[#F43F5E] shadow-2xs flex items-center justify-center text-white text-xs font-bold">
                            A
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs sm:text-sm font-bold text-[#1A1815]">Anastasia's Cabinet</span>
                              <span className="text-xs text-[#7A736B]">↪</span>
                            </div>
                            <p className="text-xs text-[#5C554D] font-medium">New App Help</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-[#7A736B]">
                          <button type="button" className="p-1 hover:text-[#1A1815] transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button type="button" className="p-1 hover:text-[#1A1815] transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Chat Messages Stream */}
                      <div className="space-y-3.5 text-xs sm:text-sm max-h-[280px] overflow-y-auto pr-1 no-scrollbar">
                        {/* AI Initial Message */}
                        <div>
                          <p className="text-[#1A1815] font-semibold leading-relaxed">Hi, how can I help you today?</p>
                          <div className="flex items-center gap-2 text-[#9E968B] text-xs mt-1">
                            <button type="button" className="hover:text-[#1A1815] transition-colors">📤</button>
                            <button type="button" className="hover:text-[#1A1815] transition-colors">💬</button>
                            <button type="button" className="hover:text-[#1A1815] transition-colors">📋</button>
                            <button type="button" className="hover:text-[#1A1815] transition-colors">•••</button>
                          </div>
                        </div>

                        {/* User Bubble 1 */}
                        <div className="flex flex-col items-end">
                          <div className="bg-[#EAE3DA] text-[#1A1815] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs sm:text-sm font-medium max-w-[85%] shadow-2xs">
                            Help me build a new app for discovering new hobbies
                          </div>
                          <span className="text-xs text-[#7A736B] mt-1 mr-1">13:22</span>
                        </div>

                        {/* AI Thinking Step 1 */}
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-[#5C554D] font-bold mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8C847A] animate-ping" />
                            <span>Thinking about the concept...</span>
                          </div>
                          <p className="text-[#1A1815] font-semibold leading-relaxed">
                            Nice, that's a great problem to work on. Let's start simple: what kind of person do you imagine using this, and when do they feel the need for it?
                          </p>
                          <div className="flex items-center gap-2 text-[#9E968B] text-[10px] mt-1">
                            <button type="button" className="hover:text-[#1A1815] transition-colors">📤</button>
                            <button type="button" className="hover:text-[#1A1815] transition-colors">💬</button>
                            <button type="button" className="hover:text-[#1A1815] transition-colors">📋</button>
                            <button type="button" className="hover:text-[#1A1815] transition-colors">•••</button>
                          </div>
                        </div>

                        {/* User Bubble 2 */}
                        <div className="flex flex-col items-end">
                          <div className="bg-[#EAE3DA] text-[#1A1815] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-normal max-w-[85%] shadow-2xs">
                            I want an app that will suit everyone, at every age, gender and with different technical ability
                          </div>
                          <span className="text-[9px] text-[#A0988E] mt-1 mr-1">13:23</span>
                        </div>

                        {/* AI Thinking Step 2 */}
                        <div>
                          <div className="flex items-center gap-1.5 text-[10px] text-[#8C847A] font-medium mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8C847A] animate-ping" />
                            <span>Narrowing the general idea...</span>
                          </div>
                          <p className="text-[#2D2A26] font-medium leading-relaxed">
                            I get the intention, and it's a good one. The tricky part is that "for everyone" usually means confusing for most. Let's zoom in first so we can build something that actually works — then we can expand.
                          </p>
                          <div className="flex items-center gap-2 text-[#9E968B] text-[10px] mt-1">
                            <button type="button" className="hover:text-[#1A1815] transition-colors">📤</button>
                            <button type="button" className="hover:text-[#1A1815] transition-colors">💬</button>
                            <button type="button" className="hover:text-[#1A1815] transition-colors">📋</button>
                            <button type="button" className="hover:text-[#1A1815] transition-colors">•••</button>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Input Area & Step Indicator */}
                      <div className="space-y-2 pt-2 border-t border-[#EAE3DA]">
                        {/* Progress Step Indicator */}
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] text-[#8C847A] font-medium">
                            Step 1 of 4: Define the first version
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="w-4 h-0.5 rounded-full bg-[#1A1815]" />
                            <span className="w-4 h-0.5 rounded-full bg-[#D6CEC4]" />
                            <span className="w-4 h-0.5 rounded-full bg-[#D6CEC4]" />
                            <span className="w-4 h-0.5 rounded-full bg-[#D6CEC4]" />
                          </div>
                        </div>

                        {/* Input Box */}
                        <div className="bg-white rounded-2xl p-2 sm:p-2.5 border border-[#ECE5DD] flex items-center justify-between gap-2 shadow-sm">
                          <div className="flex items-center gap-2 flex-1 px-1">
                            <button type="button" className="text-[#9E968B] hover:text-[#1A1815] transition-colors">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                            </button>
                            <input
                              type="text"
                              placeholder="How can I help you?"
                              className="w-full bg-transparent text-xs text-[#1A1815] placeholder-[#9E968B] outline-none font-sans"
                              defaultValue=""
                            />
                          </div>
                          <button
                            type="button"
                            className="w-7 h-7 rounded-full bg-[#EAE3DA] hover:bg-[#1A1815] hover:text-white text-[#7A736B] flex items-center justify-center transition-all cursor-pointer shrink-0"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : activeCategoryPill === "Data Pipelines" ? (
              /* Data Pipelines Telemetry Box */
              <div className="w-full max-w-4xl sm:max-w-5xl mx-auto my-auto py-2 sm:py-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full rounded-[24px] sm:rounded-[30px] bg-white border border-[#E5E2D9] shadow-[0_12px_40px_rgba(0,0,0,0.04)] p-5 sm:p-6 text-[#1A1815] font-sans flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0EEE6] mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                      <span className="text-xs font-mono font-bold text-[#1A1815] uppercase tracking-wider">
                        Real-Time Ingestion Pipeline Node
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE] px-2 py-0.5 rounded-full">
                      STATUS: ACTIVE (4.82 GB/s)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EBE8E0]">
                      <p className="text-[10px] font-mono text-[#7A736B] uppercase font-bold">Throughput</p>
                      <p className="text-lg sm:text-xl font-mono font-bold text-[#1A1815] mt-1">4,820 MB/s</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EBE8E0]">
                      <p className="text-[10px] font-mono text-[#7A736B] uppercase font-bold">Packet Rate</p>
                      <p className="text-lg sm:text-xl font-mono font-bold text-[#1A1815] mt-1">1.28M req/s</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EBE8E0]">
                      <p className="text-[10px] font-mono text-[#7A736B] uppercase font-bold">Zero-Drop SLA</p>
                      <p className="text-lg sm:text-xl font-mono font-bold text-[#047857] mt-1">100.00%</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EBE8E0] font-mono text-xs flex items-center justify-between gap-2 overflow-x-auto">
                    <span className="text-[#666057] shrink-0">Kafka Event Stream ➔</span>
                    <span className="text-[#2563EB] font-bold shrink-0">Helleious Stream ETL</span>
                    <span className="text-[#666057] shrink-0">➔ Snowflake & VectorDB</span>
                  </div>
                </motion.div>
              </div>
            ) : activeCategoryPill === "Real-Time Automation" ? (
              /* Real-Time Automation Box */
              <div className="w-full max-w-4xl sm:max-w-5xl mx-auto my-auto py-2 sm:py-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full rounded-[24px] sm:rounded-[30px] bg-white border border-[#E5E2D9] shadow-[0_12px_40px_rgba(0,0,0,0.04)] p-5 sm:p-6 text-[#1A1815] font-sans flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0EEE6] mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="text-xs font-mono font-bold text-[#1A1815] uppercase tracking-wider">
                        Workflow Event Automation Engine
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2 py-0.5 rounded-full">
                      LISTENING (HTTP 200)
                    </span>
                  </div>

                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EBE8E0] flex items-center justify-between">
                      <span className="text-[#1A1815] font-semibold">Trigger: Webhook Payment Received</span>
                      <span className="text-[#047857] font-bold">Executed (2ms)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EBE8E0] flex items-center justify-between">
                      <span className="text-[#1A1815] font-semibold">Action: Auto-Provision Enterprise License</span>
                      <span className="text-[#047857] font-bold">Completed ✓</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : activeCategoryPill === "Custom LLMs" ? (
              /* Custom LLMs Fine-Tuning Box */
              <div className="w-full max-w-4xl sm:max-w-5xl mx-auto my-auto py-2 sm:py-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full rounded-[24px] sm:rounded-[30px] bg-white border border-[#E5E2D9] shadow-[0_12px_40px_rgba(0,0,0,0.04)] p-5 sm:p-6 text-[#1A1815] font-sans flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0EEE6] mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] animate-pulse" />
                      <span className="text-xs font-mono font-bold text-[#1A1815] uppercase tracking-wider">
                        Enterprise Fine-Tuning & Model Weights
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold bg-[#F3E8FF] text-[#6B21A8] border border-[#E9D5FF] px-2 py-0.5 rounded-full">
                      LORA RANK 16 (70B PARAMS)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-2 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EBE8E0]">
                      <span className="text-[#7A736B] block text-[10px]">MMLU BENCHMARK</span>
                      <span className="text-base font-bold text-[#1A1815]">89.4% (+14.2%)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EBE8E0]">
                      <span className="text-[#7A736B] block text-[10px]">HUMANEVAL SCORE</span>
                      <span className="text-base font-bold text-[#1A1815]">92.1% (PASS@1)</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : activeCategoryPill === "Predictive Analytics" ? (
              /* Predictive Analytics Box */
              <div className="w-full max-w-4xl sm:max-w-5xl mx-auto my-auto py-2 sm:py-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full rounded-[24px] sm:rounded-[30px] bg-white border border-[#E5E2D9] shadow-[0_12px_40px_rgba(0,0,0,0.04)] p-5 sm:p-6 text-[#1A1815] font-sans flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0EEE6] mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899] animate-pulse" />
                      <span className="text-xs font-mono font-bold text-[#1A1815] uppercase tracking-wider">
                        Predictive Forecasting & Telemetry
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold bg-[#FCE7F3] text-[#9D174D] border border-[#FBCFE8] px-2 py-0.5 rounded-full">
                      ANOMALY RISK: 0.01%
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EBE8E0] font-mono text-xs flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-[#7A736B] uppercase font-bold">PROJECTED EFFICIENCY GAIN</p>
                      <p className="text-xl font-bold text-[#047857] mt-1">+44.6% Cost Reduction</p>
                    </div>
                    <span className="bg-[#ECFDF5] text-[#047857] px-3 py-1 rounded-full font-bold">CONFIDENCE 99.9%</span>
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Center Concentric Radial Circular Dot Matrix Visual Graphic (Multi-Agent Swarm) */
              <div className="relative w-full flex items-center justify-center my-auto py-2 sm:py-4 overflow-hidden group select-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.03 }}
                  className="relative w-64 h-64 sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] flex items-center justify-center cursor-pointer"
                >
                  <svg
                    viewBox="0 0 500 500"
                    className="w-full h-full text-[#1A1815] drop-shadow-sm transition-transform duration-500"
                  >
                    {[
                      { radius: 0, count: 1, dotR: 5 },
                      { radius: 22, count: 8, dotR: 4.5 },
                      { radius: 44, count: 14, dotR: 4.5 },
                      { radius: 66, count: 20, dotR: 4.5 },
                      { radius: 88, count: 26, dotR: 4.5 },
                      { radius: 110, count: 32, dotR: 4.5 },
                      { radius: 132, count: 38, dotR: 4.5 },
                      { radius: 154, count: 44, dotR: 4.5 },
                      { radius: 176, count: 50, dotR: 4.5 },
                      { radius: 198, count: 56, dotR: 4.5 },
                      { radius: 220, count: 62, dotR: 4.5 },
                    ].map((ring, ringIdx) => {
                      const dots = Array.from({ length: ring.count }).map((_, dotIdx) => {
                        const angle = (2 * Math.PI * dotIdx) / ring.count;
                        const cx = 250 + ring.radius * Math.cos(angle);
                        const cy = 250 + ring.radius * Math.sin(angle);
                        return { cx, cy };
                      });

                      return (
                        <g key={ringIdx}>
                          {dots.map((d, dIdx) => (
                            <motion.circle
                              key={`${ringIdx}-${dIdx}`}
                              cx={d.cx}
                              cy={d.cy}
                              r={ring.dotR}
                              fill="currentColor"
                              initial={{ scale: 0.8, opacity: 0.8 }}
                              animate={{
                                scale: [0.9, 1.15, 0.9],
                                opacity: [0.85, 1, 0.85],
                              }}
                              transition={{
                                duration: 3 + ringIdx * 0.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: ringIdx * 0.12 + dIdx * 0.01,
                              }}
                            />
                          ))}
                        </g>
                      );
                    })}
                  </svg>
                </motion.div>
              </div>
            )}

            {/* Sub-Navigation Title & Chevron Buttons Row */}
            <div className="w-full flex items-center justify-center gap-4 sm:gap-8 my-3 sm:my-4">
              {/* Previous Chevron Button */}
              <button
                type="button"
                onClick={() => {
                  const tabs = ["helleious", "codehoomer", "amxapi"];
                  const curr = tabs.indexOf(activeHeaderTab);
                  const prev = tabs[(curr - 1 + tabs.length) % tabs.length];
                  setActiveHeaderTab(prev);
                  if (prev === "helleious") setActiveCategoryPill("Multi-Agent Swarm");
                  else if (prev === "codehoomer") setActiveCategoryPill("Autonomous Agent");
                  else if (prev === "amxapi") setActiveCategoryPill("JS / TS SDK");
                }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#666057] hover:text-[#1A1815] flex items-center justify-center shadow-sm border border-black/5 transition-all active:scale-90 cursor-pointer"
                title="Previous Feature"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Active Feature Info */}
              <div className="text-center max-w-sm sm:max-w-md mx-auto space-y-1">
                <a
                  href={
                    activeHeaderTab === "codehoomer"
                      ? "https://codehoomer.ai"
                      : activeHeaderTab === "amxapi"
                      ? "/api-pricing"
                      : "/helleious"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-base sm:text-xl font-bold text-[#1A1815] hover:text-black transition-colors"
                >
                  <span>
                    {activeHeaderTab === "codehoomer"
                      ? "CodeHoomer.AI Autonomous Developer ↗"
                      : activeHeaderTab === "amxapi"
                      ? "AMX Developer API Platform ↗"
                      : "Helleious.AI Multi-Agent Intelligence ↗"}
                  </span>
                </a>
                <p className="text-xs sm:text-sm text-[#666057] font-normal leading-relaxed">
                  {activeHeaderTab === "codehoomer"
                    ? "Build, debug, and deploy full-stack applications with state-of-the-art AI reasoning."
                    : activeHeaderTab === "amxapi"
                    ? "Low-latency SDKs and REST APIs for enterprise voice, reasoning, and vision."
                    : "Orchestrate autonomous agent swarms, real-time data pipelines, and enterprise LLM reasoning."}
                </p>
              </div>

              {/* Next Chevron Button */}
              <button
                type="button"
                onClick={() => {
                  const tabs = ["helleious", "codehoomer", "amxapi"];
                  const curr = tabs.indexOf(activeHeaderTab);
                  const next = tabs[(curr + 1) % tabs.length];
                  setActiveHeaderTab(next);
                  if (next === "helleious") setActiveCategoryPill("Multi-Agent Swarm");
                  else if (next === "codehoomer") setActiveCategoryPill("Autonomous Agent");
                  else if (next === "amxapi") setActiveCategoryPill("JS / TS SDK");
                }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#666057] hover:text-[#1A1815] flex items-center justify-center shadow-sm border border-black/5 transition-all active:scale-90 cursor-pointer"
                title="Next Feature"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-end pt-4 border-t border-[#E2DFD7] w-full mt-2">
              {isLoggedIn ? (
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-2 bg-[#F2EFE8] border border-[#E0DDD5] px-3.5 py-1.5 rounded-full">
                    <span className="w-6 h-6 rounded-full bg-[#1A1815] text-white font-bold text-xs flex items-center justify-center">
                      {userInitial}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#1A1815]">{fullName}</span>
                  </div>
                  <Link
                    to="/profile"
                    className="bg-[#1A1815] hover:bg-[#332E29] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all shadow-sm shrink-0"
                  >
                    Account Profile
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#1A1815] hover:bg-[#332E29] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-sm shrink-0"
                >
                  Sign up
                </Link>
              )}
            </div>
          </motion.div>

          {/* Client Brands Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-[#E5E0D6] text-[#7A736B] text-xs sm:text-sm font-medium"
          >
            <span>Brands we've helped implement AI:</span>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm sm:text-base font-medium text-[#403B35] tracking-wide">
              <span className="font-sans font-medium text-[#1A1815] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-[#1A1815] inline-block" />
                Sequence
              </span>
              <span className="italic font-serif text-[#1A1815]">ther</span>
              <span className="font-semibold text-[#1A1815]">Amsterdam</span>
              <span className="flex items-center gap-1 font-medium text-[#1A1815]">
                <span className="text-xs text-[#7A736B]">★</span> Hamilton
              </span>
              <span className="uppercase tracking-widest font-mono text-xs text-[#1A1815] font-bold">CALIFORNIA</span>
              <span className="font-serif lowercase text-[#1A1815] text-lg font-normal">venice.</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full-Page Edge-to-Edge AMX's27 Announcement Banner */}
      <section className="w-full bg-black overflow-hidden my-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full relative overflow-hidden group cursor-pointer flex items-center justify-center"
        >
          <img
            src="/amxs27_announcement.png"
            alt="AMX's27 Announcement"
            className="w-full h-auto max-h-[480px] object-cover object-center block filter brightness-105 contrast-105 group-hover:scale-[1.01] transition-transform duration-1000 ease-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/1b86d8cd-3a4f-4911-a8d0-f322d0cfc4e1.png';
            }}
          />
        </motion.div>
      </section>




      {/* How It Works — Carousel Step Section */}
      {(() => {
        const [activeStep, setActiveStep] = React.useState(0);
        const steps = [
          {
            video: "/video/step1.mp4",
            fallbackVideo: "/video/18ccc3693f45accece1cef6b6b64ae79_720w (1).mp4",
            label: "Connect your data",
            desc: "Forget about fragmented data sources. Secure, live pipelines measure the health of your AI infrastructure, so every agent acts on truth.",
            visual: (
              <div className="flex flex-col gap-3.5 w-full max-w-[320px]">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 px-5 py-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#1A1815] flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 7 12 12 15 15" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-[#1A1815] leading-snug">4.82 GB/s</p>
                    <p className="text-xs font-medium text-[#7A736B]">in real-time ingestion · Helleious</p>
                  </div>
                  <svg className="flex-shrink-0" width="18" height="18" fill="none" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" stroke="#22c55e" strokeWidth="1.6"/><path d="M4.5 7l2 2 3-3" stroke="#22c55e" strokeWidth="1.6" strokeLinecap="round"/></svg>
                </div>
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 px-5 py-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#1d6bf3] flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[#1A1815] leading-snug">Connecting to Vector Store…</p>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"/>
                </div>
              </div>
            ),
          },
          {
            video: "/video/step2.mp4",
            fallbackVideo: "/video/4d52bd5bdf1824b7dde35b9f14b6c804.mp4",
            label: "Deploy your agents",
            desc: "Configure and launch autonomous AI agents in minutes. Each agent auto-routes tasks, self-corrects, and reports back with full audit trails.",
            visual: (
              <div className="flex flex-col gap-3.5 w-full max-w-[320px]">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 px-6 py-5">
                  <div className="mb-4">
                    <p className="text-base font-bold text-[#1A1815]">Agent Deployment</p>
                  </div>
                  <div className="space-y-2.5">
                    {["Reasoning Core", "Memory Layer", "Tool Router"].map((a, i) => (
                      <div key={i} className="flex items-center gap-3 py-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"/>
                        <span className="text-sm font-bold text-[#1A1815]">{a}</span>
                        <span className="ml-auto text-xs font-bold text-[#7A736B]">Ready</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
          },
          {
            video: "/video/step3.mp4",
            fallbackVideo: "/video/6dcb18a100070691ae61e01f0633c8d4.mp4",
            label: "Monitor and scale",
            desc: "Watch every decision, pipeline run, and agent interaction in real-time. Scale horizontally with zero config as your workloads grow.",
            visual: (
              <div className="flex flex-col gap-3.5 w-full max-w-[340px]">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 px-6 py-5.5">
                  <p className="text-base font-bold text-[#1A1815] mb-4">System Health</p>
                  {[
                    { label: "Throughput", val: "99.8%", w: "w-[99%]", color: "bg-emerald-500" },
                    { label: "Latency P95", val: "12ms", w: "w-[85%]", color: "bg-blue-500" },
                    { label: "Error Rate", val: "0.02%", w: "w-[4%]", color: "bg-amber-500" },
                  ].map((m, i) => (
                    <div key={i} className="mb-3.5 last:mb-0">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs font-bold text-[#666057]">{m.label}</span>
                        <span className="text-xs font-extrabold text-[#1A1815]">{m.val}</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#F0EDE6] w-full overflow-hidden">
                        <div className={`h-2 rounded-full ${m.color} ${m.w}`}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
        ];

        return (
          <section className="py-24 border-t border-[#E5E0D6] overflow-hidden">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1815] tracking-tight">How it works</h2>
            </div>

            {/* Carousel */}
            <div className="flex items-stretch justify-center gap-3 px-4 mb-10">
              {steps.map((step, i) => {
                const isActive = i === activeStep;
                return (
                  <motion.div
                    key={i}
                    onClick={() => setActiveStep(i)}
                    animate={{ flex: isActive ? 3 : 1, opacity: isActive ? 1 : 0.65 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="relative rounded-2xl overflow-hidden cursor-pointer min-h-[340px] flex items-center justify-center bg-black group"
                  >
                    {/* Background Video Layer */}
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      key={step.video}
                      className="absolute inset-0 w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                    >
                      <source src={step.video} type="video/mp4" />
                      <source src={step.fallbackVideo} type="video/mp4" />
                    </video>

                    {/* Dark contrast gradient overlay */}
                    <div className={`absolute inset-0 transition-opacity duration-300 ${isActive ? "bg-black/20 backdrop-brightness-95" : "bg-black/45 backdrop-blur-[1px]"}`} />

                    {/* Floating UI Widget */}
                    <div className={`relative z-10 transition-all duration-300 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                      {step.visual}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Step indicator bar */}
            <div className="max-w-2xl mx-auto px-6">
              <div className="h-[2px] bg-[#E5E0D6] rounded-full mb-8 relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#1A1815] rounded-full"
                  animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Active step description */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#1A1815] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M3 7l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1815] mb-1">{steps[activeStep].label}</h3>
                  <p className="text-sm text-[#666057] leading-relaxed max-w-lg">{steps[activeStep].desc}</p>
                  <div className="flex gap-2 mt-4">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`text-xs font-semibold transition-colors duration-200 ${i === activeStep ? "text-[#1A1815]" : "text-[#C8C3B8] hover:text-[#9E9890]"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* How Amthromax Works — 2-Card Layout */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#E5E0D6]">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-end">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1815] leading-[1.1] tracking-tight">
              AI works better when<br />everything stays connected.
            </h2>
          </div>
          <div className="lg:pb-1">
            <p className="text-sm text-[#9E9890] leading-relaxed max-w-sm">
              Amthromax removes friction from enterprise AI with unified pipelines your teams can adapt to any workflow — at any scale.
            </p>
          </div>
        </div>

        {/* Two Cards with Rich Background Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1 — Intelligent Pipelines */}
          <div className="rounded-2xl overflow-hidden bg-black relative flex flex-col min-h-[420px] shadow-lg group">
            {/* Background Image Layer */}
            <img
              src="/images/pipelines_bg.jpg"
              alt="Intelligent Pipelines Background"
              className="absolute inset-0 w-full h-full object-cover filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/pipelines_bg.jpg';
              }}
            />
            {/* Dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

            {/* Visual Area */}
            <div className="relative z-10 flex-1 p-8 flex items-center justify-center min-h-[280px]">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-5 w-full max-w-[330px] transform hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1A1815]">Agent Tasks</span>
                    <span className="text-xs font-medium text-[#1A1815] bg-[#F0EDE6] px-2 py-0.5 rounded-full">4</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-5 h-5 rounded-full bg-[#E8A87C] text-[7px] font-bold text-white flex items-center justify-center shadow-sm">A</div>
                    <div className="w-5 h-5 rounded-full bg-[#82B4A0] text-[7px] font-bold text-white flex items-center justify-center shadow-sm">K</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Data Ingestion Pipeline", status: "Completed", color: "text-[#059669]" },
                    { label: "Model Fine-Tuning Run", status: "Ongoing", color: "text-[#D97706]" },
                    { label: "Agent Deployment", status: "Queued", color: "text-[#6B7280]" },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-[#F0EDE6] last:border-0">
                      <span className="text-xs font-medium text-[#1A1815]">{t.label}</span>
                      <span className={`text-xs font-bold ${t.color}`}>{t.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Caption */}
            <div className="relative z-10 px-8 pb-7">
              <p className="text-base font-bold text-white tracking-tight">Intelligent Pipelines</p>
              <p className="text-xs text-white/80 mt-1 leading-relaxed max-w-md">Bring all your agent tasks, data flows, and model runs together. No more switching between tools — keep everything fully structured and auditable.</p>
            </div>
          </div>

          {/* Card 2 — Real-Time Orchestration */}
          <div className="rounded-2xl overflow-hidden bg-black relative flex flex-col min-h-[420px] shadow-lg group">
            {/* Background Image Layer */}
            <img
              src="/images/orchestration_bg.jpg"
              alt="Real-Time Orchestration Background"
              className="absolute inset-0 w-full h-full object-cover filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/orchestration_bg.jpg';
              }}
            />
            {/* Dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

            {/* Visual Area */}
            <div className="relative z-10 flex-1 p-8 flex items-center justify-center min-h-[280px]">
              <div className="w-full max-w-[330px] space-y-3">
                {[
                  {
                    label: "Helleious Stream ETL",
                    icon: (
                      <svg className="w-4 h-4 text-[#1A1815]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    ),
                  },
                  {
                    label: "Vector Store Sync",
                    icon: (
                      <svg className="w-4 h-4 text-[#1A1815]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Send to Agent Runtime",
                    icon: (
                      <svg className="w-4 h-4 text-[#1A1815]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                  },
                ].map((step, i) => (
                  <div key={i}>
                    <div className="bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-white/30 flex items-center justify-between transform hover:-translate-y-0.5 transition-transform duration-200">
                      <div className="flex items-center gap-2.5">
                        <span className="flex items-center justify-center shrink-0">{step.icon}</span>
                        <span className="text-xs font-bold text-[#1A1815]">{step.label}</span>
                      </div>
                      <button className="w-6 h-6 rounded-md bg-[#F0EDE6] flex items-center justify-center text-[#1A1815] hover:bg-[#E5E0D6] transition-colors">
                        <svg width="10" height="10" fill="none" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                    {i < 2 && (
                      <div className="flex justify-center my-1">
                        <div className="w-px h-4 border-l border-dashed border-white/60"/>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex justify-center mt-1">
                  <div className="w-px h-3 border-l border-dashed border-white/60"/>
                </div>
                <div className="flex justify-center">
                  <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                    <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Caption */}
            <div className="relative z-10 px-8 pb-7">
              <p className="text-base font-bold text-white tracking-tight">Real-Time Orchestration</p>
              <p className="text-xs text-white/80 mt-1 leading-relaxed max-w-md">Bring all your agent tasks, data flows, and pipelines together. No more switching between tools — keep everything fully structured, searchable, and in the right place.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Benefits — Purpose-built Section */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#E5E0D6]">
        {/* Top Row: Heading */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1815] leading-[1.1] tracking-tight max-w-xl">
            Purpose-built for enterprise AI performance
          </h2>
        </div>

        {/* Content Row: Feature List + Visual */}
        {(() => {
          const BENEFITS_ITEMS = [
            {
              title: "Accelerated inference at scale",
              desc: "Optimized LLM routing and token caching deliver up to 4.2x faster response times for high-concurrency enterprise workloads.",
              cardTitle: "Inference Engine",
              cardSubtext: "4.2x Latency Optimization",
              badge: "18ms Response Time",
              iconBg: "bg-[#1A1815]",
              icon: (
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
            },
            {
              title: "Consistent, auditable reasoning",
              desc: "Every agent decision is logged against the same guardrails — regardless of which pipeline handles it. No variance. No gaps.",
              cardTitle: "Enterprise Audit Log",
              cardSubtext: "Amthromax Core v2.1",
              badge: "100% Guardrail Coverage",
              iconBg: "bg-[#1d6bf3]",
              icon: (
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
            },
            {
              title: "Deploy without additional headcount",
              desc: "Autonomous AI swarms handle multi-step workflows, automated reporting, and data pipelines without requiring extra team engineering overhead.",
              cardTitle: "Autonomous Swarms",
              cardSubtext: "Zero Engineering Overhead",
              badge: "Multi-Agent Active",
              iconBg: "bg-[#10B981]",
              icon: (
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
            },
            {
              title: "Enterprise-grade compliance built-in",
              desc: "SOC 2 Type II certified, GDPR compliant, and end-to-end encrypted with custom role-based access control (RBAC) out of the box.",
              cardTitle: "Security & Governance",
              cardSubtext: "SOC 2 & GDPR Verified",
              badge: "256-bit AES Encrypted",
              iconBg: "bg-[#F97316]",
              icon: (
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
            },
          ];

          const activeItem = BENEFITS_ITEMS[activeBenefitIndex] || BENEFITS_ITEMS[1];

          return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Interactive Accordion Feature List */}
              <div className="divide-y divide-[#E5E0D6] border-t border-b border-[#E5E0D6]">
                {BENEFITS_ITEMS.map((feature, i) => {
                  const isOpen = activeBenefitIndex === i;
                  return (
                    <div
                      key={i}
                      onClick={() => setActiveBenefitIndex(i)}
                      className="py-5 cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p
                          className={`text-base sm:text-lg font-bold leading-snug transition-colors duration-200 ${
                            isOpen ? "text-[#1A1815]" : "text-[#403B35] group-hover:text-[#1A1815]"
                          }`}
                        >
                          {feature.title}
                        </p>
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${
                            isOpen ? "bg-[#1A1815] text-white rotate-180" : "bg-[#EFECE6] text-[#403B35] group-hover:bg-[#E5E0D6]"
                          }`}
                        >
                          <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-[#4A443F] mt-3 leading-relaxed max-w-md font-medium">
                              {feature.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Right: Dynamic Visual Card matching active accordion tab */}
              <div className="rounded-2xl overflow-hidden h-[400px] relative bg-black flex items-center justify-center shadow-lg group">
                <img
                  src="/images/enterprise_performance_bg.jpg"
                  alt="Enterprise Performance Background"
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/enterprise_performance_bg.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black/25 backdrop-brightness-95" />

                <div className="relative z-10 w-full h-full p-8 flex flex-col justify-center gap-5">
                  <motion.div
                    key={activeItem.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-white/40 max-w-[300px] flex items-center gap-4"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${activeItem.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-md`}>
                      {activeItem.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1A1815]">{activeItem.cardTitle}</p>
                      <p className="text-xs font-medium text-[#7A736B]">{activeItem.cardSubtext}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    key={activeItem.badge}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-white/40 max-w-[320px] self-end flex items-center gap-4"
                  >
                    <div className="flex-1">
                      <div className="mb-1.5">
                        <span className="text-xs font-bold text-[#1A1815]">{activeItem.badge}</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-1.5 rounded-full bg-[#1A1815] w-full"/>
                        <div className="h-1.5 rounded-full bg-[#1A1815]/60 w-4/5"/>
                        <div className="h-1.5 rounded-full bg-[#1A1815]/30 w-3/5"/>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Our Values — Kanmon-Style 3×2 Grid */}
      <section className="bg-[#EDE9E0] border-t border-[#D8D3C8]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y divide-x divide-[#C8C3B8] border border-[#C8C3B8]">

            {/* Cell 1 — Brand + Label */}
            <div className="group p-10 sm:p-12 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] cursor-default transition-colors duration-300 hover:bg-[#E3DED4]">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <svg width="38" height="38" viewBox="0 0 22 22" fill="none" className="transition-transform duration-300 group-hover:scale-110">
                  <path d="M11 1L21 11L11 21L1 11L11 1Z" stroke="#1A1815" strokeWidth="1.8"/>
                  <path d="M11 5L17 11L11 17L5 11L11 5Z" stroke="#1A1815" strokeWidth="1.5"/>
                </svg>
                <span className="text-xl font-bold tracking-tight text-[#1A1815]">Amthromax</span>
              </div>
              {/* Label */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1815] leading-tight tracking-tight transition-colors duration-300 group-hover:text-black">Our values</h2>
              </div>
            </div>

            {/* Cell 2 — We build */}
            <div className="group p-10 sm:p-12 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] cursor-default transition-colors duration-300 hover:bg-[#E3DED4]">
              <div className="flex items-start">
                <svg width="72" height="72" viewBox="0 0 56 56" fill="none" stroke="#1A1815" strokeWidth="1.6" className="transition-transform duration-300 group-hover:scale-110">
                  <rect x="16" y="16" width="24" height="24" transform="rotate(45 28 28)"/>
                  <rect x="21" y="21" width="14" height="14" transform="rotate(45 28 28)"/>
                  <rect x="25" y="25" width="6" height="6" transform="rotate(45 28 28)"/>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#1A1815] leading-tight transition-colors duration-300 group-hover:text-black">We build</p>
                <p className="text-sm text-[#666057] mt-1 transition-colors duration-300 group-hover:text-[#3A3530]">autonomous infrastructure</p>
              </div>
            </div>

            {/* Cell 3 — We serve */}
            <div className="group p-10 sm:p-12 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] cursor-default transition-colors duration-300 hover:bg-[#E3DED4]">
              <div className="flex items-start">
                <svg width="72" height="72" viewBox="0 0 56 56" fill="none" stroke="#1A1815" strokeWidth="1.6" className="transition-transform duration-300 group-hover:scale-110">
                  <circle cx="22" cy="22" r="12"/>
                  <circle cx="34" cy="22" r="12"/>
                  <circle cx="28" cy="33" r="12"/>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#1A1815] leading-tight transition-colors duration-300 group-hover:text-black">We serve</p>
                <p className="text-sm text-[#666057] mt-1 transition-colors duration-300 group-hover:text-[#3A3530]">our customers first</p>
              </div>
            </div>

            {/* Cell 4 — We think */}
            <div className="group p-10 sm:p-12 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] cursor-default transition-colors duration-300 hover:bg-[#E3DED4]">
              <div className="flex items-start">
                <svg width="72" height="72" viewBox="0 0 56 56" fill="none" stroke="#1A1815" strokeWidth="1.6" className="transition-transform duration-300 group-hover:scale-110">
                  <circle cx="28" cy="28" r="20"/>
                  <circle cx="28" cy="28" r="13"/>
                  <circle cx="28" cy="28" r="7"/>
                  <circle cx="28" cy="28" r="2" fill="#1A1815"/>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#1A1815] leading-tight transition-colors duration-300 group-hover:text-black">We think</p>
                <p className="text-sm text-[#666057] mt-1 transition-colors duration-300 group-hover:text-[#3A3530]">in first principles</p>
              </div>
            </div>

            {/* Cell 5 — We ship */}
            <div className="group p-10 sm:p-12 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] cursor-default transition-colors duration-300 hover:bg-[#E3DED4]">
              <div className="flex items-start">
                <svg width="72" height="72" viewBox="0 0 56 56" fill="none" stroke="#1A1815" strokeWidth="1.6" className="transition-transform duration-300 group-hover:scale-110">
                  <polygon points="28,10 44,20 44,36 28,46 12,36 12,20"/>
                  <polygon points="28,17 38,23 38,33 28,39 18,33 18,23"/>
                  <polygon points="28,24 33,27 33,31 28,34 23,31 23,27"/>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#1A1815] leading-tight transition-colors duration-300 group-hover:text-black">We ship</p>
                <p className="text-sm text-[#666057] mt-1 transition-colors duration-300 group-hover:text-[#3A3530]">fast, with precision and care</p>
              </div>
            </div>

            {/* Cell 6 — We win */}
            <div className="group p-10 sm:p-12 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] cursor-default transition-colors duration-300 hover:bg-[#E3DED4]">
              <div className="flex items-start">
                <svg width="72" height="72" viewBox="0 0 56 56" fill="none" stroke="#1A1815" strokeWidth="1.6" className="transition-transform duration-300 group-hover:scale-110">
                  <circle cx="28" cy="28" r="4"/>
                  {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
                    const rad = (deg * Math.PI) / 180;
                    const x1 = 28 + 9 * Math.cos(rad);
                    const y1 = 28 + 9 * Math.sin(rad);
                    const x2 = 28 + (i % 3 === 0 ? 20 : 15) * Math.cos(rad);
                    const y2 = 28 + (i % 3 === 0 ? 20 : 15) * Math.sin(rad);
                    return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2}/>;
                  })}
                </svg>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#1A1815] leading-tight transition-colors duration-300 group-hover:text-black">We win</p>
                <p className="text-sm text-[#666057] mt-1 transition-colors duration-300 group-hover:text-[#3A3530]">with intelligence and integrity</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Event Agenda & Schedule Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">

        {/* Kickoff Presentation Style — Neon Lime Scope Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 w-full rounded-[20px] sm:rounded-[28px] bg-[#CCFF00] border-[3px] border-black shadow-[6px_6px_0px_0px_#000] overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[480px]">
            {/* Left: Heading */}
            <div className="flex flex-col justify-center p-10 sm:p-14 lg:p-20 border-b md:border-b-0 md:border-r border-black">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-[1.0] tracking-tight">
                AMTHROMAX'S<br />Next AI
              </h2>
            </div>

            {/* Right: AI Pillars */}
            <div className="flex flex-col justify-center gap-5 p-10 sm:p-12 lg:p-16">
              {[
                {
                  label: "01",
                  title: "Autonomous Reasoning Engine",
                  desc: "A frontier model capable of multi-step enterprise reasoning without human intervention.",
                },
                {
                  label: "02",
                  title: "Real-Time Agent Orchestration",
                  desc: "Deploy swarms of AI agents that collaborate, self-correct, and execute at scale.",
                },
                {
                  label: "03",
                  title: "Unified Data Intelligence",
                  desc: "Ingest, process, and act on petabyte-scale streams with zero-latency pipelines.",
                },
                {
                  label: "04",
                  title: "Enterprise-Grade Security",
                  desc: "Constitutional AI guardrails with audit trails, RBAC, and SOC 2 compliance built-in.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-0.5">
                  <p className="text-sm font-bold text-black leading-snug">
                    {item.title}
                  </p>
                  <p className="text-xs text-black/60 leading-relaxed max-w-xs">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </section>




      {/* Frequently Asked Questions - High-Fashion Editorial 2-Column Accordion */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#E5E0D6] bg-[#F7F4ED]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="md:col-span-5 lg:col-span-4 sticky top-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#1A1815] tracking-tight leading-[1.15]">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Right Column: Numbered Minimalist Accordion */}
          <div className="md:col-span-7 lg:col-span-8 divide-y divide-[#E0DBD1] border-b border-[#E0DBD1]">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="py-6 sm:py-8 transition-colors duration-200 group cursor-pointer"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                >
                  <div className="flex items-start">

                    {/* Content Container */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className={`text-xl sm:text-2xl font-sans font-semibold tracking-tight transition-colors duration-200 ${isOpen ? 'text-[#1A1815]' : 'text-[#1A1815]/90 group-hover:text-[#000000]'}`}>
                          {faq.question}
                        </h3>
                      </div>

                      {/* Expandable Answer */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs sm:text-sm text-[#5E5850] leading-relaxed max-w-2xl pt-1">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CodeHoomer Ai Full-Page Edge-to-Edge Footer Banner */}
      <section className="w-full bg-black overflow-hidden mt-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full relative overflow-hidden group cursor-pointer"
        >
          <img
            src="/codehoomer_ai.png"
            alt="CodeHoomer Ai"
            className="w-full h-auto max-h-[460px] object-cover object-center block filter brightness-105 contrast-105 group-hover:scale-[1.01] transition-transform duration-1000 ease-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/1be77993-f8d3-4562-b832-732cd2c54131.png';
            }}
          />
        </motion.div>
      </section>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#16161a] border border-[#ccff00]/40 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6"
            >
              <div className="w-16 h-16 bg-[#ccff00]/20 text-[#ccff00] rounded-full flex items-center justify-center mx-auto border border-[#ccff00]/40">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white mb-2">Registration Confirmed!</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Thank you! Your early access slot for the <strong className="text-[#ccff00]">Amthromax Announcement</strong> has been reserved. Check your inbox for access credentials & API keys.
                </p>
              </div>

              <div className="bg-black/60 rounded-xl p-4 border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Access Tier:</span>
                  <span className="text-white font-bold">Enterprise Developer Pass</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Platform:</span>
                  <span className="text-white">Amthromax AI Swarm Studio</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Status:</span>
                  <span className="text-[#ccff00]">Priority Queue Active</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold py-3 rounded-xl transition-all cursor-pointer text-xs"
              >
                Close & View Developer Docs
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Refined Luxury Footer */}
      <footer className="border-t border-[#E5E0D6] py-12 px-6 text-center text-xs text-[#7A736B] bg-[#F7F4ED]">
        <div className="max-w-4xl mx-auto space-y-4">
          <p>© 2026 Amthromax Inc. All rights reserved. Amthromax AI is a registered trademark of Amthromax Inc.</p>
          <div className="flex items-center justify-center gap-6 text-[11px] text-[#403B35]">
            <Link to="/about" className="hover:underline">About Amthromax</Link>
            <span>•</span>
            <Link to="/news" className="hover:underline">News</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
            <span>•</span>
            <Link to="/security" className="hover:underline">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisterLandingPage;
