import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";
import { Link } from "react-router-dom";

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const plans = [
    {
      name: "Developer",
      price: billingCycle === "monthly" ? "$0" : "$0",
      period: "/month",
      desc: "For developers and hobbyists building and testing agentic prototypes in a sandbox environment.",
      features: [
        "10,500 API requests / month",
        "Access to basic cognitive models",
        "Isolated sandbox developer key",
        "Community Discord support",
        "API rate limit: 60 req/min"
      ],
      cta: "Get Sandbox Key",
      highlighted: false,
      link: "/login"
    },
    {
      name: "Pro / Startup",
      price: billingCycle === "monthly" ? "$79" : "$63",
      period: "/month",
      desc: "For growing businesses and startups looking to integrate low-latency AI agents inside production systems.",
      features: [
        "250,000 API requests / month",
        "Access to advanced & fine-tuned models",
        "Semantic cache integration (saves tokens)",
        "Priority model routing (low-latency)",
        "API rate limit: 600 req/min",
        "Email & ticket support (24hr response)"
      ],
      cta: "Start Pro Trial",
      highlighted: true,
      link: "/login"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "For large organizations requiring bank-grade security, dedicated GPU instances, and contract SLAs.",
      features: [
        "Unlimited API queries",
        "Dedicated container runtimes",
        "Zero-trust SAML/OIDC federated auth",
        "Custom fine-tuned cognitive adapters",
        "Immutable compliance trace logging",
        "24/7 priority Slack channel engineer"
      ],
      cta: "Contact Sales",
      highlighted: false,
      link: "/contact"
    }
  ];

  const pricingFaqs = [
    {
      q: "What counts as an API request?",
      a: "Each LLM completion, code interpreter run, database query tool action, or key handshake counts as a single request. Semantic cache hits are delivered in under 15ms and are charged at a 90% discount, helping you preserve your monthly quota."
    },
    {
      q: "Can I customize the Enterprise model adapters?",
      a: "Yes. Enterprise tiers include access to custom fine-tuning services (QLoRA) using your proprietary newsroom, fintech, or logic datasets, deployed onto dedicated and securely isolated GPU resource clusters."
    },
    {
      q: "What happens if I overshoot my monthly limits?",
      a: "We do not suspend your endpoints instantly. Pro subscriptions have soft limits with a modular overage rate ($0.08 per 1,000 requests) billed at the end of the billing cycle. Developer sandboxes are capped at their limits."
    },
    {
      q: "Is there a discount for annual billing cycles?",
      a: "Yes. Switching to annual billing reduces the license fees by 20% on our Pro tier. Multi-year enterprise deployments also receive dedicated volume-based contract discounts."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] text-[#1d1d1f] dark:text-gray-50 font-sans transition-colors duration-300 antialiased">
      <SEO 
        title="Amthromax Pricing | Scalable Plans for AI & Automation" 
        description="Choose the perfect plan for Amthromax. From developer sandboxes to planet-scale enterprise deployments, we scale with your business." 
      />

      {/* Header */}
      <section className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center text-center text-white bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-zinc-950/40 to-black z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,102,204,0.15),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.15em] text-blue-400 font-semibold"
          >
            TRANSPARENT PRICING
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
          >
            Plans That Scale With You
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Build and optimize your workflows without complex calculations. Clear tiers from local sandbox to dedicated clusters.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 md:py-24 space-y-16">
        
        {/* Toggle Billing */}
        <div className="flex justify-center items-center gap-4">
          <span className={`text-xs font-semibold ${billingCycle === "monthly" ? "text-[#1d1d1f] dark:text-white" : "text-[#86868b]"}`}>Monthly billing</span>
          <button 
            type="button"
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly")}
            className="w-12 h-6 bg-[#e5e5e7] dark:bg-white/10 rounded-full relative p-0.5 transition-all select-none cursor-pointer"
          >
            <motion.span 
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-5 h-5 bg-[#0066cc] dark:bg-[#2997ff] rounded-full block shadow-sm" 
              style={{
                marginLeft: billingCycle === "annually" ? "24px" : "0px"
              }}
            />
          </button>
          <span className={`text-xs font-semibold ${billingCycle === "annually" ? "text-[#1d1d1f] dark:text-white" : "text-[#86868b]"} flex items-center gap-2`}>
            <span>Annually billing</span>
            <span className="px-2.5 py-0.5 bg-[#0066cc]/10 text-[#0066cc] dark:bg-[#2997ff]/20 dark:text-[#2997ff] text-[10px] font-semibold rounded-full uppercase tracking-wider">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards - Apple Developer Box Styling */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {plans.map((plan, idx) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -4 }}
              className="p-8 sm:p-10 lg:p-12 rounded-[28px] sm:rounded-[32px] border border-[#e5e5e7] dark:border-white/[0.08] bg-white dark:bg-[#161617] flex flex-col justify-between space-y-8 transition-all duration-300 relative h-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
            >
              {plan.highlighted && (
                <span className="absolute top-0 right-8 -translate-y-1/2 bg-[#0066cc] dark:bg-[#2997ff] text-white px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
                  Recommended
                </span>
              )}
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] dark:text-white">{plan.name}</h3>
                  <p className="text-sm text-[#515154] dark:text-gray-300 leading-relaxed font-normal">
                    {plan.desc}
                  </p>
                </div>
                
                <div className="flex items-baseline gap-1 pt-2">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">{plan.price}</span>
                  <span className="text-sm font-medium text-[#86868b] dark:text-gray-400">{plan.period}</span>
                </div>

                <ul className="space-y-3.5 pt-6 border-t border-[#e5e5e7]/80 dark:border-white/10 text-sm">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#0066cc] dark:text-[#2997ff] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#1d1d1f]/90 dark:text-gray-300 font-normal leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-[#e5e5e7]/60 dark:border-white/10">
                {plan.link === "/contact" ? (
                  <a
                    href="/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full block text-center py-3.5 rounded-full text-sm font-medium transition-all shadow-xs ${
                      plan.highlighted
                        ? "bg-[#0066cc] hover:bg-[#0052a3] text-white"
                        : "bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black"
                    }`}
                  >
                    {plan.cta} ↗
                  </a>
                ) : (
                  <Link
                    to={plan.link}
                    className={`w-full block text-center py-3.5 rounded-full text-sm font-medium transition-all shadow-xs ${
                      plan.highlighted
                        ? "bg-[#0066cc] hover:bg-[#0052a3] text-white"
                        : "bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing Accordion FAQ Section */}
        <section className="bg-white dark:bg-[#161617] rounded-[28px] sm:rounded-[32px] p-8 sm:p-10 lg:p-12 border border-[#e5e5e7] dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] mt-20">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">Pricing & License FAQ</h2>
              <p className="text-[#6e6e73] dark:text-gray-400 text-base leading-relaxed font-normal">
                Get answers to common inquiries regarding quotas, custom optimizations, and multi-user configurations.
              </p>
            </div>

            <div className="space-y-4">
              {pricingFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className="bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[20px] border border-[#e5e5e7]/80 dark:border-white/[0.06] overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-base text-[#1d1d1f] dark:text-white hover:opacity-90 select-none cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className={`text-xl text-[#0066cc] dark:text-[#2997ff] transform transition-transform duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                        ＋
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-2 text-sm sm:text-[15px] text-[#515154] dark:text-gray-300 leading-relaxed font-normal border-t border-[#e5e5e7]/60 dark:border-white/10">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default PricingPage;

