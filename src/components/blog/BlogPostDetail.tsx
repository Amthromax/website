import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogPosts, type BlogPost } from "./blogData";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const BlogPostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
      <div className="py-32 text-center bg-white dark:bg-gray-950 min-h-[90vh] font-sans">
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

  return (
    <div>
      <SEO title={`${post.title} | Amthromax Blog`} description={post.excerpt} />

      <article className="py-16 md:py-24 bg-white dark:bg-gray-950 transition-colors duration-300 min-h-[85vh] font-sans">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
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
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <span>{post.category}</span>
              <span>•</span>
              <span className="text-gray-400 dark:text-gray-500">{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed italic border-l-4 border-blue-500 pl-4 py-1">
              {post.excerpt}
            </p>
          </div>

          {/* Author Block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-gray-100 dark:border-gray-900">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black font-black text-base flex items-center justify-center border border-gray-200 dark:border-gray-800 shadow-sm">
                {post.author.avatar}
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{post.author.name}</h4>
                <p className="text-xs text-gray-400 dark:text-gray-500">{post.author.role}</p>
              </div>
            </div>
            
            {/* Share and Date Block */}
            <div className="flex flex-wrap items-center gap-6 sm:ml-auto">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-1">Share</span>
                
                {/* LinkedIn */}
                <button
                  onClick={handleShareLinkedIn}
                  className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-[#0077b5] hover:border-[#0077b5] dark:text-gray-400 dark:hover:text-[#0077b5] dark:hover:border-[#0077b5] flex items-center justify-center hover:bg-blue-50/10 transition-all select-none cursor-pointer"
                  title="Share to LinkedIn"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>

                {/* X */}
                <button
                  onClick={handleShareX}
                  className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-black hover:border-black dark:text-gray-400 dark:hover:text-white dark:hover:border-white flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-all select-none cursor-pointer"
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
          <div className="aspect-[21/9] w-full overflow-hidden rounded-[32px] border border-gray-150 dark:border-white/[0.04] shadow-md bg-gray-50 dark:bg-gray-900">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover object-top" />
          </div>

          {/* Article Body */}
          <div className="space-y-6 text-gray-750 dark:text-gray-300 text-base md:text-lg leading-relaxed pt-4">
            {post.content.map((paragraph, index) => {
              // Image parsing
              if (paragraph.startsWith("![") && paragraph.endsWith(")")) {
                const match = paragraph.match(/!\[(.*?)\]\((.*?)\)/);
                if (match) {
                  return (
                    <div key={index} className="my-8 rounded-[24px] overflow-hidden border border-gray-150 dark:border-white/[0.04] shadow-md bg-gray-50 dark:bg-gray-900">
                      <img src={match[2]} alt={match[1]} className="w-full object-cover" />
                    </div>
                  );
                }
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
              // Bullet lists
              if (paragraph.startsWith("• ")) {
                // parse bold items inside bullets, e.g. **text**
                const cleanText = paragraph.replace("• ", "");
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
              // Numbered lists or ordered items
              if (/^\d+\.\s/.test(paragraph)) {
                const match = paragraph.match(/^(\d+)\.\s(.*)/);
                if (match) {
                  const num = match[1];
                  const text = match[2];
                  const parts = text.split("**");
                  return (
                    <div key={index} className="flex items-start space-x-3 pl-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
                      <span className="font-bold text-blue-600 dark:text-blue-400 mt-0.5 shrink-0">{num}.</span>
                      <span>
                        {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-extrabold text-gray-900 dark:text-white">{part}</strong> : part)}
                      </span>
                    </div>
                  );
                }
              }
              // Normal paragraph with basic **bolding** check
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
          </div>

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
        </div>
      </article>

      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-50 bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-5 py-3 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 transition-all duration-300 transform ${toastMessage ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95 pointer-events-none"}`}>
        <span>{toastMessage}</span>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPostDetail;
