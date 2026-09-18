import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir?: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English (US)' },
];

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (code: string) => void;
  languages: Language[];
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    'footer.privacy_center': 'Privacy Center',
    'footer.privacy_policy': 'Privacy Policy',
    'footer.terms_of_use': 'Terms of Use',
    'footer.cookie_policy': 'Cookie Policy',
    'footer.manage_cookies': 'Manage Cookies',
    'footer.all_rights_reserved': 'All rights reserved.',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);

  // Clean up any residual translation cookies or Google Translate artifacts
  useEffect(() => {
    if (typeof window === 'undefined') return;

    localStorage.setItem('amthromax-language', 'en');
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';

    // Clear any previous translation cookies
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    if (window.location.hostname) {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
    }

    // Remove Google Translate script & DOM elements if present
    const script = document.getElementById('google-translate-script');
    if (script) script.remove();
    const elem = document.getElementById('google_translate_element');
    if (elem) elem.remove();
  }, []);

  const setLanguage = (_code: string) => {
    // English only mode
  };

  const t = (key: string): string => {
    return TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        languages: SUPPORTED_LANGUAGES,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
