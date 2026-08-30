import React from "react";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="privacy-page font-sans antialiased">
      <SEO
        title="Amthromax Terms of Service | Consumer & Enterprise Terms"
        description="Amthromax Terms of Service governing platform access, foundation models, agentic execution, model training controls, payments, and regional legal compliance."
      />

      {/* Clean Document Reading Layout Container */}
      <div className="legal-container pt-[48px]">
        
        {/* Main Document Header */}
        <header className="mb-8">
          <h1 className="privacy-title text-gray-950 dark:text-[#f5f5f5]">
            Amthromax Terms of Service — Consumer & Platform Usage
          </h1>
          <p className="privacy-effective text-gray-600 dark:text-[#9b9b9b]">
            Effective: August 24, 2026 (
            <button 
              type="button" 
              className="underline hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              previous version
            </button>
            )
          </p>
        </header>

        {/* Introductory Preamble & Key Highlights */}
        <div>
          <p>
            Welcome to <strong>Amthromax</strong>! These Terms of Service (<strong>“Terms”</strong> or <strong>“Agreement”</strong>) apply to your access to, interaction with, and use of Amthromax AI, Amthromax Studio, Amthromax Intelli Hub, foundation models, and associated applications, features, tools, software, developer APIs, and websites (collectively, the <strong>“Service”</strong>).
          </p>
          <p>
            These Terms form a legally binding contract between you and <strong>Amthromax LLC</strong>, a Delaware corporate entity (<strong>“Amthromax,” “we,” “our,”</strong> or <strong>“us”</strong>) when you accept these Terms or otherwise access, interact with, or use the Service. By accessing or using our Service, you acknowledge and agree to these Terms, our <a href="/privacy">Privacy Policy</a>, and our Acceptable Use Policy.
          </p>

          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 my-6 space-y-2 text-sm text-gray-800 dark:text-zinc-300">
            <p className="font-semibold text-gray-950 dark:text-white text-base">Key Summary Notices:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Modifications:</strong> We reserve the right to modify these Terms as our products and regulations evolve.</li>
              <li><strong>Enterprise Accounts:</strong> Separate Enterprise Terms govern corporate workspaces, dedicated model endpoints, and developer API contracts.</li>
              <li><strong>European Consumers:</strong> If you reside in the EEA, UK, or Switzerland, Europe Specific Terms (EST) apply, including a 14-day statutory right of withdrawal.</li>
              <li><strong>Data Rights:</strong> Your privacy is essential. Review our <a href="/privacy" className="font-medium underline">Privacy Policy</a> to understand how we collect, process, and secure personal information.</li>
            </ul>
          </div>
        </div>

        {/* Detailed Numbered Terms Sections */}
        <div>
          
          {/* Section 1 */}
          <section id="section-1">
            <h2>1. Who We Are and Our Mission</h2>
            <p>
              Amthromax is a US-based artificial intelligence company working on building advanced AI foundation models, enterprise reasoning systems, and autonomous tools to accelerate human scientific discovery, software development, and technical workflows. We are guided by our mission to advance our collective understanding of intelligence.
            </p>
            <p>
              As part of our mission, we have developed our proprietary conversational and generative AI suite powered by Amthromax foundation models, alongside developer portals, enterprise workspaces, and knowledge indexing platforms. For more information about Amthromax, please visit <a href="/">amthromax.com</a>.
            </p>
          </section>

          {/* Section 2 */}
          <section id="section-2">
            <h2>2. Registration, Eligibility, and Account Access</h2>
            
            <h3>Minimum Age Requirements</h3>
            <p>
              You must be at least 13 years old or the minimum age required in your country to use the Service, and you confirm that you meet this minimum age requirement. If you are a teenager between the ages of 13 and 17, you must have your parent or legal guardian's permission to use the Service, and they must accept these Terms on your behalf. Parents and legal guardians are responsible for all activities occurring under their teenager's account.
            </p>

            <h3>Safety Controls & Content Disclaimers</h3>
            <p>
              We apply technical controls and safeguards designed to support age-appropriate experiences for minors as required by applicable law. However, generative model outputs are probabilistic in nature. Depending on your settings and prompts, the Service may produce dialogue or outputs involving coarse language, complex adult themes, or unverified technical statements. Parents and guardians are encouraged to actively monitor teenager usage and utilize our in-product Data Control settings.
            </p>

            <h3>Account Registration & Credentials</h3>
            <p>
              You must provide accurate, complete, and current information when registering for an account. You may not share your account credentials, transfer your account, or make your credentials available to any unauthorized third party. You are solely responsible for all activities that occur under your account.
            </p>

            <h3>Social Login & Third-Party Authentication</h3>
            <p>
              If you register or log in through a third-party service (such as Google, Apple, GitHub, or X), you authorize Amthromax to access, store, and process authentication tokens, profile details, date of birth, and account credentials permitted by that service to maintain your Amthromax profile.
            </p>

            <h3>Business & Corporate Email Domains</h3>
            <p>
              If you create an account using an email address owned by your employer or organization, your account may be linked to that organization’s Enterprise Amthromax workspace. In such events, your organization's designated administrator may access, monitor, audit, export, or terminate your account access in accordance with our Enterprise Terms.
            </p>

            <h3>Beta Modes and Preview Features</h3>
            <p>
              We may make experimental features, preview models, alpha integrations, or trial tools available to you. Pre-release features are provided for personal, non-commercial evaluation only, on an “AS IS” basis, and may contain bugs, latency, or temporary downtime.
            </p>
          </section>

          {/* Section 3 */}
          <section id="section-3">
            <h2>3. Using Our Service & Acceptable Use</h2>
            
            <h3>Permitted Access</h3>
            <p>
              Subject to your ongoing compliance with these Terms, applicable documentation, and relevant laws, Amthromax grants you a non-exclusive, non-transferable, revocable right to access and use the Service for your personal or internal business purposes.
            </p>

            <h3>Prohibited Conduct</h3>
            <p>
              You agree that you will not, and will not assist or enable others to:
            </p>
            <ul>
              <li>Use the Service for any illegal, harmful, deceptive, harassing, or fraudulent activity;</li>
              <li>Reverse engineer, decompile, disassemble, or attempt to extract foundation model weights, algorithms, or source code;</li>
              <li>Use automated bots, scrapers, or crawlers to extract platform data or content without express authorization;</li>
              <li>Bypass or tamper with rate limits, safety guardrails, content filters, or system security measures;</li>
              <li>Represent AI-generated output as being human-authored when prohibited by applicable law or policy;</li>
              <li>Infringe, misappropriate, or violate the intellectual property or privacy rights of any third party.</li>
            </ul>

            <h3>Suspension and Termination Rights</h3>
            <p>
              We reserve the right to modify, suspend, restrict, or discontinue your access to the Service at any time, with or without notice, if we determine that you have violated these Terms, engaged in abuse, or if necessary to address security risks or legal mandates.
            </p>
          </section>

          {/* Section 4 */}
          <section id="section-4">
            <h2>4. User Content & Agentic Autonomous Execution</h2>

            <h3>Ownership of User Content</h3>
            <p>
              You may submit prompts, files, text, code, audio, images, or documents to the Service (<strong>“Inputs”</strong>) and receive outputs generated by the Service based on those Inputs (<strong>“Outputs”</strong>). Collectively, Inputs and Outputs are <strong>“User Content.”</strong> As between you and Amthromax, to the extent permitted by law, you retain ownership of your User Content.
            </p>

            <h3>Agentic Execution & Autonomous Actions</h3>
            <p>
              Certain advanced features of the Service enable Amthromax models to execute autonomous actions on your behalf (<strong>“Agentic Actions”</strong>), including web browsing, code compilation, database queries, API tool calls, file modifications, or interactions with third-party web platforms and connected services.
            </p>
            <p>
              You acknowledge and agree that you are solely responsible for directing and authorizing Agentic Actions. Amthromax makes no representations or warranties regarding the accuracy, safety, execution fidelity, or legal implications of Agentic Actions and disclaims all liability arising from automated execution to the fullest extent permitted by law.
            </p>

            <h3>Grant of License to Amthromax</h3>
            <p>
              By submitting User Content to the Service, you grant Amthromax a worldwide, royalty-free, transferable, sublicensable, non-exclusive license to host, store, replicate, process, transmit, and display such User Content strictly as necessary to: (i) operate, maintain, and deliver the Service; (ii) improve platform security and prevent abuse; and (iii) comply with legal obligations.
            </p>

            <h3>Data Controls & Model Training Opt-Out</h3>
            <p>
              You have full control over your data. Via account Settings → Data Controls, you can choose whether your User Content is used to train or refine Amthromax foundation models. When logged into your account, opting out ensures your prompts and inputs are excluded from model training queues. Deleted conversations are purged from active stores within 30 days, except where retention is legally required.
            </p>

            <h3>AI-Generated Content Disclosures</h3>
            <p>
              To maintain public transparency, Amthromax may apply automated metadata disclosures or visual watermarks indicating that content or Agentic Actions were generated or modified by artificial intelligence.
            </p>
          </section>

          {/* Section 5 */}
          <section id="section-5">
            <h2>5. Amthromax Intellectual Property & Usage Analytics</h2>

            <h3>Platform Ownership</h3>
            <p>
              Amthromax and its licensors retain all right, title, and interest (including all patents, copyrights, trade secrets, trademarks, and model weights) in and to the Service, foundation models, algorithms, APIs, user interfaces, and documentation.
            </p>

            <h3>Telemetry & Diagnostic Usage Data</h3>
            <p>
              We may collect diagnostic, technical, latency, error logging, and performance metrics relating to your interaction with the Service (<strong>“Usage Data”</strong>). All Usage Data is owned exclusively by Amthromax and used to optimize service stability, monitor security, and conduct system research.
            </p>

            <h3>User Feedback</h3>
            <p>
              If you provide suggestions, feature requests, or feedback regarding the Service (<strong>“Feedback”</strong>), you assign all rights in such Feedback to Amthromax. We may freely use Feedback without obligation, compensation, or attribution to you.
            </p>
          </section>

          {/* Section 6 */}
          <section id="section-6">
            <h2>6. Subscriptions, Paid Accounts, and Renewals</h2>

            <h3>Billing & Automated Renewals</h3>
            <p>
              If you purchase a paid subscription or compute tier, you must provide valid, up-to-date payment details. Subscriptions automatically renew at the end of each billing cycle (monthly or annually) until cancelled. Taxes are calculated and added where required by local tax jurisdictions.
            </p>

            <h3>Cancellation & Price Adjustments</h3>
            <p>
              You can cancel your subscription at any time in Account Settings. Cancellation takes effect at the end of your current paid billing period. Payments already processed are non-refundable except where mandated by law. We may adjust subscription fees periodically upon 30 days' advance notice; your continued subscription after the effective date constitutes acceptance of updated rates.
            </p>
          </section>

          {/* Section 7 */}
          <section id="section-7">
            <h2>7. Disclaimer of Warranties ("AS IS")</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICE, OUTPUTS, AND AGENTIC ACTIONS ARE PROVIDED ON AN <strong>“AS IS”</strong> AND <strong>“AS AVAILABLE”</strong> BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS, IMPLIED, OR STATUTORY. AMTHROMAX EXPRESSLY DISCLAIMS ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, ACCURACY, SYSTEM AVAILABILITY, AND NON-INFRINGEMENT. USE OF THE SERVICE AND AGENTIC EXECUTION IS AT YOUR SOLE RISK.
            </p>
          </section>

          {/* Section 8 */}
          <section id="section-8">
            <h2>8. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL AMTHROMAX, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES (INCLUDING LOSS OF PROFITS, DATA CORRUPTION, BUSINESS INTERRUPTION, OR REPUTATIONAL HARM) ARISING OUT OF OR RELATING TO YOUR USE OR INABILITY TO USE THE SERVICE.
            </p>
            <p>
              OUR TOTAL CUMULATIVE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE SHALL NOT EXCEED THE GREATER OF ONE HUNDRED U.S. DOLLARS ($100.00) OR THE TOTAL AMOUNT PAID BY YOU TO AMTHROMAX IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          {/* Section 9 */}
          <section id="section-9">
            <h2>9. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Amthromax, its parent entities, subsidiaries, officers, directors, employees, and contractors from and against all claims, liabilities, damages, losses, costs, and legal fees arising from your use of the Service, your User Content, your Agentic Actions, or your breach of these Terms.
            </p>
          </section>

          {/* Section 10 */}
          <section id="section-10">
            <h2>10. Dispute Resolution & Binding Arbitration</h2>
            
            <h3>Class Action & Jury Trial Waiver</h3>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, YOU AND AMTHROMAX AGREE THAT ALL DISPUTES MUST BE RESOLVED ON AN INDIVIDUAL BASIS AND EXPRESSLY WAIVE ANY RIGHT TO TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION, COLLECTIVE PROCEEDING, OR REPRESENTATIVE LAWSUIT.
            </p>

            <h3>Governing Law & Venue</h3>
            <p>
              These Terms and any dispute arising hereunder shall be governed by the laws of the State of Delaware (or Texas, where mandated for specific state operations), excluding choice of law rules. Exclusive jurisdiction and venue for any judicial proceedings shall rest in the federal or state courts located in the United States.
            </p>
          </section>

          {/* Section 11 */}
          <section id="section-11">
            <h2>11. Regional & Jurisdiction-Specific Terms</h2>

            <h3>Australian Residents (Online Safety Terms)</h3>
            <p>
              Australian users must comply with the Australian Online Safety Act. You may not use the Service to generate child sexual abuse material, terrorism content, or illegal violence instructions. Concerns or violations may be reported to our safety desk or to the Australian eSafety Commissioner at <a href="https://www.esafety.gov.au" target="_blank" rel="noopener noreferrer">esafety.gov.au</a>.
            </p>

            <h3>California Residents</h3>
            <p>
              Under Cal. Civ. Code §1789.3, California users are entitled to the following consumer rights notice: Complaint reports may be directed in writing to the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs at 1625 North Market Blvd., Suite N 112, Sacramento, CA 95834, or by phone at (800) 952-5210.
            </p>

            <h3>European Economic Area (EEA), UK & Switzerland Residents (EST)</h3>
            <p>
              If you are a European Consumer, you benefit from mandatory consumer protection laws of your country of residence. 
            </p>
            <p>
              <strong>14-Day Right of Withdrawal:</strong> You have the statutory right to withdraw from this subscription contract within 14 days of registration without giving any reason. To exercise your right of withdrawal, notify us via email at <a href="mailto:support@amthromax.com">support@amthromax.com</a> stating your legal name, username, and withdrawal request. Refunds for paid subscriptions will be processed within 14 days using your original payment method.
            </p>
            <p>
              <strong>EU Digital Services Act (DSA) Representative:</strong> Pursuant to Article 13 of the EU DSA, our designated EU point of contact for member state authorities and users is <a href="mailto:dsa@amthromax.com">dsa@amthromax.com</a>.
            </p>
          </section>

          {/* Section 12 */}
          <section id="section-12">
            <h2>12. Contact Legal Department & Regional Representatives</h2>
            <p>
              For formal legal notices, compliance requests, or inquiries regarding these Terms of Service, please reach out to our legal department:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 pt-4">
              <div className="space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <p className="font-semibold text-gray-950 dark:text-white">Global Legal Headquarters</p>
                <p className="text-gray-700 dark:text-zinc-300">Amthromax Inc. Legal Office</p>
                <p className="text-gray-700 dark:text-zinc-300">Email: <a href="mailto:legal@amthromax.com">legal@amthromax.com</a></p>
              </div>

              <div className="space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <p className="font-semibold text-gray-950 dark:text-white">United Kingdom Representative</p>
                <p className="text-gray-700 dark:text-zinc-300">Lionheart Squared Limited (FAO Amthromax)</p>
                <p className="text-gray-700 dark:text-zinc-300">Email: <a href="mailto:uk-privacy@amthromax.com">uk-privacy@amthromax.com</a></p>
              </div>

              <div className="space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <p className="font-semibold text-gray-950 dark:text-white">European Union Representative</p>
                <p className="text-gray-700 dark:text-zinc-300">Lionheart Squared (Europe) Ltd (FAO Amthromax)</p>
                <p className="text-gray-700 dark:text-zinc-300">Email: <a href="mailto:eu-privacy@amthromax.com">eu-privacy@amthromax.com</a></p>
              </div>

              <div className="space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <p className="font-semibold text-gray-950 dark:text-white">Switzerland Representative</p>
                <p className="text-gray-700 dark:text-zinc-300">Lionheart Squared Switzerland SarL (FAO Amthromax)</p>
                <p className="text-gray-700 dark:text-zinc-300">Email: <a href="mailto:ch-privacy@amthromax.com">ch-privacy@amthromax.com</a></p>
              </div>
            </div>

            <p className="pt-4 text-xs text-gray-500 dark:text-zinc-400">
              Child safety concerns or illegal content abuse may be reported directly to our Trust & Safety team at <a href="mailto:safety@amthromax.com" className="font-medium underline">safety@amthromax.com</a>.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;

