import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HeroSection from "./components/hero/HeroSection";
import FeaturesSection from "./components/features/FeaturesSection";
import ResearchSection from "./components/research/ResearchSection";
import FoundationSection from "./components/foundation/FoundationSection";
import Footer from "./components/footer/Footer";
import UpcomingProjectsSection from "./components/projects/UpcomingProjectsSection";
import LoginSection from "./components/login/LoginSection";
import NavDropdown from "./components/layout/NavDropdown";
import ServiceDetailPage from "./components/services/ServiceDetailPage";
import ResearchDetailPage from "./components/research/ResearchDetailPage";
import CookieConsent from "./components/layout/CookieConsent";
import ScrollToTop from "./components/layout/ScrollToTop";
import SolutionsPage from "./components/solutions/SolutionsPage";
import { EnterprisesPage, SmallBusinessesPage, DevelopersPage } from "./components/solutions/WhyPages";
import SEO from "./components/layout/SEO";
import BlogPage from "./components/blog/BlogPage";
import BlogPostDetail from "./components/blog/BlogPostDetail";
import NewsPage from "./components/news/NewsPage";
import CookiePolicyPage from "./components/legal/CookiePolicyPage";
import PlatformPage from "./components/platform/PlatformPage";
import ProductsPage from "./components/products/ProductsPage";
import DocsPage from "./components/docs/DocsPage";
import PricingPage from "./components/pricing/PricingPage";
import CareersPage from "./components/careers/CareersPage";
import SecurityPage from "./components/security/SecurityPage";
import './App.css';

