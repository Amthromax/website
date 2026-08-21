import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts, type BlogPost } from "./blogData";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const BlogPostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImg(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const post = posts.find((p) => p.id === postId);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [postId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  if (!post) {
    return (
      <div className="py-32 text-center bg-white dark:bg-black min-h-[90vh] font-sans">
        <SEO title="Post Not Found | Amthromax" description="The requested blog post could not be found." />
        <div className="max-w-md mx-auto space-y-6 px-6">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Blog Post Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">The article you are looking for does not exist or has been moved.</p>
          <button
            onClick={() => navigate("/blog")}
            className="inline-block px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-bold hover:opacity-90 transition-all shadow-md"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = post.title;

  const handleShareX = () => {
    window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, "_blank");
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleShareGmail = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleShareInstagram = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast("Link copied! Share it on Instagram.");
    }).catch(() => {
      showToast("Failed to copy link.");
    });
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: post.excerpt,
        url: shareUrl
      }).then(() => {
        showToast("Shared successfully!");
      }).catch((err) => {
        if (err.name !== "AbortError") {
          showToast("Failed to share.");
        }
      });
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast("Link copied to clipboard!");
      }).catch(() => {
        showToast("Failed to copy link.");
      });
    }
  };

  // Get 2 recommended posts excluding current one
  const recommendations = posts.filter((p) => p.id !== post.id).slice(0, 2);

  const articleSchema = {
    "@type": "BlogPosting",
    "@id": `https://amthromax.com/blog/${post.id}/#article`,
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image.startsWith("http") ? post.image : `https://amthromax.com${post.image}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role
    },
    "publisher": {
      "@id": "https://amthromax.com/#organization"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://amthromax.com/blog/${post.id}`
    }
  };

  return (
    <div>
      <SEO
        title={`${post.title} | Amthromax Blog`}
        description={post.excerpt}
        image={post.image.startsWith("http") ? post.image : `https://amthromax.com${post.image}`}
        type="article"
        url={`https://amthromax.com/blog/${post.id}`}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.id}` }
        ]}
        schema={articleSchema}
      />

      <article className="py-16 md:py-24 bg-white dark:bg-black transition-colors duration-300 min-h-[85vh] font-sans">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 xl:px-20 space-y-10">
          {/* Back Navigation */}
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors group"
          >
            <span className="text-sm transform group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Insights</span>
          </Link>

          {/* Post Header info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
              <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white text-[11px] font-bold tracking-wider">{post.category}</span>
              <span>•</span>
              <span className="text-zinc-400 dark:text-zinc-500">{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-black dark:text-white leading-[1.1]">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed italic border-l-2 border-black dark:border-white pl-6 py-2">
              {post.excerpt}
            </p>
          </div>

          {/* Author Block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black font-black text-base flex items-center justify-center border border-black/10 dark:border-white/10 shadow-sm">
                {post.author.avatar}
              </div>
              <div>
                <h4 className="text-sm font-bold text-black dark:text-white">{post.author.name}</h4>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">{post.author.role}</p>
              </div>
            </div>
            
            {/* Share and Date Block */}
            <div className="flex flex-wrap items-center gap-6 sm:ml-auto">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.15em] mr-1">Share</span>
                
                {/* LinkedIn */}
                <button
                  onClick={handleShareLinkedIn}
                  className="w-9 h-9 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-[#f5f5f7]/60 dark:bg-[#1c1c1e]/60 text-zinc-600 hover:text-black hover:bg-white dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 flex items-center justify-center transition-all duration-200 select-none cursor-pointer shadow-xs"
                  title="Share to LinkedIn"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>

                {/* X */}
                <button
                  onClick={handleShareX}
                  className="w-9 h-9 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-[#f5f5f7]/60 dark:bg-[#1c1c1e]/60 text-zinc-600 hover:text-black hover:bg-white dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 flex items-center justify-center transition-all duration-200 select-none cursor-pointer shadow-xs"
                  title="Share to X"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>

                {/* Instagram */}
                <button
                  onClick={handleShareInstagram}
                  className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-[#e1306c] hover:border-[#e1306c] dark:text-gray-400 dark:hover:text-[#e1306c] dark:hover:border-[#e1306c] flex items-center justify-center hover:bg-pink-50/10 transition-all select-none cursor-pointer"
                  title="Copy link for Instagram"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </button>

                {/* Gmail */}
                <button
                  onClick={handleShareGmail}
                  className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-[#ea4335] hover:border-[#ea4335] dark:text-gray-450 dark:hover:text-[#ea4335] dark:hover:border-[#ea4335] flex items-center justify-center hover:bg-red-50/10 transition-all select-none cursor-pointer"
                  title="Share via Email"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </button>

                {/* Share/Notes */}
                <button
                  onClick={handleNativeShare}
                  className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-blue-600 hover:border-blue-600 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:border-blue-400 flex items-center justify-center hover:bg-blue-50/10 transition-all select-none cursor-pointer"
                  title="Share / Save to Notes"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                  </svg>
                </button>
              </div>

              <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-gray-100 dark:border-gray-900 pt-3 sm:pt-0 sm:pl-6">
                <p className="text-xs text-gray-400 dark:text-gray-500">Published</p>
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{post.date}</p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div 
            onClick={() => setLightboxImg(post.image)}
            className="aspect-[21/7] w-full overflow-hidden rounded-[32px] border border-gray-150 dark:border-white/[0.04] shadow-md bg-gray-50 dark:bg-gray-900 cursor-zoom-in group/heroimg"
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/heroimg:scale-[1.03]" 
            />
          </div>

          {/* Article Body + Sidebar Two-Column Layout */}
          <div className="flex flex-col xl:flex-row gap-12 xl:gap-16 pt-4">
          {/* Main Article Content */}
          <div className="flex-1 min-w-0 space-y-6 text-gray-750 dark:text-gray-300 text-base md:text-lg leading-relaxed">
            {post.content.map((paragraph, index) => {
              // Image parsing
              if (paragraph.startsWith("![") && paragraph.endsWith(")")) {
                const match = paragraph.match(/!\[(.*?)\]\((.*?)\)/);
                if (match) {
                  return (
                    <div 
                      key={index} 
                      onClick={() => setLightboxImg(match[2])}
                      className="my-8 max-w-xl mx-auto rounded-[24px] overflow-hidden border border-gray-150 dark:border-white/[0.04] shadow-md bg-gray-50 dark:bg-gray-900 cursor-zoom-in group/inlineimg"
                    >
                      <img 
                        src={match[2]} 
                        alt={match[1]} 
                        className="w-full max-h-[500px] object-cover object-top transition-transform duration-500 group-hover/inlineimg:scale-[1.02]" 
                      />
                    </div>
                  );
                }
              }
              
              // Custom Helleious Comparison Table Integration
              if (paragraph === "[Helleious_COMPARISON_TABLE]") {
                const Helleious_TABLE_DATA = [
                  { cap: "Workflow/scenario builder", Helleious: "✓", n8n: "✓", zapier: "✓", make: "✓" },
                  { cap: "Wide third-party app integrations", Helleious: "Growing library", n8n: "✓", zapier: "✓", make: "✓" },
                  { cap: "Newsroom-native triggers (assignment → publish)", Helleious: "✓", n8n: "✗", zapier: "✗", make: "✗" },
                  { cap: "Fact-check handoff steps", Helleious: "✓", n8n: "✗", zapier: "✗", make: "✗" },
                  { cap: "Syndication rules built in", Helleious: "✓", n8n: "✗", zapier: "✗", make: "✗" },
                  { cap: "Reader-relationship triggers (churn, engagement)", Helleious: "✓", n8n: "✗", zapier: "✗", make: "✗" },
                  { cap: "Role-based permissions by desk/team", Helleious: "✓", n8n: "Limited", zapier: "Limited", make: "Limited" },
                  { cap: "Multi-desk / multi-brand support", Helleious: "✓", n8n: "✗", zapier: "✗", make: "✗" },
                  { cap: "Editorial audit trail on automated steps", Helleious: "✓", n8n: "✗", zapier: "✗", make: "✗" },
                  { cap: "AI-assisted document and research analysis", Helleious: "✓", n8n: "✗", zapier: "✗", make: "✗" },
                  { cap: "CMS-native publishing integration", Helleious: "✓", n8n: "✗", zapier: "✗", make: "✗" },
                  { cap: "Automated rights/compliance checks before syndication", Helleious: "✓", n8n: "✗", zapier: "✗", make: "✗" },
                  { cap: "Real-time correction propagation across syndicated copies", Helleious: "✓", n8n: "✗", zapier: "✗", make: "✗" },
                  { cap: "Built-in multilingual translation workflows", Helleious: "✓", n8n: "✗", zapier: "✗", make: "✗" },
                  { cap: "Subscriber save/win-back triggers", Helleious: "✓", n8n: "✗", zapier: "✗", make: "✗" },
                  { cap: "Built for general business workflows", Helleious: "Not the focus", n8n: "✓", zapier: "✓", make: "✓" }
                ];

                const renderValue = (val: string) => {
                  if (val === "✓") {
                    return (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 border border-green-150 dark:border-green-900/30 font-bold text-xs select-none">
                        ✓
                      </span>
                    );
                  }
                  if (val === "✗") {
                    return (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-150 dark:border-red-900/30 font-bold text-xs select-none">
                        ✗
                      </span>
                    );
                  }
                  if (val === "Growing library") {
                    return (
                      <span className="inline-block px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-150 dark:border-blue-900/30 text-[10px] font-bold whitespace-nowrap">
                        Growing library
                      </span>
                    );
                  }
                  if (val === "Limited") {
                    return (
                      <span className="inline-block px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/25 text-amber-600 dark:text-amber-400 border border-amber-150 dark:border-amber-900/30 text-[10px] font-bold whitespace-nowrap">
                        Limited
                      </span>
                    );
                  }
                  if (val === "Not the focus") {
                    return (
                      <span className="inline-block px-2.5 py-1 rounded-full bg-gray-55/60 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-150/70 dark:border-gray-800 text-[10px] font-medium whitespace-nowrap">
                        Not the focus
                      </span>
                    );
                  }
                  return val;
                };

                return (
                  <div key={index} className="my-10 overflow-hidden rounded-[24px] border border-gray-150 dark:border-white/[0.04] bg-white dark:bg-[#161617] shadow-lg">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-[13px] md:text-sm">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-900/80 border-b border-gray-150 dark:border-white/[0.04]">
                            <th className="p-4 font-extrabold text-gray-900 dark:text-white">Capability</th>
                            <th className="p-4 font-extrabold text-gray-900 dark:text-white text-center bg-blue-50/20 dark:bg-blue-900/10">
                              Helleious.ai<br/>
                              <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">(planned)</span>
                            </th>
                            <th className="p-4 font-extrabold text-gray-950 dark:text-white text-center">n8n</th>
                            <th className="p-4 font-extrabold text-gray-950 dark:text-white text-center">Zapier</th>
                            <th className="p-4 font-extrabold text-gray-950 dark:text-white text-center">Make</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/[0.02]">
                          {Helleious_TABLE_DATA.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/10 transition-colors">
                              <td className="p-4 font-semibold text-gray-900 dark:text-gray-200 leading-snug">{row.cap}</td>
                              <td className="p-4 text-center bg-blue-50/10 dark:bg-blue-950/5 border-x border-gray-100 dark:border-white/[0.02]">{renderValue(row.Helleious)}</td>
                              <td className="p-4 text-center">{renderValue(row.n8n)}</td>
                              <td className="p-4 text-center">{renderValue(row.zapier)}</td>
                              <td className="p-4 text-center">{renderValue(row.make)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-150 dark:border-white/[0.04] text-[11px] text-gray-400 dark:text-gray-500 italic">
                      Table reflects planned capabilities for Helleious.ai, compared with n8n, Zapier, and Make. Not based on third-party benchmark testing.
                    </div>
                  </div>
                );
              }

              // Headers
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl md:text-3xl font-extrabold tracking-tight mt-10 mb-4 text-gray-900 dark:text-white">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl md:text-2xl font-bold mt-8 mb-3 text-gray-900 dark:text-white">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              // Blockquote
              if (paragraph.startsWith("> ")) {
                let text = paragraph.replace("> ", "");
                // check if it starts and ends with quotes
                return (
                  <blockquote key={index} className="border-l-4 border-blue-500 pl-5 py-2 my-8 italic text-lg text-gray-600 dark:text-gray-450 bg-gray-50/50 dark:bg-gray-900/30 rounded-r-xl pr-4">
                    {text}
                  </blockquote>
                );
              }
              // Multi-line paragraphs: split on \n and render each line separately
              if (paragraph.includes("\n")) {
                const lines = paragraph.split("\n");
                return (
                  <div key={index} className="space-y-2">
                    {lines.map((line, li) => {
                      if (line.startsWith("• ")) {
                        const cleanLine = line.slice(2);
                        const parts = cleanLine.split("**");
                        return (
                          <div key={li} className="flex items-start space-x-2 pl-4 text-sm md:text-base text-gray-700 dark:text-gray-300">
                            <span className="text-blue-500 mt-1.5 shrink-0">•</span>
                            <span>{parts.map((p, i) => i % 2 === 1 ? <strong key={i} className="font-extrabold text-gray-900 dark:text-white">{p}</strong> : p)}</span>
                          </div>
                        );
                      }
                      if (/^\d+\.\s/.test(line)) {
                        const m = line.match(/^(\d+)\.\s(.*)/);
                        if (m) {
                          const parts = m[2].split("**");
                          return (
                            <div key={li} className="flex items-start space-x-3 pl-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
                              <span className="font-bold text-blue-600 dark:text-blue-400 mt-0.5 shrink-0">{m[1]}.</span>
                              <span>{parts.map((p, i) => i % 2 === 1 ? <strong key={i} className="font-extrabold text-gray-900 dark:text-white">{p}</strong> : p)}</span>
                            </div>
                          );
                        }
                      }
                      if (line.includes("**")) {
                        const parts = line.split("**");
                        return <p key={li}>{parts.map((p, i) => i % 2 === 1 ? <strong key={i} className="font-extrabold text-gray-900 dark:text-white">{p}</strong> : p)}</p>;
                      }
                      return line.trim() ? <p key={li}>{line}</p> : null;
                    })}
                  </div>
                );
              }
              // Single-line bullet
              if (paragraph.startsWith("• ")) {
                const cleanText = paragraph.slice(2);
                const parts = cleanText.split("**");
                return (
                  <div key={index} className="flex items-start space-x-2 pl-4 text-sm md:text-base text-gray-700 dark:text-gray-300">
                    <span className="text-blue-500 mt-1.5 shrink-0">•</span>
                    <span>
                      {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-extrabold text-gray-900 dark:text-white">{part}</strong> : part)}
                    </span>
                  </div>
                );
              }
              // Single-line numbered item
              if (/^\d+\.\s/.test(paragraph)) {
                const match = paragraph.match(/^(\d+)\.\s(.*)/);
                if (match) {
                  const parts = match[2].split("**");
                  return (
                    <div key={index} className="flex items-start space-x-3 pl-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
                      <span className="font-bold text-blue-600 dark:text-blue-400 mt-0.5 shrink-0">{match[1]}.</span>
                      <span>
                        {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-extrabold text-gray-900 dark:text-white">{part}</strong> : part)}
                      </span>
                    </div>
                  );
                }
              }
              // Normal paragraph with **bolding**
              if (paragraph.includes("**")) {
                const parts = paragraph.split("**");
                return (
                  <p key={index}>
                    {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-extrabold text-gray-900 dark:text-white">{part}</strong> : part)}
                  </p>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}

          {/* Bottom Call to Action */}
          <div className="mt-16 p-8 md:p-10 rounded-[32px] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100/50 dark:border-blue-900/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Interested in AI automation?</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">Learn how Amthromax custom systems and agents can transform your workflows.</p>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full text-xs hover:opacity-90 transition-all shadow-md shrink-0"
            >
              Contact Our Engineers
            </Link>
          </div>

          {/* Related Articles section */}
          {recommendations.length > 0 && (
            <div className="pt-16 border-t border-gray-100 dark:border-gray-900 space-y-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Recommended Reading</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recommendations.map((rec) => (
                  <Link
                    key={rec.id}
                    to={`/blog/${rec.id}`}
                    className="group block overflow-hidden rounded-2xl bg-gray-50 dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] p-5 hover:shadow-md transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                        {rec.category}
                      </span>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                        {rec.title}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-2">
                        {rec.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          </div>{/* end main article */}

          {/* Sticky Right Sidebar */}
          <aside className="hidden xl:block w-80 shrink-0">
            <div className="sticky top-28 space-y-6">
              {/* Author Card */}
              <div className="p-6 rounded-[28px] bg-[#f5f5f7]/90 dark:bg-[#1c1c1e]/90 backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all duration-300 space-y-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">Written by</p>
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black font-black text-base flex items-center justify-center shadow-sm border border-black/10 dark:border-white/10 shrink-0">
                    {post.author.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black dark:text-white leading-snug">{post.author.name}</h4>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">{post.author.role}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.08] flex justify-between text-xs">
                  <span className="text-zinc-400 dark:text-zinc-500 font-medium">Published</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{post.date}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400 dark:text-zinc-500 font-medium">Read time</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{post.readTime}</span>
                </div>
              </div>

              {/* Share Card */}
              <div className="p-6 rounded-[28px] bg-[#f5f5f7]/90 dark:bg-[#1c1c1e]/90 backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">Share this post</p>
                <div className="flex flex-wrap gap-2.5">
                  <button onClick={handleShareLinkedIn} title="LinkedIn" className="flex-1 min-w-[80px] py-2.5 px-3 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-xs font-semibold flex items-center justify-center gap-2 shadow-xs cursor-pointer">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LinkedIn
                  </button>
                  <button onClick={handleShareX} title="X / Twitter" className="flex-1 min-w-[80px] py-2.5 px-3 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-xs font-semibold flex items-center justify-center gap-2 shadow-xs cursor-pointer">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    X
                  </button>
                  <button onClick={handleNativeShare} title="Copy Link" className="w-full py-2.5 px-4 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-xs font-semibold flex items-center justify-center gap-2 shadow-xs cursor-pointer">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                    Copy Link
                  </button>
                </div>
              </div>

              {/* Category Tag */}
              <div className="p-6 rounded-[28px] bg-[#f5f5f7]/90 dark:bg-[#1c1c1e]/90 backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all duration-300 space-y-3.5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">Category</p>
                <div className="flex">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-bold tracking-tight shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
            </div>
          </aside>
          </div>{/* end two-column flex */}
        </div>{/* end max-w container */}
      </article>

      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-50 bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-5 py-3 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 transition-all duration-300 transform ${toastMessage ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95 pointer-events-none"}`}>
        <span>{toastMessage}</span>
      </div>

      {/* Lightbox Zoom Modal Overlay */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out select-none"
          >
            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light focus:outline-none transition-colors cursor-pointer"
            >
              ✕
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightboxImg}
              alt="Zoomed View"
              className="max-w-full max-h-[88vh] object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default BlogPostDetail;
