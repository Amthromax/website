import React from "react";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-zinc-200 min-h-screen transition-colors duration-300 antialiased font-sans">
      <SEO
        title="Amthromax Terms of Service | Amthromax"
        description="Amthromax Terms of Service governing subscription agreements, platform usage, licensing, data processing, and user obligations."
      />

      {/* Clean Document Reading Layout Container */}
      <div className="max-w-6xl md:max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-12 pb-24">
        
        {/* Main Document Header */}
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-[46px] font-normal text-gray-950 dark:text-white tracking-tight leading-tight">
            Amthromax Terms of Service
          </h1>
          <p className="text-base italic text-gray-500 dark:text-zinc-400 mt-3 font-normal">
            Effective: August 24, 2026 (previous version)
          </p>
        </header>

        {/* Introductory Preamble */}
        <div className="space-y-6 text-[17px] sm:text-lg text-gray-800 dark:text-zinc-300 leading-[1.8] font-normal">
          <p>
            These Terms of Service (<strong>"Terms of Service"</strong> or <strong>"Terms"</strong>) are a legally binding agreement between you (<strong>"you"</strong> or <strong>"your"</strong>) and Amthromax Inc. (<strong>"Amthromax"</strong>, <strong>"we"</strong>, <strong>"our"</strong>, or <strong>"us"</strong>) governing your use of the Service and your relationship with us.
          </p>

          <p className="font-semibold text-gray-950 dark:text-white">
            You accept and agree to these Terms of Service by:
          </p>

          <ul className="list-disc pl-6 space-y-1.5 text-gray-800 dark:text-zinc-300">
            <li>Accessing or using the Service;</li>
            <li>Clicking to accept these Terms of Service, or</li>
            <li>Accepting these Terms of Service in any other way.</li>
          </ul>

          <p className="font-normal text-gray-950 dark:text-white">
            If you do not agree to these Terms of Service, you shouldn't access (and you don't have our permission to access) the Service.
          </p>

          <p>
            <strong>Important:</strong> Please note{" "}
            <a href="#section-6" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">
              Sections 6
            </a>{" "}
            and{" "}
            <a href="#section-12" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">
              12
            </a>{" "}
            of these Terms which include important information regarding Personal Information you provide to us or receive from us. Please also note{" "}
            <a href="#section-7" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">
              Section 7
            </a>
            , which contains arbitration provisions that impact certain rights you might otherwise have regarding disputes.
          </p>

          <p>
            <strong>Automatic Renewal Notice:</strong> Your subscription will automatically renew for additional periods of time as specified in your ordering document, unless you provide notice of cancellation as set forth below. The terms of automatic renewal, including pricing and renewal periods, are set out in the order form and section 4 of these terms.
          </p>

          <p>
            We may modify these Terms of Service (except for Section 7) in our sole discretion by posting updated versions of these Terms of Service on the Website or otherwise providing notice to you. All such changes shall become effective upon the posting of the revised Terms of Service on the Website or upon notice to you, as applicable.
          </p>
        </div>

        {/* Detailed Terms Sections */}
        <div className="space-y-12 mt-12 text-[17px] sm:text-lg text-gray-800 dark:text-zinc-300 leading-[1.8] font-normal">
          
          {/* 1. DEFINITIONS */}
          <section id="section-1" className="space-y-4">
            <h2 className="text-2xl sm:text-[26px] font-normal text-gray-950 dark:text-white tracking-tight">
              1. Definitions
            </h2>
            
            <div className="space-y-3">
              <p>
                <strong>“Amthromax DPA”</strong> means the Data Processing Addendum found at:{" "}
                <a href="https://amthromax.com/dpa" target="_blank" rel="noopener noreferrer" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">
                  https://amthromax.com/dpa
                </a>.
              </p>
              <p>
                <strong>“Authorized Users”</strong> means your employees or service providers or your wholly or majority-owned subsidiaries who have been expressly authorized by you to use the Services in accordance with these Terms.
              </p>
              <p>
                <strong>“Beta Services”</strong> means products, integrations, functionality, or features that Amthromax may make available to you to try at your discretion, which may be described as “alpha,” “beta,” “pilot,” “limited release,” “developer preview,” “non-production,” “early-stage”, or other similar description.
              </p>
              <p>
                <strong>“Business Contact Information”</strong> means information about a natural person in a professional context, including but not limited to, name, job title, employer, and contact information (such as email address and phone number), that is viewable in the Platform or made available to you as part of any of the Services.
              </p>
              <p>
                <strong>“Customer Data”</strong> means all data, graphics, images, files, information, text, voice content, recordings, and other content and materials that are provided by you in any way to Amthromax for processing in connection with your use of the Services. Customer Data does not include Usage Data.
              </p>
              <p>
                <strong>“Documentation”</strong> means any documentation, operating manuals and/or usage guides for the Platform provided by Amthromax in-product, via{" "}
                <a href="/docs" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">
                  Amthromax Docs
                </a>
                , or otherwise.
              </p>
              <p>
                <strong>“Personal Information”</strong> includes any substantially similar terms to “personal information” such as “personal data” or “personally identifiable information” under applicable law.
              </p>
              <p>
                <strong>“Services”</strong> means the AI software services and related offerings provided by Amthromax to you through or in connection with the Platform.
              </p>
            </div>
          </section>

          {/* 2. GRANT OF LICENSE; OWNERSHIP; SUPPORT */}
          <section id="section-2" className="space-y-4">
            <h2 className="text-2xl sm:text-[26px] font-normal text-gray-950 dark:text-white tracking-tight">
              2. Grant of License, Ownership, and Support
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-950 dark:text-white">a. Grant of License to You</h3>
                <p>
                  Subject to your compliance with these Terms, Documentation, any Order Form(s), and all applicable laws, Amthromax grants to you a non-exclusive, non-transferrable, non-sublicensable license to access and use the Services in accordance with these Terms during your Subscription Term solely for your internal business purposes.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-950 dark:text-white">b. Grant of License to Amthromax</h3>
                <p>
                  You grant Amthromax a worldwide, non-exclusive, royalty-free license for the Term to host and process Customer Data to provide the Services and support under these Terms. Amthromax will not publicly disclose or sell Customer Data.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-950 dark:text-white">c. Ownership & Intellectual Property</h3>
                <p>
                  As between you and Amthromax, all right, title, and interest in and to the Platform, including patents, copyrights, trademarks, trade secrets, derivatives, and algorithms are owned exclusively by Amthromax. Customer Data remains the sole property of Customer.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-950 dark:text-white">d. Technical Support</h3>
                <p>
                  Amthromax will provide commercially reasonable support to assist Authorized Users in accessing the Platform. You can contact Support weekdays via email at{" "}
                  <a href="mailto:support@amthromax.com" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">
                    support@amthromax.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* 3. AUTHORIZED USE / LICENSE RESTRICTIONS */}
          <section id="section-3" className="space-y-4">
            <h2 className="text-2xl sm:text-[26px] font-normal text-gray-950 dark:text-white tracking-tight">
              3. Authorized Use and License Restrictions
            </h2>

            <p>
              You agree that you and your Authorized Users will not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-zinc-300">
              <li>Reverse engineer, decompile, or attempt to derive source code from the Platform.</li>
              <li>Resell, sublicense, or rent access to the Platform to any unauthorized third party.</li>
              <li>Use automated bots, crawlers, or scrapers to extract platform data without permission.</li>
              <li>Use the Services for any unlawful, fraudulent, or malicious purpose.</li>
            </ul>
          </section>

          {/* 4. FEES AND PAYMENT TERMS */}
          <section id="section-4" className="space-y-4">
            <h2 className="text-2xl sm:text-[26px] font-normal text-gray-950 dark:text-white tracking-tight">
              4. Fees and Payment Terms
            </h2>

            <p>
              Fees are specified in applicable Order Forms or self-serve checkout plans. Subscriptions are billed in advance in U.S. Dollars. Late payments accrue interest at 1.5% per month or the maximum rate permitted by law. All subscription payments are non-refundable unless specified otherwise.
            </p>
          </section>

          {/* 5. TERM AND TERMINATION */}
          <section id="section-5" className="space-y-4">
            <h2 className="text-2xl sm:text-[26px] font-normal text-gray-950 dark:text-white tracking-tight">
              5. Term and Termination
            </h2>

            <p>
              Either party may terminate these Terms if the other party materially breaches and fails to cure such breach within thirty (30) days of receiving written notice. Upon termination, access rights immediately cease.
            </p>
          </section>

          {/* 6. REPRESENTATIONS AND WARRANTIES */}
          <section id="section-6" className="space-y-4">
            <h2 className="text-2xl sm:text-[26px] font-normal text-gray-950 dark:text-white tracking-tight">
              6. Representations, Warranties, and Disclaimers
            </h2>

            <p>
              Each party represents that it has full legal power to enter into these Terms. EXCEPT AS EXPRESSLY PROVIDED HEREIN, THE PLATFORM AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY.
            </p>
          </section>

          {/* 7. ARBITRATION AND GOVERNING LAW */}
          <section id="section-7" className="space-y-4">
            <h2 className="text-2xl sm:text-[26px] font-normal text-gray-950 dark:text-white tracking-tight">
              7. Binding Arbitration and Governing Law
            </h2>

            <p>
              Any disputes arising out of or relating to these Terms or the Services will be settled by binding individual arbitration under JAMS rules in San Francisco, California. Both parties expressly waive class action lawsuit rights.
            </p>
          </section>

          {/* 8. LIMITATION OF LIABILITY */}
          <section id="section-8" className="space-y-4">
            <h2 className="text-2xl sm:text-[26px] font-normal text-gray-950 dark:text-white tracking-tight">
              8. Limitation of Liability
            </h2>

            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, AMTHROMAX SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES. TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE TOTAL FEES PAID BY YOU IN THE 12 MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          {/* 9. CONTACT LEGAL DEPARTMENT & REGIONAL REPRESENTATIVES */}
          <section id="section-9" className="space-y-4">
            <h2 className="text-2xl sm:text-[26px] font-normal text-gray-950 dark:text-white tracking-tight">
              9. Contact Legal Department & Regional Representatives
            </h2>

            <p>
              For legal notices, contract inquiries, or privacy compliance matters regarding these Terms of Service, please contact our global legal representatives:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 pt-2 text-[17px] sm:text-lg">
              <div className="space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <p className="font-normal text-gray-950 dark:text-white text-lg sm:text-xl">Global & USA Headquarters</p>
                <p className="text-gray-800 dark:text-zinc-300">Amthromax Inc. Legal Office</p>
                <p className="text-gray-800 dark:text-zinc-300">Email: <a href="mailto:privacy@amthromax.com" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">privacy@amthromax.com</a></p>
              </div>

              <div className="space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <p className="font-normal text-gray-950 dark:text-white text-lg sm:text-xl">United Kingdom Representative</p>
                <p className="text-gray-800 dark:text-zinc-300">Lionheart Squared Limited (FAO Amthromax)</p>
                <p className="text-gray-800 dark:text-zinc-300">Email: <a href="mailto:uk-privacy@amthromax.com" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">uk-privacy@amthromax.com</a></p>
              </div>

              <div className="space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <p className="font-normal text-gray-950 dark:text-white text-lg sm:text-xl">European Union Representative</p>
                <p className="text-gray-800 dark:text-zinc-300">Lionheart Squared (Europe) Ltd (FAO Amthromax)</p>
                <p className="text-gray-800 dark:text-zinc-300">Email: <a href="mailto:eu-privacy@amthromax.com" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">eu-privacy@amthromax.com</a></p>
              </div>

              <div className="space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <p className="font-normal text-gray-950 dark:text-white text-lg sm:text-xl">Switzerland Representative</p>
                <p className="text-gray-800 dark:text-zinc-300">Lionheart Squared Switzerland SarL (FAO Amthromax)</p>
                <p className="text-gray-800 dark:text-zinc-300">Email: <a href="mailto:ch-privacy@amthromax.com" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">ch-privacy@amthromax.com</a></p>
              </div>
            </div>

            <p className="pt-2 text-sm">
              Child safety issues may be reported directly to our trust team at{" "}
              <a href="mailto:safety@amthromax.com" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">
                safety@amthromax.com
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

export default TermsOfServicePage;

