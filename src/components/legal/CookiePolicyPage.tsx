import React from "react";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-zinc-200 min-h-screen transition-colors duration-300 antialiased font-sans">
      <SEO
        title="Amthromax Cookie Policy | Amthromax"
        description="Understand how Amthromax uses cookies, local storage, and telemetry technologies across our platform."
      />

      {/* Clean Document Reading Layout Container */}
      <div className="max-w-6xl md:max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-12 pb-24">
        
        {/* Main Document Header */}
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-[46px] font-normal text-gray-950 dark:text-white tracking-tight leading-tight">
            Amthromax Cookie Policy
          </h1>
          <p className="text-base italic text-gray-500 dark:text-zinc-400 mt-3 font-normal">
            Effective: August 24, 2026 (previous version)
          </p>
        </header>

        {/* Clean Preamble & Introductory Text */}
        <div className="space-y-6 text-[17px] sm:text-lg text-gray-800 dark:text-zinc-300 leading-[1.8] font-normal">
          <p>
            At Amthromax LLC (<strong>"Amthromax"</strong>, <strong>"our"</strong>, <strong>"us"</strong> or <strong>"we"</strong>), we use cookies, web beacons, pixels, and local storage technologies to provide, secure, and improve our services (our <strong>"Service"</strong>). This Cookie Policy explains what these technologies are, why we use them, and your options for controlling their deployment.
          </p>
        </div>

        {/* Numbered Sections */}
        <div className="space-y-12 mt-12 text-[17px] sm:text-lg text-gray-800 dark:text-zinc-300 leading-[1.8] font-normal">
          
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-[26px] font-normal text-gray-950 dark:text-white tracking-tight">
              1. What Are Cookies and Web Telemetry?
            </h2>
            <p>
              Cookies are small text data files placed on your browser or device by web servers when you visit websites. Local storage and web beacons allow us to retain authentication session states, store user interface preferences, prevent automated bot access, and evaluate telemetry performance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl sm:text-[26px] font-normal text-gray-950 dark:text-white tracking-tight">
              2. How We Use Cookies
            </h2>
            <p>
              We categorize cookies and telemetry into the following functional purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-zinc-300">
              <li><strong>Essential & Authentication Cookies:</strong> Required to verify user accounts, secure API requests, and maintain active logged-in sessions.</li>
              <li><strong>Security & Threat Prevention:</strong> Used to detect automated intrusion attempts, rate limit abusive bot traffic, and protect platform infrastructure.</li>
              <li><strong>Analytics & Diagnostics:</strong> Help us measure platform usage, identify UI friction points, and analyze feature adoption to continuously refine user experience.</li>
              <li><strong>Preferences & Settings:</strong> Retain user options such as dark mode preferences, language selections, and workspace configurations.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl sm:text-[26px] font-normal text-gray-950 dark:text-white tracking-tight">
              3. Managing Your Cookie Preferences
            </h2>
            <p>
              You have full control over cookie permissions on your browser or device. Most web browsers allow you to modify settings to decline non-essential cookies, clear stored cache, or alert you when a cookie is placed.
            </p>
            <p>
              Please note that disabling strictly necessary essential cookies may disrupt access to authenticated platform features and secure workspace tools.
            </p>
            <p className="pt-2">
              For privacy inquiries regarding telemetry data, please contact our data team at{" "}
              <a href="mailto:privacy@amthromax.com" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">
                privacy@amthromax.com
              </a>
              .
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookiePolicyPage;

