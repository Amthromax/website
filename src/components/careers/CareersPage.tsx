import React from "react";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

const CareersPage: React.FC = () => {
  const jobs = [
    {
      title: "AI Research Scientist (Agentic Frameworks)",
      location: "Remote / Hybrid (Tech City)",
      department: "Research & Modeling",
      desc: "Work on developing next-generation planning, memory structures, and collaborative swarm architectures for autonomous LLM agents.",
      requirements: ["Ph.D. or equivalent research publications in ML/AI", "Deep experience fine-tuning LLMs", "Proficiency with Python, PyTorch, and token optimization frameworks"]
    },
    {
      title: "Senior Distributed Systems Engineer (Platform Core)",
      location: "Tech City Office",
      department: "Engineering",
      desc: "Scale the Amthromax Core execution runtime to handle billions of real-time pipeline requests, optimize caching strategies, and scale sandboxed Docker containers.",
      requirements: ["5+ years experience with Rust, Go, or C++", "Strong knowledge of Kubernetes and microservice networking", "Experience designing semantic caches or database pooling layers"]
    },
    {
      title: "Developer Advocate (SDK & CLI Tools)",
      location: "Remote (Global)",
      department: "Product & Developer Relations",
      desc: "Build relations with our developer community. Author tutorials, manage open-source SDK components, and represent Amthromax at conferences.",
      requirements: ["3+ years in DevRel or technical writing roles", "Excellent writing skills and experience coding in TypeScript/Python", "Active contributor to open-source software libraries"]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      <SEO 
        title="Amthromax Careers | Join the Agentic Revolution" 
        description="Help us build the developer tools, orchestration engines, and secure platforms powering the future of autonomous software." 
      />

      {/* Header */}
      <div className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center text-center text-white bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-zinc-950/40 to-black z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            JOIN AMTHROMAX
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
            Shape the Future of Autonomy
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We are looking for bold engineers, researchers, and creators to help build the bedrock of agentic automation.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20 space-y-20">
        
        {/* Culture / Perks Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Why Amthromax?</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
              Our engineering team is focused on solving deep foundational problems: latency, security, and scale. We offer a high-trust, collaborative workspace.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Remote-First", desc: "Work from anywhere in the world. We offer comprehensive home-office budgets and flexible hours." },
              { title: "Premium Tools", desc: "Receive top-of-the-line equipment (Mac Studio, high-end GPUs) and a dedicated learning stipend." },
              { title: "Data-Driven Culture", desc: "We favor clean telemetry, peer code reviews, and transparent roadmaps over organizational hierarchy." }
            ].map((perk, i) => (
              <div key={i} className="p-6 bg-gray-50 dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] rounded-2xl shadow-sm space-y-2">
                <h4 className="font-bold text-gray-900 dark:text-white">{perk.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job List */}
        <div className="space-y-8 pt-8">
          <div className="border-b border-gray-150 dark:border-white/[0.04] pb-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Open Roles</h3>
          </div>
          <div className="space-y-6">
            {jobs.map((job, idx) => (
              <div 
                key={idx}
                className="p-6 md:p-8 bg-gray-50 dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] rounded-3xl space-y-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/35 px-2 py-0.5 rounded-md uppercase">
                      {job.department}
                    </span>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{job.title}</h4>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{job.location}</p>
                  </div>
                  <button 
                    onClick={() => alert(`To apply for ${job.title}, please send your CV and portfolio to careers@amthromax.com`)}
                    className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-full hover:opacity-90 transition-all select-none"
                  >
                    Apply Now
                  </button>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                  {job.desc}
                </p>

                <div className="space-y-2 pt-2">
                  <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200">Requirements:</h5>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                    {job.requirements.map((req, rIdx) => (
                      <li key={rIdx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default CareersPage;
