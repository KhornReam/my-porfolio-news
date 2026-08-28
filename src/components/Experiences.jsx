import { useEffect, useState } from "react";
import {
  FaShieldAlt,
  FaUsers,
  FaPalette,
  FaTrophy,
  FaBuilding,
  FaLaptopCode,
  FaChevronDown,
  FaCalendarAlt,
  FaLightbulb,
  FaStar,
  FaTag,
  FaTimes,
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
      { threshold: 0.15 }
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

  const expIcons = [<FaShieldAlt />, <FaUsers />, <FaPalette />, <FaTrophy />, <FaBuilding />, <FaLaptopCode />];

  const expImages = [cybersecurityImage, developYouthImage, figmaWorkshopImage, competitionImage, companyVisitImage, canvaCoreImage];

  const expColors = ["#00d4ff", "#ff6b6b", "#a855f7", "#f59e0b", "#4ecdc4", "#61dafb"];
  const expColorsRgb = ["0, 212, 255", "255, 107, 107", "168, 85, 247", "245, 158, 11", "78, 205, 196", "97, 218, 251"];
  const years = ["2026", "2026", "2026", "2026", "2026", "2026"];
  const experienceItems = [...t.experiences.items, ...t.experiences.items];

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
          <div className={`exp-grid ${expandedId !== null ? "has-expanded" : ""}`}>
          {experienceItems.map((exp, index) => {
            const cardIndex = index % expImages.length;
            const isExpanded = expandedId === index;
            return (
              <div
                key={index}
                className={`exp-item ${isExpanded ? "expanded" : ""}`}
                style={{ '--service-color': expColors[cardIndex], '--service-color-rgb': expColorsRgb[cardIndex], '--delay': `${index * 0.1}s`, '--image-delay': `${index * -1.2}s` }}
              >
                <div className="service-glow"></div>
                <div className="service-background"></div>
                
                {/* Image Section */}
                <div className="exp-image-container">
                  <button
                    type="button"
                    className="exp-image-trigger"
                    onClick={() => setSelectedImage({ src: expImages[cardIndex], title: exp.title, color: expColors[cardIndex] })}
                    aria-label={`${lang === "km" ? "មើលរូបភាព" : "View image"}: ${exp.title}`}
                  >
                    <img 
                      src={expImages[cardIndex]}
                      alt={exp.title}
                      className="exp-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="exp-icon-fallback" style={{ display: 'none' }}>
                      {expIcons[cardIndex]}
                    </div>
                    <span className="exp-image-action">
                      {lang === "km" ? "មើលរូបភាព" : "View photo"}
                    </span>
                  </button>
                </div>

                {/* Content Section */}
                <div className="exp-content">
                  <div className="exp-meta">
                    <span className="exp-category-label">{exp.category}</span>
                    <span className="exp-year-label"><FaCalendarAlt /> {years[cardIndex]}</span>
                  </div>
                  <div className="exp-content-header">
                    <h3 className="exp-title">{exp.title}</h3>
                    <div className="exp-icon-ring" style={{ color: expColors[cardIndex] }}>
                      {expIcons[cardIndex]}
                    </div>
                  </div>

                  <p className="exp-description">{exp.description}</p>

                  {/* Expandable Content */}
                  <div className={`exp-expandable ${isExpanded ? "open" : ""}`}>
                    {/* More Description */}
                    <div className="exp-more-section">
                      <div className="exp-section-label">
                        <FaStar className="section-icon" />
                        <span>{lang === "km" ? "ព័ត៌មានលម្អិត" : "Details"}</span>
                      </div>
                      <p className="exp-more-text">{exp.more}</p>
                    </div>

                    {/* Skills Learned */}
                    <div className="exp-skills-section">
                      <div className="exp-section-label">
                        <FaLightbulb className="section-icon" />
                        <span>{lang === "km" ? "ជំនាញដែលបានរៀន" : "Skills Learned"}</span>
                      </div>
                      <div className="exp-skills-grid">
                        {exp.skills && exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="exp-skill-tag"
                            style={{ "--tag-color": expColors[cardIndex] }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="exp-highlights-section">
                      <div className="exp-section-label">
                        <FaTag className="section-icon" />
                        <span>{lang === "km" ? "ចំណុចសំខាន់ៗ" : "Key Highlights"}</span>
                      </div>
                      <ul className="exp-highlights-list">
                        {exp.highlights && exp.highlights.map((item, i) => (
                          <li key={i} className="exp-highlight-item">
                            <span
                              className="highlight-dot"
                              style={{ background: expColors[cardIndex] }}
                            ></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Toggle Button */}
                  <button
                    type="button"
                    className="exp-toggle-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(index);
                    }}
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? t.experiences.showLess : t.experiences.seeMore}</span>
                    <FaChevronDown
                      className={`toggle-chevron ${isExpanded ? "rotated" : ""}`}
                    />
                  </button>
                </div>

                {/* Animated Border */}
                <div className="service-border"></div>
              </div>
            );
          })}
          </div>
        </div>

        {selectedImage && (
          <div className="exp-image-modal" role="dialog" aria-modal="true" aria-label={selectedImage.title} onClick={() => setSelectedImage(null)}>
            <div className="exp-image-modal-content" onClick={(event) => event.stopPropagation()} style={{ "--modal-color": selectedImage.color }}>
              <button type="button" className="exp-image-modal-close" onClick={() => setSelectedImage(null)} aria-label={lang === "km" ? "បិទរូបភាព" : "Close image"}>
                <FaTimes />
              </button>
              <img src={selectedImage.src} alt={selectedImage.title} className="exp-image-modal-photo" />
              <div className="exp-image-modal-caption">{selectedImage.title}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Experiences;
