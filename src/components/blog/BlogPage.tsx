import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogPosts, type BlogPost } from "./blogData";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const BlogPage: React.FC = () => {
  const [posts] = useState<BlogPost[]>(() => {
    const stored = localStorage.getItem("amthromax_blog_posts");
    if (stored) {
      try {
        return JSON.parse(stored);
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

  // The first post will be highlighted as featured when "All" is selected
  const featuredPost = posts[0];
  const gridPosts = selectedCategory === "All" ? filteredPosts.slice(1) : filteredPosts;

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

      <div className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300 min-h-[85vh] font-sans">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full">
              Insights & Engineering
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white">
              The Amthromax Blog
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              In-depth articles, design patterns, and engineering insights into the future of autonomous systems and enterprise automation.
            </p>
            {isAdmin && (
              <div className="flex justify-center gap-4 pt-2">
                <Link
                  to="/blog/publish"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold transition-all shadow-md hover:shadow-lg active:scale-97 flex items-center gap-2 cursor-pointer"
                >
                  <span>+</span> Write Article
                </Link>
              </div>
            )}
          </div>

          {/* Categories Tab Bar */}
          <div className="flex justify-center flex-wrap gap-2.5 pb-2 border-b border-gray-100 dark:border-white/[0.04]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 select-none ${
                  selectedCategory === cat
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-md scale-103"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-900/40 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post (Only show when selectedCategory is "All") */}
          {selectedCategory === "All" && featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group overflow-hidden rounded-[32px] bg-gray-50 dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] shadow-sm hover:shadow-md transition-all duration-300 grid md:grid-cols-12 gap-0"
            >
              <div className="md:col-span-7 aspect-[16/10] md:aspect-auto overflow-hidden relative">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
                />
                <div className="absolute top-6 left-6 bg-black/75 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase">
                  Featured
                </div>
              </div>
              <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                    <span>{featuredPost.category}</span>
                    <span>•</span>
                    <span className="text-gray-400 dark:text-gray-500">{featuredPost.readTime}</span>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="w-10 h-10 rounded-full bg-black text-white dark:bg-white dark:text-black font-black text-sm flex items-center justify-center border border-gray-200 dark:border-gray-850 shadow-sm">
                    {featuredPost.author.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{featuredPost.author.name}</h4>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{featuredPost.author.role}</p>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">{featuredPost.date}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid Posts */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {gridPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={cardVariants}
                className="group flex flex-col justify-between overflow-hidden rounded-[24px] bg-gray-50 dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-5">
                  {/* Card Image */}
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 text-white backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase">
                      {post.category}
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="px-6 pb-2 space-y-3">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500">{post.readTime}</span>
                    <Link to={`/blog/${post.id}`} className="block">
                      <h3 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Author Info */}
                <div className="px-6 py-5 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-black text-white dark:bg-white dark:text-black font-black text-xs flex items-center justify-center border border-gray-200 dark:border-gray-800 shadow-sm">
                    {post.author.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{post.author.name}</h4>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{post.author.role}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 ml-auto">{post.date}</span>
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
