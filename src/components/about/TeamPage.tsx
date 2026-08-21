import React from "react";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300 antialiased">
      <SEO 
        title="Our Team | Amthromax" 
        description="Meet the researchers, engineers, policy experts and operational leaders working together to build reliable AI at Amthromax." 
      />

      {/* The Team Section */}
      <section className="bg-white dark:bg-black py-16 md:py-32 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Title and Intro */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#3b82f6] font-bold">
              AMTHROMAX PEOPLE
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">The Team</h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              We're a team of researchers, engineers, policy experts and operational leaders, with experience spanning a variety of disciplines, all working together to build reliable and understandable AI systems.
            </p>
          </div>

          {/* Right Side: Grid of 4 Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            
            {/* Card 1: Research */}
            <div className="space-y-4 group">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-gray-100 dark:bg-gray-900 shadow-sm border border-gray-150 dark:border-white/[0.04]">
                <img src="/images/640e3cf4-fdca-454f-94f2-c7f0b3e6e2fb.png" alt="Research Team" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Research</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                We conduct frontier AI research across a variety of modalities, and explore novel and emerging safety research areas from interpretability to RL from human feedback to policy and societal impacts analysis.
              </p>
            </div>

            {/* Card 2: Policy */}
            <div className="space-y-4 group">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-gray-100 dark:bg-gray-900 shadow-sm border border-gray-150 dark:border-white/[0.04]">
                <img src="/images/fe804857-0af4-43e4-874d-4ed7f3dd6185.png" alt="Policy Team" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Policy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                We think about the impacts of our work and strive to communicate what we're seeing at the frontier to policymakers and civil society in the US and abroad to help promote safe and reliable AI.
              </p>
            </div>

            {/* Card 3: Product */}
            <div className="space-y-4 group">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-gray-100 dark:bg-gray-900 shadow-sm border border-gray-150 dark:border-white/[0.04]">
                <img src="/images/0be174a2-c311-4bdd-abba-9a98efbcedb7.png" alt="Product Team" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Product</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                We translate our research into tangible, practical tools like Amthromax that benefit businesses, nonprofits and civil society groups and their clients and people around the globe.
              </p>
            </div>

            {/* Card 4: Operations */}
            <div className="space-y-4 group">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-gray-100 dark:bg-gray-900 shadow-sm border border-gray-150 dark:border-white/[0.04]">
                <img src="/images/150460d3-f8ae-4b7a-9282-12cae6edc5df.png" alt="Operations Team" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Operations</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Our people, finance, legal, and recruiting teams are the human engines that make Amthromax go. We've had previous careers at NASA, startups, and the armed forces and our diverse experiences help make our algorithms better.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamPage;
