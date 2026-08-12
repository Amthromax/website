import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { newsItems } from "../blog/blogData";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const NewsDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();

  const article = newsItems.find((item) => item.id === articleId) || newsItems[0];
  const recommendations = newsItems.filter((item) => item.id !== article.id).slice(0, 3);

  // TOC items per article ID or fallback
  const defaultTocMap: Record<string, { id: string; title: string }[]> = {
    "what-is-a-sales-funnel": [
      { id: "key-takeaways", title: "Key Takeaways" },
      { id: "sales-funnel-2026", title: "What Is a Sales Funnel? The 2026 Definition" },
      { id: "non-linear-funnels", title: "Why Modern Sales Funnels Are Non-Linear" },
      { id: "stages-b2b-funnel", title: "The 6 Stages of an Effective B2B Sales Funnel" },
      { id: "sales-marketing-alignment", title: "Sales and Marketing Alignment: The 208% Revenue Multiplier" },
      { id: "funnel-metrics", title: "Data-Driven Funnel Optimization: Key Metrics" },
      { id: "common-mistakes", title: "Common Sales Funnel Mistakes to Avoid" },
      { id: "platform-consolidation", title: "The Case for Platform Consolidation" },
      { id: "faq", title: "Frequently Asked Questions" },
      { id: "start-building", title: "Start Building Your Data-Driven Sales Funnel" }
    ],
    "inbound-vs-outbound-marketing": [
      { id: "key-takeaways", title: "Key Takeaways" },
      { id: "inbound-marketing", title: "Inbound Marketing: Get Found, Not Ignored" },
      { id: "outbound-marketing", title: "Outbound Marketing: Start the Conversation" },
      { id: "dont-pick-stack", title: "Inbound vs Outbound: Don't Pick — Stack" },
      { id: "tactics-work", title: "Tactics That Actually Work in 2026" },
      { id: "real-relationships", title: "Marketing That Builds Real Relationships" },
      { id: "amthromax-play", title: "The Amthromax Play: Turn Strategy Into Revenue" }
    ]
  };

  const tocItems = defaultTocMap[article.id] || [
    { id: "key-takeaways", title: "Key Takeaways" },
    { id: "inbound-marketing", title: "Inbound Marketing: Get Found, Not Ignored" },
    { id: "outbound-marketing", title: "Outbound Marketing: Start the Conversation" },
    { id: "dont-pick-stack", title: "Inbound vs Outbound: Don't Pick — Stack" },
    { id: "tactics-work", title: "Tactics That Actually Work in 2026" },
    { id: "real-relationships", title: "Marketing That Builds Real Relationships" },
    { id: "amthromax-play", title: "The Amthromax Play: Turn Strategy Into Revenue" }
  ];

  const [activeSectionId, setActiveSectionId] = useState<string>(tocItems[1]?.id || tocItems[0]?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height + 300) {
            setActiveSectionId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300 min-h-screen font-sans">
      <SEO
        title={`${article.title} | Amthromax Insights`}
        description={article.summary}
      />

      {/* Hero Header Section */}
      <section className="bg-[#f7f6f2] dark:bg-[#141415] border-b border-gray-200/70 dark:border-white/5 py-12 sm:py-16 lg:py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Header Info */}
            <div className="lg:col-span-12 space-y-6 max-w-4xl">
              {/* Breadcrumb Navigation */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400">
                <Link to="/newsroom" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Insights
                </Link>
                <span className="text-gray-400">&gt;</span>
                <Link to="/newsroom" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  {article.category}
                </Link>
                <span className="text-gray-400">&gt;</span>
                <span className="text-gray-900 dark:text-white font-bold truncate max-w-[280px]">
                  {article.title}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-sans text-gray-950 dark:text-white tracking-tight leading-[1.1]">
                {article.title}
              </h1>

              {/* Date */}
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {article.date || "March 1, 2025"}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  className="bg-gray-950 dark:bg-white text-white dark:text-gray-950 font-bold text-sm px-5 py-2.5 rounded-lg shadow-sm hover:opacity-90 transition-all cursor-pointer"
                >
                  Sign up for free
                </button>
              </div>

              {/* Author Badge */}
              <div className="flex items-center pt-2">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/10 p-1.5 flex items-center justify-center border border-gray-200/80 dark:border-white/10 shadow-xs shrink-0">
                  <img
                    src="/images/amthromax_asterisk_logo.png"
                    alt="Amthromax Logo"
                    className="w-full h-full object-contain dark:invert"
                  />
                </div>
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200 ml-3">
                  Written by The Amthromax Team
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area: Minimal Clean Table of Contents + Article Body */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Minimal Table of Contents Sidebar (Matching Screenshot) */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-28">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-800 dark:text-gray-200 mb-4 block select-none">
              TABLE &nbsp;OF &nbsp;CONTENTS
            </h4>
            
            <nav className="divide-y divide-gray-200/80 dark:divide-white/10 border-t border-b border-gray-200/80 dark:border-white/10">
              {tocItems.map((item) => {
                const isActive = activeSectionId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`block text-left text-xs sm:text-[13px] leading-snug py-3.5 w-full transition-colors cursor-pointer ${
                      isActive
                        ? "font-bold text-gray-950 dark:text-white"
                        : "font-normal text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right Main Article Content Body */}
          <article className="flex-1 max-w-3xl space-y-10 text-gray-800 dark:text-gray-200 leading-relaxed font-sans">
            
            {/* Key Takeaways Section */}
            <div id="key-takeaways" className="space-y-4">
              {/* Lead Intro Paragraph */}
              <p className="text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-100 leading-relaxed border-l-4 border-gray-950 dark:border-white pl-4 py-1">
                If you're still lumping all marketing into the same bucket — buckle up. The real power play in 2026 isn't inbound <em className="not-italic font-semibold text-blue-600 dark:text-blue-400">*or*</em> outbound. It's knowing how and when to use both like a sniper, not a shotgun.
              </p>
            </div>

            {/* Section 1: Inbound Marketing / Definition */}
            <div id={tocItems[1]?.id || "inbound-marketing"} className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white tracking-tight">
                {tocItems[1]?.title || "Inbound Marketing: Get Found, Not Ignored"}
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                Inbound isn't just content — it's a magnet for modern buyers who don't want to be sold to. It's showing up when they search, scroll, and skim. According to Amthromax data, companies using inbound generate 54% more leads than those stuck in cold-calling purgatory.
              </p>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white pt-2">
                Winning inbound looks like:
              </h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 pl-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span><strong className="font-bold text-gray-900 dark:text-white">SEO that earns you page one</strong> — not purgatory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span><strong className="font-bold text-gray-900 dark:text-white">Content that educates</strong>, not regurgitates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span><strong className="font-bold text-gray-900 dark:text-white">Social media with purpose</strong>, not just posts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span><strong className="font-bold text-gray-900 dark:text-white">Lead-nurturing emails</strong> that don't get deleted</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span><a href="/products" className="text-blue-600 dark:text-blue-400 underline decoration-blue-300 underline-offset-4 font-semibold hover:text-blue-700">AI-powered prospecting</a> that finds leads while you sleep</span>
                </li>
              </ul>
              
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 italic pt-2">
                Done right, it builds brand loyalty, community, and compounding reach — the stuff ad budgets can't buy.
              </p>

              <div className="pt-4 space-y-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Why Inbound Slaps
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 pl-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                    <span><strong className="font-bold text-gray-900 dark:text-white">Cheap leads</strong> with long shelf life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                    <span><strong className="font-bold text-gray-900 dark:text-white">Compounds over time</strong> — content keeps working</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                    <span><strong className="font-bold text-gray-900 dark:text-white">Thought leadership</strong> becomes a traffic engine</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 2: Outbound Marketing / Non-linear */}
            <div id={tocItems[2]?.id || "outbound-marketing"} className="space-y-4 pt-8 border-t border-gray-100 dark:border-white/5">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white tracking-tight">
                {tocItems[2]?.title || "Outbound Marketing: Start the Conversation"}
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                Outbound gets a bad rap — but it works. The catch? Only if it's done right. Think less billboard, more laser beam.
              </p>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white pt-2">
                Modern outbound means:
              </h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 pl-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span><strong className="font-bold text-gray-900 dark:text-white">Hyper-targeting</strong> the right ICPs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span><strong className="font-bold text-gray-900 dark:text-white">Multichannel touches</strong> — LinkedIn, email, phone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span><strong className="font-bold text-gray-900 dark:text-white">Message personalization</strong> at scale</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span><a href="/platform" className="text-blue-600 dark:text-blue-400 underline decoration-blue-300 underline-offset-4 font-semibold hover:text-blue-700">Sequenced outreach</a> with intent baked in</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span><strong className="font-bold text-gray-900 dark:text-white">Clear tracking</strong> to double down on what works</span>
                </li>
              </ul>
            </div>

            {/* Section 3: Don't Pick — Stack */}
            <div id={tocItems[3]?.id || "dont-pick-stack"} className="space-y-4 pt-8 border-t border-gray-100 dark:border-white/5">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white tracking-tight">
                {tocItems[3]?.title || "Inbound vs Outbound: Don't Pick — Stack"}
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                The debate isn't inbound OR outbound. The smartest revenue teams run inbound and outbound simultaneously. Use inbound to create trust and evergreen organic demand, while running precision outbound to win targeted enterprise accounts.
              </p>
            </div>

            {/* Section 4: Tactics */}
            <div id={tocItems[4]?.id || "tactics-work"} className="space-y-4 pt-8 border-t border-gray-100 dark:border-white/5">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white tracking-tight">
                {tocItems[4]?.title || "Tactics That Actually Work in 2026"}
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                Leverage buyer intent signals, automated enrichment, and real-time trigger events to engage prospects when buying intent is highest.
              </p>
            </div>

          </article>
        </div>
      </main>

      {/* Bottom "Don't miss these" Recommendations Section */}
      <section className="bg-[#f7f6f2] dark:bg-[#141415] border-t border-gray-200/70 dark:border-white/5 py-12 sm:py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-gray-950 dark:text-white tracking-tight">
            Don't miss these
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <Link
                key={rec.id}
                to={`/news/${rec.id}`}
                className="group rounded-2xl bg-white dark:bg-[#161617] p-6 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 block">
                    {rec.category}
                  </span>
                  <h3 className="text-xl font-bold font-sans text-gray-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-[1.25] tracking-tight">
                    {rec.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                    {rec.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsDetailPage;
