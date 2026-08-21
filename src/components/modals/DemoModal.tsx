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
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">
          {/* Apple Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-md cursor-pointer"
          />

          {/* Apple Premium Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[460px] bg-white dark:bg-black text-gray-900 dark:text-white rounded-[28px] p-7 sm:p-9 shadow-2xl z-10 border border-gray-200 dark:border-white/10 overflow-hidden backdrop-blur-2xl"
          >
            {/* Top Light Ambient Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent pointer-events-none" />

            {/* Circular Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer focus:outline-none"
              aria-label="Close modal"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
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
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold border border-emerald-200 dark:border-emerald-800 shadow-sm">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Walkthrough Requested!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm mx-auto leading-relaxed">
                  Thank you! Our enterprise sales engineering team will reach out to <strong className="text-gray-900 dark:text-white font-semibold">{email}</strong> at <strong className="text-gray-900 dark:text-white font-semibold">{company}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold rounded-full hover:opacity-90 transition-all cursor-pointer shadow-sm"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <div>
                {/* Heading */}
                <h2 className="text-[28px] sm:text-[32px] font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.15] pr-4 mb-2.5">
                  Skip the pitch. See Amthromax on your pipeline.
                </h2>

                {/* Subtitle */}
                <p className="text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400 leading-[1.55] mb-6 font-normal">
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
                      className="w-full px-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-[14px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all shadow-none"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Company email"
                      className="w-full px-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-[14px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all shadow-none"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-600 dark:text-red-400 font-medium">
                      ⚠️ {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 px-6 bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-bold text-[14px] rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 active:scale-[0.99]"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <span>Book a demo</span>
                        <span className="text-base font-normal">→</span>
                      </span>
                    )}
                  </button>
                </form>

                {/* Privacy Note */}
                <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-snug mt-4 font-normal">
                  By submitting this form, you will receive information, tips, and promotions from Amthromax. To learn more, see our{' '}
                  <Link to="/privacy" onClick={onClose} className="text-gray-700 dark:text-gray-300 underline font-medium hover:text-black dark:hover:text-white transition-colors">
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
