import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

export const ContactSalesPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    companyName: "",
    teamSize: "11-50",
    primaryInterest: "Enterprise AI Agent Networks",
    monthlyVolume: "1M - 10M Tokens",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate high-speed form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-[#0b0b0c] min-h-screen text-white pt-24 font-sans selection:bg-white/10">
      <SEO 
        title="Contact Sales | Amthromax" 
        description="Get started on your own or contact the Amthromax enterprise sales team for complex deployments and dedicated compute." 
      />

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-16 text-center space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-serif text-white tracking-tight font-normal"
        >
          Contact sales
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-300 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Get started on your own or contact the sales team for complex deployments.
        </motion.p>
      </section>

      {/* Main Content Grid: Contact Form & Enterprise Highlights */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Form Card (7 Columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 p-8 md:p-10 rounded-3xl bg-[#131315] border border-white/[0.08] shadow-2xl space-y-8"
          >
            <div className="border-b border-white/[0.08] pb-6 space-y-2">
              <h2 className="text-2xl font-bold text-white">Tell us about your project</h2>
              <p className="text-xs text-gray-400">An Amthromax AI Solution Architect will reach out within 24 hours.</p>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-4 py-12"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-white">{formData.firstName}</span>. Our enterprise architecture team has received your message and will contact <span className="font-semibold text-white">{formData.workEmail}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        workEmail: "",
                        companyName: "",
                        teamSize: "11-50",
                        primaryInterest: "Enterprise AI Agent Networks",
                        monthlyVolume: "1M - 10M Tokens",
                        message: ""
                      });
                    }}
                    className="mt-4 px-6 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold rounded-xl text-white transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">First Name *</label>
                      <input 
                        type="text" 
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Sarah"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Last Name *</label>
                      <input 
                        type="text" 
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Connor"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Work Email & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Work Email *</label>
                      <input 
                        type="email" 
                        name="workEmail"
                        required
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="sarah@company.com"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Company Name *</label>
                      <input 
                        type="text" 
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Acme Systems"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Team Size & Primary Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Company Size</label>
                      <select 
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#1a1a1c] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
                      >
                        <option value="1-10">1 - 10 employees</option>
                        <option value="11-50">11 - 50 employees</option>
                        <option value="51-200">51 - 200 employees</option>
                        <option value="201-1000">201 - 1000 employees</option>
                        <option value="1000+">1000+ Enterprise</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Primary Interest</label>
                      <select 
                        name="primaryInterest"
                        value={formData.primaryInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#1a1a1c] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
                      >
                        <option value="Enterprise AI Agent Networks">AI Agent Networks</option>
                        <option value="Custom Model Fine-Tuning">Fine-Tuned Cognitive Models</option>
                        <option value="Dedicated Cloud Compute & Runtimes">Private Cloud Compute</option>
                        <option value="Security & Governance Audit">Zero-Trust Security & SLAs</option>
                        <option value="Other">Other Custom Solution</option>
                      </select>
                    </div>
                  </div>

                  {/* Expected Monthly Volume */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Expected Inference Scale</label>
                    <select 
                      name="monthlyVolume"
                      value={formData.monthlyVolume}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1a1a1c] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
                    >
                      <option value="< 1M Tokens">&lt; 1 Million Tokens / month</option>
                      <option value="1M - 10M Tokens">1 Million - 10 Million Tokens / month</option>
                      <option value="10M - 100M Tokens">10 Million - 100 Million Tokens / month</option>
                      <option value="100M+ Tokens">100 Million+ Enterprise Scale</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Project Details / Requirements</label>
                    <textarea 
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your current tech stack, target latency requirements, or custom model needs..."
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-white text-black font-bold text-sm rounded-xl hover:bg-gray-200 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <span>Contact Sales Team</span>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Highlights Column (5 Columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Enterprise Support Box */}
            <div className="p-8 rounded-3xl bg-[#131315] border border-white/[0.08] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-lg">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-white">99.99% SLA & Priority Support</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Dedicated Slack & Teams channel with senior Amthromax AI engineers, 15-minute emergency response SLAs, and custom deployment monitoring.
              </p>
            </div>

            {/* Private Cloud Deployments */}
            <div className="p-8 rounded-3xl bg-[#131315] border border-white/[0.08] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-lg">
                🔒
              </div>
              <h3 className="text-lg font-bold text-white">Private VPC & On-Premises</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Deploy MORFIX, INTOX, COTISES, and VERKOX within your own AWS, GCP, Azure, or air-gapped infrastructure with zero data egress.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 space-y-4">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Direct Contact</span>
              <div className="space-y-2">
                <p className="text-xs text-gray-400">Prefer direct email?</p>
                <a 
                  href="mailto:sales@amthromax.com" 
                  className="text-base font-bold text-white hover:underline block font-mono"
                >
                  sales@amthromax.com
                </a>
              </div>
              <div className="pt-2 border-t border-white/[0.06] text-xs text-gray-400 space-y-1">
                <p><strong className="text-white">San Francisco HQ:</strong> 500 Howard St, San Francisco, CA</p>
                <p><strong className="text-white">London Office:</strong> 1 Bank Street, Canary Wharf, London</p>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactSalesPage;
