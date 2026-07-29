import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import Lenis from "lenis";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import HeroSection from "./components/hero/HeroSection";
import FeaturesSection from "./components/features/FeaturesSection";
import ResearchSection from "./components/research/ResearchSection";
import FoundationSection from "./components/foundation/FoundationSection";
import FoundationDetailPage from "./components/foundation/FoundationDetailPage";
import Footer from "./components/footer/Footer";
import UpcomingProjectsSection from "./components/projects/UpcomingProjectsSection";
import LoginSection from "./components/login/LoginSection";
import ServiceDetailPage from "./components/services/ServiceDetailPage";
import ResearchDetailPage from "./components/research/ResearchDetailPage";
import ResearchOverviewPage from "./components/research/ResearchOverviewPage";
import PublicationsPage from "./components/research/PublicationsPage";
import CookieConsent from "./components/layout/CookieConsent";
import ScrollToTop from "./components/layout/ScrollToTop";
import SolutionsPage from "./components/solutions/SolutionsPage";
import { EnterprisesPage, SmallBusinessesPage, DevelopersPage } from "./components/solutions/WhyPages";
import SEO from "./components/layout/SEO";
import BlogPage from "./components/blog/BlogPage";
import BlogPostDetail from "./components/blog/BlogPostDetail";
import PublishPage from "./components/blog/PublishPage";
import NewsPage from "./components/news/NewsPage";
import CookiePolicyPage from "./components/legal/CookiePolicyPage";
import PlatformPage from "./components/platform/PlatformPage";
import ProductsPage from "./components/products/ProductsPage";
import DocsPage from "./components/docs/DocsPage";
import PricingPage from "./components/pricing/PricingPage";
import CareersPage from "./components/careers/CareersPage";
import SecurityPage from "./components/security/SecurityPage";
import TeamPage from "./components/about/TeamPage";
import { supabase } from "./lib/supabase";
import { useAuth } from "./context/AuthContext";
import AuthCallback from "./components/auth/AuthCallback";
import ProfilePage from "./components/profile/ProfilePage";
import ContactSalesPage from "./components/contact/ContactSalesPage";
import './App.css';

// Clean up testing post from localStorage
try {
  if (typeof window !== "undefined" && window.localStorage) {
    const stored = localStorage.getItem("amthromax_blog_posts");
    if (stored) {
      let parsed = JSON.parse(stored) as any[];
      const originalLength = parsed.length;
      parsed = parsed.filter((p) => p.id !== "testing-the-autonomous-agent-runtime");
      if (parsed.length !== originalLength) {
        localStorage.setItem("amthromax_blog_posts", JSON.stringify(parsed));
      }
    }
  }
} catch (e) {
  console.warn("localStorage cleanup failed", e);
}

interface SearchItem {
  type: string;
  title: string;
  url: string;
}

