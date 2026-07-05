import { useEffect, useRef } from "react";
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaCode, FaServer, FaShoppingCart, FaCloud } from "react-icons/fa";
import "../css/Project.css";
import { useLanguage } from "../contexts/LanguageContext";

function Projects() {
  const { t, lang } = useLanguage();
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

  const projects = [
    {
      title: "Business System for Selling Product",
      year: "2025",
      desc: "Full-stack product selling system with user authentication and admin dashboard statistics.",
      tech: ["React", "TypeScript", "GitHub", "Tailwind CSS"],
      repository: "https://github.com/reamkhorn12345-art/potiofilo-ream-html.git",
      liveDemo: "https://bussiness-85po.vercel.app/",
      icon: <FaShoppingCart />,
      color: "#61dafb",
      colorRgb: "97, 218, 251",
      gradient: "linear-gradient(135deg, #61dafb, #38bdf8)",
    },
    {
      title: "Weather App",
      year: "2025",
      desc: "A simple weather application that displays current conditions and forecasts.",
      tech: ["JavaScript", "OpenWeather API", "CSS", "HTML", "GitHub", "Postman"],
      repository: "https://github.com/Ream111222333/Weather-group2.git",
      liveDemo: "https://weather-system-group2.vercel.app/",
      icon: <FaCloud />,
      color: "#f59e0b",
      colorRgb: "245, 158, 11",
      gradient: "linear-gradient(135deg, #f59e0b, #eab308)",
    },
    {
      title: "Achar Booking System",
      year: "2026",
      desc: "Booking platform with user authentication and admin dashboard management.",
      tech: ["Vue.js", "Laravel", "MySQL", "Redis", "REST API", "Jira", "GitHub", "Postman"],
      repository: "https://github.com/Jame2026/Achar-Event-Booking.git",
      liveDemo: "https://achar-event-booking-232f.vercel.app/",
      icon: <FaServer />,
      color: "#a855f7",
      colorRgb: "168, 85, 247",
      gradient: "linear-gradient(135deg, #a855f7, #8b5cf6)",
    },
    {
      title: "E-commerce Platform",
      year: "2025",
      desc: "E-commerce platform with product management, shopping cart, and checkout functionality.",
      tech: ["React", "Node.js", "MongoDB", "Stripe API"],
      repository: "https://github.com/Ream111222333/v0-e-commerce-website-build.git",
      liveDemo: "https://e-commersream.vercel.app",
      icon: <FaCode />,
      color: "#10b981",
      colorRgb: "16, 185, 129",
      gradient: "linear-gradient(135deg, #10b981, #059669)",
    },
      {
      title: "Personal Finance Tracker",
      year: "2026",
      desc: "Full-stack product selling system with user authentication and admin dashboard statistics.",
      tech: ["Vue.js", "TypeScript", "GitHub", "Tailwind CSS"],
      repository: "https://github.com/reamkhorn12345-art/potiofilo-ream-html.git",
      liveDemo: "https://tracker-kohl-alpha.vercel.app/",
      icon: <FaShoppingCart />,
      color: "#61dafb",
      colorRgb: "97, 218, 251",
      gradient: "linear-gradient(135deg, #61dafb, #38bdf8)",
    },
        {
      title: "Power BI Dasborad",
      year: "2026",
      desc: "That focuses on COVID-19.",
      tech: ["Python", "Github", "MySQL"],
      repository: "https://github.com/Jame2026/Achar-Event-Booking.git",
      liveDemo: "#",
      icon: <FaServer />,
      color: "#a855f7",
      colorRgb: "168, 85, 247",
      gradient: "linear-gradient(135deg, #a855f7, #8b5cf6)",
    },
  ];

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        {/* Header */}
        <div className="projects-header">
          <div className="projects-badge">
            <FaCode className="badge-icon" />
            <span>{lang === "km" ? "គម្រោងរបស់ខ្ញុំ" : "My Work"}</span>
          </div>
          <h2 className="section-title">{t.projects.heading}</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            {lang === "km"
              ? "គម្រោងដែលខ្ញុំបានបង្កើតដោយប្រើបច្ចេកវិទ្យាទំនើប"
              : "Projects I've built using modern technologies"}
          </p>
        </div>

        {/* Project Grid */}
        <div className="projects-grid">
          {t.projects.items.map((project, index) => {
            const proj = projects[index] || {};

            return (
              <div
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                className="project-card hidden"
                style={{ transitionDelay: `${index * 0.12}s` }}
              >
                {/* Glow effect */}
                <div
                  className="project-glow"
                  style={{
                    background: `radial-gradient(circle, rgba(${proj.colorRgb}, 0.2), transparent 60%)`,
                  }}
                ></div>

                {/* Card top accent */}
                <div
                  className="project-accent"
                  style={{ background: proj.gradient }}
                ></div>

                {/* Card content */}
                <div className="project-card-inner">
                  {/* Icon + Year */}
                  <div className="project-top-row">
                    <div
                      className="project-icon-wrap"
                      style={{ background: proj.gradient }}
                    >
                      {proj.icon}
                    </div>
                    <span className="project-year">
                      <FaCalendarAlt className="year-icon" />
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="project-title">{project.title}</h3>

                  {/* Description */}
                  <p className="project-desc">{project.desc}</p>

                  {/* Tech stack */}
                  <div className="project-tech">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="tech-tag"
                        style={{
                          "--tag-clr": proj.color,
                          "--tag-clr-rgb": proj.colorRgb,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="project-actions">
                    <a
                      href={projects[index].repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn primary"
                      style={{
                        background: proj.gradient,
                        boxShadow: `0 4px 16px rgba(${proj.colorRgb}, 0.3)`,
                      }}
                    >
                      <FaGithub className="btn-icon" />
                      <span>{t.projects.viewRepo}</span>
                    </a>
                    <a
                      href={projects[index].liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn secondary"
                      style={{
                        borderColor: proj.color,
                        color: proj.color,
                      }}
                    >
                      <FaExternalLinkAlt className="btn-icon" />
                      <span>{t.projects.liveDemo}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;