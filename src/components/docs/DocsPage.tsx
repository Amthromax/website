import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

const validSections = ["getting-started", "authentication", "api", "sdks", "guides", "changelog"];

const sectionTitles: Record<string, string> = {
  "getting-started": "Getting Started & Quickstart Guide",
  authentication: "API Key Authentication & Security Protocols",
  api: "Workflows & REST API Endpoint Reference",
  sdks: "TypeScript, Python & Go SDK Packages",
  guides: "Enterprise Integration & Best Practices Guides",
  changelog: "Platform Release Notes & API Changelog"
};

const sectionDescriptions: Record<string, string> = {
  "getting-started":
    "Quickstart tutorial for installing the Amthromax SDK, setting up environment variables, and triggering your first AI workflow.",
  authentication:
    "Security guidelines for managing API keys, bearer tokens, zero-trust hardware isolation, and post-quantum encryption.",
  api:
    "Complete REST and WebSocket API specifications for invoking AI agents, running background tasks, and streaming inference outputs.",
  sdks:
    "Official Amthromax SDK packages for Node.js, TypeScript, Python, and Go with typed interfaces and auto-retry logic.",
  guides:
    "Architectural guides for deploying Amthromax enterprise AI swarms, load balancing, and multi-region failover.",
  changelog:
    "Changelog of API version releases, feature additions, model updates, and security patches for Amthromax platforms."
};

