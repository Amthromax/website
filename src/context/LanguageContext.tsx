import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir?: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
];

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (code: string) => void;
  languages: Language[];
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Core translation dictionary for UI fallbacks
const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    'footer.privacy_center': 'Privacy Center',
    'footer.privacy_policy': 'Privacy Policy',
    'footer.terms_of_use': 'Terms of Use',
    'footer.cookie_policy': 'Cookie Policy',
    'footer.manage_cookies': 'Manage Cookies',
    'footer.all_rights_reserved': 'All rights reserved.',
  },
  ja: {
    'footer.privacy_center': 'プライバシーセンター',
    'footer.privacy_policy': 'プライバシーポリシー',
    'footer.terms_of_use': '利用規約',
    'footer.cookie_policy': 'クッキーポリシー',
    'footer.manage_cookies': 'クッキー管理',
    'footer.all_rights_reserved': '全著作権所有。',
  },
  de: {
    'footer.privacy_center': 'Datenschutz-Center',
    'footer.privacy_policy': 'Datenschutzerklärung',
    'footer.terms_of_use': 'Nutzungsbedingungen',
    'footer.cookie_policy': 'Cookie-Richtlinie',
    'footer.manage_cookies': 'Cookies verwalten',
    'footer.all_rights_reserved': 'Alle Rechte vorbehalten.',
  },
  fr: {
    'footer.privacy_center': 'Centre de confidentialité',
    'footer.privacy_policy': 'Politique de confidentialité',
    'footer.terms_of_use': "Conditions d'utilisation",
    'footer.cookie_policy': 'Politique de cookies',
    'footer.manage_cookies': 'Gérer les cookies',
    'footer.all_rights_reserved': 'Tous droits réservés.',
  },
  ko: {
    'footer.privacy_center': '개인정보 보호 센터',
    'footer.privacy_policy': '개인정보 처리방침',
    'footer.terms_of_use': '이용약관',
    'footer.cookie_policy': '쿠키 정책',
    'footer.manage_cookies': '쿠키 관리',
    'footer.all_rights_reserved': '모든 권리 보유.',
  },
  it: {
    'footer.privacy_center': 'Centro Privacy',
    'footer.privacy_policy': 'Informativa sulla Privacy',
    'footer.terms_of_use': 'Termini di Utilizzo',
    'footer.cookie_policy': 'Informativa sui Cookie',
    'footer.manage_cookies': 'Gestisci Cookie',
    'footer.all_rights_reserved': 'Tutti i diritti riservati.',
  },
  es: {
    'footer.privacy_center': 'Centro de Privacidad',
    'footer.privacy_policy': 'Política de Privacidad',
    'footer.terms_of_use': 'Términos de Uso',
    'footer.cookie_policy': 'Política de Cookies',
    'footer.manage_cookies': 'Gestionar Cookies',
    'footer.all_rights_reserved': 'Todos los derechos reservados.',
  },
};

// Global type declaration for Google Translate
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedCode = localStorage.getItem('amthromax-language');
      if (savedCode) {
        const found = SUPPORTED_LANGUAGES.find((l) => l.code === savedCode);
        if (found) return found;
      }
    }
    return SUPPORTED_LANGUAGES[0]; // English default
  });

  // Inject Google Translate hidden widget once
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create container if not present
    if (!document.getElementById('google_translate_element')) {
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      div.style.display = 'none';
      document.body.appendChild(div);
    }

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            autoDisplay: false,
            includedLanguages: 'en,ja,de,fr,ko,it,es,zh-CN,zh-TW,pt,ru,ar,hi',
          },
          'google_translate_element'
        );
      }
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Suppress top banner iframe, loading spinner, logo badge and keep body top position clean
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const killBanner = () => {
      if (document.body.style.top && document.body.style.top !== '0px') {
        document.body.style.top = '0px';
      }
      if (document.documentElement.style.top && document.documentElement.style.top !== '0px') {
        document.documentElement.style.top = '0px';
      }

      const elements = document.querySelectorAll(
        '.goog-te-banner-frame, iframe[id*=":1.container"], iframe[id*=":2.container"], .VIpgJd-ZGain-xl0ndc-O2Twf, .VIpgJd-yfvT2b-hT1uef, .goog-te-spinner-pos, .goog-te-spinner, .goog-te-gadget-icon, .skiptranslate, #goog-gt-tt, .goog-gt-tt'
      );
      elements.forEach((el) => {
        if (el.id !== 'google_translate_element') {
          (el as HTMLElement).style.display = 'none';
          (el as HTMLElement).style.visibility = 'hidden';
          (el as HTMLElement).style.height = '0px';
          (el as HTMLElement).style.opacity = '0';
          (el as HTMLElement).style.pointerEvents = 'none';
        }
      });
    };

    killBanner();
    const interval = setInterval(killBanner, 200);
    return () => clearInterval(interval);
  }, []);

  // Update HTML attributes & trigger translation engine
  useEffect(() => {
    if (typeof window === 'undefined') return;

    localStorage.setItem('amthromax-language', currentLanguage.code);
    document.documentElement.lang = currentLanguage.code;
    document.documentElement.dir = currentLanguage.dir || 'ltr';
  }, [currentLanguage]);

  const setLanguage = (code: string) => {
    const target = SUPPORTED_LANGUAGES.find((l) => l.code === code);
    if (!target) return;

    const previousCode = currentLanguage.code;
    setCurrentLanguage(target);
    localStorage.setItem('amthromax-language', code);

    if (typeof window === 'undefined') return;

    const targetVal = code === 'en' ? '' : code;
    const cookieVal = targetVal ? `/en/${targetVal}` : '';

    // Set cookie for root and domain
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    if (window.location.hostname) {
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${window.location.hostname}`;
    }

    // Attempt to update Google Translate widget select element dynamically
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = targetVal || 'en';
      select.dispatchEvent(new Event('change'));
    } else if (previousCode !== code) {
      // Reload page if combo box not present so cookie takes effect automatically
      window.location.reload();
    }
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[currentLanguage.code];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
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
