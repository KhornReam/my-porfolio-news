

import { useEffect } from "react";
import { FaCode, FaServer, FaRocket, FaPalette, FaMobileAlt, FaChartLine } from "react-icons/fa";
import "../css/Services.css";

function Services() {
  useEffect(() => {
    const serviceItems = document.querySelectorAll(".service-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    serviceItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 1,
      icon: <FaCode />,
      title: "Frontend Development",
      description: "Creating stunning, responsive user interfaces with modern React applications and pixel-perfect designs.",
      features: ["React.js", "TypeScript", "Responsive Design"],
      color: "#61dafb",
      level: 90,
      projects: "15+ Projects"
    },
    {
      id: 2,
      icon: <FaServer />,
      title: "Backend Development",
      description: "Building robust server-side applications with scalable APIs and secure database architectures.",
      features: ["Node.js", "React.js", "MongoDB", "REST APIs"],
      color: "#68a063",
      level: 85,
      projects: "10+ Projects"
    },
    {
      id: 3,
      icon: <FaRocket />,
      title: "Full-Stack Solutions",
      description: "End-to-end web application development with seamless integration between frontend and backend.",
      features: ["MERN Stack", "Performance", "Scalability", "Security"],
      color: "#ff6b6b",
      level: 88,
      projects: "8+ Projects"
    },
    {
      id: 4,
      icon: <FaChartLine />,
      title: "Performance & UX",
      description: "Optimizing applications for lightning-fast performance and exceptional user experiences.",
      features: ["Speed Optimization", "UX Design", "Analytics", "A/B Testing"],
      color: "#4ecdc4",
      level: 92,
      projects: "12+ Projects"
    },
    {
      id: 5,
      icon: <FaPalette />,
      title: "UI/UX Design",
      description: "Crafting beautiful, intuitive interfaces with user-centered design principles and modern aesthetics.",
      features: ["Figma", "Prototyping", "User Research", "Accessibility"],
      color: "#a855f7",
      level: 87,
      projects: "20+ Designs"
    },
    {
      id: 6,
      icon: <FaMobileAlt />,
      title: "Mobile Development",
      description: "Creating mobile-first responsive designs and progressive web apps for all devices.",
      features: ["Mobile-First", "PWA", "Touch Gestures", "Cross-Platform"],
      color: "#f59e0b",
      level: 83,
      projects: "6+ Apps"
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        {/* Header Section */}
        <div className="services-header">
          <div className="header-badge">
            <span className="badge-text">💼 Professional Services</span>
          </div>
          <h2 className="section-title">
            <span className="title-main">What I Build</span>
            <span className="title-accent">For You</span>
          </h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Transforming ideas into powerful digital experiences with cutting-edge technologies and modern design principles
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-item"
              style={{ '--service-color': service.color, '--delay': `${index * 0.1}s` }}
            >
              <div className="service-glow"></div>
              <div className="service-background"></div>
              
              {/* Service Header */}
              <div className="service-header">
                <div className="service-icon-container">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <div className="icon-glow"></div>
                </div>
                <div className="service-meta">
                  <h3 className="service-title">{service.title}</h3>
                  <div className="service-stats">
                    <span className="stat-item">{service.projects}</span>
                    <span className="stat-level">{service.level}% Expertise</span>
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <div className="service-content">
                <p className="service-description">{service.description}</p>
                
                {/* Progress Bar */}
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${service.level}%` }}></div>
                  </div>
                  <span className="progress-text">{service.level}%</span>
                </div>
                
                {/* Service Features */}
                <div className="service-features">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Animated Border */}
              <div className="service-border"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="services-cta">
          <div className="cta-content">
            <h3>Ready to start your project?</h3>
            <p>Let's discuss how I can help bring your ideas to life</p>
            <button className="cta-button">
              Get In Touch
              <span className="cta-glow"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
