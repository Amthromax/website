import React from "react";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="privacy-page font-sans antialiased">
      <SEO
        title="Amthromax Terms of Service | Master Consumer & Enterprise Terms"
        description="Comprehensive Amthromax Terms of Service governing platform access, foundation models, agentic execution, model training controls, payments, intellectual property, and international regional compliance."
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
            Welcome to <strong>Amthromax</strong>! These Terms of Service (<strong>“Terms”</strong> or <strong>“Agreement”</strong>) constitute a legally binding contract governing your access to, interaction with, and use of Amthromax AI, Amthromax Studio, Amthromax Intelli Hub, foundation models, developer APIs, web interfaces, mobile applications, software tools, and connected services (collectively, the <strong>“Service”</strong>).
          </p>
          <p>
            This Agreement is entered into between you (<strong>“you”</strong> or <strong>“User”</strong>) and <strong>Amthromax LLC</strong>, a Delaware corporate entity (<strong>“Amthromax,” “we,” “our,”</strong> or <strong>“us”</strong>). By registering an account, clicking to accept, or accessing or using any portion of the Service, you confirm that you have read, understood, and agreed to be bound by these Terms, our <a href="/privacy">Privacy Policy</a>, our <a href="/cookie-policy">Cookie Policy</a>, and our Acceptable Use Policy.
          </p>

          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 my-6 space-y-2 text-sm text-gray-800 dark:text-zinc-300">
            <p className="font-semibold text-gray-950 dark:text-white text-base">Key Summary Notices & Navigation:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Modifications:</strong> We reserve the right to update these Terms to reflect product improvements, new AI capabilities, or changing legal mandates.</li>
              <li><strong>Enterprise Workspaces:</strong> Separate Enterprise Terms govern corporate contracts, dedicated model instances, and custom API SLAs.</li>
              <li><strong>Agentic Execution:</strong> You are responsible for directing autonomous actions executed by Amthromax models on your behalf.</li>
              <li><strong>European Consumers:</strong> If you reside in the EEA, UK, or Switzerland, Europe Specific Terms (EST) apply, including a 14-day statutory right of withdrawal.</li>
              <li><strong>Dispute Resolution:</strong> Section 12 contains an individual binding arbitration agreement and class action waiver.</li>
            </ul>
          </div>
        </div>

        {/* Detailed Numbered Terms Sections */}
        <div>
          
          {/* Section 1 */}
          <section id="section-1">
            <h2>1. Who We Are and Our Mission</h2>
            <p>
              Amthromax is an advanced artificial intelligence company dedicated to building frontier foundation models, autonomous reasoning engines, enterprise IDEs, and scientific computing frameworks designed to accelerate human discovery and technical productivity. We are guided by our mission to advance humanity's collective intelligence safely and transparently.
            </p>
            <p>
              Our product suite encompasses consumer conversational assistants, developer API endpoints, enterprise workspace hubs, automated code execution sandboxes, and knowledge indexing systems. For detailed information regarding our research and corporate structure, please visit <a href="/">amthromax.com</a>.
            </p>
          </section>

          {/* Section 2 */}
          <section id="section-2">
            <h2>2. Formal Definitions</h2>
            <p>For the purposes of these Terms, the following capitalized terms have the meanings set forth below:</p>
            <ul>
              <li><strong>“Agentic Action”</strong> means any autonomous or semi-autonomous action executed by an Amthromax model on your instruction, including web browsing, code execution, database queries, API tool invocation, file modifications, or third-party service interactions.</li>
              <li><strong>“Authorized User”</strong> means an individual employee, contractor, or affiliate granted access to the Service under your account or organizational workspace.</li>
              <li><strong>“Customer Data” or “User Content”</strong> means all text, prompts, code, files, images, audio, video, or data submitted to (<strong>“Input”</strong>) or generated by (<strong>“Output”</strong>) the Service for you.</li>
              <li><strong>“Documentation”</strong> means all user guides, API references, system specifications, and safety guidelines published on <a href="/docs">amthromax.com/docs</a>.</li>
              <li><strong>“Foundation Models”</strong> means proprietary large language models, multimodal neural networks, tokenizers, and inference engines developed by Amthromax.</li>
              <li><strong>“Usage Data”</strong> means technical, diagnostic, latency, token consumption, and performance metrics collected by Amthromax regarding Service operations.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="section-3">
            <h2>3. Registration, Eligibility, and Account Access</h2>
            
            <h3>Minimum Age & Parental Consent</h3>
            <p>
              You must be at least 13 years old (or the minimum legal age required in your jurisdiction) to access or use the Service. By using the Service, you represent and warrant that you meet this age threshold. Teenagers between the ages of 13 and 17 must obtain express permission from a parent or legal guardian who accepts these Terms on their behalf. Parents and legal guardians remain fully responsible for minor account activity.
            </p>

            <h3>Safety Guardrails & Content Disclaimers</h3>
            <p>
              We implement safety guardrails, automated content filters, and age-appropriate output restrictions. However, because generative neural networks are probabilistic, the Service may occasionally produce outputs that contain coarse language, unverified statements, or unexpected dialogue. Parents and account holders are encouraged to utilize our Data Controls settings to tailor content filters.
            </p>

            <h3>Account Security & Credentials</h3>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials, passwords, and API keys. You may not sell, transfer, or share your account access with third parties. You must notify us immediately at <a href="mailto:security@amthromax.com">security@amthromax.com</a> upon discovering any unauthorized use or security breach.
            </p>

            <h3>Third-Party Social Authentication</h3>
            <p>
              If you log in via third-party identity providers (e.g., Google, Apple, GitHub, or X), you grant Amthromax authorization to store and process authentication tokens, profile details, and account metadata in accordance with provider permissions.
            </p>

            <h3>Enterprise & Organizational Email Domains</h3>
            <p>
              Registering an account with an email domain owned by your employer or organization may result in your account being linked to that organization’s Enterprise Amthromax subscription. In such events, your organization's administrative personnel may monitor, audit, export, or manage your account in accordance with Enterprise Terms.
            </p>

            <h3>Beta Modes & Pre-Release Features</h3>
            <p>
              We may offer experimental models, preview tools, pilot integrations, or alpha features (collectively, <strong>“Beta Features”</strong>). Beta Features are provided for internal evaluation on an “AS IS” basis without performance SLAs or warranties, and may be modified or retired at any time.
            </p>
          </section>

          {/* Section 4 */}
          <section id="section-4">
            <h2>4. Acceptable Use Policy & Platform Conduct</h2>
            
            <h3>Permitted Scope of Use</h3>
            <p>
              Subject to your ongoing compliance with these Terms, Amthromax grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for personal or internal business operations.
            </p>

            <h3>Prohibited Activities</h3>
            <p>You agree that you will not, and will not authorize any third party to:</p>
            <ul>
              <li>Use the Service for illegal activities, terrorism, hate speech, harassment, cyberattacks, or bio-weapon development assistance;</li>
              <li>Reverse engineer, decompile, extract weights, or attempt to derive the underlying architecture of Amthromax foundation models;</li>
              <li>Use web crawlers, scrapers, or automated bots to extract system data or outputs without express authorization;</li>
              <li>Bypass, disable, or tamper with security filters, content safety filters, rate limits, or authentication systems;</li>
              <li>Misrepresent AI-generated Output as human-authored content where prohibited by law;</li>
              <li>Use Outputs to train competing artificial intelligence or machine learning models without a commercial agreement.</li>
            </ul>

            <h3>Enforcement & Account Suspension</h3>
            <p>
              Amthromax reserves the right to audit platform usage, deploy automated safety monitoring, and suspend or terminate accounts that violate our Acceptable Use Policy, threaten system security, or expose Amthromax to legal liability.
            </p>
          </section>

          {/* Section 5 */}
          <section id="section-5">
            <h2>5. User Content, Agentic Execution, and Model Training</h2>

            <h3>Ownership of User Content</h3>
            <p>
              As between you and Amthromax, to the maximum extent permitted by law, you retain all ownership rights in your Inputs and Outputs (collectively, <strong>“User Content”</strong>).
            </p>

            <h3>Agentic Autonomous Execution</h3>
            <p>
              Certain advanced tools within Amthromax Studio allow models to execute autonomous actions (<strong>“Agentic Actions”</strong>), such as web searching, code execution in sandbox environments, API requests, database queries, file modifications, or financial tool invocations.
            </p>
            <p>
              You acknowledge that you are solely responsible for authorizing and supervising Agentic Actions. Amthromax makes no representations regarding the accuracy, execution safety, or legal outcome of Agentic Actions and disclaims all liability for automated execution.
            </p>

            <h3>License Grant to Amthromax</h3>
            <p>
              You grant Amthromax a worldwide, royalty-free, non-exclusive license to host, store, reproduce, process, and transmit User Content strictly to provide, maintain, secure, and debug the Service, enforce our Terms, and comply with applicable law.
            </p>

            <h3>Model Training Opt-Out & Data Controls</h3>
            <p>
              You maintain control over your data. In Account Settings → Data Controls, you can opt out of having your User Content used for training or improving Amthromax foundation models. For paid Enterprise accounts, non-training is the default policy. Deleted conversations are removed from primary storage within 30 days, except where legal retention mandates apply.
            </p>

            <h3>AI Disclosures & Digital Provenance</h3>
            <p>
              Amthromax may attach automated metadata disclosures or C2PA digital provenance watermarks to generated media or code Outputs to comply with global synthetic content transparency regulations.
            </p>

            <h3>Accuracy & Probabilistic Nature</h3>
            <p>
              Artificial intelligence outputs are probabilistic. Outputs may contain inaccurate information, hallucinations, or non-unique content similar to outputs generated for other users. You are responsible for verifying all Output accuracy before relying on it for safety-critical, medical, legal, or financial decisions.
            </p>
          </section>

          {/* Section 6 */}
          <section id="section-6">
            <h2>6. Amthromax Intellectual Property & Usage Analytics</h2>

            <h3>Proprietary Platform Rights</h3>
            <p>
              Amthromax and its licensors retain all right, title, and interest (including patents, copyrights, trade secrets, trademarks, model weights, and brand assets) in and to the Service, foundation models, algorithms, and documentation.
            </p>

            <h3>Usage Data & Diagnostics</h3>
            <p>
              Amthromax owns all diagnostic, latency, error logging, and operational usage metrics (<strong>“Usage Data”</strong>) generated by your access to the Service. We use Usage Data to optimize infrastructure stability, monitor security, and conduct system research.
            </p>

            <h3>User Feedback</h3>
            <p>
              Any suggestions, feature requests, or feedback you submit regarding the Service (<strong>“Feedback”</strong>) become the exclusive property of Amthromax. We may use Feedback for any purpose without obligation, attribution, or compensation to you.
            </p>
          </section>

          {/* Section 7 */}
          <section id="section-7">
            <h2>7. Paid Accounts, Billing, and Renewals</h2>

            <h3>Subscription Billing & Automatic Renewals</h3>
            <p>
              Paid plans and compute tiers require valid payment credentials. Subscriptions automatically renew at the end of each billing period (monthly or annually) until cancelled. Applicable taxes (VAT, GST, sales tax) will be charged based on your registered address.
            </p>

            <h3>Cancellation & Fee Adjustments</h3>
            <p>
              You can cancel your subscription at any time via Account Settings. Cancellation takes effect at the end of the current paid billing cycle. Payments are non-refundable except where mandated by law. We may adjust subscription pricing upon 30 days' advance notice; continuing your subscription after the effective date constitutes acceptance of new rates.
            </p>
          </section>

          {/* Section 8 */}
          <section id="section-8">
            <h2>8. Service Availability & Modifications</h2>
            <p>
              We continuously update our foundation models and infrastructure. We reserve the right to modify, update, or discontinue features, APIs, or model versions. We will endeavor to provide reasonable notice for material deprecations affecting production API endpoints.
            </p>
          </section>

          {/* Section 9 */}
          <section id="section-9">
            <h2>9. Disclaimer of Warranties ("AS IS")</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, THE SERVICE, OUTPUTS, AND AGENTIC ACTIONS ARE PROVIDED ON AN <strong>“AS IS”</strong> AND <strong>“AS AVAILABLE”</strong> BASIS. AMTHROMAX AND ITS AFFILIATES EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, ACCURACY, AND NON-INFRINGEMENT.
            </p>
          </section>

          {/* Section 10 */}
          <section id="section-10">
            <h2>10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL AMTHROMAX OR ITS INDEMNITEES BE LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES (INCLUDING LOSS OF PROFITS, DATA LOSS, BUSINESS INTERRUPTION, OR REPUTATIONAL DAMAGE) ARISING OUT OF OR RELATING TO YOUR USE OF THE SERVICE.
            </p>
            <p>
              OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING UNDER THESE TERMS SHALL NOT EXCEED THE GREATER OF ONE HUNDRED U.S. DOLLARS ($100.00) OR THE TOTAL FEES PAID BY YOU TO AMTHROMAX IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY.
            </p>
          </section>

          {/* Section 11 */}
          <section id="section-11">
            <h2>11. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Amthromax, its parents, subsidiaries, officers, directors, employees, contractors, and agents from any claims, damages, liabilities, losses, costs, or legal fees arising from your use of the Service, User Content, Agentic Actions, or violation of these Terms.
            </p>
          </section>

          {/* Section 12 */}
          <section id="section-12">
            <h2>12. Dispute Resolution & Binding Individual Arbitration</h2>
            
            <h3>Class Action & Jury Trial Waiver</h3>
            <p>
              YOU AND AMTHROMAX AGREE THAT ALL DISPUTES MUST BE RESOLVED ON AN INDIVIDUAL BASIS AND EXPRESSLY WAIVE ANY RIGHT TO TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION, COLLECTIVE PROCEEDING, OR REPRESENTATIVE LAWSUIT.
            </p>

            <h3>Pre-Arbitration Informal Resolution</h3>
            <p>
              Before initiating arbitration, both parties agree to attempt to resolve disputes informally by providing written notice to <a href="mailto:legal@amthromax.com">legal@amthromax.com</a> and engaging in good-faith negotiations for 30 days.
            </p>

            <h3>Governing Law & Venue</h3>
            <p>
              These Terms are governed by the laws of the State of Delaware (or Texas, for specific operational mandates), without regard to choice of law rules. Exclusive jurisdiction for non-arbitrable matters rests in the state or federal courts located in the United States.
            </p>
          </section>

          {/* Section 13 */}
          <section id="section-13">
            <h2>13. Trade Sanctions & Export Control</h2>
            <p>
              You agree to comply with all applicable export controls and trade sanctions laws, including regulations administered by the U.S. Department of Commerce (EAR) and U.S. Department of the Treasury (OFAC). You represent that you are not located in, or a resident of, any country subject to comprehensive U.S. trade embargoes.
            </p>
          </section>

          {/* Section 14 */}
          <section id="section-14">
            <h2>14. Regional & Jurisdiction-Specific Addenda</h2>

            <h3>Australian Residents (Online Safety Terms)</h3>
            <p>
              Australian users must comply with the Online Safety Act. Generating child sexual abuse material, terrorism content, or extreme violence instruction is strictly prohibited. Violations may be reported to our safety desk or to the eSafety Commissioner at <a href="https://www.esafety.gov.au" target="_blank" rel="noopener noreferrer">esafety.gov.au</a>.
            </p>

            <h3>California Residents</h3>
            <p>
              Under Cal. Civ. Code §1789.3, California users may contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs at 1625 North Market Blvd., Suite N 112, Sacramento, CA 95834, or by phone at (800) 952-5210.
            </p>

            <h3>European Economic Area (EEA), UK & Switzerland Residents (EST)</h3>
            <p>
              European Consumers benefit from mandatory consumer protection laws of their country of residence.
            </p>
            <p>
              <strong>14-Day Right of Withdrawal:</strong> You have the statutory right to cancel your subscription within 14 days of registration without giving any reason. To exercise withdrawal, email <a href="mailto:support@amthromax.com">support@amthromax.com</a> with your username and withdrawal request. Refunds will be issued within 14 days using your original payment method.
            </p>
            <p>
              <strong>EU Digital Services Act (DSA) Representative:</strong> Designated EU point of contact pursuant to Article 13 of the DSA is <a href="mailto:dsa@amthromax.com">dsa@amthromax.com</a>.
            </p>
          </section>

          {/* Section 15 */}
          <section id="section-15">
            <h2>15. Contact Legal Department & Regional Representatives</h2>
            <p>
              For legal notices, contract inquiries, or privacy compliance requests, contact our global legal teams:
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
              Child safety concerns or abuse reports can be sent directly to Trust & Safety at <a href="mailto:safety@amthromax.com" className="font-medium underline">safety@amthromax.com</a>.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;

