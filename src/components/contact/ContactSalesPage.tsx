import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const INQUIRY_OPTIONS = [
  { 
    value: "500+ Seats Enterprise Licensing", 
    label: "Enterprise deployment (500+ seats)", 
    desc: "For teams requiring 500+ seats, custom SSO, RBAC & dedicated SLA agreements" 
  },
  { 
    value: "HIPAA / BAA & Governance", 
    label: "HIPAA / BAA & Governance", 
    desc: "For healthcare, finance & strictly regulated compliance data workloads" 
  },
  { 
    value: "Dedicated Private Cloud GPU Cluster", 
    label: "Dedicated Private Cloud GPU Cluster", 
    desc: "Single-tenant isolated AI infrastructure with guaranteed high-throughput compute" 
  },
  { 
    value: "Custom Fine-Tuned Model Weights", 
    label: "Custom Fine-Tuned Model Weights (Morfix / Cotises)", 
    desc: "Proprietary model training on enterprise datasets with zero-data retention" 
  },
  { 
    value: "Other Complex Deployment", 
    label: "Other Complex Deal Requirement", 
    desc: "Custom contracts, custom hardware integrations or partner reseller requests" 
  }
];

export const ContactSalesPage: React.FC = () => {
  // Form State for Complex Needs section
  const [inquiryType, setInquiryType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    companyName: "",
    teamSize: "500+",
    phoneNumber: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Chat Agent Modal state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "agent" | "user"; text: string }>>([
    {
      sender: "agent",
      text: "Hello! I am the Amthromax Buying Agent. I can help you calculate custom token volume, configure dedicated GPU clusters, or generate an instant Enterprise quote. What can I help you with today?"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  // Dropdown header menu state
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSendChatMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");
    setIsAgentTyping(true);

    setTimeout(() => {
      setIsAgentTyping(false);
      let reply = "Thank you! Based on your requirement, our Amthromax Enterprise plan offers unlimited API queries, zero-trust SAML/OIDC federated auth, and dedicated GPU clusters. Would you like me to connect you directly with an AI Solution Architect?";
      
      if (userMsg.toLowerCase().includes("pricing") || userMsg.toLowerCase().includes("cost")) {
        reply = "Our Enterprise plan is customized based on your token scale and private cloud deployment (AWS/Azure/GCP). Standard seats start at $79/mo for Pro, and Enterprise includes dedicated SLA guarantees.";
      } else if (userMsg.toLowerCase().includes("morfix") || userMsg.toLowerCase().includes("intox") || userMsg.toLowerCase().includes("cotises") || userMsg.toLowerCase().includes("model")) {
        reply = "We offer custom fine-tuned adapters for MORFIX 0.1, INTOX 0.2, COTISES 0.5 MAX, and VERKOX 0.4 INSTANT with private weights and zero data retention.";
      }

      setChatMessages(prev => [...prev, { sender: "agent", text: reply }]);
    }, 1000);
  };

  return (
    <div className="bg-[#0b0b0c] min-h-screen text-white font-sans selection:bg-white/10 relative">
      <SEO 
        title="Contact Sales | Amthromax" 
        description="Get started on your own or contact the Amthromax sales team for complex deployments, 500+ seat plans, and BAAs." 
      />

      {/* Top Header Label Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-4 flex justify-between items-center text-xs text-gray-400">
        <span className="font-medium text-gray-400">Contact sales</span>
        
        {/* Explore here dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsExploreOpen(!isExploreOpen)}
            className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors cursor-pointer text-xs font-medium"
          >
            <span>Explore here</span>
            <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isExploreOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {isExploreOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute right-0 mt-2 w-48 bg-[#161618] border border-white/10 rounded-xl shadow-xl z-50 py-2"
              >
                <Link to="/products" className="block px-4 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Products Overview</Link>
                <Link to="/pricing" className="block px-4 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Pricing & Plans</Link>
                <Link to="/research" className="block px-4 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Research Whitepapers</Link>
                <Link to="/docs" className="block px-4 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Documentation</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="max-w-4xl mx-auto px-6 pt-6 pb-20 text-center space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-5xl md:text-7xl font-sans text-white tracking-tight font-extrabold"
        >
          Contact sales
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Get started on your own or contact the sales team for complex deployments.
        </motion.p>
      </section>

      {/* SECTION 1: For quick results */}
      <section className="max-w-6xl mx-auto px-6 pb-24 border-b border-white/[0.06]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Text (4 Columns) */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-3xl md:text-5xl font-sans text-white font-bold tracking-tight">
              For quick results
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Get started on your own without waiting on us.
            </p>
          </div>

          {/* Right Cards Grid (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Get the Enterprise plan */}
              <div className="p-8 rounded-3xl bg-[#131315] border border-white/[0.08] flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Arch Doorway Icon */}
                  <div className="w-12 h-12 text-white/90 flex items-center justify-start">
                    <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 20V8a7 7 0 0114 0v12" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20v-5a2 2 0 014 0v5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-sans text-white font-bold tracking-tight">Get the Enterprise plan</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Buy or upgrade to Enterprise yourself. Check out in minutes with a credit card.
                  </p>
                </div>

                <div className="space-y-6 pt-4 border-t border-white/[0.06]">
                  <div className="flex items-start space-x-2 text-xs text-gray-300">
                    <span className="text-gray-400 mt-0.5">✓</span>
                    <span>Best if you know exactly what you need and are ready to check out</span>
                  </div>
                  
                  <Link 
                    to="/pricing" 
                    className="block w-full text-center py-3 bg-white hover:bg-gray-200 text-black font-semibold text-xs rounded-xl transition-all"
                  >
                    Get Enterprise
                  </Link>
                </div>
              </div>

              {/* Card 2: Chat with buying agent */}
              <div className="p-8 rounded-3xl bg-[#131315] border border-white/[0.08] flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Speech Bubble with 3 Dots Icon */}
                  <div className="w-12 h-12 text-white/90 flex items-center justify-start">
                    <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5c0 4.695-4.03 8.5-9 8.5a9.86 9.86 0 01-4.255-.949L3 20.5l1.395-3.72C3.512 15.442 3 13.524 3 11.5 3 6.805 7.03 3 12 3s9 3.805 9 8.5z" />
                      <circle cx="8.5" cy="11.5" r="0.75" fill="currentColor" stroke="none" />
                      <circle cx="12" cy="11.5" r="0.75" fill="currentColor" stroke="none" />
                      <circle cx="15.5" cy="11.5" r="0.75" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-sans text-white font-bold tracking-tight">Chat with buying agent</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Ask any questions you have, get a personalized quote, and check out today. Our buying agent can escalate to the sales team when needed.
                  </p>
                </div>

                <div className="space-y-6 pt-4 border-t border-white/[0.06]">
                  <div className="flex items-start space-x-2 text-xs text-gray-300">
                    <span className="text-gray-400 mt-0.5">✓</span>
                    <span>Best if you have questions you need answered before purchasing</span>
                  </div>
                  
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="block w-full text-center py-3 bg-white hover:bg-gray-200 text-black font-semibold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Chat now
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Support Banner Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#131315] border border-white/[0.08] flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-xs text-gray-300 leading-relaxed max-w-xl">
                More help, right this way. Browse articles, see product details, and get answers to technical questions.
              </p>
              <Link 
                to="/docs"
                className="whitespace-nowrap px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-xs font-semibold text-white transition-all"
              >
                Visit support center
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: For complex needs */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-b border-white/[0.06]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Text (4 Columns) */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-3xl md:text-5xl font-sans text-white font-bold tracking-tight">
              For complex needs
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Our sales team can only support complex deals, like 500+ seat deployments and BAAs. For the fastest support, chat with our buying agent above.
            </p>
          </div>

          {/* Right Form Card (8 Columns) */}
          <div className="lg:col-span-8">
            <div className="p-8 md:p-10 rounded-3xl bg-[#131315] border border-white/[0.08] space-y-6">
              
              {/* Custom Premium Selector Box */}
              <div className="space-y-2 relative" ref={dropdownRef}>
                <label className="text-xs font-bold text-gray-300">
                  What can we help you with? <span className="text-rose-400">*</span>
                </label>
                
                {/* Custom Box Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-5 py-4 bg-[#18181b] hover:bg-[#1f1f23] border border-white/15 focus:border-white/40 rounded-2xl text-sm text-white flex items-center justify-between transition-all duration-200 cursor-pointer shadow-inner group"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <span className={inquiryType ? "text-white font-semibold truncate" : "text-gray-400 truncate"}>
                      {inquiryType 
                        ? INQUIRY_OPTIONS.find(o => o.value === inquiryType)?.label || inquiryType 
                        : "Please select an enterprise requirement..."}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 pl-2">
                    {inquiryType && (
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20 font-medium">
                        Selected
                      </span>
                    )}
                    <svg 
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:text-white ${isDropdownOpen ? "rotate-180 text-white" : ""}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Custom Premium Floating Popover Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.99 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 right-0 mt-2 z-50 p-2 bg-[#161618] border border-white/20 rounded-2xl shadow-2xl backdrop-blur-2xl space-y-1 overflow-hidden max-h-[360px] overflow-y-auto"
                    >
                      {INQUIRY_OPTIONS.map((opt) => {
                        const isSelected = inquiryType === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setInquiryType(opt.value);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3.5 rounded-xl transition-all flex items-start justify-between group cursor-pointer ${
                              isSelected 
                                ? "bg-white/10 text-white border border-white/20" 
                                : "hover:bg-white/[0.07] text-gray-300 hover:text-white border border-transparent"
                            }`}
                          >
                            <div className="space-y-1 pr-3">
                              <div className="text-sm font-semibold flex items-center gap-2">
                                <span>{opt.label}</span>
                              </div>
                              <div className="text-xs text-gray-400 leading-normal font-normal">
                                {opt.desc}
                              </div>
                            </div>

                            {isSelected ? (
                              <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                                ✓
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-white/20 group-hover:border-white/50 shrink-0 mt-0.5 transition-colors" />
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dynamic Form fields when dropdown option selected */}
              <AnimatePresence>
                {inquiryType !== "" && (
                  <motion.form 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 pt-4 border-t border-white/[0.08]"
                  >
                    {isSubmitted ? (
                      <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-3">
                        <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-xl font-bold">
                          ✓
                        </div>
                        <h4 className="text-xl font-bold text-white">Inquiry Received</h4>
                        <p className="text-xs text-gray-300">
                          Thank you, <span className="text-white font-semibold">{formData.firstName}</span>. An Amthromax Enterprise Specialist will review your request for <span className="text-white font-semibold">{inquiryType}</span> and contact <span className="text-white font-semibold">{formData.workEmail}</span>.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-300">First Name *</label>
                            <input 
                              type="text" 
                              name="firstName"
                              required
                              value={formData.firstName}
                              onChange={handleFormChange}
                              placeholder="First name"
                              className="w-full px-4 py-3 bg-[#1c1c1f] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-300">Last Name *</label>
                            <input 
                              type="text" 
                              name="lastName"
                              required
                              value={formData.lastName}
                              onChange={handleFormChange}
                              placeholder="Last name"
                              className="w-full px-4 py-3 bg-[#1c1c1f] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-300">Work Email *</label>
                            <input 
                              type="email" 
                              name="workEmail"
                              required
                              value={formData.workEmail}
                              onChange={handleFormChange}
                              placeholder="name@company.com"
                              className="w-full px-4 py-3 bg-[#1c1c1f] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-300">Company Name *</label>
                            <input 
                              type="text" 
                              name="companyName"
                              required
                              value={formData.companyName}
                              onChange={handleFormChange}
                              placeholder="Organization name"
                              className="w-full px-4 py-3 bg-[#1c1c1f] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-300">Deployment Details / Message</label>
                          <textarea 
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={handleFormChange}
                            placeholder="Tell us about your target seat count, architecture requirements, or timeline..."
                            className="w-full px-4 py-3 bg-[#1c1c1f] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                          />
                        </div>

                        <div>
                          <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-white text-black font-semibold text-xs rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
                          >
                            {isSubmitting ? "Submitting..." : "Submit"}
                          </button>
                        </div>
                      </>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>

              {inquiryType === "" && (
                <div>
                  <button 
                    type="button" 
                    onClick={() => setInquiryType("500+ Seats Enterprise Licensing")}
                    className="px-6 py-3 bg-white/90 hover:bg-white text-black font-semibold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: Transform Banner */}
      <section className="max-w-7xl mx-auto px-6 py-28 text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-sans text-white font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          Transform how your organization operates with Amthromax
        </h2>
        
        <div>
          <Link 
            to="/login"
            className="inline-block px-8 py-3.5 bg-white hover:bg-gray-200 text-black font-semibold text-sm rounded-xl transition-all shadow-lg"
          >
            Get started
          </Link>
        </div>
      </section>

      {/* Buying Agent Chat Drawer Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end"
            onClick={() => setIsChatOpen(false)}
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-[#131315] border-l border-white/10 h-full flex flex-col justify-between p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white text-black font-black text-xs flex items-center justify-center">
                    A
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Amthromax Buying Agent</h3>
                    <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      Active & ready to quote
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              {/* Chat Message List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[85%] p-3.5 rounded-2xl ${
                        msg.sender === "user" 
                          ? "bg-white text-black font-medium" 
                          : "bg-[#1f1f23] text-gray-200 border border-white/10"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isAgentTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#1f1f23] p-3 rounded-2xl text-gray-400 italic">
                      Buying agent is typing...
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendChatMessage} className="pt-3 border-t border-white/10 flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about pricing, enterprise seats, models..."
                  className="flex-1 px-4 py-2.5 bg-[#1f1f23] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
                />
                <button 
                  type="submit"
                  className="px-4 py-2.5 bg-white text-black font-bold text-xs rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Send
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ContactSalesPage;
