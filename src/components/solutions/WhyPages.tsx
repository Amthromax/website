import React from "react";
import Footer from "../footer/Footer";

// Shared page header wrapper
const PageHeader: React.FC<{ category?: string; title: string; subtitle: string }> = ({ title, subtitle }) => {
  return (
    <div className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center text-center text-white bg-black">
      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

// 1. FOR ENTERPRISES PAGE
export const EnterprisesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      <PageHeader
        title="Industrial Scale. Certified Security."
        subtitle="Unify your systems with high-throughput automation engines, zero-trust cloud network frameworks, and dedicated support pipelines."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 space-y-24">

        {/* Intro & Stats Grid */}
        <div className="space-y-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Enterprise Infrastructure</h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed font-medium">
              Amthromax is engineered to handle the demands of massive scale. We provide an uncompromising foundation of security, dedicated compute allocation, and strictly enforced SLAs so your critical workflows never halt.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { label: "Uptime Guarantee", value: "99.99%" },
              { label: "Request Latency", value: "<15ms" },
              { label: "Data Encryption", value: "AES-256" },
              { label: "Compliance Standard", value: "SOC2 Type II" }
            ].map((stat, idx) => (
              <div key={idx} className="p-8 bg-white dark:bg-black border border-gray-150 dark:border-white/10 rounded-[24px] text-center space-y-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-center">
                <span className="text-[10px] md:text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">{stat.label}</span>
                <h3 className={`font-black text-gray-900 dark:text-white tracking-tight ${stat.value.length > 8 ? 'text-2xl lg:text-3xl' : 'text-3xl lg:text-4xl'}`}>
                  {stat.value}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Grid with Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="group bg-gray-50 dark:bg-black border border-gray-150 dark:border-white/10 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src="/images/4581a46a-71af-4f57-9755-37895b033f91.png" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Zero-Trust" />
            </div>
            <div className="p-8 flex-1 space-y-4">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">01 / INTEGRITY</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Zero-Trust Network Models</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                Enforce granular access logs, identity federation (SAML/OIDC), and hardware-isolated key storage across every agent deployment. Prevent credential hijacking at the network root with continuous verification.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-gray-50 dark:bg-black border border-gray-150 dark:border-white/10 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src="/images/5080718a-31ec-4965-9f36-6489a855c841.png" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Pipeline Scaling" />
            </div>
            <div className="p-8 flex-1 space-y-4">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">02 / VELOCITY</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Automated Pipeline Scaling</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                Distribute analytical requests dynamically through load-balanced Kubernetes clusters. Experience automatic compute scaling during periods of extreme workflow traffic seamlessly.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-gray-50 dark:bg-black border border-gray-150 dark:border-white/10 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src="/images/6dedb3e9-0f1b-4588-be70-9a0f66e58485.png" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="SLA Commitments" />
            </div>
            <div className="p-8 flex-1 space-y-4">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">03 / CONTINUITY</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Dedicated SLA Commitments</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                Access around-the-clock enterprise engineers via direct Slack channels and priority ticketing, backed by contractually enforced support response times and compensation guarantees.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group bg-gray-50 dark:bg-black border border-gray-150 dark:border-white/10 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src="/images/71330e1b-6cbc-4d5f-b41a-4bd952642667.png" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Dedicated Compute" />
            </div>
            <div className="p-8 flex-1 space-y-4">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">04 / ISOLATION</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Dedicated Compute Clusters</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                Ensure your processes never compete for resources. Leverage physically separate bare-metal servers designed specifically for your organization's heavy ML inference requirements.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="group bg-gray-50 dark:bg-black border border-gray-150 dark:border-white/10 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src="/images/f52c3acd-0fed-4dc2-a531-a577ef8aa5e6.png" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Quantum Crypto" />
            </div>
            <div className="p-8 flex-1 space-y-4">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">05 / FUTURE-PROOF</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Post-Quantum Cryptography</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                Protect sensitive corporate data ahead of time with lattice-based cryptographic tunneling that secures your API traffic from both classical and quantum decryption algorithms.
              </p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="group bg-gray-50 dark:bg-black border border-gray-150 dark:border-white/10 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src="/images/5a420a98-3f97-4888-a234-70f644008d80.png" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Global Sync" />
            </div>
            <div className="p-8 flex-1 space-y-4">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">06 / RESILIENCE</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Global State Redundancy</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                Achieve disaster recovery instantly. Your data and agent memory states are continuously replicated across 3 independent geographical zones for ultimate redundancy.
              </p>
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
};

// 2. FOR SMALL BUSINESSES PAGE
export const SmallBusinessesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      <PageHeader
        title="Accelerate Growth. Simplify Operations."
        subtitle="Bring the power of intelligent automated agents, integrated dashboards, and client-sync tools directly to your business."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 space-y-24">

        {/* Intro Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Automation Built for Small Teams</h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed font-medium">
            You don't need a dedicated development staff or deep technical expertise to start running intelligent software. Amthromax deploys serverless workflow triggers that connect directly into tools you already use—democratizing access to enterprise-grade AI algorithms so you can focus on building your business, not wrangling software.
          </p>
        </div>

        {/* Feature Grid with Images */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Card 1 */}
          <div className="group bg-white dark:bg-black border border-gray-150 dark:border-white/10 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src="/images/0c3a15fc-04e8-46bf-8892-2693e8e64a01.png" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Customer Sync" />
            </div>
            <div className="p-8 md:p-10 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">1. Instant Customer Sync</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Automatically capture incoming emails, intelligently categorize support requests, and push prioritized contact data directly to your local tracking CRM dashboards without a single keystroke of manual copy-pasting.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white dark:bg-black border border-gray-150 dark:border-white/10 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src="/images/51d4fd10-875a-4a4c-8891-6349ef1919da.png" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Low Overhead" />
            </div>
            <div className="p-8 md:p-10 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">2. Low Operational Overhead</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Our lightweight code designs run inside autonomous micro-instances on the edge network, ensuring that you only pay for exactly the compute cycles you use, eliminating expensive flat hosting rates and server maintenance constraints.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white dark:bg-black border border-gray-150 dark:border-white/10 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src="/images/818f256b-7d9a-4246-95b7-df2a884df162.png" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Marketing Triggers" />
            </div>
            <div className="p-8 md:p-10 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">3. Automated Marketing Triggers</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Set up dynamic event triggers that launch highly personalized outreach campaigns based on user behavior inside your website. Nurture leads continuously without requiring dedicated marketing bandwidth to expand your customer base.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group bg-white dark:bg-black border border-gray-150 dark:border-white/10 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src="/images/9ea0fcc0-1dac-4578-8919-75e82976b010.png" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Smart Financials" />
            </div>
            <div className="p-8 md:p-10 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">4. Smart Logistics & Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Maintain complete oversight of your small business supply chain. Agents parse receipts, forecast inventory needs, and automatically flag accounting anomalies by correlating data across your spreadsheet tools in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// 3. FOR DEVELOPERS PAGE
export const DevelopersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      <PageHeader
        title="Robust APIs. Instant Integrations."
        subtitle="Access high-performance developer tools, detailed SDK packages, and modular cryptography protocols built to integrate in minutes."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 space-y-32">

        {/* SDK & Code Snippets Section */}
        <div className="space-y-16">
          {/* Features Header */}
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Build with Amthromax SDK</h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed font-medium">
              Initialize our client SDK in Node.js, Python, or Go to instantly query advanced models, configure post-quantum tunnels, or spin up powerful autonomous microservices in a fully typed environment.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Universal SDK Support", desc: "Native TypeScript, Python, and Go clients complete with full autocomplete types, runtime validation, and auto-retries." },
              { title: "Isolated Sandbox Environments", desc: "Develop securely with isolated sandbox API keys, comprehensive real-time query trace logs, and staging webhooks." },
              { title: "Post-Quantum Cryptography Libraries", desc: "Install our open-source CRYSTALS-Kyber key-agreement library directly from npm or pip to secure payload transmission." }
            ].map((feat, idx) => (
              <div key={idx} className="p-8 bg-black border border-white/20 rounded-[28px] space-y-4 shadow-2xl transition-all flex flex-col justify-start text-left text-white">
                <span className="text-2xl font-black text-blue-400">0{idx + 1}</span>
                <h4 className="text-xl font-bold text-white tracking-tight">{feat.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Big Code Snippet Box (Moved to Bottom) */}
          <div className="relative group w-full">
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-[#0d0d0f] text-gray-100 rounded-[2rem] p-8 md:p-12 border border-white/[0.08] shadow-2xl font-mono text-sm overflow-x-auto space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <span className="text-gray-400 font-sans text-xs font-semibold tracking-wider bg-white/[0.05] px-4 py-2 rounded-full">app.ts</span>
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500/80 rounded-full inline-block shadow-sm"></span>
                  <span className="w-3 h-3 bg-yellow-500/80 rounded-full inline-block shadow-sm"></span>
                  <span className="w-3 h-3 bg-green-500/80 rounded-full inline-block shadow-sm"></span>
                </div>
              </div>
              <pre className="leading-loose text-[13px] md:text-sm text-gray-300 w-full overflow-x-auto">
                <span className="text-purple-400 font-medium">import</span> {'{'} AmthromaxClient, LogLevel {'}'} <span className="text-purple-400 font-medium">from</span> <span className="text-emerald-400">'@amthromax/sdk'</span>;{"\n\n"}
                <span className="text-gray-500 italic">// Initialize the core client with advanced config</span>{"\n"}
                <span className="text-blue-400 font-medium">const</span> client = <span className="text-purple-400 font-medium">new</span> <span className="text-amber-200">AmthromaxClient</span>({'{'}{"\n"}
                {'  '}apiKey: process.env.AMTHROMAX_API_KEY,{"\n"}
                {'  '}environment: <span className="text-emerald-400">'production'</span>,{"\n"}
                {'  '}maxRetries: <span className="text-orange-400">3</span>,{"\n"}
                {'  '}timeoutMs: <span className="text-orange-400">15000</span>,{"\n"}
                {'  '}logger: {'{'} level: LogLevel.DEBUG {'}'}{"\n"}
                {'}'});{"\n\n"}
                <span className="text-purple-400 font-medium">async function</span> <span className="text-blue-300">runAnalysis</span>() {'{'}{"\n"}
                {'  '}<span className="text-purple-400 font-medium">try</span> {'{'}{"\n"}
                {'    '}<span className="text-gray-500 italic">// Spin up an ephemeral agent session</span>{"\n"}
                {'    '}<span className="text-blue-400 font-medium">const</span> session = <span className="text-purple-400 font-medium">await</span> client.agents.<span className="text-blue-300">spawn</span>(<span className="text-emerald-400">'logistics-orchestrator-v2'</span>);{"\n\n"}
                {'    '}console.<span className="text-blue-300">log</span>(<span className="text-emerald-400">{"`Session Active. ID: "}</span><span className="text-blue-400 font-medium">{"${"}</span>session.<span className="text-blue-300">getId</span>()<span className="text-blue-400 font-medium">{"}`"}</span>);{"\n\n"}
                {'    '}<span className="text-gray-500 italic">// Stream the workflow execution in real-time</span>{"\n"}
                {'    '}<span className="text-blue-400 font-medium">const</span> responseStream = <span className="text-purple-400 font-medium">await</span> session.<span className="text-blue-300">executeStream</span>({'{'}{"\n"}
                {'      '}task: <span className="text-emerald-400">'Analyze Q3 global supply chain anomalies'</span>,{"\n"}
                {'      '}datasetIds: [<span className="text-emerald-400">'ds_88192A'</span>, <span className="text-emerald-400">'ds_99182B'</span>],{"\n"}
                {'      '}requireQuantumEncryption: <span className="text-orange-400">true</span>{"\n"}
                {'    '}{'}'});{"\n\n"}
                {'    '}<span className="text-purple-400 font-medium">for await</span> (<span className="text-blue-400 font-medium">const</span> chunk <span className="text-purple-400 font-medium">of</span> responseStream) {'{'}{"\n"}
                {'      '}process.stdout.<span className="text-blue-300">write</span>(chunk.content);{"\n"}
                {'    '}{'}'}{"\n"}
                {'  '}{'}'} <span className="text-purple-400 font-medium">catch</span> (err) {'{'}{"\n"}
                {'    '}console.<span className="text-blue-300">error</span>(<span className="text-emerald-400">'Execution failed:'</span>, err.message);{"\n"}
                {'  '}{'}'}{"\n"}
                {'}'}{"\n\n"}
                <span className="text-blue-300">runAnalysis</span>();
              </pre>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="space-y-12 border-t border-gray-150 dark:border-white/[0.04] pt-24">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Enterprise-Grade Infrastructure</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Build on top of the same scalable infrastructure that powers Amthromax's internal platform.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Streaming WebSockets",
                desc: "Receive real-time token streams, agent boundary events, and asynchronous chunked responses effortlessly without aggressive long-polling overhead.",
                icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              },
              {
                title: "Idempotent Requests",
                desc: "Safely retry failed queries or network timeouts using unique Idempotency-Keys. We prevent duplicate executions computationally on our edge layer.",
                icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              },
              {
                title: "Custom Model Fine-Tuning",
                desc: "Upload JSONL datasets directly through the REST API to spawn isolated tuning jobs. Programmatically deploy custom LoRA weights securely.",
                icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              },
              {
                title: "Webhook Subscriptions",
                desc: "Register HTTPS callbacks to receive immediate pushed events when long-running background tasks, web scrapes, or async analyses complete.",
                icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              },
              {
                title: "Advanced Rate Control",
                desc: "Monitor your pipeline usage programmatically with detailed X-RateLimit headers. Automatically scale tier provisioning instantly via API.",
                icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
              },
              {
                title: "Zero-Trust Architecture",
                desc: "Integrate with AWS KMS or HashiCorp Vault to provision ephemeral authentication tokens that strictly limit scope and lifecycle via our API.",
                icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              }
            ].map((box, i) => (
              <div key={i} className="group bg-black p-8 rounded-[28px] border border-white/20 shadow-2xl hover:border-white/40 transition-all duration-300 space-y-5 text-left">
                <div className="text-white transition-transform duration-300 group-hover:scale-110">
                  {box.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{box.title}</h3>
                  <p className="text-sm font-medium text-gray-400 leading-relaxed">{box.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};
