import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts, type BlogPost } from "./blogData";
import SEO from "../layout/SEO";
import { isHouseAuthor, HouseMark } from "./AuthorAvatar";
import MermaidFigure from "./MermaidFigure";
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
    const stored = localStorage.getItem("amthromax_posts_v2");
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

  /* The contents rail is built from the article's own "## " headings, and
     the same slug is put on each rendered heading so the links can reach
     them. */
  const slugify = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const tocItems = useMemo(
    () =>
      (post?.content ?? [])
        .filter((line) => line.startsWith("## "))
        .map((line) => ({ id: slugify(line.slice(3)), title: line.slice(3) })),
    [post]
  );

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (!tocItems.length) return;
    const onScroll = () => {
      /* The heading nearest the top of the viewport, but still above it, is
         the one being read. */
      let current = tocItems[0].id;
      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) current = item.id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [tocItems]);

  if (!post) {
    return (
      <div className="py-32 text-center bg-white dark:bg-black min-h-[90vh] font-sans">
        <SEO title="Post Not Found | Amthromax" description="The requested blog post could not be found." />
        <div className="max-w-md mx-auto space-y-6 px-6">
          <h1 className="text-3xl font-medium text-gray-900 dark:text-white">Blog Post Not Found</h1>
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
          {/* Post header, centred */}
          <header className="mx-auto max-w-3xl space-y-6 text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] text-zinc-500 dark:text-zinc-400">
              <span className="text-zinc-700 dark:text-zinc-300">{post.date}</span>
              <span>{post.category}</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-balance text-4xl md:text-5xl lg:text-[58px] font-medium tracking-tight text-black dark:text-white leading-[1.08]">
              {post.title}
            </h1>

            <p className="text-pretty mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              {post.excerpt}
            </p>
          </header>

          {/* Byline and share, on one rule */}
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 border-y border-black/[0.07] py-4 dark:border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-black text-sm font-semibold text-white dark:border-white/10 dark:bg-white dark:text-black">
                {isHouseAuthor(post.author.name) ? <HouseMark /> : post.author.avatar}
              </div>
              <div className="text-left">
                <p className="text-[13px] font-medium text-black dark:text-white">{post.author.name}</p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareLinkedIn}
                title="Share to LinkedIn"
                className="flex h-8 w-8 items-center justify-center text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </button>
              <button
                onClick={handleShareX}
                title="Share to X"
                className="flex h-8 w-8 items-center justify-center text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </button>
              <button
                onClick={handleShareGmail}
                title="Share via email"
                className="flex h-8 w-8 items-center justify-center text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </button>
              <button
                onClick={handleNativeShare}
                title="Copy link"
                className="flex h-8 w-8 items-center justify-center text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div 
            onClick={() => setLightboxImg(post.image)}
            className="relative aspect-[16/9] md:aspect-[21/7] w-full overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.05] cursor-zoom-in group/heroimg"
          >
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 animate-pulse -z-10" />
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/heroimg:scale-[1.03]" 
            />
          </div>

          {/* Contents rail beside the article body */}
          <div className="relative flex flex-col lg:block gap-10 pt-6">
          {tocItems.length > 1 && (
            <aside className="hidden lg:block lg:absolute lg:left-0 lg:top-6 w-56">
              <nav className="sticky top-28 space-y-3" aria-label="On this page">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-[12.5px] leading-snug transition-colors ${
                      activeSection === item.id
                        ? "font-medium text-black dark:text-white"
                        : "text-zinc-500 hover:text-black dark:text-zinc-500 dark:hover:text-white"
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </aside>
          )}
          {/* Main Article Content */}
          <div className="min-w-0 w-full lg:mx-auto lg:max-w-3xl space-y-6 text-gray-750 dark:text-gray-300 text-base md:text-lg leading-relaxed">
            {post.content.map((paragraph, index) => {
              /* Diagram: "```mermaid\n<definition>```" optionally followed by
                 a caption on its own line after the closing fence. */
              if (paragraph.startsWith("```mermaid")) {
                const body = paragraph.slice("```mermaid".length);
                const close = body.lastIndexOf("```");
                const chart = (close === -1 ? body : body.slice(0, close)).trim();
                const caption = close === -1 ? "" : body.slice(close + 3).trim();
                return <MermaidFigure key={index} chart={chart} caption={caption || undefined} />;
              }

              /* Table: pipe-delimited rows, the second being the separator. */
              if (paragraph.startsWith("|") && paragraph.includes("\n")) {
                const rows = paragraph
                  .split("\n")
                  .filter((r) => r.trim().startsWith("|"))
                  .map((r) => r.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));

                if (rows.length >= 2 && /^[:\- ]+$/.test(rows[1].join(""))) {
                  const [head, , ...body] = rows;
                  const cell = (text: string) =>
                    text.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="font-semibold text-gray-900 dark:text-white">{part}</strong>
                      ) : (
                        part
                      )
                    );
                  /* Some tables in long-form posts are unheaded two-column
                     summaries, where an empty header row should not print. */
                  const headed = head.some((h) => h.length > 0);

                  return (
                    <div key={index} className="my-8 overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10">
                      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                        {headed && (
                          <thead>
                            <tr className="bg-gray-50 dark:bg-white/[0.04]">
                              {head.map((h, i) => (
                                <th key={i} className="border-b border-gray-200 px-4 py-3 font-medium text-gray-900 dark:border-white/10 dark:text-white">
                                  {cell(h)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {body.map((row, ri) => (
                            <tr key={ri} className="align-top">
                              {row.map((c, ci) => (
                                <td key={ci} className="border-b border-gray-100 px-4 py-3 leading-relaxed text-gray-600 last:border-r-0 dark:border-white/[0.06] dark:text-gray-300">
                                  {cell(c)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
              }

              /* Figure: "figure:<src>|<caption>". The image block below
                 crops to a fixed height, which suits a photograph and ruins
                 a chart, so figures get their own full-fit treatment. */
              if (paragraph.startsWith("figure:")) {
                const [src, ...rest] = paragraph.slice("figure:".length).split("|");
                const caption = rest.join("|").trim();
                return (
                  <figure key={index} className="my-10">
                    <button
                      type="button"
                      onClick={() => setLightboxImg(src.trim())}
                      aria-label={caption ? `Enlarge: ${caption}` : "Enlarge figure"}
                      className="block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 sm:p-3 transition-shadow duration-300 hover:shadow-[0_18px_44px_-24px_rgba(15,23,42,0.4)] dark:border-white/10 dark:bg-[#0b0b0c]"
                    >
                      <img
                        src={src.trim()}
                        alt={caption || "Figure"}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full rounded-xl object-contain"
                      />
                    </button>
                    {caption && (
                      <figcaption className="mt-3 text-center text-xs sm:text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
                        {caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              // Image parsing
              if (paragraph.startsWith("![") && paragraph.endsWith(")")) {
                const match = paragraph.match(/!\[(.*?)\]\((.*?)\)/);
                if (match) {
                  return (
                    <div 
                      key={index} 
                      onClick={() => setLightboxImg(match[2])}
                      className="my-12 flex justify-center group/inlineimg cursor-zoom-in"
                    >
                      <div className="relative overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.05]">
                        <img 
                          src={match[2]} 
                          alt={match[1]} 
                          className="max-w-full lg:max-w-3xl max-h-[600px] object-cover block transition-transform duration-700 ease-out group-hover/inlineimg:scale-[1.02]" 
                        />
                      </div>
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
                      <span className="inline-block px-2.5 py-1 rounded-full bg-gray-50 dark:bg-white/[0.06] text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 text-[10px] font-bold whitespace-nowrap">
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
                  <div key={index} className="my-10 overflow-hidden rounded-2xl border border-gray-150 dark:border-white/[0.04] bg-white dark:bg-[#161617] shadow-lg">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-[13px] md:text-sm">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-900/80 border-b border-gray-150 dark:border-white/[0.04]">
                            <th className="p-4 font-extrabold text-gray-900 dark:text-white">Capability</th>
                            <th className="p-4 font-extrabold text-gray-900 dark:text-white text-center bg-gray-50 dark:bg-white/[0.05]">
                              Helleious.ai<br/>
                              <span className="text-[9px] font-bold text-gray-900 dark:text-white uppercase tracking-widest">(planned)</span>
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
                              <td className="p-4 text-center bg-gray-50 dark:bg-white/[0.04] border-x border-gray-100 dark:border-white/[0.02]">{renderValue(row.Helleious)}</td>
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
                const text = paragraph.slice(3);
                return (
                  <h2
                    key={index}
                    id={slugify(text)}
                    className="scroll-mt-28 text-2xl md:text-3xl font-medium tracking-tight mt-12 mb-4 text-gray-900 dark:text-white"
                  >
                    {text}
                  </h2>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl md:text-2xl font-medium mt-8 mb-3 text-gray-900 dark:text-white">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              // Blockquote
              if (paragraph.startsWith("> ")) {
                let text = paragraph.replace("> ", "");
                // check if it starts and ends with quotes
                return (
                  <blockquote key={index} className="border-l-4 border-gray-900 pl-5 py-2 my-8 italic text-lg text-gray-600 dark:text-gray-450 bg-gray-50/50 dark:bg-gray-900/30 rounded-r-xl pr-4">
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
                            <span className="text-gray-900 mt-1.5 shrink-0">•</span>
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
                              <span className="font-bold text-gray-900 dark:text-white mt-0.5 shrink-0">{m[1]}.</span>
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
                    <span className="text-gray-900 mt-1.5 shrink-0">•</span>
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
                      <span className="font-bold text-gray-900 dark:text-white mt-0.5 shrink-0">{match[1]}.</span>
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
          <div className="mt-16 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/[0.05] dark:to-white/[0.03] border border-gray-200/50 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white">Interested in AI automation?</h3>
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
              <h3 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white">Recommended Reading</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recommendations.map((rec) => (
                  <Link
                    key={rec.id}
                    to={`/blog/${rec.id}`}
                    className="group block overflow-hidden rounded-2xl bg-gray-50 dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] p-5 hover:shadow-md transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                        {rec.category}
                      </span>
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors leading-snug">
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