const DocsPage: React.FC = () => {
  const { section = "getting-started" } = useParams<{ section?: string }>();
  const navigate = useNavigate();

  const activeTab = validSections.includes(section) ? section : "getting-started";

  useEffect(() => {
    if (!validSections.includes(section) && section !== "") {
      navigate("/docs/getting-started", { replace: true });
    }
  }, [section, navigate]);

  const currentTitle = sectionTitles[activeTab] || "Developer Documentation";
  const currentDesc = sectionDescriptions[activeTab] || "Amthromax developer documentation and API reference.";

  const docsSchema = {
    "@type": "TechArticle",
    "@id": `https://amthromax.com/docs/${activeTab}/#article`,
    "headline": currentTitle,
    "description": currentDesc,
    "articleSection": "Developer Documentation",
    "inLanguage": "en-US",
    "author": {
      "@id": "https://amthromax.com/#organization"
    },
    "publisher": {
      "@id": "https://amthromax.com/#organization"
    }
  };

  const sidebarItems = [
    { id: "getting-started", name: "Quickstart Guide", path: "/docs/getting-started" },
    { id: "authentication", name: "Authentication & Security", path: "/docs/authentication" },
    { id: "api", name: "Workflows & REST API", path: "/docs/api" },
    { id: "sdks", name: "SDK Packages", path: "/docs/sdks" },
    { id: "guides", name: "Enterprise Guides", path: "/docs/guides" },
    { id: "changelog", name: "Changelog", path: "/docs/changelog" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      <SEO
        title={`${currentTitle} | Amthromax Docs`}
        description={currentDesc}
        url={`https://amthromax.com/docs/${activeTab}`}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Developers", url: "/developers" },
          { name: "Documentation", url: "/docs" },
          { name: currentTitle, url: `/docs/${activeTab}` }
        ]}
        schema={docsSchema}
      />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left Sidebar Navigation */}
        <aside className="md:col-span-3 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              AMTHROMAX DEVELOPER DOCS
            </span>
            <h2 className="text-xl font-black text-gray-900 dark:text-white">API Reference</h2>
          </div>
          <nav className="flex flex-col space-y-1.5" aria-label="Documentation Navigation">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all select-none ${
                  activeTab === item.id
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Right Main Content Area */}
        <section className="md:col-span-9 p-8 md:p-10 bg-gray-50 dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] rounded-3xl space-y-8 min-h-[60vh] transition-colors duration-300">
          {activeTab === "getting-started" && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                Quickstart Guide
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed font-medium">
                Connect your business logic to Amthromax high-throughput agent networks in under 5 minutes.
              </p>

              <div className="space-y-5">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">1. Install the SDK package</h3>
                  <div className="bg-[#1e1e24] text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-zinc-800">
                    <span className="text-blue-400">npm</span> install @amthromax/sdk
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">2. Set Environment Variables</h3>
                  <div className="bg-[#1e1e24] text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-zinc-800 space-y-1">
                    <div className="text-zinc-500"># Set your private Amthromax API key</div>
                    <div>
                      export AMTHROMAX_API_KEY=
                      <span className="text-emerald-400">"am_live_your_key_here..."</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">3. Initialize &amp; Execute</h3>
                  <div className="bg-[#1e1e24] text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-zinc-800">
                    <pre className="leading-relaxed">
{`import { AmthromaxClient } from '@amthromax/sdk';

const amthromax = new AmthromaxClient({
  apiKey: process.env.AMTHROMAX_API_KEY
});

const response = await amthromax.workflows.run({
  agentId: 'enterprise-neural-01',
  input: { query: 'Analyze system telemetry logs' }
});

console.log('Execution Status:', response.status);`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "authentication" && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                Authentication &amp; Security
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed font-medium">
                All requests to Amthromax REST and WebSocket endpoints require Bearer token authentication over TLS 1.3 encryption.
              </p>
              <div className="bg-[#1e1e24] text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-zinc-800">
                Authorization: Bearer am_live_xxxxxxxxxxxxxxxx
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-xs leading-relaxed font-semibold">
                ⚠️ Security Note: Never expose your production API keys in browser JavaScript or public GitHub repositories. Use server-side proxy handlers or secret managers.
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                Workflows &amp; REST API
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed font-medium">
                Programmatically launch autonomous agent swarms, poll task status, or consume real-time WebSocket streams.
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-[#1e1e24] rounded-xl border border-zinc-800 text-xs font-mono">
                  <span className="text-emerald-400 font-bold">POST</span> https://api.amthromax.com/v1/workflows/run
                </div>
                <div className="p-4 bg-[#1e1e24] rounded-xl border border-zinc-800 text-xs font-mono">
                  <span className="text-blue-400 font-bold">GET</span> https://api.amthromax.com/v1/workflows/:id/status
                </div>
              </div>
            </div>
          )}

          {activeTab === "sdks" && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                SDK Packages
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed font-medium">
                Amthromax publishes official client libraries maintained for modern language runtimes:
              </p>
              <ul className="space-y-3 text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium">
                <li className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                  <strong className="text-gray-900 dark:text-white">Node.js / TypeScript:</strong> <code className="text-blue-500">npm i @amthromax/sdk</code>
                </li>
                <li className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                  <strong className="text-gray-900 dark:text-white">Python:</strong> <code className="text-blue-500">pip install amthromax-sdk</code>
                </li>
                <li className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                  <strong className="text-gray-900 dark:text-white">Go:</strong> <code className="text-blue-500">go get github.com/amthromax/amthromax-go</code>
                </li>
              </ul>
            </div>
          )}

          {activeTab === "guides" && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                Enterprise Integration Guides
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed font-medium">
                Best practices for multi-tenant deployment, custom LoRA model fine-tuning, and setting up post-quantum encryption tunnels.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-2">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">Multi-Tenant Agent Swarms</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Isolate customer memory states using encrypted tenant IDs.</p>
                </div>
                <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-2">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">Zero-Trust KMS Setup</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Integrate AWS KMS and HashiCorp Vault key rotation.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "changelog" && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                Platform Changelog &amp; Releases
              </h1>
              <div className="space-y-4">
                <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-blue-500">v2.4.0 — Production Release</span>
                    <span className="text-gray-400">August 2026</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                    Added WebSocket token streaming support, CRYSTALS-Kyber post-quantum tunneling options, and TypeScript SDK v2.4.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DocsPage;
