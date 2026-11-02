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
  FaCode,
  FaCheckCircle,
  FaCheck,
  FaCopy,
  FaTerminal,
  FaGraduationCap,
  FaBolt,
  FaPaperPlane,
} from "react-icons/fa";
import { SiTypescript, SiLaravel, SiVuedotjs } from "react-icons/si";
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

  // Interactive profile card states
  const [activeTab, setActiveTab] = useState("ts"); // 'ts' | 'stack' | 'status'
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const codeSnippets = {
    ts: `const developer: Engineer = {
  name: "Ream Khorn",
  role: "Full-Stack Developer",
  education: "Passerelles numériques (PNC)",
  status: "Open for Full-Time Job 🚀",
  openFor: ["Full-Time Software", "Web Programming"]
};`,
    stack: `{
  "frontend": ["React 19", "TypeScript", "Tailwind"],
  "backend": ["Node.js", "Express", "Laravel"],
  "database": ["PostgreSQL", "MySQL", "MongoDB"],
  "tools": ["Git", "Docker", "Figma", "Vite"]
}`,
    status: `$ npx ream-khorn --status
✔ Developer: Ream Khorn
✔ Availability: Open for Full-Time Software & Web Programming
✔ Location: Phnom Penh, Cambodia (ICT · UTC+7)
✔ Contact: reamkhorn12345@gmail.com
$ _`,
  };

  const handleCopyCode = () => {
    const text = codeSnippets[activeTab];
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

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

        {/* RIGHT SIDE: Modern Glassmorphic Showcase */}
        <div className="hero-right">
          <div className="showcase-wrapper">
            {/* Ambient Card Backlight Glow */}
            <div className="showcase-glow" aria-hidden="true"></div>

            {/* Main Profile Glass Card */}
            <div className="profile-glass-card">
              {/* Card Top Status Bar */}
              <div className="card-top-bar">
                <div className="card-top-status">
                  <span className="pulse-dot"></span>
                  <span className="status-label">
                    {lang === "km" ? "បើកចំហការងារ Full-Time" : "Open for Full-Time Job"}
                  </span>
                </div>
                <div className="card-location-tag">
                  <span className="flag-icon">🇰🇭</span>
                  <span>Phnom Penh</span>
                </div>
              </div>

              {/* Avatar Frame with Dynamic Floating Tech Chips */}
              <div className="avatar-constellation">
                {/* Tech Chips */}
                <div className="tech-chip chip-react" title="React 19 & Next.js">
                  <FaReact className="chip-icon" />
                  <span>React 19</span>
                </div>
                <div className="tech-chip chip-ts" title="TypeScript">
                  <SiTypescript className="chip-icon" />
                  <span>TypeScript</span>
                </div>
                <div className="tech-chip chip-node" title="Node.js & Express">
                  <FaNodeJs className="chip-icon" />
                  <span>Node.js</span>
                </div>
                <div className="tech-chip chip-laravel" title="Laravel & PHP">
                  <SiLaravel className="chip-icon" />
                  <span>Laravel</span>
                </div>

                {/* Portrait Frame */}
                <div className="avatar-frame">
                  <div className="avatar-ring-glow"></div>
                  <img
                    src={profile}
                    alt="Ream Khorn"
                    className="avatar-img"
                  />
                  <div className="avatar-verified-badge" title="Verified Full-Stack Developer">
                    <FaCheckCircle />
                  </div>
                </div>
              </div>

              {/* Profile Details & Credentials */}
              <div className="profile-identity">
                <div className="profile-name-row">
                  <h3 className="profile-name">
                    {t.hero.nameFirst} {t.hero.nameLast}
                  </h3>
                  <span className="profile-badge-pill">Full-Stack</span>
                </div>
                <p className="profile-education">
                  <FaGraduationCap className="edu-icon" /> Passerelles numériques (PNC)
                </p>
                <div className="profile-focus-row">
                  <span className="focus-pill"><FaBolt className="focus-icon" /> Modern UI/UX</span>
                  <span className="focus-pill">Scalable APIs</span>
                  <span className="focus-pill">Clean Code</span>
                </div>
              </div>

              {/* Interactive Code & Stack Studio */}
              <div className="hero-terminal">
                {/* Terminal Header with Tabs & Copy Button */}
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="t-dot dot-red"></span>
                    <span className="t-dot dot-yellow"></span>
                    <span className="t-dot dot-green"></span>
                  </div>

                  <div className="terminal-tabs">
                    <button
                      type="button"
                      className={`t-tab ${activeTab === "ts" ? "active" : ""}`}
                      onClick={() => setActiveTab("ts")}
                    >
                      <FaCode className="tab-icon" /> developer.ts
                    </button>
                    <button
                      type="button"
                      className={`t-tab ${activeTab === "stack" ? "active" : ""}`}
                      onClick={() => setActiveTab("stack")}
                    >
                      stack.json
                    </button>
                    <button
                      type="button"
                      className={`t-tab ${activeTab === "status" ? "active" : ""}`}
                      onClick={() => setActiveTab("status")}
                    >
                      <FaTerminal className="tab-icon" /> status.sh
                    </button>
                  </div>

                  <button
                    type="button"
                    className={`terminal-copy-btn ${copiedCode ? "copied" : ""}`}
                    onClick={handleCopyCode}
                    title="Copy snippet"
                    aria-label="Copy snippet"
                  >
                    {copiedCode ? <FaCheck /> : <FaCopy />}
                    <span className="copy-label">{copiedCode ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                {/* Line-by-Line Formatted Code with Syntax Highlighting */}
                <div className="terminal-body" tabIndex={0} role="region" aria-label="Developer Code Snippet">
                  {activeTab === "ts" && (
                    <div className="code-block">
                      <div className="code-line">
                        <span className="line-num">1</span>
                        <span className="code-text"><span className="syn-k">const</span> <span className="syn-d">developer</span>: <span className="syn-t">Engineer</span> = &#123;</span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">2</span>
                        <span className="code-text indent-1"><span className="syn-p">name</span>: <span className="syn-s">"Ream Khorn"</span>,</span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">3</span>
                        <span className="code-text indent-1"><span className="syn-p">role</span>: <span className="syn-s">"Full-Stack Developer"</span>,</span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">4</span>
                        <span className="code-text indent-1"><span className="syn-p">education</span>: <span className="syn-s">"Passerelles numériques (PNC)"</span>,</span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">5</span>
                        <span className="code-text indent-1"><span className="syn-p">status</span>: <span className="syn-s">"Open for Full-Time Job 🚀"</span>,</span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">6</span>
                        <span className="code-text indent-1"><span className="syn-p">openFor</span>: [<span className="syn-s">"Full-Time Software"</span>, <span className="syn-s">"Web Programming"</span>]</span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">7</span>
                        <span className="code-text">&#125;;</span>
                      </div>
                    </div>
                  )}

                  {activeTab === "stack" && (
                    <div className="code-block">
                      <div className="code-line">
                        <span className="line-num">1</span>
                        <span className="code-text">&#123;</span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">2</span>
                        <span className="code-text indent-1"><span className="syn-p">"frontend"</span>: [<span className="syn-s">"React 19"</span>, <span className="syn-s">"TypeScript"</span>, <span className="syn-s">"Tailwind"</span>],</span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">3</span>
                        <span className="code-text indent-1"><span className="syn-p">"backend"</span>: [<span className="syn-s">"Node.js"</span>, <span className="syn-s">"Express"</span>, <span className="syn-s">"Laravel"</span>],</span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">4</span>
                        <span className="code-text indent-1"><span className="syn-p">"database"</span>: [<span className="syn-s">"PostgreSQL"</span>, <span className="syn-s">"MySQL"</span>, <span className="syn-s">"MongoDB"</span>],</span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">5</span>
                        <span className="code-text indent-1"><span className="syn-p">"mindset"</span>: <span className="syn-s">"Clean code & high performance"</span></span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">6</span>
                        <span className="code-text">&#125;</span>
                      </div>
                    </div>
                  )}

                  {activeTab === "status" && (
                    <div className="code-block">
                      <div className="code-line">
                        <span className="line-num">1</span>
                        <span className="code-text"><span className="syn-prompt">$</span> <span className="syn-cmd">npx ream-khorn</span> <span className="syn-flag">--status</span></span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">2</span>
                        <span className="code-text syn-success">✔ Developer: <span className="syn-white">Ream Khorn</span></span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">3</span>
                        <span className="code-text syn-success">✔ Availability: <span className="syn-white">Open for Full-Time Software & Web Programming</span></span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">4</span>
                        <span className="code-text syn-success">✔ Location: <span className="syn-white">Phnom Penh, Cambodia (UTC+7)</span></span>
                      </div>
                      <div className="code-line">
                        <span className="line-num">5</span>
                        <span className="code-text"><span className="syn-prompt">$</span> <span className="cursor-blink">█</span></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Strip with One-Click Email Copy & Quick Contact */}
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