const searchItems: SearchItem[] = [
  { type: "Service", title: "Custom Software Development", url: "/services/custom-software" },
  { type: "Service", title: "Enterprise Cloud Solutions", url: "/services/cloud-solutions" },
  { type: "Service", title: "Artificial Intelligence Systems", url: "/services/artificial-intelligence" },
  { type: "Service", title: "Cybersecurity Architectures", url: "/services/cybersecurity" },
  { type: "Service", title: "Advanced Data Analytics", url: "/services/data-analytics" },
  { type: "Service", title: "Mobile Application Design", url: "/services/mobile-apps" },
  { type: "Research", title: "Research and Development Index", url: "/research" },
  { type: "Research", title: "Predictive Scaling Whitepapers", url: "/research/overview" },
  { type: "Research", title: "Technical Publications Database", url: "/research/publications" },
  { type: "Research", title: "System Safety & Zero Trust Operations", url: "/security" },
  { type: "Company", title: "Why Amthromax & Enterprise Scale Solutions", url: "/about" },
  { type: "Company", title: "Career Opportunities & Open Roles", url: "/careers" },
  { type: "Company", title: "Our Engineering Team", url: "/team" },
  { type: "Company", title: "Foundation & Social Impact Projects", url: "/foundation" },
  { type: "Company", title: "Cookie Consent Policies", url: "/cookies" },
  { type: "Resources", title: "Technical Engineering Blog Posts", url: "/blog" },
  { type: "Resources", title: "Newsroom and Press Releases", url: "/news" },
  { type: "Model", title: "MORFIX 0.1 Model & Intelligent Sync", url: "/blog" },
  { type: "Model", title: "INTOX 0.2 Model & Low Overhead Run", url: "/blog" },
  { type: "Model", title: "COTISES 0.5 max Model & Advanced Routing", url: "/blog" },
  { type: "Model", title: "VERKOX 0.4 instant Model & Edge Sandbox", url: "/blog" },
  { type: "Company", title: "Contact Enterprise Sales & Engineering Team", url: "/contact" },
];

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, authLoading } = useAuth();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const [activeMenu, setActiveMenu] = useState<'research' | 'products' | 'business' | 'company' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = (menu: 'research' | 'products' | 'business' | 'company') => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    "Ask about careers",
    "Ask about custom software",
    "Ask about research whitepapers",
    "Ask about artificial intelligence",
    "Ask about cloud solutions",
    "Ask about cybersecurity"
  ];

  useEffect(() => {
    if (!isSearchOpen) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setSearchQuery("");
  }, [location.pathname]);

  useEffect(() => {
    // Automatically redirect back to homepage if user is authenticated and tries to access /login
    if (!authLoading && user && location.pathname === '/login') {
      console.log("Redirecting logged-in user from login page to homepage");
      navigate('/', { replace: true });
    }
  }, [user, authLoading, location.pathname, navigate]);

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (isMobileMenuOpen) {
      setHidden(false);
      return;
    }
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50 transition-colors duration-300 antialiased">
      <ScrollToTop />

        {/* Navigation */}
        <motion.nav 
          variants={{
            visible: { y: 0 },
            hidden: { y: "-100%" },
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="sticky top-0 z-50 bg-[#000000] border-b border-white/[0.08] text-white"
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center h-16">
              {/* Left Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl md:text-2xl font-black text-white tracking-tighter hover:opacity-95 transition-all select-none">
                  Amthromax
                </Link>
              </div>

              {/* Center Navigation Links (Desktop only) */}
              <div className="hidden lg:flex items-center justify-center space-x-6 flex-1">
                <button
                  type="button"
                  onMouseEnter={() => handleMouseEnter('research')}
                  className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-semibold py-4"
                >
                  Research
                </button>
                <button
                  type="button"
                  onMouseEnter={() => handleMouseEnter('products')}
                  className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-semibold py-4"
                >
                  Products
                </button>
                <button
                  type="button"
                  onMouseEnter={() => handleMouseEnter('business')}
                  className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-semibold py-4"
                >
                  Business
                </button>
                <Link
                  to="/developers"
                  className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-semibold py-4"
                >
                  Developers
                </Link>
                <button
                  type="button"
                  onMouseEnter={() => handleMouseEnter('company')}
                  className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-semibold py-4"
                >
                  Company
                </button>
                <Link
                  to="/foundation"
                  className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-semibold py-4"
                >
                  Foundation
                </Link>

                <button 
                  type="button" 
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    setActiveMenu(null);
                  }}
                  className="text-white/60 hover:text-white ml-2 transition-colors duration-200 select-none focus:outline-none flex items-center justify-center"
                  aria-label="Toggle search overlay"
                >
                  {isSearchOpen ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Action Buttons & Menu Toggles (Right) */}
              <div className="flex items-center justify-end space-x-4">
                {/* Desktop Log In / Profile (Desktop only) */}
                <div className="hidden lg:flex items-center space-x-4">
                  {authLoading ? (
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : user ? (
                    <div className="relative group">
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border border-white/10 shadow-sm focus:outline-none hover:opacity-90 transition-all select-none"
                      >
                        {user.user_metadata?.avatar_url || user.user_metadata?.picture ? (
                          <img 
                            src={user.user_metadata.avatar_url || user.user_metadata.picture} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="w-full h-full font-black text-xs bg-white text-black flex items-center justify-center">
                            {(user.user_metadata?.full_name || user.user_metadata?.name || user.email || "?")[0].toUpperCase()}
                          </span>
                        )}
                      </button>
                      {/* Hover Dropdown menu */}
                      <div className="absolute right-0 mt-0 pt-2 w-48 bg-[#0b0b0c] border border-white/[0.08] rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="p-3 border-b border-white/[0.08]">
                          {user.user_metadata?.full_name || user.user_metadata?.name ? (
                            <p className="text-xs font-bold text-white truncate mb-1">
                              {user.user_metadata.full_name || user.user_metadata.name}
                            </p>
                          ) : null}
                          <p className="text-[10px] font-bold text-white/45 uppercase tracking-wider">Signed in as</p>
                          <p className="text-xs font-medium text-white/60 truncate">{user.email}</p>
                        </div>
                        <div className="p-2 space-y-1">
                          <Link
                            to="/profile"
                            className="block text-left px-3 py-2 text-xs font-bold text-white hover:bg-white/5 rounded-xl transition-all"
                          >
                            Settings
                          </Link>
                          <button
                            type="button"
                            onClick={async () => {
                              await supabase.auth.signOut();
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-950/20 rounded-xl transition-all cursor-pointer"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Link to="/login" className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-full text-xs font-semibold transition-all select-none border border-white/5 flex items-center gap-1">
                        <span>Log in</span>
                        <span className="text-[8px] opacity-60">▼</span>
                      </Link>
                      <Link to="/login" className="px-5 py-2.5 bg-white text-black rounded-full text-xs font-bold hover:opacity-90 transition-all shadow-md flex items-center gap-0.5">
                        <span>Try Amthromax</span>
                        <span className="text-xs">↗</span>
                      </Link>
                    </>
                  )}
                </div>

                {/* Mobile Search & Hamburger Toggle (Mobile only) */}
                <div className="lg:hidden flex items-center space-x-2">
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsSearchOpen(!isSearchOpen);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-white/80 hover:text-white p-2 transition-colors duration-200 focus:outline-none flex items-center justify-center animate-none"
                    aria-label="Toggle search overlay"
                  >
                    {isSearchOpen ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(!isMobileMenuOpen);
                      setIsSearchOpen(false);
                    }}
                    className="text-white/80 hover:text-white p-2 transition-colors duration-200 focus:outline-none flex items-center justify-center animate-none"
                    aria-label="Toggle mobile menu"
                  >
                    {isMobileMenuOpen ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-[#000000] text-white z-40 overflow-y-auto flex flex-col justify-between px-8 py-10 select-none"
              >
                {/* Navigation Links List */}
                <div className="flex flex-col space-y-7 pt-4">
                  <Link 
                    to="/research" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[32px] sm:text-[36px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity"
                  >
                    Research
                  </Link>
                  <Link 
                    to="/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[32px] sm:text-[36px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity"
                  >
                    Products
                  </Link>
                  <Link 
                    to="/solutions"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[32px] sm:text-[36px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity"
                  >
                    Business
                  </Link>
                  <Link 
                    to="/developers"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[32px] sm:text-[36px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity"
                  >
                    Developers
                  </Link>
                  <Link 
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[32px] sm:text-[36px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity"
                  >
                    Company
                  </Link>
                  <a 
                    href="/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[32px] sm:text-[36px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity flex items-center gap-1.5"
                  >
                    <span>Contact Sales</span>
                    <span className="text-[28px] font-normal opacity-90 relative top-[-1px]">↗</span>
                  </a>
                  <Link 
                    to="/foundation"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[32px] sm:text-[36px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity flex items-center gap-1.5"
                  >
                    <span>Foundation</span>
                    <span className="text-[28px] font-normal opacity-90 relative top-[-1px]">↗</span>
                  </Link>
                </div>

                {/* Footer Action Buttons inside Mobile Menu Drawer */}
                <div className="w-full">
                  <div className="border-t border-white/[0.08] my-6 w-full" />
                  
                  <div className="flex flex-col space-y-5 pt-2">
                    {authLoading ? (
                      <div className="flex justify-start py-2">
                        <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      </div>
                    ) : user ? (
                      <>
                        <Link 
                          to="/profile"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-[28px] sm:text-[30px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity flex items-center gap-1.5"
                        >
                          <span>Dashboard</span>
                          <span className="text-[24px] font-normal opacity-90 relative top-[-1px]">↗</span>
                        </Link>
                        <button
                          type="button"
                          onClick={async () => {
                            await supabase.auth.signOut();
                            setIsMobileMenuOpen(false);
                          }}
                          className="block text-left text-[28px] sm:text-[30px] font-bold text-[#8e8e93] tracking-tight leading-none hover:opacity-85 transition-opacity w-full cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/login" 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-[28px] sm:text-[30px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity flex items-center gap-1.5"
                        >
                          <span>Try Amthromax</span>
                          <span className="text-[24px] font-normal opacity-90 relative top-[-1px]">↗</span>
                        </Link>
                        <Link 
                          to="/login"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-[28px] sm:text-[30px] font-bold text-[#8e8e93] tracking-tight leading-none hover:opacity-85 transition-opacity"
                        >
                          Login
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unified MegaDropdown */}
          <AnimatePresence>
            {activeMenu && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-16 left-0 right-0 bg-[#0b0b0c] border-b border-white/[0.08] text-white z-45 py-12 px-6 sm:px-12 md:px-24"
                onMouseEnter={() => {
                  if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
              >
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                  {activeMenu === 'research' && (
                    <>
                      {/* Left Column */}
                      <div className="space-y-6">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Explore Research</span>
                        <div className="space-y-4">
                          <Link to="/research" onClick={() => setActiveMenu(null)} className="block text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors">Research Index</Link>
                          <Link to="/research/overview" onClick={() => setActiveMenu(null)} className="block text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors">Research Overview</Link>
                          <Link to="/research/publications" onClick={() => setActiveMenu(null)} className="block text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors">Research Residency</Link>
                          <Link to="/security" onClick={() => setActiveMenu(null)} className="block text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors">Safety</Link>
                        </div>
                      </div>
                      {/* Right Column */}
                      <div className="space-y-6">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Latest Advancements</span>
                        <div className="space-y-3">
                          <Link to="/blog" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors">MORFIX 0.1</Link>
                          <Link to="/blog" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors">INTOX 0.2</Link>
                          <Link to="/blog" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors">COTISES 0.5 MAX</Link>
                          <Link to="/blog" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors">VERKOX 0.4 INSTANT</Link>
                        </div>
                      </div>
                    </>
                  )}

                  {activeMenu === 'products' && (
                    <>
                      {/* Left Column */}
                      <div className="space-y-6">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Explore Products</span>
                        <div className="space-y-4">
                          <Link to="/products" onClick={() => setActiveMenu(null)} className="block text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors">Product Index</Link>
                          <Link to="/platform" onClick={() => setActiveMenu(null)} className="block text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors">Platform Core</Link>
                          <Link to="/services" onClick={() => setActiveMenu(null)} className="block text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors">Features Index</Link>
                        </div>
                      </div>
                      {/* Right Column */}
                      <div className="space-y-6">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Developer Hub</span>
                        <div className="space-y-3">
                          <Link to="/docs" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors">Documentation</Link>
                          <Link to="/pricing" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors">Pricing Plans</Link>
                          <Link to="/why/developers" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors">Developer Tools</Link>
                        </div>
                      </div>
                    </>
                  )}

                  {activeMenu === 'business' && (
                    <>
                      {/* Left Column */}
                      <div className="space-y-6">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Explore Solutions</span>
                        <div className="space-y-4">
                          <Link to="/solutions" onClick={() => setActiveMenu(null)} className="block text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors">Our Charter</Link>
                          <Link to="/why/enterprises" onClick={() => setActiveMenu(null)} className="block text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors">Enterprises</Link>
                          <Link to="/why/small-businesses" onClick={() => setActiveMenu(null)} className="block text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors">Small Businesses</Link>
                        </div>
                      </div>
                      {/* Right Column */}
                      <div className="space-y-6">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Services Offered</span>
                        <div className="space-y-3">
                          <Link to="/services/custom-software" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors">Custom Software</Link>
                          <Link to="/services/cloud-solutions" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors">Cloud Solutions</Link>
                          <Link to="/services/artificial-intelligence" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors">AI Systems</Link>
                          <Link to="/services/cybersecurity" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors">Cybersecurity</Link>
                        </div>
                      </div>
                    </>
                  )}

                  {activeMenu === 'company' && (
                    <>
                      {/* Left Column */}
                      <div className="space-y-6">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Explore Corporate</span>
                        <div className="space-y-4">
                          <Link to="/about" onClick={() => setActiveMenu(null)} className="block text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors">About Us</Link>
                          <Link to="/careers" onClick={() => setActiveMenu(null)} className="block text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors">Careers</Link>
                          <Link to="/team" onClick={() => setActiveMenu(null)} className="block text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors">Team</Link>
                          <a href="/contact" target="_blank" rel="noopener noreferrer" onClick={() => setActiveMenu(null)} className="block text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors flex items-center gap-2"><span>Contact Sales</span><span className="text-xl font-normal opacity-70">↗</span></a>
                        </div>
                      </div>
                      {/* Right Column */}
                      <div className="space-y-6">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Resources</span>
                        <div className="space-y-3">
                          <Link to="/blog" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors">Blog</Link>
                          <Link to="/news" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors">Newsroom</Link>
                          <Link to="/foundation" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors">Foundation</Link>
                          <a href="/contact" target="_blank" rel="noopener noreferrer" onClick={() => setActiveMenu(null)} className="block text-sm font-semibold text-white/90 hover:text-white/70 transition-colors flex items-center gap-1"><span>Contact Sales</span><span className="text-[10px] opacity-70">↗</span></a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unified Local Search Overlay */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 top-16 bg-[#000000] z-40 flex flex-col items-center pt-24 px-6 md:px-12 overflow-y-auto"
              >
                <div className="max-w-2xl w-full space-y-8 pb-20">
                  {/* Search Input Box */}
                  <div className="relative border-b border-white/20 pb-2 flex items-center">
                    <input
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={placeholders[placeholderIndex]}
                      className="w-full text-2xl md:text-3xl font-medium text-white bg-transparent outline-none border-none placeholder-white/25 pr-12 pb-1"
                    />
                    <button
                      type="button"
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        searchQuery.trim() ? "bg-white text-black hover:bg-white/95" : "bg-white/10 text-white/40 cursor-default"
                      }`}
                    >
                      <svg className="w-4 h-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </button>
                  </div>

                  {/* Reactive Search Results List */}
                  {searchQuery.trim().length > 0 ? (
                    <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                      {searchItems.filter(item =>
                        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.type.toLowerCase().includes(searchQuery.toLowerCase())
                      ).length > 0 ? (
                        searchItems.filter(item =>
                          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.type.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((item, index) => (
                          <Link 
                            key={index} 
                            to={item.url}
                            className="block p-4 rounded-2xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] hover:border-white/[0.08] transition-all flex justify-between items-center group"
                          >
                            <span className="text-white/95 group-hover:text-white font-medium text-base truncate">{item.title}</span>
                            <span className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-white/10 text-white/60 group-hover:text-white/90 transition-colors">{item.type}</span>
                          </Link>
                        ))
                      ) : (
                        <div className="py-6 text-center text-white/30 text-sm">
                          No matching results found for "{searchQuery}"
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Suggestions or placeholder help text */
                    <div className="space-y-4 pt-4">
                      <span className="text-[10px] font-bold text-white/35 uppercase tracking-widest block">Suggested Queries</span>
                      <div className="flex flex-wrap gap-2.5">
                        {["Careers", "Artificial Intelligence", "Cloud Solutions", "Research", "Team"].map((sugg, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSearchQuery(sugg)}
                            className="px-4 py-2 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-white/70 hover:text-white text-xs font-semibold transition-all select-none"
                          >
                            {sugg}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dropdown Backdrop Blur Overlay */}
          <AnimatePresence>
            {activeMenu && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setActiveMenu(null)}
                className="fixed inset-0 top-16 bg-[#000000]/40 backdrop-blur-[8px] z-30 cursor-pointer"
              />
            )}
          </AnimatePresence>
        </motion.nav>
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
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-650 dark:text-blue-400">Company Profile</span>
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
                  <SEO title="Research & Development | Amthromax" description="Explore our peer-reviewed whitepapers, predictive system auto-scaling algorithms, and zero-trust cryptography solutions." />
                  <ResearchSection />
                  <Footer />
                </div>
              } />
              <Route path="/research/overview" element={<ResearchOverviewPage />} />
              <Route path="/research/publications" element={<PublicationsPage />} />
              <Route path="/publications" element={<PublicationsPage />} />
              <Route path="/research/:paperId" element={<ResearchDetailPage />} />
              <Route path="/foundation" element={
                <div>
                  <FoundationSection />
                  <Footer />
                </div>
              } />
              <Route path="/foundation/:articleId" element={<FoundationDetailPage />} />
              <Route path="/contact" element={
                <div>
                  <SEO title="Contact Amthromax" description="Get in touch with Amthromax for AI development and automation solutions." />
                  <div className="py-20 bg-white dark:bg-gray-950 min-h-[85vh] transition-colors duration-300">
                    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
                      <div className="md:col-span-5 space-y-6">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-650 dark:text-blue-400">Get in touch</span>
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
              <Route path="/team" element={<TeamPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/why/enterprises" element={<EnterprisesPage />} />
              <Route path="/why/small-businesses" element={<SmallBusinessesPage />} />
              <Route path="/why/developers" element={<DevelopersPage />} />
              <Route path="/login" element={<LoginSection />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/publish" element={<PublishPage />} />
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
              <Route path="/contact" element={<ContactSalesPage />} />
              <Route path="/contact-sales" element={<ContactSalesPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <CookieConsent />
      </div>
  );
};

export default App;