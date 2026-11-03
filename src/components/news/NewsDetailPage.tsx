import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { newsItems } from "../blog/blogData";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

/** Renders one content line: a sub-heading, bullet, quote or paragraph. */
const Prose: React.FC<{ line: string }> = ({ line }) => {
  const bold = (text: string) =>
    text.split("**").map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-medium text-gray-900 dark:text-white">{part}</strong>
      ) : (
        part
      )
    );

  if (line.startsWith("### ")) {
    return (
      <h3 className="text-lg font-normal text-gray-900 dark:text-white pt-2 font-sans">
        {line.slice(4)}
      </h3>
    );
  }

  if (line.startsWith("> ")) {
    return (
      <blockquote className="border-l-2 border-gray-300 dark:border-white/20 pl-5 py-1 text-sm sm:text-base italic text-gray-500 dark:text-gray-400">
        {bold(line.slice(2))}
      </blockquote>
    );
  }

  if (line.startsWith("\u2022 ") || /^\d+\.\s/.test(line) || line.includes("\n")) {
    const items = line.split("\n");
    return (
      <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 pl-2 font-normal">
        {items.map((item, i) => {
          const numbered = item.match(/^(\d+)\.\s(.*)/);
          const text = numbered ? numbered[2] : item.replace(/^\u2022\s/, "");
          return (
            <li key={i} className="flex items-start gap-2">
              <span className="text-gray-400 font-normal shrink-0">
                {numbered ? `${numbered[1]}.` : "\u2022"}
              </span>
              <span>{bold(text)}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
      {bold(line)}
    </p>
  );
};

const NewsDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();

  const article = newsItems.find((item) => item.id === articleId) || newsItems[0];
  const recommendations = newsItems.filter((item) => item.id !== article.id).slice(0, 3);

  /* Sections come from the article's own "## " headings. Everything before
     the first one is the lead. */
  const slugify = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const { lead, sections, tocItems } = useMemo(() => {
    const parsed = article.content.reduce<{ id: string; title: string; body: string[] }[]>(
      (acc, line) => {
        if (line.startsWith("## ")) {
          const title = line.slice(3);
          acc.push({ id: slugify(title), title, body: [] });
        } else if (acc.length) {
          acc[acc.length - 1].body.push(line);
        }
        return acc;
      },
      []
    );

    const firstHeading = article.content.findIndex((l) => l.startsWith("## "));
    const intro = article.content.slice(0, firstHeading === -1 ? article.content.length : firstHeading);

    return {
      lead: intro,
      sections: parsed,
      tocItems: [
        ...(intro.length ? [{ id: "overview", title: "Overview" }] : []),
        ...parsed.map(({ id, title }) => ({ id, title })),
      ],
    };
  }, [article]);

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
    <div className="bg-white dark:bg-black transition-colors duration-300 min-h-screen font-sans">
      <SEO
        title={`${article.title} | Amthromax Insights`}
        description={article.summary}
      />

      {/* Hero Header Section */}
      <section className="bg-white dark:bg-black border-b border-gray-200 dark:border-white/10 py-12 sm:py-16 lg:py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Header Info */}
            <div className="lg:col-span-12 space-y-6 max-w-4xl">
              {/* Breadcrumb Navigation */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-normal tracking-wide text-gray-500 dark:text-gray-400">
                <Link to="/newsroom" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Insights
                </Link>
                <span className="text-gray-400">&gt;</span>
                <Link to="/newsroom" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  {article.category}
                </Link>
                <span className="text-gray-400">&gt;</span>
                <span className="text-gray-900 dark:text-white font-normal truncate max-w-[280px]">
                  {article.title}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-sans text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                {article.title}
              </h1>

              {/* Date */}
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {article.date || "March 1, 2025"}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  className="bg-black dark:bg-white text-white dark:text-black font-medium text-xs px-5 py-2.5 rounded-full shadow-sm hover:opacity-90 transition-all cursor-pointer select-none"
                >
                  Sign up for free
                </button>
              </div>

              {/* Author Badge */}
              <div className="flex items-center pt-2">
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/10 p-1.5 flex items-center justify-center border border-gray-200 dark:border-white/10 shadow-xs shrink-0">
                  <img
                    src="/images/amthromax_asterisk_logo.png"
                    alt="Amthromax logo"
                    className="w-full h-full object-contain dark:invert"
                  />
                </div>
                <span className="text-xs font-normal text-gray-700 dark:text-gray-300 ml-3">
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
          
          {/* Left Minimal Table of Contents Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-28">
            <h4 className="text-[11px] font-normal uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 mb-4 block select-none">
              TABLE &nbsp;OF &nbsp;CONTENTS
            </h4>
            
            <nav className="divide-y divide-gray-200 dark:divide-white/10 border-t border-b border-gray-200 dark:border-white/10">
              {tocItems.map((item) => {
                const isActive = activeSectionId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`block text-left text-xs sm:text-[13px] leading-snug py-3.5 w-full transition-colors cursor-pointer ${
                      isActive
                        ? "font-medium text-gray-900 dark:text-white"
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
            
            {lead.length > 0 && (
              <div id="overview" className="space-y-4">
                <p className="text-lg sm:text-xl font-normal text-gray-900 dark:text-gray-100 leading-relaxed border-l-2 border-gray-900 dark:border-white pl-5">
                  {lead[0]}
                </p>
                {lead.slice(1).map((line, i) => (
                  <Prose key={i} line={line} />
                ))}
              </div>
            )}

            {sections.map((section, si) => (
              <div
                key={section.id}
                id={section.id}
                className={`space-y-4 ${si === 0 ? "pt-4" : "pt-8"} border-t border-gray-200 dark:border-white/10`}
              >
                <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white tracking-tight font-sans">
                  {section.title}
                </h2>
                {section.body.map((line, i) => (
                  <Prose key={i} line={line} />
                ))}
              </div>
            ))}

          </article>
        </div>
      </main>

      {/* Bottom "Don't miss these" Recommendations Section */}
      <section className="bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 py-12 sm:py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          <h2 className="text-3xl sm:text-4xl font-normal font-sans text-gray-900 dark:text-white tracking-tight">
            Don't miss these
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <Link
                key={rec.id}
                to={`/news/${rec.id}`}
                className="group rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-[11px] font-normal uppercase tracking-widest text-gray-500 dark:text-gray-400 block">
                    {rec.category}
                  </span>
                  <h3 className="text-xl font-normal font-sans text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors leading-[1.25] tracking-tight">
                    {rec.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 font-normal">
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
