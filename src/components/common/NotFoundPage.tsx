import React from "react";
import { Link } from "react-router-dom";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between select-none">
      <SEO
        title="404 - Page Not Found | Amthromax"
        description="The requested page could not be found on the Amthromax network."
      />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        {/* Glow Halo Background */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-blue-600/30 blur-3xl" />
          <h1 className="relative text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 tracking-tighter">
            404
          </h1>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
          Page Not Found
        </h2>
        
        <p className="max-w-md text-sm md:text-base text-gray-400 font-normal leading-relaxed mb-8">
          The node or destination endpoint you requested could not be located on the Amthromax neural matrix.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-white text-black font-bold text-xs hover:bg-gray-200 transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Return to Main Index</span>
            <span>→</span>
          </Link>
          <Link
            to="/docs"
            className="px-6 py-3 rounded-full bg-white/10 text-white font-bold text-xs hover:bg-white/20 border border-white/10 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Explore API Documentation
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
