import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogPosts } from "./blogData";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const BlogPostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.id === postId);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [postId]);

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

  // Get 2 recommended posts excluding current one
  const recommendations = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

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
          <div className="flex items-center space-x-4 py-6 border-y border-gray-100 dark:border-gray-900">
            <div className="w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black font-black text-base flex items-center justify-center border border-gray-200 dark:border-gray-800 shadow-sm">
              {post.author.avatar}
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">{post.author.name}</h4>
              <p className="text-xs text-gray-400 dark:text-gray-500">{post.author.role}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-gray-400 dark:text-gray-500">Published</p>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{post.date}</p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-[21/9] w-full overflow-hidden rounded-[32px] border border-gray-150 dark:border-white/[0.04] shadow-md bg-gray-50 dark:bg-gray-900">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Article Body */}
          <div className="space-y-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed pt-4">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
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
      <Footer />
    </div>
  );
};

export default BlogPostDetail;
