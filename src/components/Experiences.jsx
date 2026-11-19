import { useEffect, useState } from "react";
import {
  FaShieldAlt,
  FaUsers,
  FaFigma,
  FaTrophy,
  FaBuilding,
  FaLaptopCode,
  FaChevronDown,
  FaCalendarAlt,
  FaLightbulb,
  FaStar,
  FaTag,
  FaTimes,
  FaEye,
  FaCheckCircle,
  FaAward,
  FaCertificate,
  FaNetworkWired,
  FaServer,
  FaUserGraduate,
  FaThLarge,
  FaExternalLinkAlt,
} from "react-icons/fa";
import "../css/AdditionallyExperiences.css";
import cybersecurityImage from "../assets/cybersecurity.png";
import developYouthImage from "../assets/develop yuth of combodia.png";
import figmaWorkshopImage from "../assets/Fima desing workshop.png";
import competitionImage from "../assets/compatition with yuth of cambodia.png";
import companyVisitImage from "../assets/R1.png";
import canvaCoreImage from "../assets/canva core.png";

// Industry Certifications
import certQualys from "../assets/certificates/cert-qualys.png";
import certPaloAlto from "../assets/certificates/cert-paloalto.png";
import certProofpoint from "../assets/certificates/cert-proofpoint.png";
import certCheckPoint from "../assets/certificates/cert-checkpoint.png";
import certDell from "../assets/certificates/cert-dell.png";

import { useLanguage } from "../contexts/LanguageContext";

