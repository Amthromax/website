import React from "react";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 antialiased font-sans">
      <SEO
        title="Terms of Service | Amthromax"
        description="Amthromax Terms of Service governing subscription agreements, platform usage, licensing, data processing, and user obligations."
      />

      {/* Compact Container Layout with Tight Spacing */}
      <div className="max-w-6xl md:max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-10 sm:pt-14 pb-16">
        
        {/* Main Header */}
        <header className="mb-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-gray-900 dark:text-white tracking-tight leading-[1.15] mb-2">
            Terms of Service
          </h1>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Last Updated: June 26, 2026
          </p>
        </header>

        {/* Introductory Preamble */}
        <div className="space-y-4 text-base text-gray-800 dark:text-gray-200 leading-relaxed font-normal mb-8 pt-2">
          <p>
            These Terms of Service (“Terms of Service” or “Terms”) are a legally binding agreement between you (“you” or “your”) and Amthromax Inc. (“Amthromax,” “we,” “our,” or “us”) governing your use of the Service and your relationship with us.
          </p>

          <p className="font-semibold text-gray-950 dark:text-white">
            You accept and agree to these Terms of Service by:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Accessing or using the Service;</li>
            <li>Clicking to accept these Terms of Service, or</li>
            <li>Accepting these Terms of Service in any other way.</li>
          </ul>

          <p className="font-bold text-gray-950 dark:text-white">
            If you do not agree to these Terms of Service, you shouldn't access (and you don't have our permission to access) the Service.
          </p>

          <p>
            <strong>Important:</strong> Please note{" "}
            <a href="#section-6" className="underline underline-offset-4 font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
              Sections 6
            </a>{" "}
            and{" "}
            <a href="#section-12" className="underline underline-offset-4 font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
              12
            </a>{" "}
            of these Terms which include important information regarding Personal Information you provide to us or receive from us. Please also note{" "}
            <a href="#section-7" className="underline underline-offset-4 font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
              Section 7
            </a>
            , which contains arbitration provisions that impact certain rights you might otherwise have regarding disputes.
          </p>

          <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 my-4 space-y-2 shadow-sm">
            <h4 className="font-bold text-gray-950 dark:text-white text-base">AUTOMATIC RENEWAL NOTICE</h4>
            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
              Your subscription will automatically renew for additional periods of time as specified in your ordering document, unless you provide notice of cancellation as set forth below. The terms of automatic renewal, including pricing and renewal periods, are set out in the{" "}
              <a href="/contact-sales" className="underline underline-offset-4 font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                order form
              </a>{" "}
              and{" "}
              <a href="#section-4" className="underline underline-offset-4 font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                section 4(c)
              </a>{" "}
              of these terms.
            </p>
          </div>

          <p>
            We may modify these Terms of Service (except for{" "}
            <a href="#section-7" className="underline underline-offset-4 font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
              Section 7
            </a>
            ) in our sole discretion by posting updated versions of these Terms of Service on the Website or otherwise providing notice to you. All such changes shall become effective upon the posting of the revised Terms of Service on the Website or upon notice to you, as applicable.
          </p>
        </div>

        {/* Detailed Terms Sections */}
        <div className="space-y-8 text-base text-gray-800 dark:text-gray-200 leading-relaxed font-normal">
          
          {/* 1. DEFINITIONS */}
          <section id="section-1" className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              1. DEFINITIONS.
            </h2>
            
            <div className="space-y-2">
              <p>
                <strong>“Amthromax DPA”</strong> means the Data Processing Addendum found at:{" "}
                <a href="https://amthromax.com/dpa" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-gray-400 hover:decoration-gray-950 text-gray-950 dark:text-white hover:text-blue-600 font-medium transition-colors">
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
                <strong>“Contributor Database”</strong> means Amthromax's proprietary database of Business Contact Information and other business information that Amthromax makes available to you and other Amthromax customers through the Platform.
              </p>
              <p>
                <strong>“Customer Data”</strong> means all data, graphics, images, files, information, text, voice content, recordings, and other content and materials that are provided by you in any way to Amthromax for processing in connection with your use of the Services. Customer Data does not include Usage Data.
              </p>
              <p>
                <strong>“Customer Third-Party Systems”</strong> means any third-party products, systems, applications, or services that you choose to integrate with or use in connection with the Platform, including but not limited to your customer relationship management (CRM), marketing automation, or sales enablement software. For clarity, Customer Third-Party Systems are not owned, operated, or controlled by Amthromax.
              </p>
              <p>
                <strong>“Documentation”</strong> means any documentation, operating manuals and/or usage guides for the Platform provided by Amthromax in-product, via{" "}
                <a href="/docs" className="underline underline-offset-4 font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                  Amthromax Docs
                </a>
                , or otherwise, which may be updated from time to time.
              </p>
              <p>
                <strong>“Order Form”</strong> means any designated{" "}
                <a href="/contact-sales" className="underline underline-offset-4 font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                  Order Form
                </a>{" "}
                or other ordering document that is entered into between the Parties, specifying the details of the Services purchased by, and any fees to be paid by, you.
              </p>
              <p>
                <strong>“Personal Information”</strong> includes any substantially similar terms to “personal information” such as “personal data” or “personally identifiable information” and as to each, will have the meaning given to such terms under applicable law.
              </p>
              <p>
                <strong>“Platform”</strong> means the software or other technology provided by or through Amthromax to you pursuant to these Terms, and all other software, systems, applications, interfaces, application programming interfaces (APIs), tools, software development kits (SDKs), programs, and any accompanying or related infrastructure, functionality, technology, or analytics made available by or through Amthromax in connection therewith and/or which are otherwise required to access or utilize the Platform including, without limitation, all updates and derivative works thereof, the Usage Data, the Contributor Database, and any add-ons described in an Order Form. The Platform does not include Customer Third-Party Systems.
              </p>
              <p>
                <strong>"Platform Generated Information" or “PGI”</strong> means outputs created by you through use of the Services, including for example: (i) customized prospect lists; (ii) segmentation analyses; (iii) campaign performance reports; and (iv) other customer-specific analytics. Platform Generated Information includes, without limitation, any modified, enhanced, filtered, analyzed, segmented, organized, structured, or combined information derived from the Platform, Contributor Database, or Services, as well as any reports, visualizations, contact lists, prospect lists, market analyses, or other business intelligence outputs resulting from your use of the Services.
              </p>
              <p>
                <strong>“Services”</strong> means the lead generation services and related offerings provided by Amthromax to you through or in connection with the Platform. The Services include all access, updates, enhancements, modifications, and derivative works to the foregoing. The Services do not include Customer Third-Party Systems or any services not expressly specified herein or in an applicable Order Form.
              </p>
              <p>
                <strong>“Subscription Fee”</strong> means all fees stated in an Order Form and any other fees applicable to your subscription to Services.
              </p>
              <p>
                <strong>“Usage Data”</strong> means data and information related to your use of the Platform or Amthromax’s provision of the Platform, including but not limited to, system performance data, usage statistics, and data on the deliverability of communications. For the avoidance of doubt, Usage Data does not include Customer Data or any Personal Information.
              </p>
              <p>
                <strong>“Website”</strong> means any website or webpage on which these Terms appear, accessible at{" "}
                <a href="https://amthromax.com" className="underline underline-offset-4 font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                  https://amthromax.com
                </a>.
              </p>
            </div>
          </section>

          {/* 2. GRANT OF LICENSE; OWNERSHIP; SUPPORT */}
          <section id="section-2" className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              2. GRANT OF LICENSE; OWNERSHIP; SUPPORT.
            </h2>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-gray-950 dark:text-white">a. Grant of License to You.</h3>
                <p>
                  <strong>Term License.</strong> Amthromax will make the Services available to you via password-protected online access accessible by you with usernames and passwords, via an application programmer interface (“API”), or as otherwise mutually agreed by the parties. Subject to your compliance with these Terms, the Documentation, any Order Form(s), and all applicable laws, rules, and regulations, Amthromax grants to you a non-exclusive, non-transferrable, non-sublicensable license to access and use the Services in accordance with these Terms and during the Term solely for your internal business purposes to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>view the Contributor Database;</li>
                  <li>communicate with a person in a manner that relates to such person’s profession, business, or employment using any Business Contact Information;</li>
                  <li>identify prospective sales opportunities, research your existing customers and prospects, and otherwise analyze the Contributor Database in a manner relating to your business-to-business sales, marketing, recruiting, and business development activities; and</li>
                  <li>use the Services for other appropriate business-to-business services consistent with, but not specifically described in, subsections above.</li>
                </ul>
                <p className="pt-1">
                  <strong>Perpetual License.</strong> Subject to your compliance with these Terms, Amthromax grants to you a perpetual, worldwide, transferable, royalty-free license to use the PGI for internal business purposes on its own or combined with other information such as, for example, Customer Data. Inclusion of PGI with Customer Data or other information does not change its nature as PGI. Your license to PGI does not grant you any rights to the underlying data sources, methodologies, or intellectual property of Amthromax. You may not claim ownership of or attempt to reverse engineer any Amthromax proprietary algorithms, data compilation methods, or other intellectual property reflected in PGI.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-gray-950 dark:text-white">b. Grant of License to Amthromax.</h3>
                <p>
                  <strong>Term License.</strong> You grant Amthromax a worldwide, non-exclusive, royalty-free license for the Term to host and process Customer Data to provide the Services and to otherwise support you under these Terms. Amthromax may also use Customer Data to grow, enrich, and verify the Contributor Database. Under no circumstances will Amthromax publicly refer to or associate you with any such data in the Contributor Database, except that, to the extent required by applicable law (including, without limitation, data protection laws such as the{" "}
                  <a href="https://gdpr-info.eu/" target="_blank" rel="noopener noreferrer" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                    GDPR
                  </a>
                  ), Amthromax may disclose your identity as the source of such data to a data subject, but only if, in Amthromax’s reasonable judgment, such disclosure is necessary to comply with a lawful data subject request and no less specific response would satisfy Amthromax’s legal obligations.
                </p>
                <p>
                  <strong>Perpetual License.</strong> You grant Amthromax an irrevocable, perpetual, worldwide, transferable, sublicensable, and royalty-free license to analyze Customer Data using artificial intelligence to improve the Platform; and to test, develop, improve, or enhance Amthromax’s products and services provided that Amthromax will not refer to or associate Customer Data with any such analytics.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-gray-950 dark:text-white">c. Ownership.</h3>
                <p>
                  <strong>Platform and PGI.</strong> As between you and Amthromax, all rights, title, and interests in and to the Platform and PGI, including without limitation patents, copyrights, trademarks, trade names, service marks, trade secrets, derivatives, and other intellectual property rights, and any goodwill associated therewith, are owned by Amthromax. For instance, Amthromax owns any design, compilation, analytics, or product features inherent in the Platform, such as the way that data is organized, curated, presented, and delivered, and any know-how or other intellectual property inherent in the way Amthromax creates, provides, displays, or makes available the Platform. These Terms do not grant you any ownership right, title, or interest in the Platform or any of the above. You agree that any and all feedback, suggestions, ideas, enhancement requests, and recommendations made by you or your Authorized Users relating to the Platform that are incorporated into the Platform are owned exclusively by Amthromax, and you hereby assign to Amthromax all of your right, title, and interest in and to such incorporated items.
                </p>
                <p>
                  <strong>Customer Data.</strong> As between you and Amthromax, all right, title, and interest in and to Customer Data is owned by you. For avoidance of doubt, notwithstanding the above, you own all Customer Data that may be embedded in, or combined with, PGI.
                </p>
                <p>
                  <strong>Amthromax’s Marks.</strong> The Amthromax names and logos are trademarks of Amthromax, and may not be copied, imitated, or used, in whole or in part, without Amthromax’s prior written permission.
                </p>
                <p>
                  <strong>Customer Third-Party Systems.</strong> You may integrate Customer Third-Party Systems at your own risk. Amthromax has no liability for Customer Third-Party Systems and may discontinue integrations without compensation to you. Providers of Customer Third-Party Systems are not Subprocessors of Amthromax.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-gray-950 dark:text-white">d. Support.</h3>
                <p>
                  Amthromax will provide reasonable assistance and ongoing support to assist you and Authorized Users in accessing the Platform. However, Amthromax cannot guarantee that the Services will operate in an uninterrupted or error-free manner. Amthromax performs service maintenance and uses commercially reasonable efforts to schedule system downtime during off-peak hours and to avoid service interruptions and delays. Amthromax will use commercially reasonable efforts to notify you in advance of any scheduled downtime. Amthromax will provide access to its Customer Support team weekdays from 6:00am – 6:00pm Pacific Time via an online portal or by emailing{" "}
                  <a href="mailto:support@amthromax.com" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                    support@amthromax.com
                  </a>.
                </p>
              </div>
            </div>
          </section>

          {/* 3. AUTHORIZED USE/LICENSE RESTRICTIONS */}
          <section id="section-3" className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              3. AUTHORIZED USE / LICENSE RESTRICTIONS.
            </h2>

            <div className="space-y-3">
              <p>
                <strong>Account Setup.</strong> You must establish an account to access the Platform. You agree to provide accurate account information and maintain current contact details for important notices.
              </p>

              <div className="space-y-1.5">
                <p>
                  <strong>Account Security.</strong> We make no representations or promises regarding the security of the Service. Despite our security efforts, it is possible that unauthorized individuals will obtain your information, such as through web-scraping tools (even though we do not authorize and in fact prohibit that behavior). You agree and understand that you will be liable for any activity that occurs through your account and further acknowledge and agree that you and your Authorized Users:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>are solely responsible for maintaining the confidentiality and security of your account information and account credentials such as your username and password.</li>
                  <li>may not share your account credentials and must restrict access to your computer and other devices.</li>
                  <li>must access the Service and our network, systems, or applications only through encrypted connections.</li>
                  <li>must maintain up-to-date OS (operating system) patching and active anti-malware on the end-user devices used to connect to the Service or our environment.</li>
                  <li>must ensure that all terminated employees or other users have their access revoked to the Service within 24 hours of termination.</li>
                  <li>must notify us promptly (and in any event within 72 hours) of security incidents that could have implications to us (e.g. users with compromised credentials or lost or stolen devices with access to the Service, compromised networks or systems including malware worm or ransomware, etc.).</li>
                  <li>will reach out to our vulnerability discovery program at <a href="mailto:support@amthromax.com" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">support@amthromax.com</a> if you suspect any vulnerabilities with our Service.</li>
                </ul>
              </div>

              <p>
                <strong>Authorized Users.</strong> You will ensure only Authorized Users access the Platform. All Authorized Users must be of legal age and comply with these Terms. You are responsible for all activities of Authorized Users.
              </p>

              <div className="space-y-1.5">
                <p><strong>General Usage Restrictions.</strong> You will not, and will not permit any third party to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>use the Services or data derived therefrom to create, train, or improve a product or service that directly competes with Amthromax's core offerings;</li>
                  <li>resell, distribute, disclose, sublicense, transfer, sell, offer for sale, or make available any of the Contributor Database or any part of the Services to any third party;</li>
                  <li>access the Platform on behalf of any person or entity other than you, your Subsidiaries, or your authorized service providers acting under written agreement to perform services for you;</li>
                  <li>incorporate any portion of the Platform or Contributor Database into your own products or services that you offer to third parties;</li>
                  <li>use the Services for any purpose governed by the Fair Credit Reporting Act, or for any illegal purpose, or in any way that violates applicable marketing laws such as CAN-SPAM, CASL, or the TCPA;</li>
                  <li>transmit false, misleading, or fraudulent information, or use the Services to promote illegal products, firearms, adult content, or hate speech; engage in harassment, spam, or activities that violate intellectual property rights; or transmit malware, virus, or harmful code.</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <p><strong>Platform Generated Information Restrictions.</strong> You will not:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>distribute, sell, or license Platform Generated Information to third parties without ensuring compliance with all applicable data protection laws;</li>
                  <li>use Platform Generated Information to create competing databases or services;</li>
                  <li>combine Platform Generated Information with other data sources in a manner that would circumvent usage restrictions; or</li>
                  <li>send emails from a group distribution email such as hello@ or marketing@ etc.</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <p><strong>Technical and Access Restrictions.</strong> You may not:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>permit anyone who is not an Authorized User to access or use the Services;</li>
                  <li>reverse assemble, reverse engineer, decompile, disassemble, or attempt to derive source code from the Platform;</li>
                  <li>reproduce, modify, create, or prepare derivative works of the Platform or Documentation;</li>
                  <li>use automated bots, crawlers, or scrapers to access data on the Platform;</li>
                  <li>employ measures intended to circumvent limitations to purchased credits or rate limits;</li>
                  <li>disclose the results of any Platform benchmark tests without Amthromax's prior written consent.</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <p><strong>API Usage Requirements.</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access & Integration: You may not access APIs via a third party's credentials or integrate Amthromax APIs with competing products.</li>
                  <li>Usage Limitations: You may not circumvent limitations on calls or access limits.</li>
                  <li>Prohibited Uses: Prohibited from using APIs to replicate Amthromax products or transmitting malicious code.</li>
                  <li>Monitoring & Compliance: Amthromax reserves the right to monitor API calls and rate-limit excessive traffic.</li>
                </ul>
              </div>

              <p>
                <strong>Customer Data.</strong> You are solely responsible for Customer Data and represent and warrant that you have all rights necessary to provide Customer Data to Amthromax without violating third-party rights or privacy laws.
              </p>

              <p>
                <strong>Notice of Violation; Suspension.</strong> In the event of suspected violations, notify us at <a href="mailto:abuse@amthromax.com" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">abuse@amthromax.com</a>. Amthromax may suspend or terminate accounts for abusive behavior.
              </p>
            </div>
          </section>

          {/* 4. FEES AND PAYMENT TERMS */}
          <section id="section-4" className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              4. FEES AND PAYMENT TERMS.
            </h2>

            <div className="space-y-2">
              <p>
                <strong>Subscriptions or customized service accounts.</strong> We provide the Service through paid accounts under{" "}
                <a href="/contact-sales" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                  Order Forms
                </a>{" "}
                or custom billing terms. Contact us at <a href="mailto:support@amthromax.com" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">support@amthromax.com</a> for enterprise subscription agreements.
              </p>

              <p>
                <strong>Paid and unpaid self-serve accounts.</strong> The Service may also be offered as a paid or unpaid account on a “self-serve” basis. You may not open multiple self-serve accounts to circumvent credit limits.
              </p>

              <p>
                <strong>Subscription Fee; Renewal.</strong> Fees are specified in Order Forms and paid in advance. Each Subscription Term will automatically renew for an additional period equal to the expiring term unless either party gives written notice of non-renewal at least thirty (30) days prior to the end of the term.
              </p>

              <p>
                <strong>Payments & Late Payments.</strong> All fees are payable in USD within thirty (30) days from invoice date. Late payments accrue interest at 1.5% per month or the maximum lawful rate.
              </p>

              <p>
                <strong>Non-cancelable; Non-refundable.</strong> Subscriptions are non-cancelable during the Term and all payments are nonrefundable.
              </p>

              <p>
                <strong>Service Units (Seats & Credits).</strong> User Seats are licensed per Authorized User. Details on pricing and credits are available on our{" "}
                <a href="/pricing" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                  Pricing Page
                </a>
                . Credits expire at the end of billing cycles and do not roll over into subsequent terms.
              </p>
            </div>
          </section>

          {/* 5. TERM AND TERMINATION */}
          <section id="section-5" className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              5. TERM AND TERMINATION.
            </h2>

            <div className="space-y-2">
              <p>
                <strong>Termination for cause.</strong> Either party may terminate these Terms if the other party materially breaches and fails to cure within thirty (30) days of written notice (10 days for non-payment), or upon insolvency/bankruptcy proceedings.
              </p>

              <p>
                <strong>Termination for convenience.</strong> Paid subscriptions may be terminated for convenience by Amthromax with thirty (30) days' written notice. Unpaid accounts may be terminated by either party immediately.
              </p>

              <p>
                <strong>Effect of termination.</strong> Upon termination, rights immediately cease, access credentials will be revoked, and data uploaded may be destroyed. You may retain PGI derived during the Term.
              </p>

              <p>
                <strong>Inactivity.</strong> Non-paying accounts inactive for six (6) months or more may be deactivated at Amthromax's sole discretion.
              </p>
            </div>
          </section>

          {/* 6. REPRESENTATIONS AND WARRANTIES */}
          <section id="section-6" className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              6. REPRESENTATIONS AND WARRANTIES.
            </h2>

            <div className="space-y-2">
              <p>
                <strong>Warranties.</strong> Each party represents and warrants that it is validly existing, authorized to enter these Terms, and will comply with all applicable laws.
              </p>

              <p>
                <strong>Notice and Consent.</strong> You represent and warrant that you will obtain all required notices, consents, and approvals under applicable privacy laws (including CCPA and GDPR as outlined in our{" "}
                <a href="/privacy" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
                ) for marketing activities and data provided to Amthromax.
              </p>

              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 my-3 space-y-2">
                <h4 className="font-bold text-gray-950 dark:text-white text-sm uppercase">Warranty Disclaimer</h4>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                  AMTHROMAX WILL MAKE COMMERCIALLY REASONABLE EFFORTS TO PROVIDE RELIABLE AND SECURE SERVICES. HOWEVER, THE PLATFORM, SERVICES, AND ALL DATA ARE PROVIDED “AS IS” AND “AS AVAILABLE”. AMTHROMAX DISCLAIMS ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. YOUR USE OF AND RELIANCE ON DATA IS AT YOUR OWN RISK.
                </p>
              </div>
            </div>
          </section>

          {/* 7. ARBITRATION AGREEMENT, CLASS ACTION WAIVER AND APPLICABLE LAW */}
          <section id="section-7" className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              7. ARBITRATION AGREEMENT, CLASS ACTION WAIVER AND APPLICABLE LAW
            </h2>

            <div className="space-y-2">
              <p>
                <strong>Arbitration and Class-Action Waiver.</strong> Disputes arising out of these Terms or the Service will be resolved through binding individual arbitration under the Federal Arbitration Act administered by{" "}
                <a href="https://www.jamsadr.com" target="_blank" rel="noopener noreferrer" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                  JAMS ADR
                </a>. Both parties expressly waive the right to file or join class action lawsuits.
              </p>

              <p>
                <strong>Pre-Arbitration Demand.</strong> Prior to initiating arbitration, email an individualized demand to{" "}
                <a href="mailto:legal@amthromax.com" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                  legal@amthromax.com
                </a>{" "}
                titled “Pre-Arbitration Demand”. The parties will attempt informal resolution for sixty (60) days.
              </p>

              <p>
                <strong>45-Day Right to Opt Out.</strong> You may opt out of this arbitration agreement by emailing{" "}
                <a href="mailto:privacy@amthromax.com" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                  privacy@amthromax.com
                </a>{" "}
                with subject line "ARBITRATION OPT-OUT" within forty-five (45) days of first agreeing to these Terms.
              </p>
            </div>
          </section>

          {/* 8. INDEMNIFICATION */}
          <section id="section-8" className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              8. INDEMNIFICATION.
            </h2>

            <p>
              You agree to indemnify, defend, and hold harmless Amthromax, its officers, directors, employees, and agents from any third-party claims, liabilities, damages, and costs (including legal fees) arising out of your use of the Service, breach of these Terms, or Customer Data.
            </p>
          </section>

          {/* 9. LIMITATION OF LIABILITY */}
          <section id="section-9" className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              9. LIMITATION OF LIABILITY.
            </h2>

            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES. AMTHROMAX'S TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS UNDER THESE TERMS IS LIMITED TO THE TOTAL AMOUNT PAID BY YOU TO AMTHROMAX IN THE TWELVE (12) MONTHS PRIOR TO THE INCIDENT.
            </p>
          </section>

          {/* 10. CONFIDENTIALITY */}
          <section id="section-10" className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              10. CONFIDENTIALITY.
            </h2>

            <p>
              Each receiving party agrees to safeguard non-public proprietary or confidential information disclosed by the disclosing party using at least reasonable care, and will not disclose such information to third parties except to representatives requiring access.
            </p>
          </section>

          {/* 11. CHANGES TO THE SERVICE */}
          <section id="section-11" className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              11. CHANGES TO THE SERVICE.
            </h2>

            <p>
              We may change, modify, add, or remove features or functionality of the Service at any time. The Terms of Service will apply to any updated version of the Service.
            </p>
          </section>

          {/* 12. DATA PRIVACY AND SECURITY */}
          <section id="section-12" className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              12. DATA PRIVACY AND SECURITY.
            </h2>

            <div className="space-y-2">
              <p>
                <strong>Data Processing Addendum.</strong> The{" "}
                <a href="https://amthromax.com/dpa" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                  Amthromax DPA
                </a>{" "}
                is incorporated herein by reference. Both parties shall comply with the DPA regarding Personal Information processing.
              </p>
              <p>
                <strong>Privacy Policy.</strong> You agree to data handling described in our{" "}
                <a href="/privacy" className="underline underline-offset-4 font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
                .
              </p>
              <p>
                <strong>Email Scanning and Opt Out.</strong> Amthromax may access and scan email inboxes and contact lists transmitted to the system to provide services and enrich analytics. You may revoke consent via account settings at any time.
              </p>

              <div className="p-6 rounded-2xl bg-gray-50/80 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 space-y-2 text-sm sm:text-base mt-6">
                <p className="font-bold text-gray-950 dark:text-white text-lg">Amthromax Legal & Support Office</p>
                <p className="text-gray-800 dark:text-gray-200">General Contact: <a href="mailto:contact@amthromax.com" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">contact@amthromax.com</a></p>
                <p className="text-gray-800 dark:text-gray-200">Support Email: <a href="mailto:support@amthromax.com" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">support@amthromax.com</a></p>
                <p className="text-gray-800 dark:text-gray-200">Legal Email: <a href="mailto:privacy@amthromax.com" className="underline font-medium text-gray-950 dark:text-white hover:text-blue-600 transition-colors">privacy@amthromax.com</a></p>
                <p className="text-gray-800 dark:text-gray-200">Address: Amthromax Inc., 548 Market St, San Francisco, CA 94104, USA</p>
              </div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
