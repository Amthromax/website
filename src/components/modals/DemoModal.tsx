import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
  'aol.com', 'protonmail.com', 'proton.me', 'zoho.com', 'mail.com',
  'gmx.com', 'yandex.com', 'live.com', 'msn.com', 'me.com'
];

const isWorkEmail = (email: string): boolean => {
  if (!email || !email.includes('@')) return false;
  const parts = email.trim().toLowerCase().split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1];
  if (!domain || !domain.includes('.')) return false;
  return !PERSONAL_EMAIL_DOMAINS.includes(domain);
};

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!company.trim()) {
      setError('Please enter your company or organization name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter your work email address.');
      return;
    }

    if (!isWorkEmail(email)) {
      setError('Please use your official company or work email address (e.g. name@company.com).');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3500);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* High-Quality Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[500px] bg-white text-gray-900 rounded-[24px] p-7 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.22)] z-10 border border-gray-100 overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Body */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold border border-emerald-200">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight font-sans">
                  Walkthrough Requested!
                </h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Thank you! Our enterprise sales engineering team will reach out to <strong className="text-gray-900 font-semibold">{email}</strong> at <strong className="text-gray-900 font-semibold">{company}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <div>
                {/* Heading: Clean Inter Font Typography */}
                <h2 
                  style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }} 
                  className="text-[28px] sm:text-[32px] font-bold text-[#0f172a] tracking-tight leading-[1.18] pr-4 mb-3"
                >
                  Skip the pitch. See Amthromax on your pipeline.
                </h2>

                {/* Subtitle */}
                <p className="text-[13px] sm:text-[14px] text-[#475569] leading-[1.55] mb-6 font-sans">
                  Book a personalized walkthrough and see how your team finds, engages, and closes — in one place.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company name"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-[10px] text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Company email"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-[10px] text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-[10px] text-xs text-red-600 font-medium">
                      ⚠️ {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 bg-black hover:bg-[#1f2937] text-white font-medium text-[14px] rounded-[10px] transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <span className="flex items-center gap-1">
                        <span>Book a demo</span>
                        <span className="text-base font-normal">→ →</span>
                      </span>
                    )}
                  </button>
                </form>

                {/* Privacy note */}
                <p className="text-[12px] text-[#6b7280] leading-snug mt-4 font-sans">
                  By submitting this form, you will receive information, tips, and promotions from Amthromax. To learn more, see our{' '}
                  <Link to="/privacy" onClick={onClose} className="text-[#374151] underline font-medium hover:text-black">
                    Privacy Statement
                  </Link>
                  .
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DemoModal;