function Experiences() {
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'certs' | 'workshops'
  const [expandedWorkshopId, setExpandedWorkshopId] = useState(null);
  const [expandedCertId, setExpandedCertId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Trigger reveal animation when filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const expItems = document.querySelectorAll(".exp-item");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
            }
          });
        },
        { threshold: 0.08 }
      );

      expItems.forEach((item) => observer.observe(item));
      return () => observer.disconnect();
    }, 60);

    return () => clearTimeout(timer);
  }, [activeFilter]);

  // Modal ESC key listener
  useEffect(() => {
    if (!selectedImage) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [selectedImage]);

  const toggleExpandWorkshop = (id) => {
    setExpandedWorkshopId((prev) => (prev === id ? null : id));
  };

  const toggleExpandCert = (id) => {
    setExpandedCertId((prev) => (prev === id ? null : id));
  };

  // Workshop static definitions
  const workshopIcons = [
    <FaShieldAlt key="shield" />,
    <FaUsers key="users" />,
    <FaFigma key="figma" />,
    <FaTrophy key="trophy" />,
    <FaBuilding key="building" />,
    <FaLaptopCode key="code" />,
  ];

  const workshopImages = [
    cybersecurityImage,
    developYouthImage,
    figmaWorkshopImage,
    competitionImage,
    companyVisitImage,
    canvaCoreImage,
  ];

  const workshopColors = [
    "#38bdf8", // Cyan
    "#34d399", // Emerald
    "#a855f7", // Purple
    "#f59e0b", // Amber
    "#60a5fa", // Blue
    "#ec4899", // Pink
  ];

  const workshopColorsRgb = [
    "56, 189, 248",
    "52, 211, 153",
    "168, 85, 247",
    "245, 158, 11",
    "96, 165, 250",
    "236, 72, 153",
  ];

  const workshopYears = ["2026", "2026", "2025", "2025", "2026", "2025"];

  // Certificate static definitions
  const certImages = [
    certQualys,
    certPaloAlto,
    certProofpoint,
    certCheckPoint,
    certDell,
  ];

  const certIcons = [
    <FaShieldAlt key="c-qualys" />,
    <FaNetworkWired key="c-paloalto" />,
    <FaUserGraduate key="c-proofpoint" />,
    <FaAward key="c-checkpoint" />,
    <FaServer key="c-dell" />,
  ];

  const certColors = [
    "#ef4444", // Qualys Red
    "#f97316", // Palo Alto Orange
    "#06b6d4", // Proofpoint Cyan
    "#ec4899", // Check Point Magenta
    "#0284c7", // Dell Technologies Blue
  ];

  const certColorsRgb = [
    "239, 68, 68",
    "249, 115, 22",
    "6, 182, 212",
    "236, 72, 153",
    "2, 132, 199",
  ];

  const experienceItems = t.experiences.items || [];
  const certificationItems = t.experiences.certifications || [];

  const showCerts = activeFilter === "all" || activeFilter === "certs";
  const showWorkshops = activeFilter === "all" || activeFilter === "workshops";

  return (
    <section className="exp-section" id="Experiences">
      <div className="exp-container">
        {/* Header Section */}
        <div className="exp-header">
          <div className="header-badge">
            <span className="badge-text">{t.experiences.badge}</span>
          </div>
          <h2 className="exp-section-title">
            <span className="exp-title-main">{t.experiences.titleMain}</span>
            <span className="exp-title-accent">{t.experiences.titleAccent}</span>
          </h2>
          <div className="exp-title-underline"></div>
          <p className="section-subtitle">{t.experiences.subtitle}</p>
        </div>

        {/* Category Filter Tabs */}
        <div className="exp-tabs-nav">
          <button
            type="button"
            className={`exp-tab-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            <FaThLarge className="tab-icon" />
            <span>{t.experiences.filterAll || "All Activities"}</span>
            <span className="tab-counter">
              {certificationItems.length + experienceItems.length}
            </span>
          </button>

          <button
            type="button"
            className={`exp-tab-btn cert-tab ${activeFilter === "certs" ? "active" : ""}`}
            onClick={() => setActiveFilter("certs")}
          >
            <FaAward className="tab-icon gold" />
            <span>{t.experiences.filterCerts || "Certifications & Credentials"}</span>
            <span className="tab-counter cert-badge">
              {certificationItems.length}
            </span>
          </button>

          <button
            type="button"
            className={`exp-tab-btn ${activeFilter === "workshops" ? "active" : ""}`}
            onClick={() => setActiveFilter("workshops")}
          >
            <FaUsers className="tab-icon" />
            <span>{t.experiences.filterWorkshops || "Workshops & Community"}</span>
            <span className="tab-counter">{experienceItems.length}</span>
          </button>
        </div>

        {/* Section 1: Professional Certifications */}
        {showCerts && (
          <div className="exp-group-section">
            {activeFilter === "all" && (
              <div className="exp-group-header">
                <div className="group-header-left">
                  <span className="group-badge certs-badge">
                    <FaCertificate /> {lang === "km" ? "វិញ្ញាបនបត្រផ្លូវការ" : "Verified Industry Certifications"}
                  </span>
                  <h3 className="group-title">
                    {lang === "km"
                      ? "វិញ្ញាបនបត្រជំនាញវិជ្ជាជីវៈ & សន្តិសុខ"
                      : "Professional Licenses & Industry Certifications"}
                  </h3>
                </div>
                <span className="group-count-tag">
                  {certificationItems.length} {lang === "km" ? "វិញ្ញាបនបត្រ" : "Credentials"}
                </span>
              </div>
            )}

            <div className="exp-grid-viewport">
              <div className="exp-grid">
                {certificationItems.map((cert, index) => {
                  const isExpanded = expandedCertId === index;
                  const cardColor = certColors[index % certColors.length];
                  const cardRgb = certColorsRgb[index % certColorsRgb.length];
                  const certImg = certImages[index % certImages.length];

                  return (
                    <article
                      key={`cert-${cert.id || index}`}
                      className={`exp-item cert-card ${isExpanded ? "expanded" : ""}`}
                      style={{
                        "--card-accent": cardColor,
                        "--card-accent-rgb": cardRgb,
                      }}
                    >
                      <div className="exp-card-glow" aria-hidden="true"></div>

                      {/* Top Bar with Verified Ribbon */}
                      <div className="cert-top-bar">
                        <span className="cert-verified-pill">
                          <FaCheckCircle className="verified-icon" />
                          <span>{t.experiences.verifiedBadge || "Verified Credential"}</span>
                        </span>
                        <span className="cert-issuer-pill">{cert.issuer}</span>
                      </div>

                      {/* Certificate Image Frame */}
                      <div className="exp-image-wrap cert-image-wrap">
                        <button
                          type="button"
                          className="exp-image-trigger cert-image-trigger"
                          onClick={() =>
                            setSelectedImage({
                              src: certImg,
                              title: `${cert.title} - ${cert.subtitle}`,
                              subtitle: `${cert.issuer} · ${cert.date}`,
                              color: cardColor,
                            })
                          }
                          aria-label={`${t.experiences.viewCertificate || "View Certificate"}: ${cert.title}`}
                        >
                          <img
                            src={certImg}
                            alt={cert.title}
                            className="exp-image cert-preview-image"
                            loading="lazy"
                          />
                          <div className="exp-image-overlay"></div>
                          <span className="exp-zoom-btn cert-zoom-btn">
                            <FaEye /> {t.experiences.viewCertificate || "View Certificate"}
                          </span>
                        </button>

                        {/* Top Badges over image */}
                        <div className="exp-image-badges">
                          <span className="exp-category-pill cert-category-pill">
                            {cert.category}
                          </span>
                          <span className="exp-year-pill">
                            <FaCalendarAlt className="pill-icon" /> {cert.date}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="exp-content">
                        <div className="exp-header-row">
                          <div className="cert-title-group">
                            <h3 className="exp-title cert-title">{cert.title}</h3>
                            <p className="cert-subtitle">{cert.subtitle}</p>
                          </div>
                          <div
                            className="exp-icon-box cert-icon-box"
                            style={{ color: cardColor }}
                          >
                            {certIcons[index % certIcons.length]}
                          </div>
                        </div>

                        {/* Metadata Details Row */}
                        <div className="cert-meta-row">
                          <div className="cert-meta-item">
                            <span className="meta-label">
                              {t.experiences.issuedBy || "Issuer"}:
                            </span>
                            <span className="meta-val">{cert.issuer}</span>
                          </div>
                          {cert.validUntil && (
                            <div className="cert-meta-item">
                              <span className="meta-label">
                                {t.experiences.validUntil || "Validity"}:
                              </span>
                              <span className="meta-val">{cert.validUntil}</span>
                            </div>
                          )}
                        </div>

                        <p className="exp-description">{cert.description}</p>

                        {/* Expandable Accordion Drawer */}
                        <div className={`exp-expandable ${isExpanded ? "open" : ""}`}>
                          <div className="exp-expandable-inner">
                            {/* Credential Scope */}
                            {cert.more && (
                              <div className="exp-detail-block">
                                <div className="exp-block-title">
                                  <FaStar className="block-icon" />
                                  <span>
                                    {lang === "km"
                                      ? "វិសាលភាពវិញ្ញាបនបត្រ"
                                      : "Credential Scope & Validation"}
                                  </span>
                                </div>
                                <p className="exp-more-text">{cert.more}</p>
                              </div>
                            )}

                            {/* Skills / Competencies */}
                            {cert.skills && cert.skills.length > 0 && (
                              <div className="exp-detail-block">
                                <div className="exp-block-title">
                                  <FaLightbulb className="block-icon" />
                                  <span>
                                    {lang === "km"
                                      ? "ជំនាញត្រូវបានបញ្ជាក់"
                                      : "Verified Competencies"}
                                  </span>
                                </div>
                                <div className="exp-skills-wrap">
                                  {cert.skills.map((skill, i) => (
                                    <span key={i} className="exp-skill-chip cert-skill-chip">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Highlights */}
                            {cert.highlights && cert.highlights.length > 0 && (
                              <div className="exp-detail-block">
                                <div className="exp-block-title">
                                  <FaTag className="block-icon" />
                                  <span>
                                    {lang === "km"
                                      ? "ចំណុចសំខាន់ៗ"
                                      : "Verification Highlights"}
                                  </span>
                                </div>
                                <ul className="exp-highlights-list">
                                  {cert.highlights.map((item, i) => (
                                    <li key={i} className="exp-highlight-item">
                                      <FaCheckCircle
                                        className="check-icon"
                                        style={{ color: cardColor }}
                                      />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="exp-card-actions">
                          <button
                            type="button"
                            className="cert-preview-action-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage({
                                src: certImg,
                                title: `${cert.title} - ${cert.subtitle}`,
                                subtitle: `${cert.issuer} · ${cert.date}`,
                                color: cardColor,
                              });
                            }}
                          >
                            <FaEye />
                            <span>{t.experiences.viewCertificate || "View Certificate"}</span>
                          </button>

                          <button
                            type="button"
                            className="exp-toggle-action"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpandCert(index);
                            }}
                            aria-expanded={isExpanded}
                          >
                            <span>
                              {isExpanded
                                ? t.experiences.showLess || (lang === "km" ? "បង្រួម" : "Show less")
                                : t.experiences.seeMore || (lang === "km" ? "មើលលម្អិត" : "See details")}
                            </span>
                            <FaChevronDown
                              className={`action-chevron ${isExpanded ? "rotated" : ""}`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Bottom Accent Line */}
                      <div className="exp-accent-line" aria-hidden="true"></div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Technical Workshops & Community Engagement */}
        {showWorkshops && (
          <div className="exp-group-section workshops-group-section">
            {activeFilter === "all" && (
              <div className="exp-group-header">
                <div className="group-header-left">
                  <span className="group-badge workshops-badge">
                    <FaUsers /> {lang === "km" ? "សកម្មភាព & សិក្ខាសាលា" : "Workshops & Community Journey"}
                  </span>
                  <h3 className="group-title">
                    {lang === "km"
                      ? "សិក្ខាសាលាបច្ចេកវិទ្យា & ការចូលរួមសហគមន៍"
                      : "Hands-On Workshops & Community Engagement"}
                  </h3>
                </div>
                <span className="group-count-tag">
                  {experienceItems.length} {lang === "km" ? "កម្មវិធី" : "Activities"}
                </span>
              </div>
            )}

            <div className="exp-grid-viewport">
              <div className="exp-grid">
                {experienceItems.map((exp, index) => {
                  const cardIndex = index % workshopImages.length;
                  const isExpanded = expandedWorkshopId === index;
                  const cardColor = workshopColors[cardIndex];
                  const cardRgb = workshopColorsRgb[cardIndex];

                  return (
                    <article
                      key={`workshop-${index}`}
                      className={`exp-item ${isExpanded ? "expanded" : ""}`}
                      style={{
                        "--card-accent": cardColor,
                        "--card-accent-rgb": cardRgb,
                      }}
                    >
                      <div className="exp-card-glow" aria-hidden="true"></div>

                      {/* Image Showcase */}
                      <div className="exp-image-wrap">
                        <button
                          type="button"
                          className="exp-image-trigger"
                          onClick={() =>
                            setSelectedImage({
                              src: workshopImages[cardIndex],
                              title: exp.title,
                              subtitle: exp.category,
                              color: cardColor,
                            })
                          }
                          aria-label={`${lang === "km" ? "មើលរូបភាពពេញ" : "View full photo"}: ${exp.title}`}
                        >
                          <img
                            src={workshopImages[cardIndex]}
                            alt={exp.title}
                            className="exp-image"
                            loading="lazy"
                          />
                          <div className="exp-image-overlay"></div>
                          <span className="exp-zoom-btn">
                            <FaEye /> {lang === "km" ? "មើលរូប" : "View"}
                          </span>
                        </button>

                        {/* Top Badges over image */}
                        <div className="exp-image-badges">
                          <span className="exp-category-pill">
                            {exp.category}
                          </span>
                          <span className="exp-year-pill">
                            <FaCalendarAlt className="pill-icon" /> {workshopYears[cardIndex]}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="exp-content">
                        <div className="exp-header-row">
                          <h3 className="exp-title">{exp.title}</h3>
                          <div
                            className="exp-icon-box"
                            style={{ color: cardColor }}
                          >
                            {workshopIcons[cardIndex]}
                          </div>
                        </div>

                        <p className="exp-description">{exp.description}</p>

                        {/* Expandable Accordion Drawer */}
                        <div className={`exp-expandable ${isExpanded ? "open" : ""}`}>
                          <div className="exp-expandable-inner">
                            {/* More Description */}
                            {exp.more && (
                              <div className="exp-detail-block">
                                <div className="exp-block-title">
                                  <FaStar className="block-icon" />
                                  <span>
                                    {lang === "km" ? "ព័ត៌មានលម្អិត" : "Overview & Context"}
                                  </span>
                                </div>
                                <p className="exp-more-text">{exp.more}</p>
                              </div>
                            )}

                            {/* Skills Learned */}
                            {exp.skills && exp.skills.length > 0 && (
                              <div className="exp-detail-block">
                                <div className="exp-block-title">
                                  <FaLightbulb className="block-icon" />
                                  <span>
                                    {lang === "km" ? "ជំនាញដែលទទួលបាន" : "Skills Acquired"}
                                  </span>
                                </div>
                                <div className="exp-skills-wrap">
                                  {exp.skills.map((skill, i) => (
                                    <span key={i} className="exp-skill-chip">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Key Highlights */}
                            {exp.highlights && exp.highlights.length > 0 && (
                              <div className="exp-detail-block">
                                <div className="exp-block-title">
                                  <FaTag className="block-icon" />
                                  <span>
                                    {lang === "km" ? "សមិទ្ធផលសំខាន់ៗ" : "Key Takeaways"}
                                  </span>
                                </div>
                                <ul className="exp-highlights-list">
                                  {exp.highlights.map((item, i) => (
                                    <li key={i} className="exp-highlight-item">
                                      <FaCheckCircle
                                        className="check-icon"
                                        style={{ color: cardColor }}
                                      />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Toggle Button */}
                        <button
                          type="button"
                          className="exp-toggle-action"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpandWorkshop(index);
                          }}
                          aria-expanded={isExpanded}
                        >
                          <span>
                            {isExpanded
                              ? t.experiences.showLess || (lang === "km" ? "បង្រួម" : "Show less")
                              : t.experiences.seeMore || (lang === "km" ? "មើលលម្អិត" : "See details")}
                          </span>
                          <FaChevronDown
                            className={`action-chevron ${isExpanded ? "rotated" : ""}`}
                          />
                        </button>
                      </div>

                      {/* Bottom Accent Line */}
                      <div className="exp-accent-line" aria-hidden="true"></div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Full Image Preview Modal */}
        {selectedImage && (
          <div
            className="exp-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.title}
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="exp-modal-window"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="exp-modal-close"
                onClick={() => setSelectedImage(null)}
                aria-label={lang === "km" ? "បិទរូបភាព" : "Close preview"}
              >
                <FaTimes />
              </button>

              <div className="exp-modal-body">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="exp-modal-image"
                />
              </div>

              <div className="exp-modal-footer">
                <div className="exp-modal-footer-info">
                  <span className="exp-modal-caption">{selectedImage.title}</span>
                  {selectedImage.subtitle && (
                    <span className="exp-modal-subcaption">
                      {selectedImage.subtitle}
                    </span>
                  )}
                </div>
                <a
                  href={selectedImage.src}
                  target="_blank"
                  rel="noreferrer"
                  className="exp-modal-action-btn"
                >
                  <FaExternalLinkAlt /> {lang === "km" ? "មើលរូបដើម" : "Open Full Image"}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Experiences;