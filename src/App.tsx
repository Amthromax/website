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
import EventsSection from "./components/events/EventsSection";
import EditorialMissionSection from "./components/home/EditorialMissionSection";
import LoginSection from "./components/login/LoginSection";
import ServiceDetailPage from "./components/services/ServiceDetailPage";
import ResearchDetailPage from "./components/research/ResearchDetailPage";
import ResearchOverviewPage from "./components/research/ResearchOverviewPage";
import PublicationsPage from "./components/research/PublicationsPage";
import SafetyArchitecturePage from "./components/research/SafetyArchitecturePage";
import CookieConsent from "./components/layout/CookieConsent";
import ScrollToTop from "./components/layout/ScrollToTop";
import SolutionsPage from "./components/solutions/SolutionsPage";
import { EnterprisesPage, SmallBusinessesPage, DevelopersPage } from "./components/solutions/WhyPages";
import SEO from "./components/layout/SEO";
import BlogPage from "./components/blog/BlogPage";
import BlogPostDetail from "./components/blog/BlogPostDetail";
import PublishPage from "./components/blog/PublishPage";
import NewsPage from "./components/news/NewsPage";
import NewsDetailPage from "./components/news/NewsDetailPage";
import CookiePolicyPage from "./components/legal/CookiePolicyPage";
import PrivacyPolicyPage from "./components/legal/PrivacyPolicyPage";
import TermsOfServicePage from "./components/legal/TermsOfServicePage";
import DataProtectionPage from "./components/legal/DataProtectionPage";
import GlobalPrivacyCenterPage from "./components/legal/GlobalPrivacyCenterPage";
import PrivacyRequestPortalPage from "./components/legal/PrivacyRequestPortalPage";
import PlatformPage from "./components/platform/PlatformPage";
import ProductsPage from "./components/products/ProductsPage";
import DocsPage from "./components/docs/DocsPage";
import PricingPage from "./components/pricing/PricingPage";
import CareersPage from "./components/careers/CareersPage";
import SecurityPage from "./components/security/SecurityPage";
import AboutPage from "./components/about/AboutPage";
import ProductDetailPage from "./components/products/ProductDetailPage";
import TeamPage from "./components/about/TeamPage";
import { useAuth } from "./context/AuthContext";
import AuthCallback from "./components/auth/AuthCallback";
import ProfilePage from "./components/profile/ProfilePage";
import ContactSalesPage from "./components/contact/ContactSalesPage";
import OverviewPage from "./components/overview/OverviewPage";
import PartnerNetworkPage from "./components/partners/PartnerNetworkPage";
import CharterPage from "./components/charter/CharterPage";
import DemoModal from "./components/modals/DemoModal";
import AnnouncementBanner from "./components/layout/AnnouncementBanner";
import RegisterLandingPage from "./components/register/RegisterLandingPage";
import TryDropdownButton from "./components/layout/TryDropdownButton";
import LoginDropdownButton from "./components/layout/LoginDropdownButton";
import HelleiousSafetyPage from "./components/announcements/HelleiousSafetyPage";
import HelleiousPage from "./components/helleious/HelleiousPage";
import CodeHoomerPage from "./components/codehoomer/CodeHoomerPage";
import OrarQlowPage from "./components/orarqlow/OrarQlowPage";
import TrustTransparencyPage from "./components/trust/TrustTransparencyPage";
import NotFoundPage from "./components/common/NotFoundPage";
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
  { type: "Research", title: "Intelligence Index", url: "/research" },
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
  { type: "Platform", title: "System Architecture & Platform Overview", url: "/overview" },
  { type: "Company", title: "Contact Enterprise Sales & Engineering Team", url: "/contact" },
  { type: "Announcement", title: "Helleious.ai Core Views on Safety & Governance", url: "/helleious-safety" },
];

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, authLoading, signOut } = useAuth();

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

  const [activeMenu, setActiveMenu] = useState<'research' | 'products' | 'business' | 'company' | 'developers' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [isSubmittedWaitlist, setIsSubmittedWaitlist] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Trigger demo popup modal 10 seconds after user enters the website
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("amthromax_demo_modal_shown");
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setShowDemoModal(true);
      sessionStorage.setItem("amthromax_demo_modal_shown", "true");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (menu: 'research' | 'products' | 'business' | 'company' | 'developers') => {
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

  const isRegisterPage = location.pathname === "/register";

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-50 transition-colors duration-300 antialiased">
      <ScrollToTop />
      {!isRegisterPage && <AnnouncementBanner />}

      {/* Navigation */}
      {!isRegisterPage && (
        <motion.nav
          variants={{
            visible: { y: 0 },
            hidden: { y: "-100%" },
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="sticky top-0 z-50 bg-white/80 dark:bg-[#000000]/80 backdrop-blur-md border-b border-gray-200/60 dark:border-white/[0.08] text-gray-900 dark:text-white transition-colors duration-200"
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16">
            <div className="flex justify-between items-center h-13 sm:h-14">
              {/* Left Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center gap-2.5 text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tighter hover:opacity-80 transition-all select-none group">
                  <span>Amthromax</span>
                </Link>
              </div>

              {/* Center Navigation Links (Desktop only) */}
              <div className="hidden lg:flex items-center justify-center space-x-6 flex-1">
                <button
                  type="button"
                  onMouseEnter={() => handleMouseEnter('research')}
                  className="text-gray-700 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors duration-200 text-sm sm:text-base font-medium py-2 cursor-pointer"
                >
                  Intelligence
                </button>
                <button
                  type="button"
                  onMouseEnter={() => handleMouseEnter('products')}
                  className="text-gray-700 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors duration-200 text-sm sm:text-base font-medium py-2 cursor-pointer"
                >
                  Products
                </button>
                <button
                  type="button"
                  onMouseEnter={() => handleMouseEnter('business')}
                  className="text-gray-700 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors duration-200 text-sm sm:text-base font-medium py-2 cursor-pointer"
                >
                  Business
                </button>
                <button
                  type="button"
                  onMouseEnter={() => handleMouseEnter('developers')}
                  className="text-gray-700 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors duration-200 text-sm sm:text-base font-medium py-2 cursor-pointer"
                >
                  Developers
                </button>
                <button
                  type="button"
                  onMouseEnter={() => handleMouseEnter('company')}
                  className="text-gray-700 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors duration-200 text-sm sm:text-base font-medium py-2 cursor-pointer"
                >
                  Company
                </button>
                <Link
                  to="/foundation"
                  className="text-gray-700 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors duration-200 text-sm sm:text-base font-medium py-2"
                >
                  Ai Intelli Hub
                </Link>
              </div>

              {/* Action Buttons & Menu Toggles (Right) */}
              <div className="flex items-center justify-end space-x-4">
                {/* Desktop Log In / Profile & Try Button (Desktop only) */}
                <div className="hidden lg:flex items-center space-x-4">
                  {authLoading ? (
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {user ? (
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
                                  await signOut();
                                }}
                                className="w-full text-left px-3 py-2 text-xs font-bold text-white/80 hover:bg-white/10 hover:text-white rounded-xl transition-all cursor-pointer"
                              >
                                Sign Out
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <LoginDropdownButton />
                      )}
                      <TryDropdownButton
                        onTryClick={() => {
                          setShowComingSoonModal(true);
                          setIsSubmittedWaitlist(false);
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Mobile Hamburger Toggle (Mobile only) */}
                <div className="lg:hidden flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(!isMobileMenuOpen);
                      setIsSearchOpen(false);
                    }}
                    className="text-gray-700 hover:text-black dark:text-white/80 dark:hover:text-white p-2 transition-colors duration-200 focus:outline-none flex items-center justify-center animate-none"
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



          {/* Unified MegaDropdown */}
          <AnimatePresence>
            {activeMenu && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 bg-white dark:bg-[#0b0b0c] border-b border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white z-45 py-8 px-6 sm:px-12 md:px-24 transition-colors duration-200"
                onMouseEnter={() => {
                  if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
              >
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                  {activeMenu === 'research' && (
                    <>
                      {/* Left Column */}
                      <div className="space-y-6">
                        <span className="text-xs font-extrabold text-gray-500 dark:text-white/50 uppercase tracking-widest block">Explore Intelligence</span>
                        <div className="space-y-3">
                          <Link to="/research" onClick={() => setActiveMenu(null)} className="block text-xl md:text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-white/80 transition-colors">Intelligence Index</Link>
                          <Link to="/research/overview" onClick={() => setActiveMenu(null)} className="block text-xl md:text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-white/80 transition-colors">Intelligence Overview</Link>
                          <Link to="/research/publications" onClick={() => setActiveMenu(null)} className="block text-xl md:text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-white/80 transition-colors">Intelligence Residency</Link>
                          <Link to="/security" onClick={() => setActiveMenu(null)} className="block text-xl md:text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-white/80 transition-colors">Safety</Link>
                        </div>
                      </div>
                      {/* Right Column */}
                      <div className="space-y-6">
                        <span className="text-xs font-extrabold text-gray-500 dark:text-white/50 uppercase tracking-widest block">Latest Advancements</span>
                        <div className="space-y-2.5">
                          <Link to="/blog" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">MORFIX 0.1</Link>
                          <Link to="/blog" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">INTOX 0.2</Link>
                          <Link to="/blog" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">COTISES 0.5 MAX</Link>
                          <Link to="/blog" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">VERKOX 0.4 INSTANT</Link>
                        </div>
                      </div>
                    </>
                  )}

                  {activeMenu === 'products' && (
                    <>
                      {/* Left Column */}
                      <div className="space-y-6">
                        <span className="text-xs font-extrabold text-gray-500 dark:text-white/50 uppercase tracking-widest block">Explore Products</span>
                        <div className="space-y-3">
                          <Link to="/products" onClick={() => setActiveMenu(null)} className="block text-xl md:text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-white/80 transition-colors">Product Index</Link>
                          <Link to="/platform" onClick={() => setActiveMenu(null)} className="block text-xl md:text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-white/80 transition-colors">Platform Core</Link>
                          <Link to="/orarqlow" onClick={() => setActiveMenu(null)} className="block text-xl md:text-2xl font-bold text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors">OrarQlow.Ai</Link>
                          <Link to="/helleious" onClick={() => setActiveMenu(null)} className="block text-xl md:text-2xl font-bold text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 transition-colors">Helleious.Ai</Link>
                          <Link to="/codehoomer" onClick={() => setActiveMenu(null)} className="block text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors">CodeHoomer.Ai</Link>
                        </div>
                      </div>
                      {/* Right Column */}
                      <div className="space-y-6">
                        <span className="text-xs font-extrabold text-gray-500 dark:text-white/50 uppercase tracking-widest block">Developer Hub</span>
                        <div className="space-y-2.5">
                          <Link to="/docs" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">Documentation</Link>
                          <Link to="/pricing" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">Pricing Plans</Link>
                          <Link to="/why/developers" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">Developer Tools</Link>
                        </div>
                      </div>
                    </>
                  )}

                  {activeMenu === 'business' && (
                    <>
                      {/* Left Column - BUSINESS */}
                      <div className="space-y-6">
                        <span className="text-xs font-extrabold text-gray-500 dark:text-white/50 uppercase tracking-widest block">BUSINESS</span>
                        <div className="space-y-2.5">
                          <Link to="/overview" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors flex items-center justify-between"><span>Overview</span><span className="text-sm font-normal opacity-70">↗</span></Link>
                          <Link to="/solutions" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors flex items-center justify-between"><span>Solutions</span><span className="text-sm font-normal opacity-70">↗</span></Link>
                          <Link to="/research" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors flex items-center justify-between"><span>Resources</span><span className="text-sm font-normal opacity-70">↗</span></Link>
                          <Link to="/partners" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors flex items-center justify-between"><span>Partner Network</span><span className="text-sm font-normal opacity-70">↗</span></Link>
                          <Link to="/contact" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors flex items-center justify-between"><span>Contact Sales</span><span className="text-sm font-normal opacity-70">↗</span></Link>
                          <Link to="/developers" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">Developer Hub</Link>
                          <Link to="/docs" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors flex items-center justify-between"><span>API Docs</span><span className="text-sm font-normal opacity-70">↗</span></Link>
                        </div>
                      </div>
                      {/* Right Column - API Platform */}
                      <div className="space-y-6">
                        <span className="text-xs font-extrabold text-gray-500 dark:text-white/50 uppercase tracking-widest block">API Platform</span>
                        <div className="space-y-2.5">
                          <Link to="/overview" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">Overview</Link>
                          <Link to="/login" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors flex items-center justify-between"><span>API Log In</span><span className="text-sm font-normal opacity-70">↗</span></Link>
                          <Link to="/docs" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors flex items-center justify-between"><span>Docs</span><span className="text-sm font-normal opacity-70">↗</span></Link>
                        </div>
                      </div>
                    </>
                  )}

                  {activeMenu === 'developers' && (
                    <>
                      {/* Left Column - API Platform */}
                      <div className="space-y-6">
                        <span className="text-xs font-extrabold text-gray-500 dark:text-white/50 uppercase tracking-widest block">API Platform</span>
                        <div className="space-y-2.5">
                          <Link to="/overview" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">Overview</Link>
                          <Link to="/login" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors flex items-center justify-between"><span>API Log In</span><span className="text-sm font-normal opacity-70">↗</span></Link>
                          <Link to="/docs" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors flex items-center justify-between"><span>Docs</span><span className="text-sm font-normal opacity-70">↗</span></Link>
                        </div>
                      </div>
                      {/* Right Column - Developer Hub */}
                      <div className="space-y-6">
                        <span className="text-xs font-extrabold text-gray-500 dark:text-white/50 uppercase tracking-widest block">Developer Hub</span>
                        <div className="space-y-2.5">
                          <Link to="/developers" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">Developer Portal</Link>
                          <Link to="/docs" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors flex items-center justify-between"><span>Documentation</span><span className="text-sm font-normal opacity-70">↗</span></Link>
                          <Link to="/pricing" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">Pricing &amp; Quotas</Link>
                          <Link to="/why/developers" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">Developer Tools</Link>
                        </div>
                      </div>
                    </>
                  )}

                  {activeMenu === 'company' && (
                    <>
                      {/* Left Column */}
                      <div className="space-y-6">
                        <span className="text-xs font-extrabold text-gray-500 dark:text-white/50 uppercase tracking-widest block">Explore Corporate</span>
                        <div className="space-y-3">
                          <Link to="/about" onClick={() => setActiveMenu(null)} className="block text-xl md:text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-white/80 transition-colors">About Us</Link>
                          <Link to="/careers" onClick={() => setActiveMenu(null)} className="block text-xl md:text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-white/80 transition-colors">Careers</Link>
                          <Link to="/team" onClick={() => setActiveMenu(null)} className="block text-xl md:text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-white/80 transition-colors">Team</Link>
                          <a href="/contact" target="_blank" rel="noopener noreferrer" onClick={() => setActiveMenu(null)} className="block text-xl md:text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-white/80 transition-colors flex items-center gap-2"><span>Contact Sales</span><span className="text-lg font-normal opacity-70">↗</span></a>
                        </div>
                      </div>
                      {/* Right Column */}
                      <div className="space-y-6">
                        <span className="text-xs font-extrabold text-gray-500 dark:text-white/50 uppercase tracking-widest block">Resources</span>
                        <div className="space-y-2.5">
                          <Link to="/blog" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">Blog</Link>
                          <Link to="/news" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">Newsroom</Link>
                          <Link to="/foundation" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors">AI Foundation</Link>
                          <a href="/contact" target="_blank" rel="noopener noreferrer" onClick={() => setActiveMenu(null)} className="block text-base md:text-lg font-semibold text-gray-700 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5"><span>Contact Sales</span><span className="text-sm font-normal opacity-70">↗</span></a>
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
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${searchQuery.trim() ? "bg-white text-black hover:bg-white/95" : "bg-white/10 text-white/40 cursor-default"
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
      )}

      {/* Mobile Navigation Drawer Fullscreen Overlay */}
      <AnimatePresence>
        {!isRegisterPage && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden fixed inset-0 z-[100] bg-[#000000] text-white flex flex-col justify-between p-6 sm:p-8 select-none overflow-y-auto"
          >
            {/* Top Bar Header inside Mobile Drawer */}
            <div className="flex items-center justify-between h-14 border-b border-white/10 pb-3">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl sm:text-2xl font-bold text-white tracking-tighter"
              >
                Amthromax
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/80 hover:text-white p-2 transition-colors focus:outline-none cursor-pointer"
                aria-label="Close mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links List */}
            <div className="flex flex-col space-y-6 pt-6 flex-1">
              <Link
                to="/research"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-[30px] sm:text-[34px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity"
              >
                Intelligence
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-[30px] sm:text-[34px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity"
              >
                Products
              </Link>
              <Link
                to="/solutions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-[30px] sm:text-[34px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity"
              >
                Business
              </Link>
              <Link
                to="/developers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-[30px] sm:text-[34px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity"
              >
                Developers
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-[30px] sm:text-[34px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity"
              >
                Company
              </Link>
              <a
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-[30px] sm:text-[34px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity flex items-center gap-1.5"
              >
                <span>Contact Sales</span>
                <span className="text-[26px] font-normal opacity-90 relative top-[-1px]">↗</span>
              </a>
              <Link
                to="/foundation"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-[30px] sm:text-[34px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity flex items-center gap-1.5"
              >
                <span>Ai Intelli Hub</span>
                <span className="text-[26px] font-normal opacity-90 relative top-[-1px]">↗</span>
              </Link>
            </div>

            {/* Footer Action Buttons inside Mobile Menu Drawer */}
            <div className="w-full pt-6">
              <div className="border-t border-white/[0.08] mb-6 w-full" />

              <div className="flex flex-col space-y-4">
                {authLoading ? (
                  <div className="flex justify-start py-2">
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setShowComingSoonModal(true);
                        setIsSubmittedWaitlist(false);
                      }}
                      className="block text-left text-[26px] sm:text-[28px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Try Amthromax</span>
                      <span className="text-[22px] font-normal opacity-90 relative top-[-1px]">↗</span>
                    </button>
                    {user ? (
                      <>
                        <Link
                          to="/profile"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-[26px] sm:text-[28px] font-bold text-white tracking-tight leading-none hover:opacity-85 transition-opacity flex items-center gap-1.5"
                        >
                          <span>Dashboard</span>
                          <span className="text-[22px] font-normal opacity-90 relative top-[-1px]">↗</span>
                        </Link>
                        <button
                          type="button"
                          onClick={async () => {
                            await signOut();
                            setIsMobileMenuOpen(false);
                          }}
                          className="block text-left text-[26px] sm:text-[28px] font-bold text-[#8e8e93] tracking-tight leading-none hover:opacity-85 transition-opacity w-full cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-[26px] sm:text-[28px] font-bold text-[#8e8e93] tracking-tight leading-none hover:opacity-85 transition-opacity"
                      >
                        Login
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <main>
        <AnimatePresence>
          <Routes location={location}>
            <Route path="/" element={
              <div>
                <SEO title="Amthromax — Artificial Intelligence Company" description="Amthromax is an artificial intelligence and software company developing advanced AI products, autonomous agents, developer tools, and intelligent software systems." />
                <HeroSection />
                <FeaturesSection />

                {/* Showcase Images Section */}
                <section className="py-16 bg-white dark:bg-black border-t border-gray-200/60 dark:border-white/10 transition-colors duration-300">
                  <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    <div className="overflow-hidden rounded-[28px] border border-gray-200 dark:border-white/10 bg-[#f5f5f7] dark:bg-[#141517] shadow-sm hover:shadow-xl transition-all duration-500 group flex items-center justify-center">
                      <img
                        src="/images/amthromax_lab_workspace.jpg"
                        alt="Amthromax Lab Autonomous Workspace"
                        className="w-full h-full object-cover rounded-[28px] group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                    <div className="overflow-hidden rounded-[28px] border border-gray-200 dark:border-white/10 bg-[#f5f5f7] dark:bg-[#141517] shadow-sm hover:shadow-xl transition-all duration-500 group flex items-center justify-center">
                      <img
                        src="/images/amthromax_laptop_workspace.png"
                        alt="Amthromax Platform Executive Dashboard"
                        className="w-full h-full object-cover rounded-[28px] group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  </div>
                </section>

                <UpcomingProjectsSection />
                <EventsSection />
                <EditorialMissionSection />
                <Footer />
              </div>
            } />
            <Route path="/about" element={<AboutPage />} />
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
                <SEO title="Intelligence Index | Amthromax" description="Explore peer-reviewed publications, autonomous agent benchmarks, and distributed neural systems." />
                <ResearchSection />
                <Footer />
              </div>
            } />
            <Route path="/research/overview" element={<ResearchOverviewPage />} />
            <Route path="/research/safety" element={<SafetyArchitecturePage />} />
            <Route path="/safety" element={<SafetyArchitecturePage />} />
            <Route path="/trust" element={<TrustTransparencyPage />} />
            <Route path="/transparency" element={<TrustTransparencyPage />} />
            <Route path="/trust-transparency" element={<TrustTransparencyPage />} />
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
            <Route path="/contact" element={<ContactSalesPage />} />
            <Route path="/contact-sales" element={<ContactSalesPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/why/enterprises" element={<EnterprisesPage />} />
            <Route path="/why/small-businesses" element={<SmallBusinessesPage />} />
            <Route path="/why/developers" element={<DevelopersPage />} />
            <Route path="/login" element={<LoginSection />} />
            <Route path="/register" element={<RegisterLandingPage />} />
            <Route path="/gtm-2026" element={<RegisterLandingPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/publish" element={<PublishPage />} />
            <Route path="/blog/:postId" element={<BlogPostDetail />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:articleId" element={<NewsDetailPage />} />
            <Route path="/newsroom" element={<NewsPage />} />
            <Route path="/insights" element={<NewsPage />} />
            <Route path="/insights/:articleId" element={<NewsDetailPage />} />
            <Route path="/cookies" element={<CookiePolicyPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/data-protection" element={<DataProtectionPage />} />
            <Route path="/dpdp" element={<DataProtectionPage />} />
            <Route path="/privacy-center" element={<GlobalPrivacyCenterPage />} />
            <Route path="/privacy-request" element={<PrivacyRequestPortalPage />} />
            <Route path="/privacy/request" element={<PrivacyRequestPortalPage />} />
            <Route path="/privacy/cookies" element={<GlobalPrivacyCenterPage />} />
            <Route path="/privacy/rights" element={<GlobalPrivacyCenterPage />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/docs/:section" element={<DocsPage />} />
            <Route path="/documentation" element={<DocsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/developers/overview" element={<OverviewPage />} />
            <Route path="/platform/overview" element={<OverviewPage />} />
            <Route path="/partners" element={<PartnerNetworkPage />} />
            <Route path="/partner-network" element={<PartnerNetworkPage />} />
            <Route path="/charter" element={<CharterPage />} />
            <Route path="/our-charter" element={<CharterPage />} />
            <Route path="/helleious" element={<HelleiousPage />} />
            <Route path="/codehoomer" element={<CodeHoomerPage />} />
            <Route path="/codehoomer-ai" element={<CodeHoomerPage />} />
            <Route path="/orarqlow" element={<OrarQlowPage />} />
            <Route path="/orarqlow-ai" element={<OrarQlowPage />} />
            <Route path="/helleious-safety" element={<HelleiousSafetyPage />} />
            <Route path="/safety-governance" element={<HelleiousSafetyPage />} />
            <Route path="/announcements/helleious-safety" element={<HelleiousSafetyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <CookieConsent />

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoonModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-[#161617] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-center"
            >
              {/* Glow backdrop decoration */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowComingSoonModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                ✕
              </button>

              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 text-blue-400 text-[11px] font-bold tracking-wider uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Coming Soon
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                Amthromax Console
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Our next-generation enterprise AI orchestration platform is currently in private preview. Request priority access to be notified when public beta opens.
              </p>

              {/* Form or Success State */}
              {isSubmittedWaitlist ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs font-semibold"
                >
                  ✓ You're on the priority waitlist! We'll invite you as soon as early access opens.
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (waitlistEmail.trim()) {
                      setIsSubmittedWaitlist(true);
                    }
                  }}
                  className="space-y-3 text-left"
                >
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      placeholder="username@company.com"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-white text-black font-bold rounded-xl text-xs hover:bg-gray-100 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>Request Early Access</span>
                    <span>↗</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10-second Lead Demo Modal */}
      <DemoModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </div>
  );
};

export default App;