import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const PrivacyPolicyPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<"optout" | "access" | "delete" | null>(null);
  const [requestEmail, setRequestEmail] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const [widgetEmail, setWidgetEmail] = useState("");
  const [widgetSubmitted, setWidgetSubmitted] = useState(false);

  const handleWidgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (widgetEmail.trim()) {
      setWidgetSubmitted(true);
    }
  };

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
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 antialiased font-sans">
      <SEO
        title="Understand Your Privacy Rights and Data Options | Amthromax"
        description="Amthromax Privacy Policy explaining data collection, automated telemetry, AI usage, privacy rights, and compliance options."
      />

      {/* Compact Container Layout with Tight Spacing */}
      <div className="max-w-6xl md:max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-10 sm:pt-14 pb-16">
        
        {/* Main Header */}
        <header className="mb-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-gray-900 dark:text-white tracking-tight leading-[1.15] mb-2">
            Understand Your Privacy Rights and Data Options
          </h1>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Last Updated: September 16, 2025
          </p>
        </header>

        {/* Compact Google API Disclosure Banner Box */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/70 dark:bg-white/[0.02] p-5 sm:p-6 mb-6 shadow-sm"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-950 dark:text-white mb-2 tracking-tight">
            Google API Disclosure
          </h2>
          <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed font-normal">
            Amthromax's use of information received from Google APIs will adhere to{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-gray-400 dark:decoration-gray-500 hover:decoration-gray-950 dark:hover:decoration-white text-gray-950 dark:text-white transition-all font-medium"
            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
        </motion.div>

        {/* Crisp Introductory Overview Paragraphs */}
        <div className="space-y-3 text-base text-gray-800 dark:text-gray-200 leading-relaxed font-normal mb-8 pt-2">
          <p>
            Amthromax Inc. ("Amthromax", "we" or "us") offers a business intelligence and enterprise AI platform through which businesses that use it ("Customers", "Users" or "you") can obtain information and use Amthromax's engagement and other marketing tools to assist them in better marketing to potential prospects and others who may be interested in their products (collectively, the "Services").
          </p>

          <p>
            This Privacy Policy explains how we process personal information, including business contact information and other types of personal information that are submitted to us through our Services or otherwise collected, stored, used, disclosed, inferred, acquired or processed by us in connection with developing, improving or providing our Services.
          </p>

          <p>
            This Privacy Policy also describes Amthromax's practices for collecting, storing, using, disclosing, and otherwise processing personal information in relation to visitors to our website ("Website"), Amthromax's marketing activities, and Customers' use and access of our Services.
          </p>

          <p>
            For data subjects whose personal information is included in Amthromax's contributor database, this Privacy Policy is intended to provide you with information on who Amthromax is, how you can opt-out of our database, and the potential outcomes of remaining in our database. You can opt-out of our database by visiting our{" "}
            <button
              type="button"
              onClick={() => setActiveModal("optout")}
              className="underline underline-offset-4 decoration-gray-400 dark:decoration-gray-500 hover:decoration-gray-950 dark:hover:decoration-white text-gray-950 dark:text-white font-medium transition-all inline cursor-pointer"
            >
              Privacy Center
            </button>
            . At the{" "}
            <button
              type="button"
              onClick={() => setActiveModal("access")}
              className="underline underline-offset-4 decoration-gray-400 dark:decoration-gray-500 hover:decoration-gray-950 dark:hover:decoration-white text-gray-950 dark:text-white font-medium transition-all inline cursor-pointer"
            >
              Privacy Center
            </button>{" "}
            you can also submit an access request to learn more about the data Amthromax has collected about you. Using the{" "}
            <button
              type="button"
              onClick={() => setActiveModal("delete")}
              className="underline underline-offset-4 decoration-gray-400 dark:decoration-gray-500 hover:decoration-gray-950 dark:hover:decoration-white text-gray-950 dark:text-white font-medium transition-all inline cursor-pointer"
            >
              Privacy Center
            </button>{" "}
            is the fastest and most efficient way to access your information or have it deleted from our database. However, if you are unable to use any of our self-serve forms available through the Privacy Center or have additional questions on how to exercise your privacy rights, you can email us at{" "}
            <a
              href="mailto:privacy@amthromax.com"
              className="underline underline-offset-4 decoration-gray-400 dark:decoration-gray-500 hover:decoration-gray-950 dark:hover:decoration-white text-gray-950 dark:text-white transition-all font-medium"
            >
              privacy@amthromax.com
            </a>
            .
          </p>

          <p>
            By remaining in our database, you may be contacted by our Customers when they are conducting their business-to-business sales and marketing activities. Communications you receive from our Customers may be relevant to your profession or employment role, but we cannot guarantee that you will find such communications to be relevant or of interest to you. By accessing the Service, visiting the Website or otherwise participating in Amthromax marketing activities, you acknowledge the collection, use, disclosure and other handling of your personal information as described in this Privacy Policy.
          </p>
        </div>

        {/* Interactive Opt-Out Business Email Verification Card */}
        <div className="my-10 p-8 sm:p-10 rounded-2xl bg-[#dbe8ff] dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-center shadow-sm max-w-2xl mx-auto">
          {!widgetSubmitted ? (
            <form onSubmit={handleWidgetSubmit} className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight leading-snug">
                To opt-out, please enter your Business Email Address
              </h3>

              <div className="text-left space-y-1.5 max-w-md mx-auto">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Work email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john.smith@company.com"
                  value={widgetEmail}
                  onChange={(e) => setWidgetEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-black shadow-inner"
                />
              </div>

              <div className="max-w-md mx-auto">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-black hover:bg-gray-900 text-white font-semibold text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md group"
                >
                  <span>Get verification information</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold">
                <span>✓</span> Verification Request Initiated
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Verification Details
              </h3>
              <div className="space-y-2 p-4 rounded-xl bg-white/80 dark:bg-white/5 border border-blue-200 dark:border-white/10 text-sm text-gray-800 dark:text-gray-200">
                <p><strong>Work Email:</strong> {widgetEmail}</p>
                <p><strong>Reference Code:</strong> OPT-2026-{Math.floor(10000 + Math.random() * 90000)}</p>
                <p><strong>Status:</strong> Verification email sent to {widgetEmail}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 pt-1">
                  Please check your inbox to click the verification link and finalize database suppression.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setWidgetSubmitted(false);
                  setWidgetEmail("");
                }}
                className="text-xs text-blue-600 dark:text-blue-400 underline font-medium cursor-pointer"
              >
                ← Enter another email address
              </button>
            </div>
          )}
        </div>

        {/* Complete 16 Sections of Privacy Policy in High Quality Typography */}
        <div className="space-y-8 text-base text-gray-800 dark:text-gray-200 leading-relaxed font-normal">
          
          {/* Section 1 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              1. Information we use to provide the service
            </h2>
            <p>
              We use a variety of information that we obtain from various sources, including our Customers and their users, and we may also generate new information about you (derived personal information) by analyzing or combining other data we collect, in order to provide the Service.
            </p>

            <div className="space-y-2 pt-1">
              <h3 className="text-lg font-bold text-gray-950 dark:text-white">
                Information we collect from third party sources
              </h3>
              <p>
                We may obtain information from third party sources, such as data providers and integration parties, or from public sources and methods, such as information available on public APIs and the internet. Amthromax is registered as a data broker in applicable states. We require our data providers to certify lawful collection and consent.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <h3 className="text-lg font-bold text-gray-950 dark:text-white">
                Information Customers and Users submit to us
              </h3>
              <p>
                Customers and their Users may provide a variety of information to us through the Service. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Users' own contact and other personal information, such as name, email address, telephone number, job title, employer and location.</li>
                <li>Information about our Customers' business contacts, such as their contacts list or customer list; including for instance, name, email address, telephone number, job title, employer and location.</li>
                <li>Other personal information, such as website visitor IP addresses, that our Customers submit to us through their use of our Service.</li>
              </ul>
              <p>
                When Customers or their Users submit data to Amthromax through the Service, they acknowledge and agree that Amthromax may use such information to grow, enrich, and verify the information included in our Contributory Database, which is made available to other Amthromax customers as part of our Services. This means that the information they provide to Amthromax may be used to enhance the quality, accuracy, and completeness of the data available to all customers of the Amthromax platform.
              </p>
              <p>
                If we provide a payment option to Customers, we may collect payment data, and if a Customer purchases one of our online subscription-based Services, the Customer may need to provide payment and/or credit card information, and other information to validate their payment method and identity. We will use that information to fulfill the Customer's purchase request.
              </p>
              <p>
                We likewise may request, and Customers and their Users may provide, additional information in order to create, support, and maintain their account enabling access to the Services. We refer to all of the above information referred to in this Section 1 as “Service Information.” Our use of Service Information is governed by our Terms of Service and/or our other agreements with those Customers or their Users.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              2. Information we collect automatically
            </h2>
            <p>
              We also use automated means to collect a variety of information from visitors to our Website and Users of our Service. We refer to this information, which we describe below (in this Section 2), as “Usage Information.”
            </p>
            <p>
              First, if you visit our Website, or open an email that we send to you or that our Customers send to you through the Service, we and third parties, including but not limited to Meta, may use automated means to collect information about you, your computer or other device, your use of the Website or engagement with the email, to provide measurement services, and/or target and deliver ads. These automated means include technologies such as cookies, Web server logs, Web beacons, pixels, and JavaScript, as well as functionality that can collect data from a mobile device.
            </p>
            <p>
              Cookies are files that websites and online services create and access on your computer or other Internet-connected device to uniquely identify your browser or to store information or settings on your device. Our Website and the Service may use HTTP cookies, HTML5 cookies, Flash cookies and other types of local storage (such as browser-based or plugin-based local storage). If you visit our Website or use the Service, your browser may tell you how to be notified when you receive certain types of cookies and how to restrict or disable certain cookies. Please note, however, that without cookies or local storage you may not be able to use all of the features of our Website or the Service.
            </p>
            <p>
              In conjunction with the gathering of information through cookies and other automated means, Web servers may log information such as your device type, operating system type, browser type, domain, and other system settings, as well as the language your system uses and the country and time zone where your device is located. The Web server logs also may record information such as the address of the Web page that referred you to the Website and/or our Service and the IP address of the device you use to connect to the Internet. Cookies and similar technologies also may log information about your interaction with our Website or the Service, such as which pages you visit or which Service functionality that you use, including by tracking page content, and movements, in a manner that allows us to reproduce and fix issues and to identify areas of improvement. You can opt out of the use of this software by contacting us at{" "}
              <a href="mailto:privacy@amthromax.com" className="underline underline-offset-4 decoration-gray-400 dark:decoration-gray-500 hover:decoration-gray-950 text-gray-950 dark:text-white font-medium">
                privacy@amthromax.com
              </a>{" "}
              or by opting out of any data collection by any non-essential cookies using the banner on our website.
            </p>
            <p>
              In some cases, we or our service providers may use information such as your IP address or device identifiers to help infer or enrich information about you as an individual, such as your company, industry, location, or other personal or professional attributes, for analytics, service improvement, or marketing purposes.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              3. Information we collect from marketing and sales activities
            </h2>
            <p>
              You provide your personal information to us when you voluntarily fill in forms on our Website such as when you request a demo or to contact sales. This personal information may include: first and last name, company name, job title, work email address, country and/or state, phone number and the content of your request.
            </p>
            <p>
              You may also share personal information with us through our Website when you register for an event or online webinar or training; sign up to receive emails or newsletters; download information; or complete a survey. This personal information may include: first and last name, company name, job title, work email address, country and/or state, phone number and the content of your request.
            </p>
            <p>
              You may also provide Amthromax with your personal information at a marketing event or through marketing activities. This personal information may include: first and last name, company name, job title, work email address, work address, phone number and the content of your request. If you attend an in-person or virtual event or agree to be recorded in a telephone or video meeting, we may record some or all of that event or meeting. We refer to all of the above information as “Marketing Information.”
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              4. Use of Service Information, Usage Information and Marketing Information
            </h2>
            
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-950 dark:text-white">a. How we use the service information</h3>
              <p>We use the Service Information for several purposes:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>To provide, evaluate and improve the Service.</li>
                <li>To analyze how the Service is used.</li>
                <li>To otherwise administer and troubleshoot the Service.</li>
                <li>To generate derived personal information, such as inferences, profiles, or predictions about you, based on other information we collect.</li>
                <li>To create new products, services and tools that we may use internally or offer to others, including Customers.</li>
                <li>To verify your identity and establish your account.</li>
                <li>To send you updates, emails, newsletters and other information that may be of interest to you.</li>
                <li>When we obtain the Service Information for purposes of our own corporate business relations – such as to find and communicate with businesses we believe may be interested in our Service – we may use the Service Information for marketing and advertising.</li>
              </ul>

              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 my-3 space-y-2">
                <h4 className="font-bold text-gray-950 dark:text-white text-base">Artificial Intelligence (AI) and Machine Learning</h4>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  Amthromax uses artificial intelligence (AI) and machine learning technologies to enhance our platform and features, including automated email personalization, insight generation, lead scoring, agentic workflows, and other sales and marketing functionalities. To provide these features, Amthromax may use Service Information and business contact data as inputs to both internally developed models and third-party AI providers. We may use your data for profiling to provide sales intelligence and lead scoring. You have the right to object to or opt-out of such processing via our{" "}
                  <button type="button" onClick={() => setActiveModal("optout")} className="underline underline-offset-4 decoration-gray-400 dark:decoration-gray-500 font-semibold text-gray-950 dark:text-white hover:decoration-gray-950">Privacy Center</button>.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-950 dark:text-white">b. How we use the Usage Information</h3>
              <p>We use Usage Information to evaluate and improve the Website or Service, analyze usage, administer troubleshooting, create new products, verify identity, and study advertising effectiveness across channels.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-950 dark:text-white">c. How we use Marketing Information</h3>
              <p>We use Marketing Information to respond to sales and demo inquiries, provide requested details, send newsletters, and perform legitimate business operations.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-950 dark:text-white">d. Additional uses of information</h3>
              <p>We also may use Service Information, Usage Information or Marketing Information to keep the Service safe, and investigate, prevent, or take action regarding unlawful or harmful activities, including potential threats to physical safety, fraud, or violations of our Terms of Service.</p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              5. Sharing your information
            </h2>
            <p>
              We may share Service Information, Usage Information, and Marketing Information with trusted companies performing infrastructure, advertising, analytics, hosting, and billing operations on our behalf; our business partners in creating new data solutions; our customers as part of our contributory database; members of our corporate family; and in connection with corporate transactions (mergers, acquisitions, due diligence).
            </p>
            <p>
              We may also share information to detect and prevent fraud, comply with legal requirements, or protect the rights, property, and safety of Amthromax, our users, and the public.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              6. Analytics, advertising and do-not-track
            </h2>
            <p>
              Data about your activities on our Website and Service may be collected by us or advertising technology providers for delivering online and offline advertising tailored to your characteristics, interests, and activity. We may retarget you with ads for our Service when you visit our Website.
            </p>
            <p>
              You may visit the Network Advertising Initiative's Consumer Opt-Out page or the Digital Advertising Alliance's Consumer Opt-Out page to opt out of receiving tailored advertising from participating providers.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              7. Your choices, and how to remove your content and information
            </h2>
            <p>
              We offer Customers self-serve options for updating account information in Settings. If you are a consumer and do not want information about yourself to be included in the Services or our contributor database, please submit a request via our{" "}
              <button type="button" onClick={() => setActiveModal("optout")} className="underline underline-offset-4 font-semibold text-gray-950 dark:text-white hover:text-blue-600">Privacy Center</button>. We will maintain your record on a suppression file to exclude it from future contributor database imports. You may also request a full data report detailing personal information collected about you.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              8. Security
            </h2>
            <p>
              We understand the importance of information security, but we cannot promise that security measures will eliminate all risks. Please protect yourself by using strong unique passwords, safeguarding your credentials, maintaining updated device security software, and immediately notifying us of any unauthorized account activity.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              9. Third party links and services
            </h2>
            <p>
              The Service or Website may link to or embed third-party websites, applications, and services. Clicking or interacting with third-party links may enable third parties to collect or share data about you. We are not responsible for third-party practices, privacy policies, or security controls.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              10. Children
            </h2>
            <p>
              The Service is not intended for use by minors. We do not knowingly collect Personal Information from individuals under the age of 16. No personal information should be submitted by individuals under 16 years of age.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              11. Information for European territory residents: our legal bases and your rights
            </h2>
            <p>
              If you interact with our Service while within the European Economic Area, Switzerland or the United Kingdom, our legal basis for processing personal data includes consent, legitimate interest, contract performance, or legal obligation. Where relying on legitimate interest for business contact processing, we perform balancing tests to protect data subject rights.
            </p>

            <div className="space-y-2 pt-1">
              <h3 className="text-lg font-bold text-gray-950 dark:text-white">European Residents' Privacy Rights</h3>
              <p>Residents of European Territories hold data rights under applicable law:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Right to access, correct, update, or request deletion of personal data.</li>
                <li>Right to object to or restrict processing of personal data.</li>
                <li>Right to withdraw consent at any time without affecting prior lawful processing.</li>
                <li>Right to lodge a complaint with a supervisory Data Protection Authority (DPA).</li>
              </ul>
              <p className="pt-1">
                To exercise any of these rights, visit our{" "}
                <button type="button" onClick={() => setActiveModal("access")} className="underline font-semibold text-gray-950 dark:text-white hover:text-blue-600">Privacy Center</button>{" "}
                or contact our privacy team at{" "}
                <a href="mailto:privacy@amthromax.com" className="underline font-semibold text-gray-950 dark:text-white hover:text-blue-600">privacy@amthromax.com</a>.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              12. International transfers
            </h2>
            <p>
              The Service and Website are hosted in the United States. Accessing the Service from outside the United States involves the transfer, storage, and processing of your personal information in the United States and other global regions where data laws may differ from your jurisdiction.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              13. Compliance with the Data Privacy Framework
            </h2>
            <p>
              Amthromax complies with the EU-U.S. Data Privacy Framework (EU-U.S. DPF), UK Extension to the EU-U.S. DPF, and Swiss-U.S. Data Privacy Framework (Swiss-U.S. DPF) as set forth by the U.S. Department of Commerce. Amthromax also utilizes Standard Contractual Clauses (SCCs) for transfers originating outside the EEA.
            </p>
            <p>
              For inquiries or complaints regarding DPF compliance, individuals should contact us at{" "}
              <a href="mailto:privacy@amthromax.com" className="underline font-semibold text-gray-950 dark:text-white hover:text-blue-600">privacy@amthromax.com</a>.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              14. Google API & Limited Use Requirements
            </h2>
            <p>
              Amthromax's use of information received, and Amthromax's transfer of information to any other app, from Google APIs will adhere to Google's Limited Use Requirements and Google API Services User Data Policy.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              15. Changes to this policy
            </h2>
            <p>
              This Privacy Policy may be modified periodically as business practices or regulations evolve. If modified, we will post the updated policy on our website with an updated effective date.
            </p>
          </section>

          {/* Section 16 */}
          <section className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              16. How to contact us
            </h2>
            <p>
              If you have any requests, questions, comments, or concerns regarding our Privacy Policy or practices, please contact our Data Governance Team:
            </p>
            <div className="p-6 rounded-2xl bg-gray-50/80 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 space-y-2 text-sm sm:text-base">
              <p className="font-bold text-gray-950 dark:text-white text-lg">Amthromax Privacy Office</p>
              <p className="text-gray-800 dark:text-gray-200">General Contact: <a href="mailto:contact@amthromax.com" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600">contact@amthromax.com</a></p>
              <p className="text-gray-800 dark:text-gray-200">Privacy Email: <a href="mailto:privacy@amthromax.com" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600">privacy@amthromax.com</a></p>
              <p className="text-gray-800 dark:text-gray-200">Designated EEA Representative Email: <a href="mailto:amthromax@heartsquared.com" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600">amthromax@heartsquared.com</a></p>
              <p className="text-gray-800 dark:text-gray-200">Address: Amthromax Inc., Mumbai, Maharashtra, India</p>
            </div>
          </section>

        </div>
      </div>

      {/* Interactive Privacy Center Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#161617] border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-left"
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  Privacy Center
                </span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mt-3">
                  {activeModal === "optout" && "Opt-Out of Amthromax Database"}
                  {activeModal === "access" && "Request Personal Data Report"}
                  {activeModal === "delete" && "Request Permanent Data Erasure"}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {activeModal === "optout" && "Remove your business contact details from marketing matching & directories."}
                  {activeModal === "access" && "Receive an automated export of any personal records linked to your identity."}
                  {activeModal === "delete" && "Permanently delete your profile and account information from our systems."}
                </p>
              </div>

              {requestSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 text-2xl flex items-center justify-center mx-auto">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Request Received</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We sent a confirmation link to <span className="font-semibold text-gray-900 dark:text-white">{requestEmail}</span>. Please check your inbox to complete verification.
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-4 px-6 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                      Work or Personal Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={requestEmail}
                      onChange={(e) => setRequestEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                    By submitting this request, Amthromax will search its records and initiate identity verification. Read our{" "}
                    <span className="underline">Privacy Policy</span> for detail.
                  </p>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 rounded-full border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleRequestSubmit}
                      className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-md cursor-pointer"
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
