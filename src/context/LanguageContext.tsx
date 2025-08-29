import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../locales/en';
import { hi } from '../locales/hi';

type Language = 'en' | 'hi';

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (language: Language) => void;
  translations: typeof en;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  const [translations, setTranslations] = useState(language === 'en' ? en : hi);

  useEffect(() => {
    setTranslations(language === 'en' ? en : hi);
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};