const App: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("amthromax-user");
  });

  useEffect(() => {
    const checkAuth = () => {
      setUser(localStorage.getItem("amthromax-user"));
    };
    window.addEventListener("auth-change", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("auth-change", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50 transition-colors duration-300 antialiased">
      <ScrollToTop />

        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Left Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl md:text-3xl font-black text-gray-900 dark:text-gray-50 tracking-tighter hover:opacity-90 transition-all">
                  Amthromax
                </Link>
              </div>

              {/* Center Navigation Links */}
              <div className="hidden md:flex items-center justify-center space-x-6 flex-1">
                <Link to="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 text-sm font-medium">Home</Link>
                <NavDropdown
                  label="Why Amthromax"
                  href="/about"
                  items={[
                    { label: "Explore Why Amthromax", isHeader: true, href: "" },
                    { label: "For Enterprises", href: "/why/enterprises" },
                    { label: "For Small Businesses", href: "/why/small-businesses" },
                    { label: "For Developers ↗", href: "/why/developers" }
                  ]}
                />
                <NavDropdown
                  label="Services"
                  href="/services"
                  items={[
                    { label: "Our Competencies", isHeader: true, href: "" },
                    { label: "Custom Software", href: "/services/custom-software" },
                    { label: "Cloud Solutions", href: "/services/cloud-solutions" },
                    { label: "Artificial Intelligence", href: "/services/artificial-intelligence" },
                    { label: "Cybersecurity", href: "/services/cybersecurity" },
                    { label: "Data Analytics", href: "/services/data-analytics" },
                    { label: "Mobile Apps", href: "/services/mobile-apps" }
                  ]}
                />
                <Link to="/research" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 text-sm font-medium">Research</Link>
                <Link to="/foundation" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 text-sm font-medium">Foundation</Link>
              </div>
              
              {/* Log In/Sign Up buttons or User Avatar on the right */}
              <div className="flex items-center justify-end space-x-4">
                {user ? (
                  <div className="relative group">
                    <button
                      type="button"
                      className="w-10 h-10 rounded-full bg-black text-white dark:bg-white dark:text-black font-black text-sm flex items-center justify-center border border-gray-200 dark:border-gray-800 shadow-sm focus:outline-none hover:opacity-90 transition-all select-none"
                    >
                      {user[0].toUpperCase()}
                    </button>
                    {/* Hover Dropdown menu */}
                    <div className="absolute right-0 mt-0 pt-2 w-48 bg-white dark:bg-[#161617] border border-gray-150 dark:border-white/[0.06] rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-3 border-b border-gray-100 dark:border-gray-850">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Signed in as</p>
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate">{user}</p>
                      </div>
                      <div className="p-2">
                        <button
                          type="button"
                          onClick={() => {
                            localStorage.removeItem("amthromax-user");
                            window.dispatchEvent(new Event("auth-change"));
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="text-sm font-bold text-gray-800 hover:text-black dark:text-gray-200 dark:hover:text-white transition-colors">
                      Log in
                    </Link>
                    <Link to="/login" className="px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-bold hover:bg-gray-900 dark:hover:bg-gray-100 transition-all shadow-md">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        <main>
          <AnimatePresence>
            <Routes location={location}>
              <Route path="/" element={
                <div>
                  <SEO title="Amthromax | AI Software Company for Enterprise AI & Intelligent Automation" description="Amthromax is an AI software company building enterprise AI platforms, autonomous agents, workflow automation, APIs, and developer tools for modern businesses." />
                  <HeroSection />
                  <FeaturesSection />
                  
                  {/* Showcase Images Section */}
                  <section className="py-12 bg-white dark:bg-gray-950 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="overflow-hidden rounded-[32px] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-white/[0.04] shadow-sm hover:shadow-md transition-all duration-300 relative group aspect-[3/2]">
                        <img 
                          src="/images/desktop_setup.png" 
                          alt="Amthromax Enterprise System Collaboration" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        />
                      </div>
                      <div className="overflow-hidden rounded-[32px] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-white/[0.04] shadow-sm hover:shadow-md transition-all duration-300 relative group aspect-[3/2]">
                        <img 
                          src="/images/laptop_setup.png" 
                          alt="Amthromax Custom Engineering System" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        />
                      </div>
                    </div>
                  </section>

                  <UpcomingProjectsSection />
                  <Footer />
                </div>
              } />
              <Route path="/about" element={
                <div>
                  <SEO title="About Amthromax" description="Learn about Amthromax, our mission, vision and AI technologies." />
                  <div className="py-20 bg-white min-h-[85vh] transition-colors duration-300">
                    <div className="max-w-6xl mx-auto px-6 space-y-16">
                      {/* Header */}
                      <div className="text-center max-w-3xl mx-auto space-y-6">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">Company Profile</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900">About Amthromax</h1>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                          Amthromax is a software and artificial intelligence company building intelligent products, scalable platforms, and enterprise solutions. We help businesses innovate, automate workflows, and accelerate growth through cutting-edge technology.
                        </p>
                      </div>

                      {/* Vision & Mission Cards */}
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 bg-gray-50 border border-gray-150 rounded-3xl space-y-4">
                          <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            To empower organizations worldwide by designing and deploying high-performance software systems and cutting-edge cognitive models. We aim to remove operational complexity and build architectures ready for the demands of tomorrow.
                          </p>
                        </div>
                        <div className="p-8 bg-gray-50 border border-gray-150 rounded-3xl space-y-4">
                          <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            To serve as a cornerstone of modern industrial and computational scale—delivering zero-latency integration layers, state-of-the-art automation tools, and secure cloud pipelines that redefine software capability.
                          </p>
                        </div>
                      </div>

                      {/* Pillars Grid */}
                      <div className="space-y-8">
                        <div className="text-center space-y-2">
                          <h3 className="text-3xl font-extrabold text-gray-900">Our Core Pillars</h3>
                          <p className="text-gray-500 text-sm">The engineering foundations behind every system we build.</p>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-6">
                          {[
                            { title: "Intelligent Systems", desc: "Constructing advanced AI models, fine-tuned transformer pipelines, and custom neural agents built to optimize business operations." },
                            { title: "Enterprise Scaling", desc: "Developing cloud infrastructure, microservices architectures, and federated databases that handle massive throughput effortlessly." },
                            { title: "Zero-Trust Security", desc: "Establishing strict network isolation, cryptographically secured edge nodes, and comprehensive real-time threat response systems." }
                          ].map((pillar, i) => (
                            <div key={i} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-3">
                              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">0{i+1}</span>
                              <h4 className="text-lg font-bold text-gray-900">{pillar.title}</h4>
                              <p className="text-gray-500 text-xs leading-relaxed">{pillar.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Footer />
                </div>
              } />
              <Route path="/services" element={
                <div>
                  <SEO title="AI Development Services | Amthromax" description="Custom AI agents, workflow automation, enterprise AI software and intelligent systems." />
                  <div className="py-12">
                    <FeaturesSection />
                  </div>
                  <Footer />
                </div>
              } />
              <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
              <Route path="/research" element={
                <div>
                  <ResearchSection />
                  <Footer />
                </div>
              } />
              <Route path="/research/:paperId" element={<ResearchDetailPage />} />
              <Route path="/foundation" element={
                <div>
                  <FoundationSection />
                  <Footer />
                </div>
              } />
              <Route path="/contact" element={
                <div>
                  <SEO title="Contact Amthromax" description="Get in touch with Amthromax for AI development and automation solutions." />
                  <div className="py-20 bg-white dark:bg-gray-950 min-h-[85vh] transition-colors duration-300">
                    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
                      <div className="md:col-span-5 space-y-6">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full">Get in touch</span>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">Contact Our Team</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                          Have questions about our enterprise offerings, modern custom software design, or research projects? Reach out and we will be in touch.
                        </p>
                        <div className="pt-4 space-y-4 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">✉</span>
                            <span>info@amthromax.com</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-lg">📞</span>
                            <span>+1 (555) 123-4567</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-lg">📍</span>
                            <span>123 Innovation Drive, Tech City</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-7">
                        <div className="bg-gray-50 dark:bg-[#161617] rounded-3xl p-8 border border-gray-150 dark:border-white/[0.04] shadow-sm">
                          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for contacting us! We will get back to you shortly.'); }} className="space-y-5">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Full Name</label>
                              <input required type="text" className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white" placeholder="John Doe" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Work Email</label>
                              <input required type="email" className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white" placeholder="john@company.com" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Message</label>
                              <textarea required rows={4} className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white" placeholder="Tell us about your project details..."></textarea>
                            </div>
                            <button type="submit" className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-xl text-sm hover:opacity-90 transition-all duration-300">
                              Submit Message
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Footer />
                </div>
              } />
              <Route path="/privacy" element={
                <div>
                  <div className="py-20 bg-white dark:bg-gray-950 min-h-[85vh] transition-colors duration-300">
                    <div className="max-w-3xl mx-auto px-6 space-y-8">
                      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Privacy Policy</h1>
                      <p className="text-sm text-gray-400">Last updated: July 9, 2026</p>
                      
                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Information We Collect</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          We collect information you provide directly to us, such as when you submit forms, contact us via email, or interact with our platform APIs.
                        </p>
                      </section>
                      
                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Cookies Policy</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          We use cookies and similar tracking technologies to track the activity on our Service and hold certain information to enhance performance and analyze web traffic.
                        </p>
                      </section>
                      
                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. How We Protect Your Data</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          We implement industry-standard zero-trust protocols and encryption systems to prevent unauthorized access, disclosure, alteration, or destruction of your personal data.
                        </p>
                      </section>
                    </div>
                  </div>
                  <Footer />
                </div>
              } />
              <Route path="/terms" element={
                <div>
                  <div className="py-20 bg-white dark:bg-gray-950 min-h-[85vh] transition-colors duration-300">
                    <div className="max-w-3xl mx-auto px-6 space-y-8">
                      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Terms of Use</h1>
                      <p className="text-sm text-gray-400">Last updated: July 9, 2026</p>
                      
                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Agreement to Terms</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          By accessing or using the Amthromax platforms, you agree to be bound by these Terms of Use and all applicable laws and regulations.
                        </p>
                      </section>
                      
                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Proprietary Rights</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          All content, research papers, technologies, software scripts, and architectural design on our platform are the intellectual property of Amthromax.
                        </p>
                      </section>
                      
                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. Limitation of Liability</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          Amthromax will not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our website services.
                        </p>
                      </section>
                    </div>
                  </div>
                  <Footer />
                </div>
              } />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/why/enterprises" element={<EnterprisesPage />} />
              <Route path="/why/small-businesses" element={<SmallBusinessesPage />} />
              <Route path="/why/developers" element={<DevelopersPage />} />
              <Route path="/login" element={<LoginSection />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:postId" element={<BlogPostDetail />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/cookies" element={<CookiePolicyPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/platform" element={<PlatformPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/developers" element={<DevelopersPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/documentation" element={<DocsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/security" element={<SecurityPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <CookieConsent />
      </div>
  );
};

export default App;