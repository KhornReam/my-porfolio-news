import { createContext, useContext, useState, useEffect } from "react";
import translations from "../locales/i18n";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    // Try to load saved language preference
    const saved = localStorage.getItem("lang");
    return saved === "km" ? "km" : "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    // Add language attribute to html element for styling
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "km" : "en"));
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
