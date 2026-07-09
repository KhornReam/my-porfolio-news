import { useState, useEffect } from "react";
import "../css/Footer.css";
import {
  FaGithub,
  FaArrowUp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaLinkedin,
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaHeart,
  FaCode,
  FaTelegram,
  FaChevronRight,
} from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { useLanguage } from "../contexts/LanguageContext";

function Footer() {
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(t.footer.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const links = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.experiences, href: "#Experiences" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const tech = [
    { icon: <FaReact />, label: "React", color: "#61dafb" },
    { icon: <SiTypescript />, label: "TypeScript", color: "#3178c6" },
    { icon: <FaNodeJs />, label: "Node.js", color: "#68a063" },
    { icon: <FaJs />, label: "JavaScript", color: "#f7df1e" },
    { icon: <FaHtml5 />, label: "HTML5", color: "#e34f26" },
    { icon: <FaCss3Alt />, label: "CSS3", color: "#1572b6" },
  ];

  const socials = [
    { icon: <FaGithub />, label: "GitHub", href: "https://github.com/Ream-dev", color: "#61dafb" },
    { icon: <FaLinkedin />, label: "LinkedIn", href: "https://linkedin.com/in/ream", color: "#0a66c2" },
    { icon: <FaEnvelope />, label: "Email", href: "mailto:reamkhorn12345@gmail.com", color: "#3b82f6" },
    { icon: <FaTelegram />, label: "Telegram", href: "https://t.me/ream", color: "#0088cc" },
  ];

  // Duplicate tech for seamless marquee
  const marqueeTech = [...tech, ...tech, ...tech];

  return (
    <footer className="footer">
      {/* Background decorative elements */}
      <div className="footer-bg-glow"></div>
      <div className="footer-bg-pattern"></div>
      <div className="footer-bg-grid"></div>
      <div className="footer-bg-orb footer-orb-1"></div>
      <div className="footer-bg-orb footer-orb-2"></div>

      {/* Top accent line */}
      <div className="footer-top-line"></div>

      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-col footer-brand-col">
          <div className="footer-col-inner">
            <div className="footer-logo">
              <div className="logo-mark-wrap">
                <span className="logo-mark">RK</span>
                <div className="logo-ring"></div>
              </div>
              <div className="logo-text-wrap">
                <span className="logo-name">{t.nav.logoFirst} {t.nav.logoLast}</span>
                <span className="logo-tagline">{t.footer.location}</span>
              </div>
            </div>
            <p className="footer-desc">{t.footer.desc}</p>
            <div className="footer-meta">
              <span className="meta-item">
                <FaMapMarkerAlt className="meta-icon" /> {t.footer.location}
              </span>
              <button className="meta-item meta-email-btn" onClick={copyEmail} title="Click to copy">
                <FaEnvelope className="meta-icon" /> 
                <span>{emailCopied ? "Copied!" : t.footer.email}</span>
              </button>
            </div>
            <span className="footer-badge">
              <span className="pulse-dot"></span> {t.footer.available}
            </span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col footer-nav-col">
          <div className="footer-col-inner">
            <h4 className="footer-col-title">
              <span className="title-accent"></span>
              {t.footer.quickLinks}
            </h4>
            <ul className="footer-links">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>
                    <span className="link-icon"><FaChevronRight /></span>
                    <span className="link-text">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack Column */}
        <div className="footer-col footer-tech-col">
          <div className="footer-col-inner">
            <h4 className="footer-col-title">
              <span className="title-accent"></span>
              {t.footer.techStack}
            </h4>
            <div className="tech-pills">
              {tech.map((tch) => (
                <span key={tch.label} className="tech-pill" style={{ "--pill-color": tch.color }}>
                  {tch.icon} {tch.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Connect Column */}
        <div className="footer-col footer-connect-col">
          <div className="footer-col-inner">
            <h4 className="footer-col-title">
              <span className="title-accent"></span>
              {t.footer.connect}
            </h4>
            <div className="social-grid">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="social-link-card"
                  style={{ "--social-color": s.color }}
                >
                  <span className="social-icon">{s.icon}</span>
                  <span className="social-label">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Marquee Row */}
      <div className="footer-marquee-wrapper">
        <div className="footer-marquee-track">
          <div className="footer-marquee-content">
            {marqueeTech.map((tch, i) => (
              <span key={i} className="marquee-pill" style={{ "--pill-color": tch.color }}>
                {tch.icon} {tch.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} {t.footer.copyright}
          <span className="footer-made-with">
            {" "}— Made with <FaHeart className="heart-icon" /> & <FaCode className="code-icon" />
          </span>
        </p>

        {/* Back to Top with progress ring */}
        <button
          className={`back-to-top ${showScrollTop ? "visible" : ""}`}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <svg className="progress-ring" viewBox="0 0 36 36">
            <defs>
              <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <circle
              className="progress-bg"
              cx="18" cy="18" r="16"
              fill="none"
              strokeWidth="2"
            />
            <circle
              className="progress-fill"
              cx="18" cy="18" r="16"
              fill="none"
              strokeWidth="2"
              stroke="url(#scrollGradient)"
              strokeDasharray={`${2 * Math.PI * 16}`}
              strokeDashoffset={`${2 * Math.PI * 16 * (1 - scrollProgress)}`}
              transform="rotate(-90, 18, 18)"
            />
          </svg>
          <FaArrowUp className="arrow-icon" />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
