import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaHome,
  FaUser,
  FaLaptopCode,
  FaFolderOpen,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaCode,
  FaChevronDown,
  FaCheck
} from "react-icons/fa";

import "../css/Nabar.css";
import { useLanguage } from "../contexts/LanguageContext";
import flagCambodia from "../assets/flag-cambodia.svg";
import flagUk from "../assets/flag-uk.png";

function Navbar() {
  const { lang, setLang, toggleLang, t } = useLanguage();
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const navItems = useMemo(
    () => [
      { href: "#home", label: t.nav.home, icon: <FaHome /> },
      { href: "#about", label: t.nav.about, icon: <FaUser /> },
      { href: "#Experiences", label: t.nav.experiences, icon: <FaLaptopCode /> },
      { href: "#projects", label: t.nav.projects, icon: <FaFolderOpen /> }
    ],
    [t]
  );

  useEffect(() => {
    const body = document.body;
    if (isDark) {
      body.classList.remove("light-mode");
    } else {
      body.classList.add("light-mode");
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const offset = window.scrollY + window.innerHeight / 3;
      const currentSection = navItems.reduce((current, item) => {
        const section = document.querySelector(item.href);
        if (section && section.offsetTop <= offset) {
          return item.href;
        }
        return current;
      }, "#home");
      setActiveLink(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const handleNavClick = (href) => {
    setActiveLink(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <a href="#home" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
          <span className="logo-icon"><FaCode /></span>
          <span className="logo-text">{t.nav.logoFirst}</span>
          <span className="logo-accent">{t.nav.logoLast}</span>
        </a>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${activeLink === item.href ? "active" : ""}`}
              onClick={() => handleNavClick(item.href)}
            >
              <span className="nav-dot"></span> {item.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="nav-actions">
          <button
            className="theme-toggle"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {isDark ? <FaMoon /> : <FaSun />}
          </button>          {/* Language Dropdown Selector */}
          <LanguageDropdown
            lang={lang}
            setLang={setLang}
            flagCambodia={flagCambodia}
            flagUk={flagUk}
          />

          <a href="#contact" className="btn-nav" onClick={() => setIsMobileMenuOpen(false)}>
            <FaEnvelope /> <span>{t.nav.contact}</span>
          </a>

          <button
            className="mobile-menu-toggle"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div className="mobile-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">{t.nav.logoFirst} {t.nav.logoLast}</span>
          <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
            <FaTimes />
          </button>
        </div>
        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className="mobile-nav-link"
            style={{ animationDelay: `${i * 0.08}s` }}
            onClick={() => handleNavClick(item.href)}
          >
            <span className="mobile-link-icon">{item.icon}</span>
            <span className="mobile-link-label">{item.label}</span>
          </a>
        ))}

        {/* Contact Button at bottom of mobile menu */}
        <div className="mobile-menu-footer">
          <a
            href="#contact"
            className="mobile-contact-btn"
            onClick={() => handleNavClick("#contact")}
          >
            <FaEnvelope /> <span>{t.nav.contact}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ===== Language Dropdown Component ===== */
function LanguageDropdown({ lang, setLang, flagCambodia, flagUk }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    {
      code: "km",
      flag: flagCambodia,
      label: "ភាសាខ្មែរ",
      sub: "Khmer",
    },
    {
      code: "en",
      flag: flagUk,
      label: "English",
      sub: "អង់គ្លេស",
    },
  ];

  const current = options.find((o) => o.code === lang);

  return (
    <div className="lang-dropdown" ref={ref}>
      <button
        className="lang-selector-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <img src={current.flag} alt={current.label} className="flag-img" />
        <FaChevronDown className={`chevron ${open ? "open" : ""}`} />
      </button>

      <div className={`lang-menu ${open ? "open" : ""}`} role="listbox">
        {options.map((opt) => {
          const isActive = lang === opt.code;
          return (
            <button
              key={opt.code}
              className={`lang-option ${isActive ? "active" : ""}`}
              onClick={() => {
                if (!isActive) setLang(opt.code);
                setOpen(false);
              }}
              role="option"
              aria-selected={isActive}
            >
              <img src={opt.flag} alt={opt.label} className="flag-img" />
              <span className="lang-option-text">
                <span className="lang-name">{opt.label}</span>
                <span className="lang-sub">{opt.sub}</span>
              </span>
              {isActive && <FaCheck className="lang-check" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Navbar;
