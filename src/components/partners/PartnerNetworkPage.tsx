import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

// Custom SVG Icons for Partner Tiers
const IntegratorIcon: React.FC = () => (
  <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ISVIcon: React.FC = () => (
  <svg className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M9 9H15V15H9V9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CloudAllianceIcon: React.FC = () => (
  <svg className="w-8 h-8 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 19C4.01472 19 2 16.9853 2 14.5C2 12.1564 3.79151 10.2314 6.10328 10.0232C6.73292 6.57797 9.74902 4 13.375 4C17.5862 4 21 7.41381 21 11.625C21 11.9602 20.9784 12.2902 20.9364 12.6138C22.1804 13.5684 23 15.0664 23 16.75C23 19.6495 20.6495 22 17.75 22H6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ResellerIcon: React.FC = () => (
  <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7V17M9 10H15M9 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PartnerNetworkPage: React.FC = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    workEmail: "",
    partnerType: "System Integrator (GSI)",
    region: "North America",
    notes: ""
  });

  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: metricsRef, inView: metricsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: programsRef, inView: programsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const partnerPrograms = [
    {
      icon: <IntegratorIcon />,
      title: "Global System Integrators",
      tag: "Enterprise Deployment",
      desc: "Design and implement custom multi-agent topologies, cognitive data lakes, and automated workflow pipelines for Fortune 500 enterprises.",
      benefits: ["Dedicated Partner Architect", "Co-Selling Deal Protection", "40% Tier Margin Rebates"]
    },
    {
      icon: <ISVIcon />,
      title: "Independent Software Vendors",
      tag: "API & Model Embedding",
      desc: "Embed Amthromax high-throughput neural inference models directly into your SaaS products and developer platforms.",
      benefits: ["SDK Early Access", "Whitelabel Licensing Options", "Priority Inference Bandwidth"]
    },
    {
      icon: <CloudAllianceIcon />,
      title: "Cloud & Infrastructure Alliances",
      tag: "Co-Located Edge Nodes",
      desc: "Partner with Amthromax to deploy zero-trust edge nodes, post-quantum cryptographic gateways, and bare-metal AI clusters.",
      benefits: ["Joint Technical Architecture", "Co-Marketing Development Fund", "Direct Transit Peering"]
    },
    {
      icon: <ResellerIcon />,
      title: "Value-Added Resellers",
      tag: "Regional Distribution",
      desc: "Distribute Amthromax enterprise licenses and managed AI services to local enterprise markets with end-to-end support.",
      benefits: ["Tiered Margin Rewards", "Turnkey Sales Enablement", "Dedicated Account Manager"]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <SEO 
        title="Amthromax Partner Network | Global Enterprise Ecosystem" 
        description="Join the Amthromax Partner Network. Accelerate enterprise AI deployment with system integrators, ISVs, cloud alliances, and resellers." 
      />

      {/* Top Header Label Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center text-xs text-gray-400 font-sans">
        <a 
          href="/overview" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 text-gray-300 hover:text-white font-semibold transition-colors cursor-pointer group"
        >
          <span>Overview</span>
          <span className="text-sm font-bold leading-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
        </a>

        <a 
          href="/contact" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 text-gray-300 hover:text-white font-semibold transition-colors cursor-pointer group"
        >
          <span>Contact Sales</span>
          <span className="text-sm font-bold leading-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
        </a>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/10 to-purple-600/20 blur-[130px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white font-sans leading-tight">
            Amthromax Global Partner Network
          </h1>

          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed font-sans">
            Powering next-generation enterprise AI together. Join our global network of system integrators, ISVs, cloud alliances, and technology partners driving autonomous intelligence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsApplyModalOpen(true);
                setIsSubmitted(false);
              }}
              className="px-8 py-3.5 bg-white text-black font-extrabold rounded-full text-xs hover:bg-gray-150 transition-all shadow-xl font-sans cursor-pointer flex items-center gap-2"
            >
              <span>Apply to Partner Network</span>
              <span className="text-sm font-bold leading-none">↗</span>
            </button>
            <a
              href="/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-black border border-white/20 text-white font-bold rounded-full text-xs hover:bg-white/10 transition-all font-sans cursor-pointer flex items-center gap-2"
            >
              <span>System Overview</span>
              <span className="text-sm font-bold leading-none">↗</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Network Metrics Bar */}
      <div ref={metricsRef} className="bg-[#08080a] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "500+", label: "Global Enterprise Partners" },
              { value: "40+", label: "Cloud Region Hubs" },
              { value: "99.999%", label: "Joint Service Level Agreement" },
              { value: "$10M+", label: "Partner Co-Development Fund" }
            ].map((metric, idx) => (
              <div key={idx} className="space-y-2 p-4">
                <div className="text-3xl md:text-4xl font-black text-white tracking-tight font-sans">
                  {metric.value}
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider font-sans">
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Partner Programs Section */}
      <div ref={programsRef} className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-sans">
            Programs Tailored for Scale
          </h2>
          <p className="text-sm md:text-base text-gray-400 font-medium font-sans">
            Choose the partner track that aligns with your organization’s core expertise and client deployment capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partnerPrograms.map((prog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={programsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 md:p-10 rounded-[28px] sm:rounded-[32px] bg-white border border-gray-200/80 space-y-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-3.5 rounded-2xl bg-gray-100 border border-gray-200/60 group-hover:bg-gray-200/60 transition-colors">
                    {prog.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#0066cc] uppercase tracking-widest font-sans">
                    {prog.tag}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">
                    {prog.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-normal font-sans">
                    {prog.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-gray-200/80">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block">Key Track Benefits</span>
                  <ul className="space-y-2">
                    {prog.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="text-xs text-gray-700 flex items-center gap-2 font-sans font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, partnerType: prog.title }));
                    setIsApplyModalOpen(true);
                    setIsSubmitted(false);
                  }}
                  className="w-full py-3.5 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl text-xs transition-all font-sans cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Apply for {prog.title}</span>
                  <span className="text-sm">↗</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ecosystem Benefits Grid */}
      <div className="bg-[#050507] border-y border-white/10 py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-sans">
              Partner Network Advantages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Joint Co-Selling & Protection",
                desc: "Register your client deals directly in our partner portal with guaranteed margin protection and co-sell assistance from Amthromax enterprise reps."
              },
              {
                title: "Unlimited Developer Credits",
                desc: "Gain unlimited sandbox environments, high-throughput model API keys, and early access to unreleased neural models for benchmarking."
              },
              {
                title: "Co-Marketing & MDF Funding",
                desc: "Access dedicated Market Development Funds (MDF) to host joint technical workshops, executive roundtables, and regional AI summits."
              }
            ].map((adv, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-black border border-white/15 space-y-4 shadow-xl">
                <h3 className="text-xl font-bold text-white font-sans tracking-tight">{adv.title}</h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partner Application Modal */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-lg bg-[#161618] border border-white/[0.12] rounded-[32px] sm:rounded-[36px] p-8 md:p-10 space-y-6 shadow-[0_32px_80px_rgba(0,0,0,0.8)] relative overflow-hidden text-white"
            >
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 hover:bg-white/[0.15] flex items-center justify-center text-gray-300 hover:text-white transition-all cursor-pointer z-10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {isSubmitted ? (
                <div className="text-center py-8 space-y-5">
                  <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto text-blue-400 text-2xl font-bold shadow-inner">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Application Received</h3>
                  <p className="text-sm text-gray-300 max-w-sm mx-auto leading-relaxed font-normal">
                    Thank you for applying to the Amthromax Partner Network. Our Alliance Management team will review your organization details and reach out within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-8 py-3.5 bg-white text-black font-bold text-xs rounded-full cursor-pointer hover:bg-gray-150 transition-all shadow-md uppercase tracking-wider"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Join Partner Ecosystem</h3>
                  </div>

                  <div className="space-y-4 pt-1">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                        Company / Organization Name <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Apex Systems Integrators"
                        className="w-full px-4.5 py-3.5 bg-[#0a0a0c] border border-white/[0.1] rounded-2xl text-sm text-white placeholder:text-gray-500 font-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                        Work Email <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="partnerships@company.com"
                        className="w-full px-4.5 py-3.5 bg-[#0a0a0c] border border-white/[0.1] rounded-2xl text-sm text-white placeholder:text-gray-500 font-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                        Primary Partner Track
                      </label>
                      <select
                        value={formData.partnerType}
                        onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                        className="w-full px-4.5 py-3.5 bg-[#0a0a0c] border border-white/[0.1] rounded-2xl text-sm text-white font-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1.25rem_center] bg-no-repeat pr-10"
                      >
                        <option className="bg-[#161618] text-white font-normal py-2" value="System Integrator (GSI)">System Integrator (GSI)</option>
                        <option className="bg-[#161618] text-white font-normal py-2" value="Independent Software Vendor (ISV)">Independent Software Vendor (ISV)</option>
                        <option className="bg-[#161618] text-white font-normal py-2" value="Cloud & Infrastructure Alliance">Cloud & Infrastructure Alliance</option>
                        <option className="bg-[#161618] text-white font-normal py-2" value="Value-Added Reseller">Value-Added Reseller</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                        Region
                      </label>
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="w-full px-4.5 py-3.5 bg-[#0a0a0c] border border-white/[0.1] rounded-2xl text-sm text-white font-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1.25rem_center] bg-no-repeat pr-10"
                      >
                        <option className="bg-[#161618] text-white font-normal py-2" value="North America">North America</option>
                        <option className="bg-[#161618] text-white font-normal py-2" value="Europe / Middle East">Europe / Middle East</option>
                        <option className="bg-[#161618] text-white font-normal py-2" value="Asia Pacific">Asia Pacific</option>
                        <option className="bg-[#161618] text-white font-normal py-2" value="Latin America">Latin America</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                        Technical Integration Goals (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Brief description of your client deployment requirements..."
                        className="w-full px-4.5 py-3.5 bg-[#0a0a0c] border border-white/[0.1] rounded-2xl text-sm text-white placeholder:text-gray-500 font-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-white hover:bg-gray-100 text-black font-bold text-sm rounded-2xl shadow-xl transition-all cursor-pointer mt-4 flex items-center justify-center gap-2 group"
                  >
                    <span>Submit Partner Application</span>
                    <span className="text-base font-bold group-hover:translate-x-0.5 transition-transform">↗</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default PartnerNetworkPage;
