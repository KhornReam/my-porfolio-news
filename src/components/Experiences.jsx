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
} from "react-icons/fa";
import "../css/AdditionallyExperiences.css";
import cybersecurityImage from "../assets/cybersecurity.png";
import developYouthImage from "../assets/develop yuth of combodia.png";
import figmaWorkshopImage from "../assets/Fima desing workshop.png";
import competitionImage from "../assets/compatition with yuth of cambodia.png";
import companyVisitImage from "../assets/R1.png";
import canvaCoreImage from "../assets/canva core.png";
import { useLanguage } from "../contexts/LanguageContext";

function Experiences() {
  const { t, lang } = useLanguage();
  const [expandedId, setExpandedId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const expItems = document.querySelectorAll(".exp-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.12 }
    );

    expItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedImage) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [selectedImage]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const expIcons = [
    <FaShieldAlt />,
    <FaUsers />,
    <FaFigma />,
    <FaTrophy />,
    <FaBuilding />,
    <FaLaptopCode />,
  ];

  const expImages = [
    cybersecurityImage,
    developYouthImage,
    figmaWorkshopImage,
    competitionImage,
    companyVisitImage,
    canvaCoreImage,
  ];

  const expColors = [
    "#38bdf8", // Cyan
    "#34d399", // Emerald
    "#a855f7", // Purple
    "#f59e0b", // Amber
    "#60a5fa", // Blue
    "#ec4899", // Pink
  ];

  const expColorsRgb = [
    "56, 189, 248",
    "52, 211, 153",
    "168, 85, 247",
    "245, 158, 11",
    "96, 165, 250",
    "236, 72, 153",
  ];

  const years = ["2026", "2026", "2025", "2025", "2026", "2025"];
  const experienceItems = t.experiences.items;

  return (
    <section className="exp-section" id="Experiences">
      <div className="exp-container">
        {/* Header Section */}
        <div className="exp-header">
          <div className="header-badge">
            <span className="badge-text">{t.experiences.badge}</span>
          </div>
          <h2 className="section-title">
            <span className="title-main">{t.experiences.titleMain}</span>
            <span className="title-accent">{t.experiences.titleAccent}</span>
          </h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">{t.experiences.subtitle}</p>
        </div>

        {/* Experiences Grid */}
        <div className="exp-grid-viewport">
          <div className="exp-grid">
            {experienceItems.map((exp, index) => {
              const cardIndex = index % expImages.length;
              const isExpanded = expandedId === index;
              const cardColor = expColors[cardIndex];
              const cardRgb = expColorsRgb[cardIndex];

              return (
                <article
                  key={index}
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
                          src: expImages[cardIndex],
                          title: exp.title,
                          color: cardColor,
                        })
                      }
                      aria-label={`${lang === "km" ? "មើលរូបភាពពេញ" : "View full photo"}: ${exp.title}`}
                    >
                      <img
                        src={expImages[cardIndex]}
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
                        <FaCalendarAlt className="pill-icon" /> {years[cardIndex]}
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
                        {expIcons[cardIndex]}
                      </div>
                    </div>

                    <p className="exp-description">{exp.description}</p>

                    {/* Smooth Grid-Accordion Expansion Drawer */}
                    <div
                      className={`exp-expandable ${isExpanded ? "open" : ""}`}
                    >
                      <div className="exp-expandable-inner">
                        {/* More Description */}
                        {exp.more && (
                          <div className="exp-detail-block">
                            <div className="exp-block-title">
                              <FaStar className="block-icon" />
                              <span>{lang === "km" ? "ព័ត៌មានលម្អិត" : "Overview & Context"}</span>
                            </div>
                            <p className="exp-more-text">{exp.more}</p>
                          </div>
                        )}

                        {/* Skills Learned */}
                        {exp.skills && exp.skills.length > 0 && (
                          <div className="exp-detail-block">
                            <div className="exp-block-title">
                              <FaLightbulb className="block-icon" />
                              <span>{lang === "km" ? "ជំនាញដែលទទួលបាន" : "Skills Acquired"}</span>
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
                              <span>{lang === "km" ? "សមិទ្ធផលសំខាន់ៗ" : "Key Takeaways"}</span>
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
                        toggleExpand(index);
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
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="exp-modal-image"
              />
              <div className="exp-modal-footer">
                <span className="exp-modal-caption">{selectedImage.title}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Experiences;
