import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";
import { COMMITMENTS } from "./commitments";

const TrustCommitmentPage: React.FC = () => {
  const { commitmentId } = useParams<{ commitmentId: string }>();
  const index = COMMITMENTS.findIndex((c) => c.slug === commitmentId);
  const commitment = index >= 0 ? COMMITMENTS[index] : null;

  if (!commitment) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-black font-sans">
        <div className="py-32 text-center space-y-4">
          <h1 className="text-2xl text-gray-900 dark:text-white">Commitment not found</h1>
          <Link to="/trust" className="text-gray-900 dark:text-white underline underline-offset-4">
            Back to Trust &amp; Transparency
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const next = COMMITMENTS[(index + 1) % COMMITMENTS.length];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-sans transition-colors duration-300 antialiased">
      <SEO
        title={`${commitment.title} | Amthromax Trust`}
        description={commitment.body}
      />

      {/* Header */}
      <section className="pt-28 pb-14 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-6"
        >
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[11px] text-gray-400 dark:text-gray-500"
          >
            <Link to="/trust" className="transition-colors hover:text-gray-900 dark:hover:text-white">
              trust
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-gray-900 dark:text-white">commitment {commitment.n}</span>
          </nav>

          <h1 className="text-balance text-3xl sm:text-5xl font-serif tracking-tight leading-[1.1] text-gray-900 dark:text-white">
            {commitment.title}
          </h1>

          <p className="text-pretty text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
            {commitment.lede}
          </p>
        </motion.div>
      </section>

      {/* What it means */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1100px] mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t border-gray-200 dark:border-white/10 pt-10">
          <h2 className="md:col-span-4 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
            What it means
          </h2>
          <ul className="md:col-span-8 space-y-4">
            {commitment.whatItMeans.map((point) => (
              <li key={point} className="flex gap-3 text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
                <span
                  aria-hidden="true"
                  className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gray-900 dark:bg-white"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it is enforced */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1100px] mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t border-gray-200 dark:border-white/10 pt-10">
          <h2 className="md:col-span-4 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
            How it is enforced
          </h2>
          <dl className="md:col-span-8 divide-y divide-gray-200 dark:divide-white/10 border-t border-b border-gray-200 dark:border-white/10">
            {commitment.howItIsEnforced.map((row) => (
              <div key={row.term} className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                <dt className="sm:col-span-4 text-sm text-gray-900 dark:text-white tracking-tight">{row.term}</dt>
                <dd className="sm:col-span-8 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{row.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Where the line is */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1100px] mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t border-gray-200 dark:border-white/10 pt-10">
          <h2 className="md:col-span-4 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
            Where the line is
          </h2>
          <p className="md:col-span-8 text-sm sm:text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
            {commitment.limits}
          </p>
        </div>
      </section>

      {/* Verify it */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1100px] mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t border-gray-200 dark:border-white/10 pt-10">
          <h2 className="md:col-span-4 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
            Check it yourself
          </h2>
          <div className="md:col-span-8 flex flex-wrap gap-3">
            {commitment.verify.map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to}
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-white/20 px-5 py-2.5 text-sm text-gray-900 dark:text-white transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <span>{link.label}</span>
                <span aria-hidden="true">&rsaquo;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pager */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1100px] mx-auto pb-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-gray-200 dark:border-white/10 pt-8">
          <Link
            to="/trust"
            className="font-mono text-[11px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            &larr; all commitments
          </Link>

          <Link to={`/trust/commitments/${next.slug}`} className="group text-right space-y-1">
            <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
              Next &mdash; {next.n}
            </span>
            <span className="block text-base sm:text-lg font-serif text-gray-900 dark:text-white group-hover:underline underline-offset-4">
              {next.title}
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrustCommitmentPage;
