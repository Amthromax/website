import React, { useState } from "react";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";
import { Link } from "react-router-dom";

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  const plans = [
    {
      name: "Developer",
      price: billingCycle === "monthly" ? "$0" : "$0",
      period: "/month",
      desc: "For developers and hobbyists building and testing agentic prototypes in a sandbox environment.",
      features: [
        "10,000 API requests / month",
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      <SEO 
        title="Amthromax Pricing | Scalable Plans for AI & Automation" 
        description="Choose the perfect plan for Amthromax. From developer sandboxes to planet-scale enterprise deployments, we scale with your business." 
      />

      {/* Header */}
      <div className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center text-center text-white bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-zinc-950/40 to-black z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            TRANSPARENT PRICING
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
            Plans That Scale With You
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Build and optimize your workflows without complex calculations. Clear tiers from local sandbox to dedicated clusters.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        
        {/* Toggle Billing */}
        <div className="flex justify-center items-center gap-4">
          <span className={`text-xs font-bold ${billingCycle === "monthly" ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>Monthly billing</span>
          <button 
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly")}
            className="w-12 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full relative p-0.5 transition-all select-none"
          >
            <span className={`w-5 h-5 bg-black dark:bg-white rounded-full block transition-transform duration-300 ${billingCycle === "annually" ? "translate-x-6" : ""}`} />
          </button>
          <span className={`text-xs font-bold ${billingCycle === "annually" ? "text-gray-900 dark:text-white" : "text-gray-400"} flex items-center gap-1.5`}>
            <span>Annually billing</span>
            <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-450 text-[10px] font-black rounded-full uppercase">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`p-8 rounded-3xl border flex flex-col justify-between space-y-8 transition-all duration-300 relative ${
                plan.highlighted 
                  ? "bg-black text-white dark:bg-[#161617] border-blue-500/50 shadow-xl ring-1 ring-blue-500/20 lg:-translate-y-4" 
                  : "bg-gray-50 dark:bg-[#161617]/50 border-gray-150 dark:border-white/[0.04] shadow-sm hover:shadow-md"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                  Recommended
                </span>
              )}
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className={`text-xs leading-relaxed ${plan.highlighted ? "text-gray-400" : "text-gray-500 dark:text-gray-400"}`}>
                    {plan.desc}
                  </p>
                </div>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className={`text-xs ${plan.highlighted ? "text-gray-400" : "text-gray-500"}`}>{plan.period}</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-gray-100/10 dark:border-zinc-800/80 text-xs">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="text-emerald-500 text-sm font-bold">✓</span>
                      <span className={plan.highlighted ? "text-gray-300" : "text-gray-600 dark:text-gray-300"}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Link
                  to={plan.link}
                  className={`w-full block text-center py-3.5 rounded-full text-xs font-bold transition-all shadow-sm hover:shadow-md ${
                    plan.highlighted
                      ? "bg-white hover:bg-gray-150 text-black"
                      : "bg-black hover:bg-gray-900 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default PricingPage;
