import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const PrivacyPolicyPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<"optout" | "access" | "delete" | null>(null);
  const [requestEmail, setRequestEmail] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestEmail.trim()) {
      setRequestSubmitted(true);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setRequestEmail("");
    setRequestSubmitted(false);
  };

  return (
    <div className="privacy-page font-sans antialiased">
      <SEO
        title="Amthromax Privacy Policy | Amthromax"
        description="Amthromax Privacy Policy explaining data collection, automated telemetry, AI usage, privacy rights, and compliance options."
      />

      {/* Clean Document Reading Layout Container */}
      <div className="legal-container pt-[72px]">
        
        {/* Main Document Header */}
        <header>
          <h1 className="privacy-title text-gray-950 dark:text-[#f5f5f5]">
            Amthromax Privacy Policy
          </h1>
          <p className="privacy-effective text-gray-600 dark:text-[#9b9b9b]">
            Effective: August 24, 2026 (
            <button 
              type="button" 
              onClick={() => setActiveModal("access")}
              className="underline hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              previous version
            </button>
            )
          </p>
        </header>

        {/* Clean Preamble & Introductory Text */}
        <div>
          <p>
            At Amthromax LLC (<strong>"Amthromax"</strong>, <strong>"our"</strong>, <strong>"us"</strong> or <strong>"we"</strong>), we value your privacy and are committed to being fair, accountable, and transparent in how we collect, process, secure, and disclose your personal information. This Privacy Policy applies to personal information collected when you access or use our websites (including{" "}
            <a href="/" className="hover:text-zinc-400 transition-colors font-medium">
              Amthromax.com
            </a>
            ), mobile applications, developer portals, enterprise workspaces, or connected developer APIs (collectively, our <strong>"Service"</strong>).
          </p>

          <p>
            This Privacy Policy describes our practices regarding data collection, model inferencing, processing choices, user rights, and global privacy compliance. Please review this document carefully to understand how your information is handled.
          </p>
        </div>

        {/* 12 Numbered Detailed Sections */}
        <div>
          
          {/* Section 1 */}
          <section className="privacy-section">
            <h2>
              1. About Amthromax and Amthromax AI
            </h2>
            <p>
              Amthromax is a US-based enterprise artificial intelligence company working on building AI tools to accelerate human scientific discovery and enterprise workflows. We are guided by our mission to advance our collective understanding of intelligence. As part of our mission, we have developed our proprietary conversational and generative AI suite powered by Amthromax's foundation models.
            </p>
            <p>
              More information about Amthromax's development and training of models and data controls is available in our Consumer FAQs, Enterprise FAQs, and the official Amthromax website.
            </p>
          </section>

          {/* Section 2 */}
          <section className="privacy-section">
            <h2>
              2. Personal Information We Collect (Notice at Collection)
            </h2>
            <p>
              We ask that you do NOT include sensitive personal information in your prompts and inputs into our Service; however, we cannot control what you provide to us. We may collect personal information from you and about you as described below:
            </p>

            <div className="space-y-6 pl-4 sm:pl-6 border-l-2 border-zinc-200 dark:border-zinc-800">
              
              {/* Account Data */}
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-950 dark:text-white">Account Data</h3>
                <p>
                  If you create an account with us, we collect your name, contact information, account credentials, company name, and date of birth. If you log into our Service using a third-party service (such as Google, Apple, GitHub, or X), that third-party will send your information to us at your direction (e.g., public profile details, username, email address, and authentication tokens).
                </p>
                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  <strong>How collected:</strong> Directly from you or from third-party login providers.<br />
                  <strong>How used:</strong> To provide, analyze, and maintain Service; to offer customer assistance; to ensure security and prevent fraud; for legal compliance.<br />
                  <strong>How disclosed:</strong> To contracted service providers, in business transfers, for legal compliance, and to related entities.
                </p>
              </div>

              {/* Payment Data */}
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-950 dark:text-white">Payment Data</h3>
                <p>
                  Where payment is required to access the Service (e.g., if you are paying for a workspace subscription or API usage), payment information (such as credit card details, billing address, and transaction records) is processed securely by PCI-DSS compliant third-party processors (such as Stripe, Apple App Store, or Google Play Store).
                </p>
                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  <strong>How collected:</strong> Through third-party payment processors.<br />
                  <strong>How used:</strong> To process transactions, maintain subscription seats, handle billing inquiries, and fulfill accounting requirements.<br />
                  <strong>How disclosed:</strong> To billing processors, contracted infrastructure providers, and for legal audit obligations.
                </p>
              </div>

              {/* Communication Data */}
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-950 dark:text-white">Communication Data</h3>
                <p>
                  If you communicate with us (by email, customer portal, support desk, or social media), we collect personal information you voluntarily submit, including your name, email address, support tickets, and message contents.
                </p>
                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  <strong>How collected:</strong> Directly from your submissions.<br />
                  <strong>How used:</strong> To respond to inquiries, troubleshoot platform issues, collect feedback, and send administrative updates.
                </p>
              </div>

              {/* User Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-950 dark:text-white">User Content (Inputs & Outputs)</h3>
                <p>
                  You may provide personal information in prompts and other content you input, such as text prompts, code repositories, document attachments, images, audio, voice, or video ("Inputs"). Model responses generated by Amthromax ("Outputs") are derived from your Inputs.
                </p>
                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  <strong>How collected:</strong> Directly from your active use of the Service.<br />
                  <strong>How used:</strong> To generate AI model outputs, execute multi-agent task workflows, evaluate system latency, and maintain security.
                </p>
              </div>

              {/* Feedback Data */}
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-950 dark:text-white">Feedback Data</h3>
                <p>
                  When you rate model responses using thumbs-up/thumbs-down icons, submit bug reports, or complete feedback surveys, we collect your ratings and voluntary written feedback.
                </p>
              </div>

              {/* Technical & Telemetry Data */}
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-950 dark:text-white">Technical & Telemetry Data</h3>
                <p>
                  We automatically log information such as your IP address, device type, browser specifications, operating system, referral URLs, feature engagement metrics, page view latencies, and session timestamps.
                </p>
              </div>

              {/* Location Data */}
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-950 dark:text-white">Location Data</h3>
                <p>
                  We determine the general geographic area (country and city level) from which your device accesses our Services based on IP address. If precise GPS location is requested by specific workflow tools, we obtain explicit consent prior to collection.
                </p>
              </div>

              {/* Publicly Available Data */}
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-950 dark:text-white">Publicly Available Data</h3>
                <p>
                  We utilize information publicly available on the internet to train our foundation models and deliver intelligence. While we do not intentionally seek out personal data, public web resources may incidentally contain personal records.
                </p>
              </div>

              {/* Google OAuth Protection */}
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-950 dark:text-white">Google OAuth & Connected App Data Protection</h3>
                <p>
                  For users who opt to connect Google Workspace apps via Google OAuth, <strong>Amthromax shall not use any Google Apps content for internal AI training purposes</strong> (such as training foundation machine learning models) or developing new commercial products based on such private connected content.
                </p>
              </div>

              {/* Sensitive Data Notice */}
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-950 dark:text-white">Sensitive Personal Information Restrictions</h3>
                <p>
                  We do not seek to collect sensitive personal information (such as data revealing racial/ethnic origin, political opinions, religious beliefs, health records, biometrics, or trade union membership) and request that you do not submit such data into prompts. Amthromax does not process training data to infer sensitive personal categories.
                </p>
              </div>

            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
              3. How We May Use Personal Information
            </h2>
            <p>
              We use collected personal information for the following core operational purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-zinc-300">
              <li><strong>Service Execution & Inferencing:</strong> To route prompts to AI clusters, generate responses, and orchestrate agent task workflows.</li>
              <li><strong>Support & Assistance:</strong> To troubleshoot technical issues, monitor model performance, and respond to support tickets.</li>
              <li><strong>Research & Product Improvement:</strong> To refine user interfaces, enhance security guardrails, and evaluate system stability.</li>
              <li><strong>Communication:</strong> To send non-promotional security notices, billing receipts, platform status updates, and administrative communications.</li>
              <li><strong>Security & Intrusion Prevention:</strong> To protect platform integrity, prevent malicious prompt injection attacks, and detect fraudulent activity.</li>
              <li><strong>Legal Obligations:</strong> To comply with applicable statutory laws, tax regulations, court orders, and law enforcement requests.</li>
            </ul>
            <p>
              We may aggregate, pseudoanonymize, or de-identify personal information so that it no longer identifies an individual, maintaining it strictly in de-identified form unless re-identification is required by law.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
              4. How We May Disclose Personal Information
            </h2>
            <p>
              Amthromax does NOT sell your personal information. We disclose personal data solely under the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-zinc-300">
              <li><strong>Contracted Service Providers:</strong> To vetted service providers assisting in cloud infrastructure hosting, data storage, payment gateways, analytics, and security monitoring under strict confidentiality obligations.</li>
              <li><strong>Business Transfers:</strong> In connection with or during negotiations of any merger, financing, acquisition, bankruptcy dissolution, or sale of company assets.</li>
              <li><strong>Legal Compliance & Protection:</strong> To comply with valid legal processes, enforce our Terms of Service, protect the rights and safety of Amthromax, our users, or the public.</li>
              <li><strong>Affiliated Corporate Entities:</strong> To our parent, subsidiary, or related corporate entities for customer management, platform operations, and technical support.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
              5. Retention of Personal Information
            </h2>
            <p>
              We retain your personal information for as long as necessary to fulfill legitimate business purposes or meet statutory legal requirements.
            </p>
            <p>
              When Private Mode or ephemeral inferencing is enabled, conversation inputs are not saved to your persistent history and are deleted from active systems within 30 days unless legal retention hold applies. If you request account or conversation deletion, data is purged from active databases within 30 days.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
              6. Security of Personal Information
            </h2>
            <p>
              Amthromax implements commercially reasonable technical, administrative, and physical safeguards designed to protect personal information from loss, misuse, unauthorized access, disclosure, or destruction.
            </p>
            <p>
              We utilize TLS 1.3 protocol encryption for data in transit and AES-256 bit encryption for data at rest. However, no internet transmission method is 100% secure. You remain responsible for safeguarding your login credentials and signing out after sessions.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
              7. Links to Third-Party Websites
            </h2>
            <p>
              Our Service may contain links to external third-party websites, developer tools, or social media pages not operated by Amthromax. Third-party platforms operate under their own independent terms and privacy policies, which we encourage you to review.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
              8. Children Under the Age of 13
            </h2>
            <p>
              Our Service is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. Teenagers between the ages of 13 and 17 may only use the Service with parental or legal guardian consent and oversight.
            </p>
            <p>
              If you believe we have inadvertently collected personal data from a child under 13, please contact our child safety team immediately at{" "}
              <a href="mailto:safety@amthromax.com" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">
                safety@amthromax.com
              </a>
              .
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
              9. Privacy Rights, Choices, and Appeals
            </h2>
            <p>
              Depending on your geographic location (including GDPR, UK GDPR, CCPA/CPRA, LGPD), you may exercise statutory privacy rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-zinc-300">
              <li><strong>Right to Know & Access:</strong> Request details and copies of personal data processed by Amthromax.</li>
              <li><strong>Right to Correction:</strong> Request rectification of inaccurate personal records.</li>
              <li><strong>Right to Deletion:</strong> Request full erasure of personal account information.</li>
              <li><strong>Right to Withdraw Consent:</strong> Revoke previously granted data processing permissions at any time.</li>
              <li><strong>Right to Non-Discrimination:</strong> Equal service access regardless of privacy rights exercise.</li>
              <li><strong>Authorized Agents & Appeals:</strong> Submit requests via authorized legal representatives or file formal appeals if a privacy request is initially declined.</li>
            </ul>
            <p className="pt-2">
              To exercise these rights or file an appeal, please visit our online{" "}
              <button
                type="button"
                onClick={() => setActiveModal("optout")}
                className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors cursor-pointer"
              >
                Privacy Request Portal
              </button>{" "}
              or email{" "}
              <a href="mailto:privacy@amthromax.com" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">
                privacy@amthromax.com
              </a>
              .
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
              10. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our platform features, technology, or legal requirements. Updated versions will be published on this page with a revised effective date.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
              11. Child Safety & Harm Reporting
            </h2>
            <p>
              Amthromax is committed to preventing online child exploitation and harm. To report child safety concerns or illegal content, please contact our trust and safety office directly at{" "}
              <a href="mailto:safety@amthromax.com" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">
                safety@amthromax.com
              </a>
              .
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-white tracking-tight">
              12. How to Contact Us About Privacy Requests
            </h2>
            <p>
              If you have questions, privacy requests, or complaints regarding our data handling, please contact our global privacy offices:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 pt-2 text-[17px] sm:text-lg">
              <div className="space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <p className="font-normal text-gray-950 dark:text-white text-lg sm:text-xl">Global & USA Headquarters</p>
                <p className="text-gray-800 dark:text-zinc-300">Amthromax Inc.</p>
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
              You may also reach our Data Protection Officer directly at{" "}
              <a href="mailto:dpo@amthromax.com" className="underline text-gray-950 dark:text-white hover:text-zinc-400 font-medium transition-colors">
                dpo@amthromax.com
              </a>
              .
            </p>
          </section>

        </div>
      </div>

      {/* Interactive Privacy Portal Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-md bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-left"
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="mb-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {activeModal === "optout" && "Privacy Request & Opt-Out"}
                  {activeModal === "access" && "Request Data Export"}
                  {activeModal === "delete" && "Request Data Erasure"}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Submit your work email to initiate identity verification and process your request.
                </p>
              </div>

              {requestSubmitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 text-xl flex items-center justify-center mx-auto">
                    ✓
                  </div>
                  <h4 className="text-base font-bold text-white">Verification Sent</h4>
                  <p className="text-xs text-zinc-300">
                    We have dispatched a confirmation email to <span className="font-semibold text-white">{requestEmail}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 px-5 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={requestEmail}
                      onChange={(e) => setRequestEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 font-medium text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
