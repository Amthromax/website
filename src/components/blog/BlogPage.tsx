import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogPosts, type BlogPost } from "./blogData";
import BlogMarquee from "./BlogMarquee";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const BlogPage: React.FC = () => {
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

      <div className="py-20 bg-[#f5f5f7] dark:bg-[#000000] transition-colors duration-300 min-h-[85vh] font-sans overflow-x-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 xl:px-16 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6e6e73] dark:text-gray-400">
              Insights & Engineering
            </span>
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
              className="group overflow-hidden rounded-[28px] sm:rounded-[36px] bg-white dark:bg-[#161617] border border-[#e5e5e7] dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 grid md:grid-cols-12 gap-0"
            >
              <div className="md:col-span-7 aspect-[16/10] md:aspect-auto overflow-hidden relative">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-black/75 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase">
                  Featured
                </div>
              </div>
              <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#0066cc] dark:text-[#2997ff] uppercase tracking-wider">
                    <span>{featuredPost.category}</span>
                    <span>•</span>
                    <span className="text-[#86868b] dark:text-gray-500">{featuredPost.readTime}</span>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="block group-hover:text-[#0066cc] dark:group-hover:text-[#2997ff] transition-colors"
                  >
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f] dark:text-white leading-tight">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  <p className="text-[#515154] dark:text-gray-300 text-base leading-relaxed font-normal">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-6 border-t border-[#e5e5e7]/80 dark:border-white/10">
                  <div className="w-10 h-10 rounded-full bg-[#1d1d1f] text-white dark:bg-white dark:text-black font-semibold text-sm flex items-center justify-center border border-[#e5e5e7] dark:border-white/10 shadow-xs">
                    {featuredPost.author.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">{featuredPost.author.name}</h4>
                    <p className="text-xs text-[#86868b] dark:text-gray-500">{featuredPost.author.role}</p>
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
      <Footer />
    </div>
  );
};

export default BlogPage;
