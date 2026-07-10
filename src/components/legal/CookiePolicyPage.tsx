import React from "react";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const CookiePolicyPage: React.FC = () => {
  return (
    <div>
      <SEO title="Cookie Policy | Amthromax" description="Understand how Amthromax uses cookies and other tracking technologies." />
      <div className="py-20 bg-white dark:bg-gray-950 min-h-[85vh] transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full">Legal</span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Cookie Policy</h1>
          <p className="text-sm text-gray-400">Last updated: July 10, 2026</p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. What Are Cookies?</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Cookies are small text files placed on your device to store data that can be recalled by a web server in the domain that placed the cookie. We use cookies and similar technologies for storing and honoring your preferences and settings, enabling you to sign in, combating fraud, analyzing how our services perform, and fulfilling other legitimate purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. How We Use Cookies</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Amthromax uses cookies for several purposes, depending on the product, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li><strong>Authentication and Sign-in:</strong> To verify your account and determine when you're logged in.</li>
              <li><strong>Security:</strong> To help detect fraud, abuse, and security vulnerabilities.</li>
              <li><strong>Analytics and Heatmaps:</strong> We integrate services like Microsoft Clarity and Google Analytics to understand user interaction and optimize layout structure.</li>
              <li><strong>Preferences:</strong> To save your settings, preferences, and theme choices.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. Your Choices and Controls</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Most web browsers automatically accept cookies but provide controls that allow you to block or delete them. You can also customize your consent preferences through our built-in Cookie Consent banner at any time.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
