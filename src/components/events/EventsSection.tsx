import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ProductIdeaItem {
  id: string;
  badge: string;
  title: string;
  specs: string;
  location: string;
  type: string;
  link: string;
}

const productIdeasData: ProductIdeaItem[] = [
  {
    id: "idea-1",
    badge: "Product 01",
    title: "OrarQlow.Ai Swarm Orchestration Engine",
    specs: "v1.4 Core Architecture · Latency <15ms",
    location: "Amthromax Core Lab, Bengaluru",
    type: "Autonomous Agent System",
    link: "/products"
  },
  {
    id: "idea-2",
    badge: "Product 02",
    title: "CodeHoomer.Ai High-Throughput Analytics",
    specs: "PostgreSQL & VectorDB Native · 100M+ Inferences",
    location: "Amthromax Data Systems, Mumbai",
    type: "Neural Data Grid",
    link: "/products"
  },
  {
    id: "idea-3",
    badge: "Product 03",
    title: "Helleious.Ai Zero-Code Workflow Triggers",
    specs: "Serverless Kubernetes · SOC2 Certified",
    location: "Amthromax Cloud, Bengaluru",
    type: "Event-Driven Automation",
    link: "/products"
  },
  {
    id: "idea-4",
    badge: "Product 04",
    title: "Verkox 0.4 Instant Lattice Encryption",
    specs: "NIST Quantum Standard · Hardware Isolation",
    location: "Amthromax Cyber Lab, Mumbai",
    type: "Post-Quantum Security",
    link: "/products"
  },
  {
    id: "idea-5",
    badge: "Product 05",
    title: "Amthromax SDKs & Edge API Gateway",
    specs: "REST & WebSockets · OpenAPI 3.1",
    location: "Amthromax Developer Hub, Bengaluru",
    type: "Developer Infrastructure",
    link: "/developers"
  },
  {
    id: "idea-6",
    badge: "Product 06",
    title: "Vector Context Mesh & Dynamic RAG",
    specs: "Sub-5ms Semantic Search · HNSW Indexing",
    location: "Amthromax AI Core, Mumbai",
    type: "Cognitive Vector Engine",
    link: "/products"
  }
];

const EventsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-[#f5f5f7] dark:bg-[#000000] transition-colors duration-300 antialiased overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
        {/* Section Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">
            Explore Amthromax Product Ideas
          </h2>
        </div>

        {/* Scrollable Product Ideas Carousel in Original Apple Box Styling */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto scrollbar-none pb-4 pt-2 -mx-6 px-6 sm:-mx-10 sm:px-10 lg:-mx-12 lg:px-12 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {productIdeasData.map((idea) => (
            <motion.div
              key={idea.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="w-[270px] sm:w-[300px] shrink-0 bg-white dark:bg-[#161617] rounded-[24px] border border-[#e5e5e7]/80 dark:border-white/[0.08] p-6 flex flex-col justify-between min-h-[250px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] transition-all duration-300"
            >
              {/* Badge & Title Block */}
              <div className="space-y-4">
                <span className="inline-block px-2.5 py-1 rounded-md bg-[#e8e8ed] dark:bg-white/10 text-[11px] font-semibold text-[#1d1d1f] dark:text-gray-200">
                  {idea.badge}
                </span>

                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-white leading-snug">
                  {idea.title}
                </h3>
              </div>

              {/* Product Metadata Footer */}
              <div className="space-y-3 pt-6 border-t border-[#e5e5e7]/60 dark:border-white/10">
                <p className="text-xs text-[#86868b] dark:text-gray-400 font-medium">
                  {idea.specs}
                </p>

                <div className="space-y-0.5 text-xs text-[#515154] dark:text-gray-300 font-medium">
                  <p>{idea.location}</p>
                  <p className="text-[#86868b] dark:text-gray-400">{idea.type}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Trailing spacer so the last card displays completely without clipping */}
          <div className="w-6 sm:w-10 lg:w-12 shrink-0" aria-hidden="true" />
        </div>

        {/* Carousel Footer Navigation Bar */}
        <div className="flex items-center justify-between pt-2">
          {/* Left Action Button */}
          <Link
            to="/products"
            className="px-6 py-2.5 bg-[#1d1d1f] hover:bg-[#333336] dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white rounded-full text-xs font-semibold transition-all duration-200 shadow-xs inline-block"
          >
            View all product ideas
          </Link>

          {/* Right Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll product ideas left"
              className="w-9 h-9 rounded-full bg-[#e8e8ed]/80 hover:bg-[#e8e8ed] dark:bg-white/10 dark:hover:bg-white/20 text-[#1d1d1f] dark:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll product ideas right"
              className="w-9 h-9 rounded-full bg-[#e8e8ed]/80 hover:bg-[#e8e8ed] dark:bg-white/10 dark:hover:bg-white/20 text-[#1d1d1f] dark:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
