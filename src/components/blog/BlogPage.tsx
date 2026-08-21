import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts, type BlogPost } from "./blogData";
import BlogMarquee from "./BlogMarquee";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const BlogPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<"principles" | "careers" | "overview" | null>(null);

  useEffect(() => {
    if (activeModal !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  const [posts] = useState<BlogPost[]>(() => {
    const stored = localStorage.getItem("amthromax_blog_posts");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as BlogPost[];
        const staticIds = new Set(blogPosts.map((p) => p.id));
        const customPosts = parsed.filter((p) => !staticIds.has(p.id));
        return [...customPosts, ...blogPosts];
      } catch (err) {
        return blogPosts;
      }
    }
    return blogPosts;
  });

  const [isAdmin] = useState(() => {
    const user = localStorage.getItem("amthromax-user");
    const session = localStorage.getItem("amthromax_admin_session");
    return user === "admin@amthromax.com" || user === "kishorekanth@gmail.com" || session === "active";
  });

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  // Highlight the designated featured post (or first post) when "All" is selected
  const featuredPost = posts.find((p) => p.featured) || posts.find((p) => p.id === "building-the-next-era-of-ai") || posts[0];
  const gridPosts = selectedCategory === "All"
    ? filteredPosts.filter((p) => p.id !== featuredPost?.id)
    : filteredPosts;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <div>
      <SEO
        title="Amthromax Blog"
        description="Insights on artificial intelligence, automation, enterprise software, AI agents, LLMs, and future technologies."
      />

      <div className="py-20 bg-white dark:bg-black transition-colors duration-300 min-h-[85vh] font-sans overflow-x-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 xl:px-16 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">
              The Amthromax Blog
            </h1>
            <p className="text-base sm:text-lg text-[#515154] dark:text-gray-300 leading-relaxed font-normal">
              In-depth articles, design patterns, and engineering insights into the future of autonomous systems and enterprise automation.
            </p>
            {isAdmin && (
              <div className="flex justify-center gap-4 pt-2">
                <Link
                  to="/blog/publish"
                  className="px-6 py-2.5 bg-[#0066cc] hover:bg-[#0052a3] text-white rounded-full text-xs font-medium transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>+</span> Write Article
                </Link>
              </div>
            )}
          </div>

          {/* Categories Tab Bar */}
          <div className="flex justify-center flex-wrap gap-2.5 pb-2 border-b border-[#e5e5e7]/80 dark:border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 select-none cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#1d1d1f] text-white dark:bg-white dark:text-black shadow-xs"
                    : "bg-white text-[#6e6e73] hover:bg-[#e5e5e7] hover:text-[#1d1d1f] dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white border border-[#e5e5e7] dark:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post (Only show when selectedCategory is "All") */}
          {selectedCategory === "All" && featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group overflow-hidden rounded-[24px] sm:rounded-[28px] bg-white dark:bg-[#161617] border border-[#e5e5e7] dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 grid md:grid-cols-12 gap-0 md:max-h-[340px]"
            >
              <div className="md:col-span-6 min-h-[220px] md:h-full overflow-hidden relative">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/85 text-white backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase z-20">
                  Featured
                </div>
                <div 
                  className="absolute inset-0 flex items-center justify-center p-4 text-center z-30"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
                >
                  <div 
                    className="px-6 py-3 rounded-2xl border border-white/30 backdrop-blur-md shadow-2xl"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                  >
                    <span 
                      className="text-white font-black text-xl sm:text-2xl md:text-3xl tracking-widest uppercase block"
                      style={{ color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.9)', fontFamily: 'Inter, sans-serif' }}
                    >
                      Next AI Tool
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-6 p-6 md:p-7 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#0066cc] dark:text-[#2997ff] uppercase tracking-wider">
                    <span>{featuredPost.category}</span>
                    <span>•</span>
                    <span className="text-[#86868b] dark:text-gray-500">{featuredPost.readTime}</span>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="block group-hover:text-[#0066cc] dark:group-hover:text-[#2997ff] transition-colors"
                  >
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#1d1d1f] dark:text-white leading-tight">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  <p className="text-[#515154] dark:text-gray-300 text-xs sm:text-sm leading-relaxed font-normal line-clamp-2 sm:line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-[#e5e5e7]/80 dark:border-white/10">
                  <div className="w-8 h-8 rounded-full bg-[#1d1d1f] text-white dark:bg-white dark:text-black font-semibold text-xs flex items-center justify-center border border-[#e5e5e7] dark:border-white/10 shadow-xs">
                    {featuredPost.author.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#1d1d1f] dark:text-white">{featuredPost.author.name}</h4>
                    <p className="text-[10px] text-[#86868b] dark:text-gray-500">{featuredPost.author.role}</p>
                  </div>
                  <span className="text-xs text-[#86868b] dark:text-gray-500 ml-auto">{featuredPost.date}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Marquee Ticker */}
          <BlogMarquee />

          {/* Grid Posts */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {gridPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={cardVariants}
                className="group flex flex-col justify-between overflow-hidden rounded-[28px] bg-white dark:bg-[#161617] border border-[#e5e5e7] dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="space-y-5">
                  {/* Card Image */}
                  <div className="aspect-[16/10] overflow-hidden relative bg-[#f5f5f7] dark:bg-white/5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 text-white backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase">
                      {post.category}
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="px-6 pb-2 space-y-3">
                    <span className="text-xs font-medium text-[#86868b] dark:text-gray-500">{post.readTime}</span>
                    <Link to={`/blog/${post.id}`} className="block">
                      <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[#1d1d1f] dark:text-white group-hover:text-[#0066cc] dark:group-hover:text-[#2997ff] transition-colors leading-snug">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-[#515154] dark:text-gray-300 text-sm leading-relaxed font-normal line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Author Info */}
                <div className="px-6 py-5 mt-4 border-t border-[#e5e5e7]/80 dark:border-white/10 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#1d1d1f] text-white dark:bg-white dark:text-black font-semibold text-xs flex items-center justify-center border border-[#e5e5e7] dark:border-white/10 shadow-xs">
                    {post.author.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#1d1d1f] dark:text-white">{post.author.name}</h4>
                    <p className="text-[10px] text-[#86868b] dark:text-gray-500">{post.author.role}</p>
                  </div>
                  <span className="text-[10px] text-[#86868b] dark:text-gray-500 ml-auto">{post.date}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Resources Section */}
      <section className="bg-black text-white py-20 px-6 md:px-10 lg:px-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-center text-white tracking-tight">
            Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Amthromax Principles (Triggers Modal In-Place) */}
            <button
              type="button"
              onClick={() => setActiveModal("principles")}
              className="group block text-left space-y-3 w-full cursor-pointer focus:outline-none"
            >
              <div className="aspect-[4/3] rounded-[22px] overflow-hidden bg-[#161617] border border-white/10 relative">
                <div className="w-full h-full bg-gradient-to-tr from-[#00A3FF] via-[#0066FF] to-[#9900FF] group-hover:scale-105 transition-transform duration-500 relative flex items-end p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(192,38,211,0.6),transparent_60%)]" />
                </div>
              </div>
              <div className="space-y-1 pt-1">
                <h3 className="text-base font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                  Amthromax Principles
                </h3>
              </div>
            </button>

            {/* Card 2: Careers & Engineering (Triggers Modal In-Place) */}
            <button
              type="button"
              onClick={() => setActiveModal("careers")}
              className="group block text-left space-y-3 w-full cursor-pointer focus:outline-none"
            >
              <div className="aspect-[4/3] rounded-[22px] overflow-hidden bg-[#161617] border border-white/10 relative">
                <img
                  src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop"
                  alt="Careers & Engineering"
                  className="w-full h-full object-cover blur-[10px] scale-110 group-hover:scale-115 transition-all duration-500"
                />
              </div>
              <div className="space-y-1 pt-1">
                <h3 className="text-base font-bold text-white tracking-tight group-hover:text-purple-400 transition-colors">
                  Careers &amp; Engineering
                </h3>
              </div>
            </button>

            {/* Card 3: Company Overview (Triggers Modal In-Place) */}
            <button
              type="button"
              onClick={() => setActiveModal("overview")}
              className="group block text-left space-y-3 w-full cursor-pointer focus:outline-none"
            >
              <div className="aspect-[4/3] rounded-[22px] overflow-hidden bg-[#161617] border border-white/10 relative">
                <div className="w-full h-full bg-gradient-to-b from-[#6A89A7] via-[#C5D5E4] to-[#E8A87C] group-hover:scale-105 transition-transform duration-500 relative flex items-end p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(235,140,90,0.5),transparent_70%)]" />
                </div>
              </div>
              <div className="space-y-1 pt-1">
                <h3 className="text-base font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                  Company Overview
                </h3>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* MODAL 1: Amthromax Principles */}
      <AnimatePresence>
        {activeModal === "principles" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 h-[100dvh] w-screen bg-black/95 backdrop-blur-md overflow-y-scroll scroll-smooth overscroll-contain select-text"
            onClick={() => setActiveModal(null)}
          >
            {/* Fixed Close Button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="fixed top-6 right-6 sm:top-8 sm:right-8 z-[60] w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm shadow-2xl backdrop-blur-lg border border-white/20"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Scrollable Document Body */}
            <div className="w-full min-h-full flex justify-center items-start p-6 sm:p-10 md:p-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl w-full text-white space-y-12 pt-8 pb-48"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Document Header */}
                <div className="text-center space-y-4 pt-4">
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    Amthromax Principles
                  </h2>
                  <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-medium">
                    Our principles describe how we execute on Amthromax's mission.
                  </p>
                </div>

                {/* Document Content */}
                <div className="space-y-12 border-t border-white/10 pt-8">
                  {/* Intro Paragraphs */}
                  <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                    <p>
                      This document reflects the strategy we've refined over the past two years, including feedback from many people internal and external to Amthromax. The timeline to AGI remains uncertain, but these core principles will guide us in acting in the best interests of humanity throughout its development.
                    </p>
                    <p>
                      Amthromax’s mission is to ensure that artificial general intelligence (AGI)—by which we mean highly autonomous systems that outperform humans at most economically valuable work—benefits all of humanity. We will attempt to directly build safe and beneficial AGI, but will also consider our mission fulfilled if our work aids others to achieve this outcome. To that end, we commit to the following principles:
                    </p>
                  </div>

                  {/* Principles List */}
                  <div className="space-y-12">
                    {/* Broadly distributed benefits */}
                    <div className="space-y-4">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Broadly distributed benefits
                      </h3>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                        We commit to use any influence we obtain over AGI’s deployment to ensure it is used for the benefit of all, and to avoid enabling uses of AI or AGI that harm humanity or unduly concentrate power.
                      </p>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                        Our primary fiduciary duty is to humanity. We anticipate needing to marshal substantial resources to fulfill our mission, but will always diligently act to minimize conflicts of interest among our employees and stakeholders that could compromise broad benefit.
                      </p>
                    </div>

                    {/* Long-term safety */}
                    <div className="space-y-4">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Long-term safety
                      </h3>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                        We are committed to doing the research required to make AGI safe, and to driving the broad adoption of such research across the AI community.
                      </p>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                        We are concerned about late-stage AGI development becoming a competitive race without time for adequate safety precautions. Therefore, if a value-aligned, safety-conscious project comes close to building AGI before we do, we commit to stop competing with and start assisting this project. We will work out specifics in case-by-case agreements, but a typical triggering condition might be “a better-than-even chance of success in the next two years.”
                      </p>
                    </div>

                    {/* Technical leadership */}
                    <div className="space-y-4">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Technical leadership
                      </h3>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                        To be effective at addressing AGI’s impact on society, Amthromax must be on the cutting edge of AI capabilities—policy and safety advocacy alone would be insufficient.
                      </p>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                        We believe that AI will have broad societal impact before AGI, and we’ll strive to lead in those areas that are directly aligned with our mission and expertise.
                      </p>
                    </div>

                    {/* Cooperative orientation */}
                    <div className="space-y-4">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Cooperative orientation
                      </h3>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                        We will actively cooperate with other research and policy institutions; we seek to create a global community working together to address AGI’s global challenges.
                      </p>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                        We are committed to providing public goods that help society navigate the path to AGI. Today this includes publishing most of our AI research, but we expect that safety and security concerns will reduce our traditional publishing in the future, while increasing the importance of sharing safety, policy, and standards research.
                      </p>
                    </div>
                  </div>

                  {/* End of Document Close Action */}
                  <div className="pt-8 text-center">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all cursor-pointer border border-white/15"
                    >
                      Close Document
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Careers & Engineering */}
      <AnimatePresence>
        {activeModal === "careers" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 h-[100dvh] w-screen bg-black/95 backdrop-blur-md overflow-y-scroll scroll-smooth overscroll-contain select-text"
            onClick={() => setActiveModal(null)}
          >
            {/* Fixed Close Button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="fixed top-6 right-6 sm:top-8 sm:right-8 z-[60] w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm shadow-2xl backdrop-blur-lg border border-white/20"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Scrollable Document Body */}
            <div className="w-full min-h-full flex justify-center items-start p-6 sm:p-10 md:p-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl w-full text-white space-y-12 pt-8 pb-48"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Document Header */}
                <div className="text-center space-y-4 pt-4">
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    Careers &amp; Engineering
                  </h2>
                  <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-medium">
                    We are searching for world-class engineers, system architects, and AI researchers to build the foundation of autonomous intelligence.
                  </p>
                </div>

                {/* Document Content */}
                <div className="space-y-12 border-t border-white/10 pt-8">
                  {/* Philosophy */}
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Engineering Culture
                    </h3>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                      At Amthromax, engineering is not just writing code—it is designing resilient, high-throughput cognitive architectures that operate at scale. We value extreme autonomy, deep technical rigor, and zero-bullshit execution.
                    </p>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                      Our teams work in tight, interdisciplinary squads across distributed inferencing, post-quantum agent security, neural orchestration, and high-performance frontend interfaces.
                    </p>
                  </div>

                  {/* Open Roles */}
                  <div className="space-y-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Open Positions
                    </h3>

                    <div className="space-y-8">
                      <div className="space-y-2 border-b border-white/10 pb-6">
                        <h4 className="text-xl font-bold text-white">Principal Alignment Researcher</h4>
                        <p className="text-gray-300 text-base leading-relaxed">
                          Lead cutting-edge alignment verification frameworks and automated safety veto circuits for multi-agent autonomous deployments.
                        </p>
                        <p className="text-xs font-medium text-gray-400 pt-1">Full-time • Global Remote / San Francisco</p>
                      </div>

                      <div className="space-y-2 border-b border-white/10 pb-6">
                        <h4 className="text-xl font-bold text-white">Distributed Systems Architect</h4>
                        <p className="text-gray-300 text-base leading-relaxed">
                          Architect sub-10ms inferencing meshes across 40+ sovereign cloud regions with fault-tolerant state synchronization.
                        </p>
                        <p className="text-xs font-medium text-gray-400 pt-1">Full-time • Remote / London</p>
                      </div>

                      <div className="space-y-2 pb-2">
                        <h4 className="text-xl font-bold text-white">Senior UI/UX Product Engineer</h4>
                        <p className="text-gray-300 text-base leading-relaxed">
                          Craft next-generation, glassmorphic obsidian interfaces for complex multi-agent workflows and real-time observability canvases.
                        </p>
                        <p className="text-xs font-medium text-gray-400 pt-1">Full-time • Remote</p>
                      </div>
                    </div>
                  </div>

                  {/* End of Document Close Action */}
                  <div className="pt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      to="/careers"
                      onClick={() => setActiveModal(null)}
                      className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-lg shadow-purple-600/20"
                    >
                      View All Career Openings
                    </Link>
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all cursor-pointer border border-white/15"
                    >
                      Close Document
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 3: Company Overview */}
      <AnimatePresence>
        {activeModal === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 h-[100dvh] w-screen bg-black/95 backdrop-blur-md overflow-y-scroll scroll-smooth overscroll-contain select-text"
            onClick={() => setActiveModal(null)}
          >
            {/* Fixed Close Button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="fixed top-6 right-6 sm:top-8 sm:right-8 z-[60] w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm shadow-2xl backdrop-blur-lg border border-white/20"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Scrollable Document Body */}
            <div className="w-full min-h-full flex justify-center items-start p-6 sm:p-10 md:p-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl w-full text-white space-y-12 pt-8 pb-48"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Document Header */}
                <div className="text-center space-y-4 pt-4">
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    Company Overview
                  </h2>
                  <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-medium">
                    Amthromax designs and deploys enterprise-grade AI software, autonomous operating systems, and intelligent technology.
                  </p>
                </div>

                {/* Document Content */}
                <div className="space-y-12 border-t border-white/10 pt-8">
                  {/* Mission */}
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Enterprise Mandate
                    </h3>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                      Founded with the conviction that artificial intelligence must be deterministic, secure, and self-governing, Amthromax builds mission-critical software systems powering global enterprises, financial networks, and advanced technology teams.
                    </p>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                      Our products bridge frontier neural research with enterprise operational reliability, ensuring seamless automation without compromising data sovereignty or security compliance.
                    </p>
                  </div>

                  {/* Core Platforms */}
                  <div className="space-y-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Core Platform Stack
                    </h3>

                    <div className="space-y-8">
                      <div className="space-y-2 border-b border-white/10 pb-6">
                        <h4 className="text-xl font-bold text-white">AmthroOS</h4>
                        <p className="text-gray-300 text-base leading-relaxed">
                          The AI-native enterprise operating system enabling multi-agent orchestration and automated governance.
                        </p>
                      </div>

                      <div className="space-y-2 border-b border-white/10 pb-6">
                        <h4 className="text-xl font-bold text-white">Neural Mesh</h4>
                        <p className="text-gray-300 text-base leading-relaxed">
                          Ultra-low latency inference network across 40+ sovereign cloud regions with 99.999% SLA availability.
                        </p>
                      </div>

                      <div className="space-y-2 border-b border-white/10 pb-6">
                        <h4 className="text-xl font-bold text-white">Action Firewall</h4>
                        <p className="text-gray-300 text-base leading-relaxed">
                          Deterministic safety controls ensuring all agent executions abide strictly by institutional policies.
                        </p>
                      </div>

                      <div className="space-y-2 pb-2">
                        <h4 className="text-xl font-bold text-white">Lattice Encryption</h4>
                        <p className="text-gray-300 text-base leading-relaxed">
                          Post-quantum cryptographic channels guaranteeing complete confidentiality for enterprise data.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* End of Document Close Action */}
                  <div className="pt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      to="/about"
                      onClick={() => setActiveModal(null)}
                      className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                    >
                      Read Full About Page
                    </Link>
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all cursor-pointer border border-white/15"
                    >
                      Close Document
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default BlogPage;
