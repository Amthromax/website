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

// Core translation dictionary for UI elements
const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    'footer.privacy_center': 'Privacy Center',
    'footer.privacy_policy': 'Privacy Policy',
    'footer.terms_of_use': 'Terms of Use',
    'footer.cookie_policy': 'Cookie Policy',
    'footer.manage_cookies': 'Manage Cookies',
    'footer.all_rights_reserved': 'All rights reserved.',
    'nav.products': 'Products',
    'nav.research': 'Research',
    'nav.about': 'About',
    'nav.contact': 'Contact',
  },
  ja: {
    'footer.privacy_center': 'プライバシーセンター',
    'footer.privacy_policy': 'プライバシーポリシー',
    'footer.terms_of_use': '利用規約',
    'footer.cookie_policy': 'クッキーポリシー',
    'footer.manage_cookies': 'クッキー管理',
    'footer.all_rights_reserved': '全著作権所有。',
    'nav.products': '製品',
    'nav.research': '研究',
    'nav.about': '会社概要',
    'nav.contact': 'お問い合わせ',
  },
  de: {
    'footer.privacy_center': 'Datenschutz-Center',
    'footer.privacy_policy': 'Datenschutzerklärung',
    'footer.terms_of_use': 'Nutzungsbedingungen',
    'footer.cookie_policy': 'Cookie-Richtlinie',
    'footer.manage_cookies': 'Cookies verwalten',
    'footer.all_rights_reserved': 'Alle Rechte vorbehalten.',
    'nav.products': 'Produkte',
    'nav.research': 'Forschung',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
  },
  fr: {
    'footer.privacy_center': 'Centre de confidentialité',
    'footer.privacy_policy': 'Politique de confidentialité',
    'footer.terms_of_use': "Conditions d'utilisation",
    'footer.cookie_policy': 'Politique de cookies',
    'footer.manage_cookies': 'Gérer les cookies',
    'footer.all_rights_reserved': 'Tous droits réservés.',
    'nav.products': 'Produits',
    'nav.research': 'Recherche',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
  },
  ko: {
    'footer.privacy_center': '개인정보 보호 센터',
    'footer.privacy_policy': '개인정보 처리방침',
    'footer.terms_of_use': '이용약관',
    'footer.cookie_policy': '쿠키 정책',
    'footer.manage_cookies': '쿠키 관리',
    'footer.all_rights_reserved': '모든 권리 보유.',
    'nav.products': '제품',
    'nav.research': '연구',
    'nav.about': '회사 소개',
    'nav.contact': '문의하기',
  },
  it: {
    'footer.privacy_center': 'Centro Privacy',
    'footer.privacy_policy': 'Informativa sulla Privacy',
    'footer.terms_of_use': 'Termini di Utilizzo',
    'footer.cookie_policy': 'Informativa sui Cookie',
    'footer.manage_cookies': 'Gestisci Cookie',
    'footer.all_rights_reserved': 'Tutti i diritti riservati.',
    'nav.products': 'Prodotti',
    'nav.research': 'Ricerca',
    'nav.about': 'Chi siamo',
    'nav.contact': 'Contatti',
  },
  es: {
    'footer.privacy_center': 'Centro de Privacidad',
    'footer.privacy_policy': 'Política de Privacidad',
    'footer.terms_of_use': 'Términos de Uso',
    'footer.cookie_policy': 'Política de Cookies',
    'footer.manage_cookies': 'Gestionar Cookies',
    'footer.all_rights_reserved': 'Todos los derechos reservados.',
    'nav.products': 'Productos',
    'nav.research': 'Investigación',
    'nav.about': 'Sobre nosotros',
    'nav.contact': 'Contacto',
  },
  'zh-CN': {
    'footer.privacy_center': '隐私中心',
    'footer.privacy_policy': '隐私政策',
    'footer.terms_of_use': '使用条款',
    'footer.cookie_policy': 'Cookie 政策',
    'footer.manage_cookies': '管理 Cookie',
    'footer.all_rights_reserved': '保留所有权利。',
    'nav.products': '产品',
    'nav.research': '研究',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
  },
  'zh-TW': {
    'footer.privacy_center': '隱私中心',
    'footer.privacy_policy': '隱私政策',
    'footer.terms_of_use': '使用條款',
    'footer.cookie_policy': 'Cookie 政策',
    'footer.manage_cookies': '管理 Cookie',
    'footer.all_rights_reserved': '保留所有權利。',
    'nav.products': '產品',
    'nav.research': '研究',
    'nav.about': '關於我們',
    'nav.contact': '聯絡我們',
  },
  pt: {
    'footer.privacy_center': 'Centro de Privacidade',
    'footer.privacy_policy': 'Política de Privacidade',
    'footer.terms_of_use': 'Termos de Uso',
    'footer.cookie_policy': 'Política de Cookies',
    'footer.manage_cookies': 'Gerenciar Cookies',
    'footer.all_rights_reserved': 'Todos os direitos reservados.',
    'nav.products': 'Produtos',
    'nav.research': 'Pesquisa',
    'nav.about': 'Sobre nós',
    'nav.contact': 'Contato',
  },
  ru: {
    'footer.privacy_center': 'Центр конфиденциальности',
    'footer.privacy_policy': 'Политика конфиденциальности',
    'footer.terms_of_use': 'Условия использования',
    'footer.cookie_policy': 'Политика использования файлов cookie',
    'footer.manage_cookies': 'Управление файлами cookie',
    'footer.all_rights_reserved': 'Все права защищены.',
    'nav.products': 'Продукты',
    'nav.research': 'Исследования',
    'nav.about': 'О нас',
    'nav.contact': 'Контакты',
  },
  ar: {
    'footer.privacy_center': 'مركز الخصوصية',
    'footer.privacy_policy': 'سياسة الخصوصية',
    'footer.terms_of_use': 'شروط الاستخدام',
    'footer.cookie_policy': 'سياسة ملفات تعريف الارتباط',
    'footer.manage_cookies': 'إدارة ملفات تعريف الارتباط',
    'footer.all_rights_reserved': 'جميع الحقوق محفوظة.',
    'nav.products': 'المنتجات',
    'nav.research': 'الأبحاث',
    'nav.about': 'عن الشركة',
    'nav.contact': 'اتصل بنا',
  },
  hi: {
    'footer.privacy_center': 'गोपनीयता केंद्र',
    'footer.privacy_policy': 'गोपनीयता नीति',
    'footer.terms_of_use': 'उपयोग की शर्तें',
    'footer.cookie_policy': 'कुकी नीति',
    'footer.manage_cookies': 'कुकीज़ प्रबंधित करें',
    'footer.all_rights_reserved': 'सर्वाधिकार सुरक्षित।',
    'nav.products': 'उत्पाद',
    'nav.research': 'अनुसंधान',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क करें',
  },
};

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('amthromax-language', currentLanguage.code);
      document.documentElement.lang = currentLanguage.code;
      if (currentLanguage.dir) {
        document.documentElement.dir = currentLanguage.dir;
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  }, [currentLanguage]);

  const setLanguage = (code: string) => {
    const target = SUPPORTED_LANGUAGES.find((l) => l.code === code);
    if (target) {
      setCurrentLanguage(target);
    }
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[currentLanguage.code];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
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
