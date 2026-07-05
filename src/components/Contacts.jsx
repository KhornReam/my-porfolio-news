import { useState, useEffect, useRef } from "react";
import "../css/Contact.css";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaCheckCircle, FaPaperPlane, FaUser, FaCommentAlt, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

function Contact() {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const sanitize = (str) => {
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+=/gi, "")
      .trim();
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 1000) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = sanitize(formData.name);
    const email = formData.email.trim();
    const message = sanitize(formData.message);

    if (!name || !email || !message) {
      setStatus(t.contacts.errors.fillAll);
      setStatusType("error");
      return;
    }
    if (name.length < 2) {
      setStatus(t.contacts.errors.nameShort);
      setStatusType("error");
      return;
    }
    if (!isValidEmail(email)) {
      setStatus(t.contacts.errors.invalidEmail);
      setStatusType("error");
      return;
    }
    if (message.length < 10) {
      setStatus(t.contacts.errors.messageShort);
      setStatusType("error");
      return;
    }

    setStatus(t.contacts.errors.opening);
    setStatusType("success");

    const mailtoLink = `mailto:reamkhorn12345@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
  };

  const openEmailDirect = () => {
    window.location.href = "mailto:reamkhorn12345@gmail.com";
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  const contacts = [
    {
      id: 1,
      icon: <FaEnvelope />,
      label: "Email",
      value: "reamkhorn12345@gmail.com",
      href: "mailto:reamkhorn12345@gmail.com",
      copy: "reamkhorn12345@gmail.com",
      more: "Tap to copy email or press the button to open your mail app.",
      color: "#60a5fa",
    },
    {
      id: 2,
      icon: <FaPhone />,
      label: "Phone",
      value: "+855 863 393 350",
      href: "tel:+855863393350",
      copy: "+855 863 393 350",
      more: "Tap to copy the number. You can call or message me anytime.",
      color: "#34d399",
    },
    {
      id: 3,
      icon: <FaLinkedin />,
      label: "LinkedIn",
      value: "linkedin.com/in/ream",
      href: "https://linkedin.com/in/ream",
      more: "Visit my LinkedIn to see my experience and connect.",
      color: "#0ea5e9",
    },
    {
      id: 4,
      icon: <FaGithub />,
      label: "GitHub",
      value: "github.com/Ream111222333",
      href: "https://github.com/Ream-dev",
      more: "See my code and projects on GitHub.",
      color: "#a78bfa",
    },
  ];

  const [expandedContact, setExpandedContact] = useState(null);

  const toggleContact = (id) => {
    setExpandedContact((prev) => (prev === id ? null : id));
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <div className="header-badge">
            <span className="badge-text">{t.contacts.badge}</span>
          </div>
          <h2 className="section-title">
            <span className="title-main">{t.contacts.titleMain}</span>
            <span className="title-accent">{t.contacts.titleAccent}</span>
          </h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">{t.contacts.subtitle}</p>
        </div>

        {/* Main Content Grid */}
        <div className="contact-grid">
          {/* Contact Info Cards */}
          <div className="contact-info" ref={(el) => (itemsRef.current[0] = el)}>
            <h3 className="contact-subtitle">{t.contacts.infoTitle}</h3>
            <div className="info-grid">
              {t.contacts.contacts.map((c, i) => {
                const isExpanded = expandedContact === i;
                const isExternal = contacts[i].href && contacts[i].href.startsWith("http");
                return (
                  <a
                    key={i}
                    href={contacts[i].href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={`info-card ${isExpanded ? "expanded" : ""}`}
                    style={{ '--contact-color': contacts[i].color, '--delay': `${i * 0.1}s` }}
                    onClick={(e) => {
                      if (contacts[i].copy) {
                        e.preventDefault();
                        copyToClipboard(contacts[i].copy);
                      }
                    }}
                    ref={(el) => (itemsRef.current[i + 1] = el)}
                  >
                    <div className="info-glow"></div>
                    <div className="info-background"></div>
                    <div className="info-icon">
                      {contacts[i].icon}
                    </div>
                    <div className="info-details">
                      <div className="info-header">
                        <div>
                          <span className="info-label">{c.label}</span>
                          <span className="info-value">{c.value}</span>
                        </div>
                        <button
                          type="button"
                          className="info-toggle"
                          onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            toggleContact(i);
                          }}
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? t.contacts.hide : t.contacts.show}
                        </button>
                      </div>
                      {isExpanded && c.more && <div className="info-more">{c.more}</div>}
                    </div>
                    <div className="info-border"></div>
                  </a>
                );
              })}

              {/* Direct Email Button */}
              <button className="direct-email-btn" onClick={openEmailDirect}>
                <div className="direct-email-icon">
                  <FaEnvelope />
                </div>
                <div className="direct-email-text">
                  <span className="direct-email-label">{lang === "km" ? "ផ្ញើអ៊ីមែលផ្ទាល់" : "Send Direct Email"}</span>
                  <span className="direct-email-value">reamkhorn12345@gmail.com</span>
                </div>
                <FaArrowRight className="direct-email-arrow" />
                <div className="direct-email-glow"></div>
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper" ref={(el) => (itemsRef.current[itemsRef.current.length] = el)}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <div className="form-header-icon">
                  <FaEnvelope />
                </div>
                <h3 className="form-title">{t.contacts.formTitle}</h3>
                <p className="form-subtitle">{t.contacts.formSubtitle}</p>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <FaUser className="form-label-icon" /> {t.contacts.nameLabel}
                  </label>
                  <div className="input-wrapper">
                    <FaUser className="input-field-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder={t.contacts.namePlaceholder}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <span className="input-border"></span>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <FaEnvelope className="form-label-icon" /> {t.contacts.emailLabel}
                  </label>
                  <div className="input-wrapper">
                    <FaEnvelope className="input-field-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={t.contacts.emailPlaceholder}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <span className="input-border"></span>
                  </div>
                </div>
                <div className="form-group full-width">
                  <label htmlFor="message" className="form-label">
                    <FaCommentAlt className="form-label-icon" /> {t.contacts.messageLabel}
                  </label>
                  <div className="input-wrapper">
                    <FaCommentAlt className="input-field-icon input-textarea-icon" />
                    <textarea
                      id="message"
                      name="message"
                      placeholder={t.contacts.messagePlaceholder}
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                    <span className="input-border"></span>
                  </div>
                </div>
              </div>
              <button type="submit" className="form-submit">
                <FaPaperPlane /> {t.contacts.sendBtn}
                <span className="submit-glow"></span>
              </button>
              {status && (
                <p className={`form-status ${statusType}`}>
                  {statusType === "success" && <FaCheckCircle />} {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;