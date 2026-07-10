import React, { useState } from "react";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";

const DocsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("quickstart");

  const sidebarItems = [
    { id: "quickstart", name: "Quickstart Guide" },
    { id: "authentication", name: "Authentication" },
    { id: "workflows", name: "Workflows API" },
    { id: "sdks", name: "SDK Packages" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      <SEO 
        title="Amthromax Developer Docs | API & SDK Reference" 
        description="Learn how to integrate the Amthromax SDK, connect to our workflows endpoints, and configure low-latency agent automation." 
      />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left Sidebar */}
        <aside className="md:col-span-3 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Documentation</span>
            <h2 className="text-xl font-black text-gray-900 dark:text-white">API Reference</h2>
          </div>
          <nav className="flex flex-col space-y-1.5">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all select-none ${
                  activeTab === item.id
                    ? "bg-gray-100 text-black dark:bg-white dark:text-black shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Main Panel */}
        <main className="md:col-span-9 p-8 md:p-10 bg-gray-50 dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] rounded-3xl space-y-8 min-h-[60vh] transition-colors duration-300">
          
          {activeTab === "quickstart" && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Quickstart Guide</h1>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
                Connect your business logic to Amthromax's low-latency agent networks. Follow these three steps to run your first workflow.
              </p>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">1. Install the SDK package</h3>
                <div className="bg-[#1e1e24] text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-zinc-800">
                  <span className="text-blue-400">npm</span> i @amthromax/sdk
                </div>

                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">2. Configure environmental variables</h3>
                <div className="bg-[#1e1e24] text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-zinc-800 space-y-1">
                  <div><span className="text-zinc-500"># Set your client authentication keys</span></div>
                  <div>export AMTHROMAX_API_KEY=<span className="text-emerald-400">"am_live_yourkeyhere..."</span></div>
                </div>

                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">3. Run the initial script</h3>
                <div className="bg-[#1e1e24] text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-zinc-800">
                  <pre className="leading-relaxed">
{`import { AmthromaxClient } from '@amthromax/sdk';

const client = new AmthromaxClient();
const response = await client.workflows.run({
  agentId: 'enterprise-neural-01',
  input: { query: 'Hello Amthromax!' }
});`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === "authentication" && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Authentication</h1>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
                All requests to the Amthromax API must be authenticated using bearer tokens. You can provision your API keys inside the Developer Dashboard portal after signing up.
              </p>
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/10 rounded-xl text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
                <strong>Important:</strong> Keep your keys secret. Never expose your keys in frontend application files, public repository configurations, or client-side variables.
              </div>
            </div>
          )}

          {activeTab === "workflows" && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Workflows API</h1>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
                The Workflows endpoint allows you to trigger background agentic swarms, query database schemas, or monitor real-time execution steps.
              </p>
              <div className="bg-[#1e1e24] text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-zinc-800">
                <span className="text-purple-400">POST</span> https://api.amthromax.com/v1/workflows/run
              </div>
            </div>
          )}

          {activeTab === "sdks" && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">SDK Packages</h1>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
                Amthromax publishes native packages in JavaScript/TypeScript and Python.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 text-xs md:text-sm">
                <li><strong>NodeJS SDK:</strong> Available on npm as <code>@amthromax/sdk</code>.</li>
                <li><strong>Python SDK:</strong> Available on pip as <code>amthromax-sdk</code>.</li>
              </ul>
            </div>
          )}

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DocsPage;
