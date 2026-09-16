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
} from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";
import "../css/AdditionallyExperiences.css";
import cybersecurityImage from "../assets/cybersecurity.png";
import developYouthImage from "../assets/develop yuth of combodia.png";
import figmaWorkshopImage from "../assets/Fima desing workshop.png";
import competitionImage from "../assets/compatition with yuth of cambodia.png";
import companyVisitImage from "../assets/R1.png";
import canvaCoreImage from "../assets/canva core.png";

function AdditionallyExperiences() {
  const { t, lang } = useLanguage();
  const [expandedId, setExpandedId] = useState(null);

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
      { threshold: 0.18 }
    );

    expItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const experiences = [
    {
      id: 1,
      icon: <FaShieldAlt />,
      image: cybersecurityImage,
      color: "#00d4ff",
      year: "2026",
      colorRgb: "0, 212, 255",
    },
    {
      id: 2,
      icon: <FaUsers />,
      image: developYouthImage,
      color: "#ff6b6b",
      year: "2026",
      colorRgb: "255, 107, 107",
    },
    {
      id: 3,
      icon: <FaPalette />,
      image: figmaWorkshopImage,
      color: "#a855f7",
      year: "2026",
      colorRgb: "168, 85, 247",
    },
    {
      id: 4,
      icon: <FaTrophy />,
      image: competitionImage,
      color: "#f59e0b",
      year: "2026",
      colorRgb: "245, 158, 11",
    },
    {
      id: 5,
      icon: <FaBuilding />,
      image: companyVisitImage,
      color: "#4ecdc4",
      year: "2026",
      colorRgb: "78, 205, 196",
    },
    {
      id: 6,
      icon: <FaLaptopCode />,
      image: canvaCoreImage,
      color: "#61dafb",
      year: "2026",
      colorRgb: "97, 218, 251",
    },
  ];

  const transItems = t.experiences.items;

  return (
    <section className="exp-section" id="experiences">
      <div className="exp-container">
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

        <div className="exp-grid">
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            const trans = transItems[index] || {};
            const tSeeMore = t.experiences.seeMore;
            const tShowLess = t.experiences.showLess;

            return (
              <article
                key={exp.id}
                className={`exp-item ${isExpanded ? "expanded" : ""}`}
                style={{
                  "--service-color": exp.color,
                  "--service-color-rgb": exp.colorRgb,
                  "--delay": `${index * 0.1}s`,
                  backgroundImage: `linear-gradient(180deg, rgba(2, 8, 23, 0.08), rgba(2, 8, 23, 0.72)), url(${exp.image})`,
                }}
                onClick={() => toggleExpand(exp.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleExpand(exp.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
              >
                <div className="exp-card-overlay" aria-hidden="true" />
                <div className="exp-card-topline">
                  <span className="exp-category-badge">{trans.category}</span>
                  <span className="exp-year-badge">
                    <FaCalendarAlt className="year-icon" />
                    {exp.year}
                  </span>
                </div>

                <div className="exp-content">
                  <div className="exp-content-header">
                    <div className="exp-header-copy">
                      <span className="exp-mini-label">{trans.category}</span>
                      <h3 className="exp-title">{trans.title}</h3>
                    </div>
                    <div className="exp-icon-ring" style={{ color: exp.color }}>
                      {exp.icon}
                    </div>
                  </div>

                  <p className="exp-description">{trans.description}</p>

                  <div className={`exp-expandable ${isExpanded ? "open" : ""}`}>
                    <div className="exp-more-section">
                      <div className="exp-section-label">
                        <FaStar className="section-icon" />
                        <span>{lang === "km" ? "ព័ត៌មានលម្អិត" : "Details"}</span>
                      </div>
                      <p className="exp-more-text">{trans.more}</p>
                    </div>

                    <div className="exp-skills-section">
                      <div className="exp-section-label">
                        <FaLightbulb className="section-icon" />
                        <span>{lang === "km" ? "ជំនាញដែលបានរៀន" : "Skills Learned"}</span>
                      </div>
                      <div className="exp-skills-grid">
                        {trans.skills && trans.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="exp-skill-tag"
                            style={{ "--tag-color": exp.color }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="exp-highlights-section">
                      <div className="exp-section-label">
                        <FaTag className="section-icon" />
                        <span>{lang === "km" ? "ចំណុចសំខាន់ៗ" : "Key Highlights"}</span>
                      </div>
                      <ul className="exp-highlights-list">
                        {trans.highlights && trans.highlights.map((item, i) => (
                          <li key={i} className="exp-highlight-item">
                            <span
                              className="highlight-dot"
                              style={{ background: exp.color }}
                            ></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="exp-toggle-btn"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleExpand(exp.id);
                    }}
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? tShowLess : tSeeMore}</span>
                    <FaChevronDown className={`toggle-chevron ${isExpanded ? "rotated" : ""}`} />
                  </button>
                </div>

                <div className="service-border"></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AdditionallyExperiences;
