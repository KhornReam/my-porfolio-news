import { useState, useEffect, useRef } from "react";
import "../css/Contact.css";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaCheckCircle, FaPaperPlane, FaUser, FaCommentAlt, FaArrowRight, FaRobot } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";
import contactVideo from "../assets/262696.mp4";

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
        ? "រាមបានរៀន Frontend (HTML, CSS, JavaScript, TypeScript, React.js, Vue.js, SASS, Bootstrap), Backend (PHP, Laravel, Node.js, Express.js), Database (MySQL, PostgreSQL, MongoDB, SQL, Prisma) និង Tools (Git, GitHub, Docker, VS Code, Vite, npm, Composer, Figma)។ គាត់ចង់ពង្រឹង Backend, API និង Database បន្ថែម។"
        : "Ream has studied HTML, CSS, JavaScript, TypeScript, React.js, Vue.js, SASS, Bootstrap, PHP, Laravel, Node.js, Express.js, MySQL, PostgreSQL, MongoDB, SQL, Prisma, Git, GitHub, Docker, VS Code, Vite, npm, Composer, and Figma. He is especially focused on improving backend, API, database, and professional software development skills.";
    }
    if (/(project|portfolio|គម្រោង)/i.test(query)) {
      return isKhmer
        ? "គម្រោងសំខាន់ៗរួមមាន Business Selling System, Weather App, Achar Booking System, E-commerce Platform, Personal Finance Tracker និង Power BI Dashboard។ អ្នកអាចមើលព័ត៌មានលម្អិតនៅផ្នែក Projects។"
        : "Ream’s featured projects include a product-selling business system, Weather App, Achar Event Booking System, E-commerce Platform, Personal Finance Tracker, and Power BI Dashboard. See the Projects section for links.";
    }
    if (/(education|study|school|សិក្សា|ការអប់រំ)/i.test(query)) {
      return isKhmer
        ? "រាមបានសិក្សា 2 ឆ្នាំនៅ Passerelles Numériques Cambodia (PNC) ក្នុងវិស័យ Full-Stack Web Development និង Information Technology។ គាត់បានបញ្ចប់វិទ្យាល័យក្នុងឆ្នាំ 2024។"
        : "Ream completed two years of study at Passerelles Numériques Cambodia (PNC), focusing on Full-Stack Web Development and Information Technology. He completed high school in 2024.";
    }
    if (/(experience|workshop|journey|បទពិសោធន៍|ដំណើរ)/i.test(query)) {
      return isKhmer
        ? "បទពិសោធន៍របស់រាមរួមមាន Cybersecurity Workshop, mentoring យុវជនកម្ពុជា, Figma Workshop, technology competitions, company visits និង Canva/Cybersecurity training។"
        : "Ream’s additional experience includes a Cybersecurity Workshop, mentoring Cambodian youth, a Figma Design Workshop, technology competitions, company visits, and Canva/Cybersecurity training.";
    }
    if (/(about|who|ream|រាម|អំពី)/i.test(query)) {
      return isKhmer
        ? "ខន រាម ជាបុរសជនជាតិកម្ពុជា កើតថ្ងៃទី 10 ខែតុលា ឆ្នាំ 2006 និងមកពីខេត្តកំពង់ធំ។ គាត់ជាអ្នកអភិវឌ្ឍន៍ Full-Stack ដែលស្មោះត្រង់ មានទំនួលខុសត្រូវ គោរពអ្នកដទៃ និងចូលចិត្តបង្កើតផលិតផលឌីជីថលមានប្រយោជន៍។"
        : "Khorn Ream is a Cambodian man born on October 10, 2006, from Kampong Thom, Cambodia. He is a Full-Stack Developer who values honesty, responsibility, respect, teamwork, and building useful digital products.";
    }
    if (/(language|speak|english|khmer|ភាសា|អង់គ្លេស|ខ្មែរ)/i.test(query)) {
      return isKhmer
        ? "រាមអាចនិយាយភាសាខ្មែរ និងភាសាអង់គ្លេស។ គាត់អាចទំនាក់ទំនងជាមួយក្រុម និងរៀនបច្ចេកវិទ្យាថ្មីៗតាមឯកសារភាសាអង់គ្លេសបាន។"
        : "Ream speaks Khmer and English. He can communicate with teams, discuss technical ideas, and learn from English documentation and resources.";
    }
    if (/(facebook|social media|ហ្វេសប៊ុក)/i.test(query)) {
      return isKhmer
        ? "Facebook របស់រាមមានឈ្មោះ Khorn Ream។ សម្រាប់ទំនាក់ទំនងការងារ អ្នកអាចប្រើអ៊ីមែល ឬ LinkedIn នៅផ្នែក Contact។"
        : "Ream’s Facebook name is Khorn Ream. For professional contact, you can also use his email or LinkedIn listed in the Contact section.";
    }
    if (/(father|dad|បិតា|ឪពុក)/i.test(query)) {
      return isKhmer ? "ឪពុករបស់រាមមានឈ្មោះ Choung។" : "Ream’s father’s name is Choung.";
    }
    if (/(soft skill|personality|quality|honest|responsible|trust|respect|teamwork|គុណសម្បត្តិ|បុគ្គលិកលក្ខណៈ)/i.test(query)) {
      return isKhmer
        ? "រាមជាមនុស្សស្មោះត្រង់ គួរឱ្យទុកចិត្ត មានទំនួលខុសត្រូវ គោរពអ្នកដទៃ មានទំនាក់ទំនងល្អ ដោះស្រាយបញ្ហា ធ្វើការជាក្រុម និងអាចធ្វើការឯករាជ្យបាន។ គាត់ចូលចិត្តរៀន និងកែលម្អខ្លួនជានិច្ច។"
        : "Ream’s strengths include honesty, trustworthiness, responsibility, respect, communication, problem solving, teamwork, independent work, adaptability, willingness to learn, and continuous improvement.";
    }
    if (/(learn|learning style|practice|mistake|រៀន|ការរៀន|អនុវត្ត)/i.test(query)) {
      return isKhmer
        ? "រាមចូលចិត្តរៀនតាមការអនុវត្ត និងបង្កើតគម្រោងពិតប្រាកដ។ គាត់ស្រាវជ្រាវពេលមិនយល់ រៀនពីកំហុស ធ្វើការជាក្រុម និងអាចរៀនដោយខ្លួនឯងបាន។"
        : "Ream learns best by practicing and building real projects. He researches when he is unsure, learns from mistakes, asks questions when needed, and can work both independently and with a team.";
    }
    if (/(goal|career|future|want to become|career goal|គោលដៅ|អនាគត)/i.test(query)) {
      return isKhmer
        ? "គោលដៅរបស់រាមគឺក្លាយជាអ្នកអភិវឌ្ឍន៍ Full-Stack ដែលមានជំនាញខ្លាំងទាំង Frontend និង Backend។ គាត់ចង់ចាប់ផ្តើមតាមរយៈ internship ឬ junior/entry-level IT job ដើម្បីទទួលបានបទពិសោធន៍ពិត រៀនពីអ្នកអភិវឌ្ឍន៍ជាន់ខ្ពស់ និងធ្វើការលើគម្រោងដែលមានប្រយោជន៍។ នៅពេលអនាគត គាត់ចង់ក្លាយជា Senior Developer/Software Engineer ហើយអាចរីកចម្រើនទៅជា Technical Lead ឬ Software Architect។"
        : "Ream’s long-term goal is to become a skilled professional Full-Stack Developer with strong frontend and backend knowledge. He wants to begin through an internship, junior developer role, or entry-level IT job, gain real-world experience, learn from senior developers, and build secure, scalable, useful applications. In the future, he hopes to become a Senior Developer or Software Engineer, and eventually grow into a Technical Lead or Software Architect role.";
    }
    if (/(growth|improve himself|personal growth|leadership|time management|critical thinking|confidence|professional attitude|ការរីកចម្រើន|កែលម្អខ្លួន)/i.test(query)) {
      return isKhmer
        ? "រាមចង់កែលម្អខ្លួនទាំងការសរសេរកូដ និងការក្លាយជាអ្នកជំនាញល្អ។ គាត់ផ្តោតលើ Communication, Leadership, Responsibility, Problem Solving, Teamwork, Time Management, Critical Thinking, Creativity, Confidence និង Professional Attitude។ គំនិតរបស់គាត់គឺ៖ រៀនអ្វីថ្មី អនុវត្តជាប្រចាំ ទទួលបទពិសោធន៍ ជួយអ្នកដទៃ និងបន្តរីកចម្រើន។"
        : "Ream wants to improve not only his coding, but also himself as a professional. He is working on communication, leadership, responsibility, problem solving, teamwork, time management, critical thinking, creativity, confidence, and professional attitude. His mindset is: learn new things, practice consistently, gain experience, help others, and continue growing.";
    }
    if (/(help|mentor|teach|explain|ជួយ|បង្រៀន)/i.test(query)) {
      return isKhmer
        ? "ខ្ញុំអាចជួយពន្យល់ Programming ឱ្យសាមញ្ញ ជាជំហានៗ ផ្តល់ឧទាហរណ៍ កែសម្រួល English និងជួយរៀបចំ CV ឬសារសម្រាប់ការងារ។"
        : "I can explain programming simply and step by step, give practical examples, correct English, and help prepare professional CVs, interview answers, or job messages for Ream.";
    }
    if (/(girlfriend|relationship|previous girlfriend|សង្សារ|ទំនាក់ទំនងស្នេហា)/i.test(query)) {
      return isKhmer
        ? "រាមធ្លាប់មានសង្សារម្នាក់កាលពីមុន។ នេះជាព័ត៌មានផ្ទាល់ខ្លួន ហើយគួរគោរពភាពឯកជនរបស់គាត់។"
        : "Ream had one previous girlfriend. This is personal information, so please respect his privacy.";
    }
    if (/(age|old|birth|family|personality|kind|friendly|អាយុ|គ្រួសារ|បុគ្គលិកលក្ខណៈ)/i.test(query)) {
      return isKhmer
        ? "រាមមានអាយុ 20 ឆ្នាំ កើតនៅខេត្តកំពង់ធំ និងមកពីគ្រួសារដែលមានសមាជិក 2 នាក់។ គាត់មានចរិតរួសរាយរាក់ទាក់ ចូលចិត្តជួយអ្នកដទៃ និងធ្វើការជាក្រុម។"
        : "Ream is 20 years old, was born in Kampong Thom, and comes from a family of two. He is kind, friendly, collaborative, and enjoys helping people through technology.";
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
      ? "ខ្ញុំមិនចង់បង្កើតព័ត៌មានដែលមិនមានប្រភពច្បាស់ទេ។ ខ្ញុំអាចប្រាប់អ្នកអំពីព័ត៌មានផ្ទាល់ខ្លួន ជំនាញ គម្រោង ការសិក្សា បទពិសោធន៍ របៀបរៀន គោលដៅ និងឱកាសការងាររបស់រាម។"
      : "I don’t want to invent information. I can answer about Ream’s verified profile, skills, projects, education, experience, learning style, career goals, communication, and availability.";
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
      <video className="contact-video" autoPlay muted loop playsInline aria-hidden="true">
        <source src={contactVideo} type="video/mp4" />
      </video>
      <div className="contact-video-overlay" aria-hidden="true"></div>
      <div className="contact-grid-overlay" aria-hidden="true"></div>
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

        <div id="portfolio-chatbot" className="portfolio-chatbot" ref={(el) => (itemsRef.current[6] = el)}>
          <div className="chatbot-header">
            <div className="chatbot-avatar-wrap">
              <div className="chatbot-avatar" aria-hidden="true"><FaRobot /></div>
              <span className="chatbot-avatar-status"></span>
            </div>
            <div>
              <h3>{lang === "km" ? "សួរអំពីរាម" : "Ask Ream’s AI Assistant"}</h3>
              <p><span className="chatbot-status-dot"></span>{lang === "km" ? "ជំនួយការផតថលីអូ · Online" : "Portfolio assistant · Online"}</p>
            </div>
            <span className="chatbot-powered">AI PROFILE</span>
          </div>
          <div className="chatbot-intro">
            <FaRobot aria-hidden="true" />
            <span>{lang === "km" ? "ខ្ញុំអាចជួយប្រាប់អំពីរាម និងការងាររបស់គាត់បាន។" : "I can help you discover Ream’s story, skills, and work."}</span>
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
            {(lang === "km" ? ["ជំនាញរបស់រាម?", "គាត់និយាយភាសាអ្វី?", "តើរាមរៀនយ៉ាងដូចម្តេច?", "គោលដៅអាជីព?", "តើរាមចង់កែលម្អអ្វី?", "គម្រោងរបស់រាម?", "តើអាចជួលបានទេ?"] : ["What are his skills?", "What languages does he speak?", "How does Ream learn?", "What is his career goal?", "How does he want to grow?", "What projects has he built?", "Is he available?"]).map((question) => (
              <button key={question} type="button" onClick={() => sendChatMessage(question)}>{question}</button>
            ))}
          </div>
          <form className="chatbot-form" onSubmit={(event) => { event.preventDefault(); sendChatMessage(); }}>
            <input
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder={lang === "km" ? "សរសេរសំណួររបស់អ្នក..." : "Ask about Ream’s skills, story, or work..."}
              aria-label={lang === "km" ? "សំណួរ" : "Question about Ream"}
              maxLength={300}
            />
            <button type="submit" aria-label={lang === "km" ? "ផ្ញើ" : "Send question"}><FaPaperPlane /></button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;