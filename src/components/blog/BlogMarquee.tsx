import React from "react";
import { Link } from "react-router-dom";

export interface MarqueeItem {
  id: string;
  title: string;
  date: string;
  link: string;
}

const marqueeItems: MarqueeItem[] = [
  {
    id: "m1",
    title: "New in CodeHoomer.AI: self-hosted sandboxes and MCP tunnels",
    date: "May 19, 2026",
    link: "/codehoomer"
  },
  {
    id: "m2",
    title: "New in CodeHoomer Managed Agents: dreaming, outcomes, and multiagent orchestration",
    date: "May 19, 2026",
    link: "/codehoomer"
  },
  {
    id: "m3",
    title: "New connectors in Helleious.AI for everyday workflow automation",
    date: "April 23, 2026",
    link: "/helleious"
  },
  {
    id: "m4",
    title: "Built-in long-term memory for Atlas AI Agent Networks",
    date: "April 23, 2026",
    link: "/products"
  },
  {
    id: "m5",
    title: "Redesigning CodeHoomer on desktop for parallel autonomous agents",
    date: "April 14, 2026",
    link: "/codehoomer"
  },
  {
    id: "m6",
    title: "OrarQlow.AI: Autonomous agent swarm orchestration engine released",
    date: "August 15, 2026",
    link: "/orarqlow"
  },
  {
    id: "m7",
    title: "Helleious.AI Core Views on Safety & Governance whitepaper published",
    date: "August 13, 2026",
    link: "/blog/helleious-ai-core-views-on-safety-and-governance"
  },
  {
    id: "m8",
    title: "Amthromax Secures $8.5M in Seed Funding to scale autonomous platforms",
    date: "June 12, 2026",
    link: "/blog/seed-funding-announcement"
  }
];

const BlogMarquee: React.FC = () => {
  // Duplicate array for infinite seamless scrolling loop
  const doubledItems = [...marqueeItems, ...marqueeItems];

  return (
    <section className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden bg-[#0d0d0e] dark:bg-[#000000] border-y border-white/10 py-7 select-none group my-12">
      {/* Side gradient blur overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0d0d0e] dark:from-[#000000] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0d0d0e] dark:from-[#000000] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] items-stretch">
        {doubledItems.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            to={item.link}
            className="flex flex-col justify-between px-8 sm:px-12 border-r border-white/10 min-w-[300px] sm:min-w-[380px] max-w-[440px] group/item hover:opacity-90 transition-opacity shrink-0"
          >
            <h3 className="text-base sm:text-lg font-serif font-medium text-white tracking-tight leading-snug group-hover/item:text-blue-400 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs font-sans text-gray-400 font-normal mt-5">
              {item.date}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogMarquee;
