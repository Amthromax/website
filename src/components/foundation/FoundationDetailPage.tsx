import React from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

interface FoundationArticleDetail {
  id: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  tagline: string;
  summary: string;
  challenge: string;
  initiative: string;
  impact: string;
  category: string;
}

const foundationArticlesDetails: Record<string, FoundationArticleDetail> = {
  "committing-to-communities-2026": {
    id: "committing-to-communities-2026",
    title: "Committing to communities: The 2026 People-First AI Fund",
    date: "Jun 15, 2026",
    readTime: "5 min read",
    image: "/images/glass_blue_butterfly.jpg",
    category: "Community Grants",
    tagline: "Empowering local nonprofit organizations to deploy intelligence where it is needed most.",
    summary: "As model capabilities advance rapidly, the Amthromax AI Foundation is committing to local communities through the People-First AI Fund. We are partnering with grass-roots organizations to provide resource grants, developer guidance, and localized cognitive workflows to address community-specific needs.",
    challenge: "Many community-aligned nonprofit organizations are left behind during rapid technological transitions. They suffer from systemic barriers including high compute costs, lack of engineering expertise, and limited access to secure custom models suitable for handling public-sector database integrations.",
    initiative: "We are allocating $120 million in dedicated grants and direct developer resource hours. Technical advisors from the foundation volunteer directly with municipal groups to deploy tailored models for crisis response dispatcher queues, localized supply-chain logistics, and automated housing casework.",
    impact: "Initial deployments across 12 civic partner operations saw a 22% improvement in municipal resource distribution speeds and a 34% reduction in caseload administrative queues, freeing up thousands of hours for personal social assistance."
  },
  "update-on-people-first-ai-fund": {
    id: "update-on-people-first-ai-fund",
    title: "Update on the People-First AI Fund",
    date: "Jun 4, 2026",
    readTime: "4 min read",
    image: "/images/glass_green_flower.png",
    category: "Milestones",
    tagline: "An overview of our global partnerships, grant allocations, and milestone achievements.",
    summary: "This operational update details the expansion of the People-First AI Fund, which now partners with 60 community organizations globally. We share key results in deploying decentralized agent software and building local developer capacities.",
    challenge: "Deploying cognitive technologies globally requires respecting diverse languages, local privacy mandates, and computing resource limitations in remote hubs that cannot support constant high-bandwidth internet connections.",
    initiative: "The fund has expanded support to agricultural research collectives in Southeast Asia and South America. We deploy lightweight, offline-resilient edge models that coordinate local crop diagnostics and secure local trading registers without relying on persistent cloud dependencies.",
    impact: "Over 47 localized offline-capable nodes are now live. These nodes have helped agricultural cooperatives automate fruit and soil quality grading, improving trade fairness and logistical coordination for over 150,551 regional farmers."
  },
  "resilience-in-the-age-of-ai": {
    id: "resilience-in-the-age-of-ai",
    title: "Resilience in the age of AI",
    date: "Jun 1, 2026",
    readTime: "7 min read",
    image: "/images/glass_blue_shell.jpg",
    category: "Workforce",
    tagline: "Preparing the workforce and digital ecosystem to absorb structural transitions safely.",
    summary: "As agentic systems integrate into mainstream business back-office pipelines, supporting human workforce transitions is vital. This article shares the foundation's guidelines for occupational safety nets and proactive skills training.",
    challenge: "Fast automation of routine database management, basic scripting, and document parsing creates localized friction for administrative workers, requiring immediate, high-quality training bridges into technical support roles.",
    initiative: "In coordination with community colleges, the foundation has launched the Resilient Careers Initiative. We fund 10,000 full-tuition vocational scholarships for training in agent system configuration, security auditing, and human-in-the-loop safety operations.",
    impact: "Our first cohort of 1,200 participants completed transition training, achieving a 92% employment rate within three months. Graduates transitioned from entry-level typing roles to high-demand positions in cloud operations and model monitoring."
  },
  "economic-futures-in-the-age-of-ai": {
    id: "economic-futures-in-the-age-of-ai",
    title: "Economic Futures in the Age of AI",
    date: "May 27, 2026",
    readTime: "6 min read",
    image: "/images/glass_pink_flower.png",
    category: "Policy Research",
    tagline: "Macroeconomic modeling of tax bases, resource allocation, and automated productivity gains.",
    summary: "Our latest macroeconomics report models how system-driven productivity dividends propagate. We offer policy frameworks for nations to capture these gains and reinvest them transparently into public infrastructures.",
    challenge: "Unrestricted automation risks concentrating economic gains in technology vendor capitals, creating economic disparities if regional public funding structures fail to modernize tax models.",
    initiative: "We published a public-access micro-modelling engine detailing API transaction royalty tracking, sovereign computing resource pools, and localized community datasets to support regional economic planning.",
    impact: "Our research framework has been adopted by international policy units and is forming the blueprint for a pilot study on universal local computing resources currently undergoing review in Northern Europe."
  },
  "ai-for-alzheimers": {
    id: "ai-for-alzheimers",
    title: "AI for Alzheimer's",
    date: "Apr 8, 2026",
    readTime: "8 min read",
    image: "/images/glass_yellow_flower.png",
    category: "Science Grants",
    tagline: "Deploying deep learning to isolate early biomarker patterns in neural imaging datasets.",
    summary: "Partnering with leading medical imaging institutes, the foundation has backed researchers using neural graph networks to identify early marker signatures in brain scans years before cognitive symptoms surface.",
    challenge: "Early screening for neurodegenerative diseases is complicated by differences in scanner hardware resolutions, noisy source files, and natural individual anatomical variances.",
    initiative: "We built a secure, HIPAA-compliant federated research pipeline, enabling 14 neural laboratories globally to train a collective graph transformer on over 200,000 anonymous scan histories without sharing underlying private patient records.",
    impact: "The collective model achieved a 96.8% accuracy rate in early Alzheimer's marker classification, allowing clinics to enroll patients in early therapeutic trials and helping families prepare proactive care paths."
  },
  "update-on-amthromax-foundation": {
    id: "update-on-amthromax-foundation",
    title: "Update on the Amthromax Foundation",
    date: "Mar 24, 2026",
    readTime: "5 min read",
    image: "/images/glass_blue_concentric.jpg",
    category: "Governance",
    tagline: "Reflecting on our annual commitments, organizational governance, and long-term milestones.",
    summary: "As we review our progress, we reaffirm our dedication to supporting public-interest technology. This report presents our yearly compute grants, safety council updates, and strict non-commercial audit separations.",
    challenge: "Allocating large-scale computing gifts requires structured oversight to prevent conflicts of interest and ensure studies remain independent of corporate commercial agendas.",
    initiative: "The foundation established a multi-stakeholder Advisory Council with representatives from academia and civil rights collectives. We also released an open-ledger registry to track every computing credit allocation.",
    impact: "Over $6 billion in compute allocations and financial tools were awarded this year, supporting 118 academic research teams and 84 municipal-aligned community organizations globally."
  }
};

const FoundationDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const article = articleId ? foundationArticlesDetails[articleId] : null;

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-gray-950 font-sans">
        <div className="py-24 text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Article not found</h2>
          <Link to="/foundation" className="text-blue-600 dark:text-blue-400 underline mt-4 inline-block">
            Back to Foundation
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      <SEO 
        title={`${article.title} | Amthromax Intelligence Hub`} 
        description={article.tagline} 
      />

      {/* Hero Header */}
      <div className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center text-center text-white bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-zinc-950/50 to-black z-0" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-sm scale-105"
          style={{ backgroundImage: `url(${article.image})` }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-xs uppercase tracking-widest text-blue-300 font-bold bg-blue-950/50 border border-blue-800/30 px-3.5 py-1.5 rounded-full">
            {article.category} &bull; {article.readTime}
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-inside text-white">
            {article.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            {article.tagline}
          </p>
          <p className="text-xs text-gray-400">Published on {article.date}</p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 gap-16">
        
        {/* Article Summary (Large Text Callout) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white pb-3 border-b border-gray-150 dark:border-white/[0.04]">
            Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-light italic">
            {article.summary}
          </p>
        </section>

        {/* Challenge Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-150 dark:border-white/[0.04]">
            The Challenge
          </h3>
          <p className="text-gray-600 dark:text-gray-305 text-sm md:text-base leading-relaxed">
            {article.challenge}
          </p>
        </section>

        {/* Initiative Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-150 dark:border-white/[0.04]">
            Our Initiative
          </h3>
          <p className="text-gray-600 dark:text-gray-350 text-sm md:text-base leading-relaxed">
            {article.initiative}
          </p>
        </section>

        {/* Impact Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-150 dark:border-white/[0.04]">
            Measurable Impact & Future Work
          </h3>
          <p className="text-gray-600 dark:text-gray-350 text-sm md:text-base leading-relaxed">
            {article.impact}
          </p>
        </section>

        {/* Back Link */}
        <div className="pt-8 border-t border-gray-150 dark:border-white/[0.04] flex items-center justify-between">
          <Link
            to="/foundation"
            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
          >
            <span>&larr;</span>
            <span>Back to Intelligence Hub</span>
          </Link>
          <span className="text-xs text-gray-400">© 2026 Amthromax Intelligence Hub</span>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FoundationDetailPage;
export { foundationArticlesDetails };
