import React from "react";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="privacy-page font-sans antialiased">
      <SEO
        title="Amthromax Cookie Policy | Amthromax"
        description="Understand how Amthromax uses cookies, local storage, and telemetry technologies across our platform."
      />

      {/* Clean Document Reading Layout Container */}
      <div className="legal-container pt-[48px]">
        
        {/* Main Document Header */}
        <header>
          <h1 className="privacy-title text-gray-950 dark:text-[#f5f5f5]">
            Amthromax Cookie Policy
          </h1>
          <p className="privacy-effective text-gray-600 dark:text-[#9b9b9b]">
            Effective: August 24, 2026 (previous version)
          </p>
        </header>

        {/* Clean Preamble & Introductory Text */}
        <div>
          <p>
            At Amthromax LLC (<strong>"Amthromax"</strong>, <strong>"our"</strong>, <strong>"us"</strong> or <strong>"we"</strong>), we use cookies, web beacons, pixels, and local storage technologies to provide, secure, and improve our services (our <strong>"Service"</strong>). This Cookie Policy explains what these technologies are, why we use them, and your options for controlling their deployment.
          </p>
        </div>

        {/* Numbered Sections */}
        <div>
          
          <section className="privacy-section">
            <h2>
              1. What Are Cookies and Web Telemetry?
            </h2>
            <p>
              Cookies are small text data files placed on your browser or device by web servers when you visit websites. Local storage and web beacons allow us to retain authentication session states, store user interface preferences, prevent automated bot access, and evaluate telemetry performance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
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
            <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
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

