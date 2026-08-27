import { useState, useEffect, useRef } from "react";
import "../css/Contact.css";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaCheckCircle, FaPaperPlane, FaUser, FaCommentAlt, FaArrowRight, FaRobot } from "react-icons/fa";
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
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: lang === "km"
        ? "សួស្តី! ខ្ញុំជាជំនួយការរបស់រាម។ សួរខ្ញុំអំពីជំនាញ គម្រោង ការសិក្សា ឬបទពិសោធន៍របស់គាត់បាន។"
        : "Hi! I’m Ream’s portfolio assistant. Ask me about his skills, projects, education, experience, or availability.",
    },
  ]);

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

  const getBotReply = (question) => {
    const query = question.toLowerCase();
    const isKhmer = lang === "km";

    if (/(hello|hi|hey|សួស្តី)/i.test(query)) {
      return isKhmer ? "សួស្តី! តើអ្នកចង់ដឹងអ្វីអំពីរាម?" : "Hello! What would you like to know about Ream?";
    }
    if (/(skill|technology|stack|tech|ជំនាញ|បច្ចេកវិទ្យា)/i.test(query)) {
      return isKhmer
        ? "រាមមានជំនាញ Frontend (React, Vue, JavaScript, TypeScript, HTML, CSS), Backend (Node.js, Laravel, PHP, Python), Database (MySQL, MongoDB, Redis) និង tools ដូចជា Git, GitHub, AWS, Figma និង Power BI។"
        : "Ream works with React, Vue, JavaScript, TypeScript, HTML, CSS, Node.js, Laravel, PHP, Python, MySQL, MongoDB, Redis, Git, GitHub, AWS, Figma, and Power BI.";
    }
    if (/(project|portfolio|គម្រោង)/i.test(query)) {
      return isKhmer
        ? "គម្រោងសំខាន់ៗរួមមាន Business Selling System, Weather App, Achar Booking System, E-commerce Platform, Personal Finance Tracker និង Power BI Dashboard។ អ្នកអាចមើលព័ត៌មានលម្អិតនៅផ្នែក Projects។"
        : "Ream’s featured projects include a product-selling business system, Weather App, Achar Event Booking System, E-commerce Platform, Personal Finance Tracker, and Power BI Dashboard. See the Projects section for links.";
    }
    if (/(education|study|school|សិក្សា|ការអប់រំ)/i.test(query)) {
      return isKhmer
        ? "រាមកំពុងសិក្សា Full-Stack Web Development នៅ Passerelles Numériques Cambodia (2026–Present) ហើយបានបញ្ចប់វិទ្យាល័យក្នុងឆ្នាំ 2024។"
        : "Ream is currently studying Full-Stack Web Development at Passerelles Numériques Cambodia (2026–Present). He completed high school in 2024.";
    }
    if (/(experience|workshop|journey|បទពិសោធន៍|ដំណើរ)/i.test(query)) {
      return isKhmer
        ? "បទពិសោធន៍របស់រាមរួមមាន Cybersecurity Workshop, mentoring យុវជនកម្ពុជា, Figma Workshop, technology competitions, company visits និង Canva/Cybersecurity training។"
        : "Ream’s additional experience includes a Cybersecurity Workshop, mentoring Cambodian youth, a Figma Design Workshop, technology competitions, company visits, and Canva/Cybersecurity training.";
    }
    if (/(about|who|ream|រាម|អំពី)/i.test(query)) {
      return isKhmer
        ? "រាម ខន ជាអ្នកអភិវឌ្ឍន៍ Full-Stack អាយុ 20 ឆ្នាំ មកពីខេត្តកំពង់ធំ ប្រទេសកម្ពុជា។ គាត់ជាមនុស្សរួសរាយរាក់ទាក់ និងចូលចិត្តប្រើបច្ចេកវិទ្យាដើម្បីជួយអ្នកដទៃ។"
        : "Ream Khorn is a 20-year-old Full-Stack Developer from Kampong Thom, Cambodia. He is friendly, passionate about technology, and enjoys building useful digital experiences.";
    }
    if (/(available|hire|job|intern|work|ការងារ|ជួល)/i.test(query)) {
      return isKhmer
        ? "បាទ/ចាស រាមកំពុងស្វែងរកឱកាសការងារ និង internship ដើម្បីបង្កើនបទពិសោធន៍។ អ្នកអាចផ្ញើសារតាម form ឬទាក់ទងតាម reamkhorn12345@gmail.com។"
        : "Yes. Ream is currently open to job and internship opportunities. You can use the form here or email him at reamkhorn12345@gmail.com.";
    }
    if (/(contact|email|phone|ទំនាក់ទំនង|អ៊ីមែល|ទូរស័ព្ទ)/i.test(query)) {
      return isKhmer
        ? "អ្នកអាចទាក់ទងរាមតាមអ៊ីមែល reamkhorn12345@gmail.com ឬទូរស័ព្ទ +855 863 393 350។ អ្នកក៏អាចរកគាត់នៅ LinkedIn និង GitHub បាន។"
        : "You can contact Ream at reamkhorn12345@gmail.com or +855 863 393 350. He is also available through LinkedIn and GitHub on this page.";
    }

    return isKhmer
      ? "ខ្ញុំអាចប្រាប់អ្នកអំពីរាម ជំនាញ គម្រោង ការសិក្សា បទពិសោធន៍ និងឱកាសការងារ។ សាកសួរ ‘តើរាមចេះអ្វី?’ ឬ ‘តើរាមមានគម្រោងអ្វីខ្លះ?’"
      : "I can tell you about Ream, his skills, projects, education, experience, and availability. Try asking “What are Ream’s skills?” or “What projects has he built?”";
  };

  const sendChatMessage = (message = chatInput) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setChatMessages((previous) => [
      ...previous,
      { id: Date.now(), sender: "user", text: trimmedMessage },
      { id: Date.now() + 1, sender: "bot", text: getBotReply(trimmedMessage) },
    ]);
    setChatInput("");
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

            <div className="portfolio-chatbot" ref={(el) => (itemsRef.current[6] = el)}>
              <div className="chatbot-header">
                <div className="chatbot-avatar"><FaRobot /></div>
                <div>
                  <h3>{lang === "km" ? "សួរអំពីរាម" : "Ask about Ream"}</h3>
                  <p><span className="chatbot-status-dot"></span>{lang === "km" ? "ជំនួយការផតថលីអូ" : "Portfolio assistant"}</p>
                </div>
              </div>
              <div className="chatbot-messages" aria-live="polite">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`chat-message ${message.sender}`}>
                    {message.sender === "bot" && <FaRobot className="chat-message-icon" />}
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
              <div className="chatbot-quick-actions">
                {(lang === "km" ? ["ជំនាញរបស់រាម?", "គម្រោងរបស់រាម?", "តើអាចជួលបានទេ?"] : ["What are his skills?", "What projects has he built?", "Is he available?"]).map((question) => (
                  <button key={question} type="button" onClick={() => sendChatMessage(question)}>{question}</button>
                ))}
              </div>
              <form className="chatbot-form" onSubmit={(event) => { event.preventDefault(); sendChatMessage(); }}>
                <input
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder={lang === "km" ? "សរសេរសំណួររបស់អ្នក..." : "Ask me anything about Ream..."}
                  aria-label={lang === "km" ? "សំណួរ" : "Question about Ream"}
                  maxLength={300}
                />
                <button type="submit" aria-label={lang === "km" ? "ផ្ញើ" : "Send question"}><FaPaperPlane /></button>
              </form>
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