import { useEffect, useState, useMemo } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaChevronDown,
  FaReact,
  FaNodeJs,
  FaDownload,
  FaRobot,
  FaArrowRight,
  FaCheckCircle,
  FaCheck,
  FaCopy,
  FaGraduationCap,
  FaPaperPlane,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { SiTypescript, SiLaravel } from "react-icons/si";
import profile from "../assets/ream1.png";
import heroVideo from "../assets/262696.mp4";
import cvFile from "../assets/Deep Purple Professional College Student CV Resume.pdf";
import "../css/Headers.css";
import { useLanguage } from "../contexts/LanguageContext";

function Headers() {
  const { t, lang } = useLanguage();
  const roles = useMemo(() => t.hero.roles || [], [t.hero.roles]);

  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText("reamkhorn12345@gmail.com");
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // Smooth backspacing typewriter effect
  useEffect(() => {
    if (!roles || roles.length === 0) return;
    const currentRole = roles[roleIndex % roles.length] || "";
    let timer;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 85);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  return (
    <header className="hero" id="home">
      {/* Background Video */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Modern Multi-Layer Gradient Overlays */}
      <div className="hero-video-overlay" aria-hidden="true"></div>
      <div className="hero-grid-overlay" aria-hidden="true"></div>
      <div className="hero-ambient-glow glow-cyan" aria-hidden="true"></div>
      <div className="hero-ambient-glow glow-indigo" aria-hidden="true"></div>

      <div className="hero-container">
        {/* LEFT SIDE: Hero Info & Value Proposition */}
        <div className="hero-left">
          {/* Status Badge */}
          <div className="hero-status-badge">
            <span className="status-ping">
              <span className="status-ping-dot"></span>
            </span>
            <span className="status-text">
              {t.hero.badge || t.hero.available || "Available for Opportunities"}
            </span>
          </div>

          {/* Heading */}
          <h1 className="hero-title">
            <span className="hero-greeting">{t.hero.greeting}</span>
            <span className="hero-name-group">
              <span className="name-first">{t.hero.nameFirst}</span>{" "}
              <span className="name-last text-gradient">{t.hero.nameLast}</span>
            </span>
          </h1>

          {/* Animated Dynamic Role with Terminal Cue */}
          <div className="hero-role-row">
            <span className="role-prefix">&gt;</span>
            <span className="role-text">{displayText}</span>
            <span className="role-cursor">|</span>
          </div>

          {/* Bio Description */}
          <p className="hero-description">{t.hero.description}</p>

          {/* Action CTAs */}
          <div className="hero-cta-group">
            <a
              href={cvFile}
              className="hero-btn btn-primary"
              download="Ream_Khorn_CV.pdf"
            >
              <FaDownload className="btn-icon" />
              <span>{t.hero.downloadCv || (lang === "km" ? "ទាញយក CV" : "Download CV")}</span>
            </a>

            <a
              href="#portfolio-chatbot"
              className="hero-btn btn-glass"
            >
              <FaRobot className="btn-icon" />
              <span>{t.hero.askAi || (lang === "km" ? "សួរជំនួយការ AI" : "Ask AI Assistant")}</span>
            </a>

            <a
              href="#projects"
              className="hero-btn btn-ghost"
            >
              <span>{t.hero.viewWork || (lang === "km" ? "មើលគម្រោង" : "View Work")}</span>
              <FaArrowRight className="btn-icon-arrow" />
            </a>
          </div>

          {/* Quick Metrics / Credential Strip */}
          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-val">{t.hero.stats?.expVal || "3+"}</span>
              <span className="metric-label">{t.hero.stats?.expLabel || "Years Dev"}</span>
            </div>
            <div className="metric-separator" aria-hidden="true"></div>
            <div className="metric-item">
              <span className="metric-val">{t.hero.stats?.projectsVal || "10+"}</span>
              <span className="metric-label">{t.hero.stats?.projectsLabel || "Projects"}</span>
            </div>
            <div className="metric-separator" aria-hidden="true"></div>
            <div className="metric-item">
              <span className="metric-val">PNC</span>
              <span className="metric-label">Passerelles Numériques</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="hero-socials">
            <span className="social-label">{lang === "km" ? "តំណភ្ជាប់ ៖" : "Connect :"}</span>
            <div className="social-links-row">
              <a
                href="https://github.com/Ream-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="social-btn"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/ream"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-btn"
              >
                <FaLinkedin />
              </a>
              <a
                href="#contact"
                aria-label="Email"
                className="social-btn"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Clean Executive Profile Card */}
        <div className="hero-right">
          <div className="showcase-wrapper">
            {/* Subtle Ambient Backlight */}
            <div className="showcase-glow" aria-hidden="true"></div>

            {/* Minimalist Profile Glass Card */}
            <div className="profile-glass-card">
              {/* Top Meta Row */}
              <div className="card-top-bar">
                <div className="card-top-status">
                  <span className="pulse-dot"></span>
                  <span className="status-label">
                    {lang === "km" ? "បើកចំហការងារ Full-Time" : "Available for Full-Time"}
                  </span>
                </div>
                <div className="card-location-tag">
                  <FaMapMarkerAlt className="location-pin-icon" />
                  <span>Phnom Penh, KH</span>
                </div>
              </div>

              {/* Clean 3D Studio Portrait Stage */}
              <div className="portrait-stage">
                <div className="avatar-3d-wrapper">
                  <div className="avatar-frame">
                    <img
                      src={profile}
                      alt="Ream Khorn"
                      className="avatar-img"
                    />
                    <div className="avatar-glass-lens" aria-hidden="true"></div>
                    <div
                      className="avatar-verified-badge"
                      title={lang === "km" ? "អ្នកអភិវឌ្ឍន៍ Full-Stack" : "Verified Full-Stack Engineer"}
                    >
                      <FaCheckCircle />
                    </div>
                  </div>
                  <div className="avatar-3d-glow" aria-hidden="true"></div>
                </div>
              </div>

              {/* Executive Identity */}
              <div className="profile-identity">
                <h3 className="profile-name">
                  {t.hero.nameFirst} {t.hero.nameLast}
                </h3>
                <p className="profile-role-subtitle">
                  {lang === "km" ? "វិស្វករសូហ្វវែរ Full-Stack" : "Full-Stack Software Engineer"}
                </p>
                <p className="profile-education">
                  <FaGraduationCap className="edu-icon" />
                  <span>Passerelles Numériques Cambodia (PNC)</span>
                </p>
              </div>

              {/* Clean 3-Column Credential Strip */}
              <div className="profile-stats-grid">
                <a href="#Experiences" className="profile-stat-cell">
                  <span className="stat-num">5</span>
                  <span className="stat-caption">
                    {lang === "km" ? "វិញ្ញាបនបត្រ" : "Certifications"}
                  </span>
                </a>
                <div className="stat-divider" aria-hidden="true"></div>
                <a href="#projects" className="profile-stat-cell">
                  <span className="stat-num">10+</span>
                  <span className="stat-caption">
                    {lang === "km" ? "គម្រោង" : "Projects"}
                  </span>
                </a>
                <div className="stat-divider" aria-hidden="true"></div>
                <a href="#contact" className="profile-stat-cell">
                  <span className="stat-num stat-highlight">
                    {lang === "km" ? "ពេញម៉ោង" : "Full-Time"}
                  </span>
                  <span className="stat-caption">
                    {lang === "km" ? "ត្រៀមខ្លួនរួចរាល់" : "Open to Work"}
                  </span>
                </a>
              </div>

              {/* Quiet Core Stack Row */}
              <div className="profile-stack-strip" aria-label="Core technologies">
                <span className="stack-item">
                  <FaReact className="stack-icon icon-react" /> React
                </span>
                <span className="stack-item">
                  <SiTypescript className="stack-icon icon-ts" /> TypeScript
                </span>
                <span className="stack-item">
                  <FaNodeJs className="stack-icon icon-node" /> Node.js
                </span>
                <span className="stack-item">
                  <SiLaravel className="stack-icon icon-laravel" /> Laravel
                </span>
              </div>

              {/* Clean Footer Action Bar */}
              <div className="card-footer-strip">
                <button
                  type="button"
                  className={`email-copy-pill ${copiedEmail ? "copied" : ""}`}
                  onClick={handleCopyEmail}
                  title="Click to copy email address"
                >
                  <FaEnvelope className="pill-icon" />
                  <span className="pill-text">
                    {copiedEmail
                      ? (lang === "km" ? "បានចម្លង Email!" : "Email Copied!")
                      : "reamkhorn12345@gmail.com"}
                  </span>
                  {copiedEmail ? <FaCheck className="pill-status" /> : <FaCopy className="pill-status" />}
                </button>

                <a href="#contact" className="quick-contact-link">
                  <FaPaperPlane className="contact-icon" />
                  <span>{lang === "km" ? "ទាក់ទង" : "Hire Me"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sleek Scroll Indicator */}
      <a href="#about" className="scroll-indicator" aria-label="Scroll to explore">
        <span className="scroll-pill">
          <span className="scroll-wheel"></span>
        </span>
        <span className="scroll-text">
          {lang === "km" ? "រំកិលចុះក្រោម" : "Scroll to explore"}
        </span>
        <FaChevronDown className="scroll-chevron" />
      </a>
    </header>
  );
}

export default Headers;
