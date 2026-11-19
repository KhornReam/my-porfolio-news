import "../css/About.css";
import {
  FaReact, FaCode, FaLaptopCode, FaGraduationCap, FaNodeJs, FaDatabase,
  FaGitAlt, FaCloud, FaMobileAlt, FaPalette, FaChartLine, FaChartBar,
  FaAward, FaRocket, FaGithub, FaLanguage, FaCertificate, FaHtml5,
  FaCss3Alt, FaJsSquare, FaPython, FaDocker, FaAws, FaFigma, FaServer,
  FaTools, FaStar, FaTrophy, FaBriefcase, FaCalendarAlt, FaWordpress,
  FaPhp, FaVuejs, FaHeadset, FaDownload, FaMapMarkerAlt,
  FaTimes, FaArrowRight, FaCheck, FaEye, FaClock, FaGlobeAmericas, FaCompass
} from "react-icons/fa";
import {
  SiTypescript, SiLaravel, SiMongodb, SiPostgresql, SiTailwindcss, SiDocker as SiDockerBrand,
  SiSequelize, SiNuxtdotjs, SiNextdotjs
} from "react-icons/si";
import { useEffect, useMemo, useRef, useState } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useLanguage } from "../contexts/LanguageContext";
import profile from "../assets/ream1.png";
import cambodiaFlag from "../assets/flag-cambodia.svg";
import cvFile from "../assets/Deep Purple Professional College Student CV Resume.pdf";
import { BiSolidMessageSquareDetail } from "react-icons/bi";

const defaultMapCenter = [11.5564, 104.9282];

function MapFlyCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], position.zoom || 13, {
        animate: true,
        duration: 1.4,
      });
    }
  }, [map, position]);
  return null;
}

function LiveLocationMap() {
  const { lang } = useLanguage();
  const [activeCityIndex, setActiveCityIndex] = useState(0);

  const cambodiaCities = useMemo(
    () => [
      {
        id: "phnom-penh",
        name: lang === "km" ? "រាជធានីភ្នំពេញ" : "Phnom Penh",
        tag: lang === "km" ? "ទីតាំងសិក្សា & អភិវឌ្ឍន៍" : "Tech & Education Base",
        landmark: "Passerelles numériques Cambodia (PNC)",
        coords: [11.5564, 104.9282],
        zoom: 13,
      },
      {
        id: "kampong-thom",
        name: lang === "km" ? "ខេត្តកំពង់ធំ" : "Kampong Thom",
        tag: lang === "km" ? "ស្រុកកំណើត" : "Hometown & Roots",
        landmark: "Born & Raised in Cambodia",
        coords: [12.7111, 104.8887],
        zoom: 12,
      },
    ],
    [lang]
  );

  const activeCity = cambodiaCities[activeCityIndex];

  // Custom modern radar pulse pin
  const radarIcon = useMemo(
    () =>
      L.divIcon({
        className: "modern-radar-marker",
        html: `
          <div class="radar-pulse-ring"></div>
          <div class="radar-core-dot"></div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
    []
  );

  return (
    <div className="location-map-wrap">
      {/* Floating Top Control Bar */}
      <div className="map-glass-topbar">
        <div className="map-hq-badge">
          <span className="live-radar-indicator" aria-hidden="true"></span>
          <span className="hq-text">
            {lang === "km" ? "មូលដ្ឋានកម្ពុជា" : "CAMBODIA HQ"} · {activeCity.name}
          </span>
        </div>

        {/* City Switcher Tabs */}
        <div className="map-city-tabs" role="tablist">
          {cambodiaCities.map((city, idx) => (
            <button
              key={city.id}
              type="button"
              className={`map-city-pill ${activeCityIndex === idx ? "active" : ""}`}
              onClick={() => setActiveCityIndex(idx)}
              role="tab"
              aria-selected={activeCityIndex === idx}
            >
              <span>{city.name}</span>
            </button>
          ))}
        </div>
      </div>

      <MapContainer
        className="location-map-visual"
        center={activeCity.coords}
        zoom={activeCity.zoom}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <MapFlyCenter position={{ lat: activeCity.coords[0], lng: activeCity.coords[1], zoom: activeCity.zoom }} />

        {cambodiaCities.map((city) => (
          <Marker key={city.id} position={city.coords} icon={radarIcon}>
            <Popup className="custom-glass-popup">
              <div className="popup-body">
                <strong>{city.name}</strong>
                <span>{city.landmark}</span>
                <small>{city.tag}</small>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Coordinates Bar */}
      <div className="map-bottom-bar">
        <div className="map-coords-pill">
          <FaMapMarkerAlt className="coords-icon" />
          <span>
            {activeCity.coords[0].toFixed(4)}° N, {activeCity.coords[1].toFixed(4)}° E · ICT (UTC+7)
          </span>
        </div>
        <div className="map-flag-pill">
          <img src={cambodiaFlag} alt="Cambodia" className="flag-icon" />
          <span>Cambodia</span>
        </div>
      </div>
    </div>
  );
}

function About() {
  const { t, lang } = useLanguage();
  const [cambodiaTime, setCambodiaTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCambodiaTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Phnom_Penh",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    if (!isImageOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsImageOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isImageOpen]);

  return (
    <section className="about-section" id="about">
      <div className="hero-background">
        <div className="about-grid-overlay" aria-hidden="true"></div>
        <div className="gradient-overlay"></div>
        <div className="particle-field">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i % 4}`}></div>
          ))}
        </div>
      </div>

      <div className="about-container">
        <div className="about-header">
          <div className="header-badge">
            <span className="badge-text">{lang === "km" ? "ជីវប្រវត្តិ & ជំនាញ" : "BIOGRAPHY & BACKGROUND"}</span>
          </div>
          <h2 className="section-heading">
            <span className="heading-main">{t.about.heading}</span>
          </h2>
          <div className="heading-underline" aria-hidden="true"></div>
          <p className="section-subheading">{t.about.subheading}</p>
          {lang === "km" && (
            <p className="khmer-intro">{t.about.khmerIntro}</p>
          )}
        </div>

        {/* Executive Profile Overview Section */}
        <div className="personal-info-section">
          <div className="personal-info-container">
            {/* Left Column: Clean Editorial Bio & Structured Specs */}
            <div className="personal-info-left">
              <div className="personal-kicker-badge">
                <span>{t.about.personalInfo || "Profile Overview"}</span>
              </div>

              <h2 className="personal-headline">
                <span className="headline-title">{t.about.personalInfoSub}</span>
              </h2>

              <p className="personal-story-bio">{t.about.personalBio}</p>

              {/* Clean 2x2 Professional Specification Grid */}
              <div className="personal-bento-grid">
                <div className="bento-tile">
                  <div className="tile-icon-box">
                    <FaCode />
                  </div>
                  <div className="tile-content">
                    <span className="tile-label">{t.about.personalDetails.role}</span>
                    <strong className="tile-value">{t.about.personalDetails.roleValue}</strong>
                  </div>
                </div>

                <div className="bento-tile">
                  <div className="tile-icon-box">
                    <FaGraduationCap />
                  </div>
                  <div className="tile-content">
                    <span className="tile-label">{t.about.personalDetails.education}</span>
                    <strong className="tile-value">{t.about.personalDetails.educationValue}</strong>
                  </div>
                </div>

                <div className="bento-tile">
                  <div className="tile-icon-box">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="tile-content">
                    <span className="tile-label">{t.about.personalDetails.location}</span>
                    <strong className="tile-value">{t.about.personalDetails.locationValue}</strong>
                  </div>
                </div>

                <div className="bento-tile tile-availability">
                  <div className="tile-icon-box box-status">
                    <span className="live-pulse-dot" aria-hidden="true"></span>
                  </div>
                  <div className="tile-content">
                    <span className="tile-label">{t.about.personalDetails.availability}</span>
                    <strong className="tile-value value-status">
                      {t.about.personalDetails.availabilityValue}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Clean Action Buttons */}
              <div className="personal-cta-group">
                <a
                  href={cvFile}
                  download="Ream-Khorn-Resume.pdf"
                  className="cta-btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload className="cta-icon" />
                  <span>{lang === "km" ? "ទាញយក CV" : "Download Resume"}</span>
                </a>
                <a href="#contact" className="cta-btn-secondary">
                  <span>{lang === "km" ? "ទាក់ទងខ្ញុំ" : "Get in Touch"}</span>
                  <FaArrowRight className="cta-icon-right" />
                </a>
              </div>
            </div>

            {/* Right Column: 3D Professional Portrait Showcase */}
            <div className="personal-info-right">
              <div className="personal-portrait-card">
                <div className="portrait-glow-aura" aria-hidden="true"></div>

                <div className="portrait-image-frame">
                  <button
                    type="button"
                    className="portrait-trigger-btn"
                    onClick={() => setIsImageOpen(true)}
                    aria-label={lang === "km" ? "មើលរូបភាពពេញ" : "View full portrait"}
                  >
                    <img
                      src={profile}
                      alt="Ream Khorn - Full-Stack Software Engineer"
                      className="portrait-img"
                    />
                    {/* 3D Specular Glass Reflection Layer */}
                    <div className="portrait-specular-glass" aria-hidden="true"></div>
                    <div className="portrait-gradient-sheen" aria-hidden="true"></div>

                    {/* Top-Right Professional Zoom Action (Never obscures face) */}
                    <span className="portrait-zoom-pill">
                      <FaEye /> {lang === "km" ? "មើលរូបភាព" : "View Portrait"}
                    </span>
                  </button>

                  {/* 3D Docked Editorial Caption Bar */}
                  <div className="portrait-status-pill">
                    <span className="portrait-caption-name">Ream Khorn</span>
                    <span className="portrait-caption-sep" aria-hidden="true">·</span>
                    <span className="portrait-caption-role">
                      {lang === "km" ? "វិស្វករ Full-Stack" : "Full-Stack Engineer"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="location-card">
          <LiveLocationMap />
          <div className="location-content">
            <div className="location-badge">
              <FaMapMarkerAlt className="loc-badge-icon" />
              <span>{lang === "km" ? "ទីតាំង & តំបន់ម៉ោង" : "LOCATION & TIMEZONE"}</span>
            </div>

            <h3 className="location-heading">
              {lang === "km"
                ? "មានមូលដ្ឋាននៅកម្ពុជា ត្រៀមខ្លួនសម្រាប់សកលលោក"
                : "Based in Cambodia, Collaborating Globally"}
            </h3>

            <p className="location-description">
              {lang === "km"
                ? "មានមូលដ្ឋាននៅរាជធានីភ្នំពេញ (PNC) និងខេត្តកំពង់ធំ។ ខ្ញុំត្រៀមខ្លួនជាស្រេចក្នុងការធ្វើការងារពីចម្ងាយ (Remote) ជាមួយក្រុមការងារអន្តរជាតិ និងការងារផ្ទាល់ (On-site) នៅកម្ពុជា។"
                : "Rooted in Kampong Thom and advancing full-stack engineering in Phnom Penh at PNC. Equipped for asynchronous remote collaboration across global time zones and on-site delivery in Cambodia."}
            </p>

            {/* Quick Location Metrics Bento */}
            <div className="location-metrics-list">
              {/* 1. Timezone & Live Clock */}
              <div className="loc-metric-item">
                <div className="loc-metric-icon icon-clock">
                  <FaClock />
                </div>
                <div className="loc-metric-text">
                  <span className="loc-metric-label">
                    {lang === "km" ? "តំបន់ម៉ោងកម្ពុជា (ICT)" : "LOCAL TIMEZONE (ICT)"}
                  </span>
                  <div className="loc-metric-live">
                    <strong className="loc-metric-value">UTC+7 · Phnom Penh</strong>
                    <span className="live-clock-pill">
                      <span className="clock-pulse-dot" aria-hidden="true"></span>
                      <span>{cambodiaTime || "Active"}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Collaboration Mode */}
              <div className="loc-metric-item">
                <div className="loc-metric-icon icon-globe">
                  <FaGlobeAmericas />
                </div>
                <div className="loc-metric-text">
                  <span className="loc-metric-label">
                    {lang === "km" ? "របៀបធ្វើការ" : "WORK CAPABILITY"}
                  </span>
                  <strong className="loc-metric-value">
                    {lang === "km" ? "Remote ទូទាំងពិភពលោក & On-Site" : "Remote Worldwide & On-Site"}
                  </strong>
                </div>
              </div>

              {/* 3. Tech Campus */}
              <div className="loc-metric-item">
                <div className="loc-metric-icon icon-campus">
                  <FaGraduationCap />
                </div>
                <div className="loc-metric-text">
                  <span className="loc-metric-label">
                    {lang === "km" ? "ស្ថាប័នបច្ចេកវិទ្យា" : "CAMPUS & HUB"}
                  </span>
                  <strong className="loc-metric-value">
                    Passerelles numériques (PNC)
                  </strong>
                </div>
              </div>
            </div>

            <a
              className="location-cta-btn"
              href="https://maps.google.com/?q=Phnom+Penh+Cambodia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaCompass className="btn-icon" />
              <span>{lang === "km" ? "បើកមើលក្នុង Google Maps" : "Explore on Google Maps"}</span>
              <FaArrowRight className="btn-arrow" />
            </a>
          </div>
        </div>
        <div className="details-section">
          <div className="section-grid">
            {/* Education Card */}
            <div className="detail-card education-card">
              <div className="card-header">
                <div className="card-icon">
                  <FaGraduationCap />
                </div>
                <div className="card-title">
                  <h3>{t.about.education}</h3>
                  <p>{t.about.educationSub}</p>
                </div>
              </div>
              <div className="card-content">
                <div className="edu-item">
                  <h4>{t.about.edu1Title}</h4>
                  <span className="edu-period">{t.about.edu1Period}</span>
                  <div className="edu-status active">{t.about.edu1Status}</div>
                  <p>{t.about.edu1Desc}</p>
                </div>
                <div className="edu-item">
                  <h4>{t.about.edu2Title}</h4>
                  <span className="edu-period">{t.about.edu2Period}</span>
                  <div className="edu-status graduated">{t.about.edu2Status}</div>
                  <p>{t.about.edu2Desc}</p>
                </div>
              </div>
            </div>

            {/* Languages & Technologies */}
            <div className="detail-card languages-card">
              <div className="card-header">
                <div className="card-icon">
                  <FaCode />
                </div>
                <div className="card-title">
                  <h3>{t.about.languages}</h3>
                  <p>{t.about.languagesSub}</p>
                </div>
              </div>
              <div className="card-content">
                {/* Category Marquee Rows */}
                <div className="lang-categories">
                  {/* Frontend Row - scrolls left to right */}
                  <div className="lang-category">
                    <div className="lang-category-label frontend-label">
                      <FaPalette className="cat-icon" />
                      <span>Frontend</span>
                    </div>
                    <div className="lang-marquee-wrapper">
                      <div className="lang-marquee-track reverse">
                        <div className="lang-marquee-content">
                          <div className="lang-marquee-item frontend-item"><FaVuejs className="lang-icon vue" /><span>Vue.js</span></div>
                          <div className="lang-marquee-item frontend-item"><SiTypescript className="lang-icon ts" /><span>TypeScript</span></div>
                          <div className="lang-marquee-item frontend-item"><FaJsSquare className="lang-icon js" /><span>JavaScript</span></div>
                          <div className="lang-marquee-item frontend-item"><FaHtml5 className="lang-icon html" /><span>HTML</span></div>
                          <div className="lang-marquee-item frontend-item"><FaCss3Alt className="lang-icon css" /><span>CSS</span></div>
                          <div className="lang-marquee-item frontend-item"><FaFigma className="lang-icon figma" /><span>Figma</span></div>
                          <div className="lang-marquee-item frontend-item"><FaWordpress className="lang-icon wp" /><span>WordPress</span></div>
                          <div className="lang-marquee-item frontend-item"><SiNuxtdotjs className="lang-icon nuxt" /><span>Nuxt</span></div>
                          <div className="lang-marquee-item frontend-item"><SiNextdotjs className="lang-icon next" /><span>Next.js</span></div>
                        </div>
                        <div className="lang-marquee-content frontend-items" aria-hidden="true">
                          <div className="lang-marquee-item frontend-item"><FaVuejs className="lang-icon vue" /><span>Vue.js</span></div>
                          <div className="lang-marquee-item frontend-item"><SiTypescript className="lang-icon ts" /><span>TypeScript</span></div>
                          <div className="lang-marquee-item frontend-item"><FaJsSquare className="lang-icon js" /><span>JavaScript</span></div>
                          <div className="lang-marquee-item frontend-item"><FaHtml5 className="lang-icon html" /><span>HTML</span></div>
                          <div className="lang-marquee-item frontend-item"><FaCss3Alt className="lang-icon css" /><span>CSS</span></div>
                          <div className="lang-marquee-item frontend-item"><FaFigma className="lang-icon figma" /><span>Figma</span></div>
                          <div className="lang-marquee-item frontend-item"><FaWordpress className="lang-icon wp" /><span>WordPress</span></div>
                          <div className="lang-marquee-item frontend-item"><SiNuxtdotjs className="lang-icon nuxt" /><span>Nuxt</span></div>
                          <div className="lang-marquee-item frontend-item"><SiNextdotjs className="lang-icon next" /><span>Next.js</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Backend Row - scrolls right to left */}
                  <div className="lang-category">
                    <div className="lang-category-label backend-label">
                      <FaServer className="cat-icon" />
                      <span>Backend</span>
                    </div>
                    <div className="lang-marquee-wrapper">
                      <div className="lang-marquee-track">
                        <div className="lang-marquee-content">
                          <div className="lang-marquee-item backend-item"><FaPhp className="lang-icon php" /><span>PHP</span></div>
                          <div className="lang-marquee-item backend-item"><FaNodeJs className="lang-icon node" /><span>Node.js</span></div>
                          <div className="lang-marquee-item backend-item"><SiMongodb className="lang-icon mongo" /><span>MongoDB</span></div>
                          <div className="lang-marquee-item backend-item"><SiPostgresql className="lang-icon sql" /><span>PostgreSQL</span></div>
                          <div className="lang-marquee-item backend-item"><FaPython className="lang-icon python" /><span>Python</span></div>
                          <div className="lang-marquee-item backend-item"><SiLaravel className="lang-icon laravel" /><span>Laravel</span></div>
                          <div className="lang-marquee-item backend-item"><SiSequelize className="lang-icon sqlserver" /><span>sql Server</span></div>
                        </div>
                        <div className="lang-marquee-content backend-items" aria-hidden="true">
                          <div className="lang-marquee-item backend-item"><FaPhp className="lang-icon php" /><span>PHP</span></div>
                          <div className="lang-marquee-item backend-item"><FaNodeJs className="lang-icon node" /><span>Node.js</span></div>
                          <div className="lang-marquee-item backend-item"><SiMongodb className="lang-icon mongo" /><span>MongoDB</span></div>
                          <div className="lang-marquee-item backend-item"><SiPostgresql className="lang-icon sql" /><span>PostgreSQL</span></div>
                          <div className="lang-marquee-item backend-item"><FaPython className="lang-icon python" /><span>Python</span></div>
                          <div className="lang-marquee-item backend-item"><SiLaravel className="lang-icon laravel" /><span>Laravel</span></div>
                          <div className="lang-marquee-item backend-item"><BiSolidMessageSquareDetail  className="lang-icon laravel" /><span>sql server</span></div>

                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tools Row - scrolls right to left */}
                  <div className="lang-category">
                    <div className="lang-category-label tools-label">
                      <FaTools className="cat-icon" />
                      <span>Tools</span>
                    </div>
                    <div className="lang-marquee-wrapper">
                      <div className="lang-marquee-track">
                        <div className="lang-marquee-content">
                          <div className="lang-marquee-item tools-item"><FaAws className="lang-icon aws" /><span>AWS</span></div>
                          <div className="lang-marquee-item tools-item"><FaCloud className="lang-icon vercel" /><span>Vercel</span></div>
                          <div className="lang-marquee-item tools-item"><FaChartBar className="lang-icon data" /><span>Data Analysis</span></div>
                          <div className="lang-marquee-item tools-item"><FaGithub className="lang-icon github" /><span>GitHub</span></div>
                          <div className="lang-marquee-item tools-item"><FaGitAlt className="lang-icon git" /><span>Git</span></div>
                          <div className="lang-marquee-item tools-item"><SiDockerBrand className="lang-icon docker" /><span>Docker</span></div>
                          <div className="lang-marquee-item tools-item"><FaChartLine className="lang-icon powerbi" /><span>Power BI</span></div>
                        </div>
                        <div className="lang-marquee-content tools-items" aria-hidden="true">
                          <div className="lang-marquee-item tools-item"><FaAws className="lang-icon aws" /><span>AWS</span></div>
                          <div className="lang-marquee-item tools-item"><FaCloud className="lang-icon vercel" /><span>Vercel</span></div>
                          <div className="lang-marquee-item tools-item"><FaChartBar className="lang-icon data" /><span>Data Analysis</span></div>
                          <div className="lang-marquee-item tools-item"><FaGithub className="lang-icon github" /><span>GitHub</span></div>
                          <div className="lang-marquee-item tools-item"><FaGitAlt className="lang-icon git" /><span>Git</span></div>
                          <div className="lang-marquee-item tools-item"><SiDockerBrand className="lang-icon docker" /><span>Docker</span></div>
                          <div className="lang-marquee-item tools-item"><FaChartLine className="lang-icon powerbi" /><span>Power BI</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Highlights */}
          <div className="achievements-section">
            <div className="achievement-item">
              <FaTrophy className="achievement-icon" />
              <span className="achievement-value">20+</span>
              <span className="achievement-label">{t.about.achievements.projects}</span>
            </div>
            <div className="achievement-item">
              <FaBriefcase className="achievement-icon" />
              <span className="achievement-value">3+</span>
              <span className="achievement-label">{t.about.achievements.experience}</span>
            </div>
            <div className="achievement-item">
              <FaStar className="achievement-icon" />
              <span className="achievement-value">100%</span>
              <span className="achievement-label">{t.about.achievements.satisfaction}</span>
            </div>
            <div className="achievement-item">
              <FaAward className="achievement-icon" />
              <span className="achievement-value">12+</span>
              <span className="achievement-label">{t.about.achievements.certifications}</span>
            </div>
          </div>

          {/* Career Journey Timeline */}
          <div className="journey-section">
            <h3 className="section-title">{t.about.journey}</h3>
            <div className="journey-timeline">
              <div className="journey-item">
                <div className="journey-marker"></div>
                <div className="journey-content">
                  <div className="journey-header">
                    <h4>{t.about.journey1Title}</h4>
                    <span className="journey-date"><FaCalendarAlt /> {t.about.journey1Date}</span>
                  </div>
                  <span className="journey-tag">{t.about.journey1Tag}</span>
                  <p>{t.about.journey1Desc}</p>
                </div>
              </div>
              <div className="journey-item">
                <div className="journey-marker"></div>
                <div className="journey-content">
                  <div className="journey-header">
                    <h4>{t.about.journey2Title}</h4>
                    <span className="journey-date"><FaCalendarAlt /> {t.about.journey2Date}</span>
                  </div>
                  <span className="journey-tag past">{t.about.journey2Tag}</span>
                  <p>{t.about.journey2Desc}</p>
                </div>
              </div>
              <div className="journey-item">
                <div className="journey-marker"></div>
                <div className="journey-content">
                  <div className="journey-header">
                    <h4>{t.about.journey3Title}</h4>
                    <span className="journey-date"><FaCalendarAlt /> {t.about.journey3Date}</span>
                  </div>
                  <span className="journey-tag past">{t.about.journey3Tag}</span>
                  <p>{t.about.journey3Desc}</p>
                </div>
              </div>
              <div className="journey-item">
                <div className="journey-marker"></div>
                <div className="journey-content">
                  <div className="journey-header">
                    <h4>{t.about.journey4Title}</h4>
                    <span className="journey-date"><FaCalendarAlt /> {t.about.journey4Date}</span>
                  </div>
                  <span className="journey-tag past">{t.about.journey4Tag}</span>
                  <p>{t.about.journey4Desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* What I Do - Premium Services Cards */}
          <div className="expertise-section">
            <div className="expertise-header">
              <span className="expertise-pretitle">{lang === "km" ? "ជំនាញ & សេវាកម្ម" : "Services & Expertise"}</span>
              <h3 className="section-title">{t.about.expertise}</h3>
              {t.about.expertiseSub && (
                <p className="expertise-subheading">{t.about.expertiseSub}</p>
              )}
            </div>

            <div className="expertise-grid">
              {/* 1. Frontend Development */}
              <div className="expertise-card frontend">
                <div className="expertise-glow" aria-hidden="true"></div>
                <div className="expertise-card-top">
                  <div className="expertise-icon-wrap frontend-icon">
                    <FaLaptopCode className="expertise-icon" />
                  </div>
                  <span className="expertise-category-badge">Frontend</span>
                </div>
                <div className="expertise-card-content">
                  <h4>{t.about.expertise1Title}</h4>
                  <p>{t.about.expertise1Desc}</p>
                </div>
                <div className="expertise-tags-row">
                  <span className="expertise-tag-pill">React.js</span>
                  <span className="expertise-tag-pill">Next.js</span>
                  <span className="expertise-tag-pill">TypeScript</span>
                  <span className="expertise-tag-pill">Vue.js</span>
                  <span className="expertise-tag-pill">Tailwind CSS</span>
                </div>
                <div className="expertise-card-border" aria-hidden="true"></div>
              </div>

              {/* 2. Backend & API Engineering */}
              <div className="expertise-card backend">
                <div className="expertise-glow" aria-hidden="true"></div>
                <div className="expertise-card-top">
                  <div className="expertise-icon-wrap backend-icon">
                    <FaServer className="expertise-icon" />
                  </div>
                  <span className="expertise-category-badge">Backend</span>
                </div>
                <div className="expertise-card-content">
                  <h4>{t.about.expertise2Title}</h4>
                  <p>{t.about.expertise2Desc}</p>
                </div>
                <div className="expertise-tags-row">
                  <span className="expertise-tag-pill">Laravel</span>
                  <span className="expertise-tag-pill">REST APIs</span>
                  <span className="expertise-tag-pill">MySQL</span>
                  <span className="expertise-tag-pill">Postman</span>
                  <span className="expertise-tag-pill">Node.js</span>
                </div>
                <div className="expertise-card-border" aria-hidden="true"></div>
              </div>

              {/* 3. Responsive & Mobile-First */}
              <div className="expertise-card mobile">
                <div className="expertise-glow" aria-hidden="true"></div>
                <div className="expertise-card-top">
                  <div className="expertise-icon-wrap mobile-icon">
                    <FaMobileAlt className="expertise-icon" />
                  </div>
                  <span className="expertise-category-badge">Mobile-First</span>
                </div>
                <div className="expertise-card-content">
                  <h4>{t.about.expertise3Title}</h4>
                  <p>{t.about.expertise3Desc}</p>
                </div>
                <div className="expertise-tags-row">
                  <span className="expertise-tag-pill">Responsive Design</span>
                  <span className="expertise-tag-pill">Cross-Browser</span>
                  <span className="expertise-tag-pill">Fluid Layouts</span>
                </div>
                <div className="expertise-card-border" aria-hidden="true"></div>
              </div>

              {/* 4. DevOps & Cloud Tools */}
              <div className="expertise-card tools">
                <div className="expertise-glow" aria-hidden="true"></div>
                <div className="expertise-card-top">
                  <div className="expertise-icon-wrap tools-icon">
                    <FaCloud className="expertise-icon" />
                  </div>
                  <span className="expertise-category-badge">DevOps</span>
                </div>
                <div className="expertise-card-content">
                  <h4>{t.about.expertise4Title}</h4>
                  <p>{t.about.expertise4Desc}</p>
                </div>
                <div className="expertise-tags-row">
                  <span className="expertise-tag-pill">Docker</span>
                  <span className="expertise-tag-pill">Vercel</span>
                  <span className="expertise-tag-pill">MVC Architecture</span>
                  <span className="expertise-tag-pill">Git / GitHub</span>
                  <span className="expertise-tag-pill">CI/CD</span>
                </div>
                <div className="expertise-card-border" aria-hidden="true"></div>
              </div>

              {/* 5. UI/UX Design & Prototyping */}
              <div className="expertise-card uxui">
                <div className="expertise-glow" aria-hidden="true"></div>
                <div className="expertise-card-top">
                  <div className="expertise-icon-wrap uxui-icon">
                    <FaFigma className="expertise-icon" />
                  </div>
                  <span className="expertise-category-badge">UI / UX</span>
                </div>
                <div className="expertise-card-content">
                  <h4>{t.about.expertise5Title}</h4>
                  <p>{t.about.expertise5Desc}</p>
                </div>
                <div className="expertise-tags-row">
                  <span className="expertise-tag-pill">Figma</span>
                  <span className="expertise-tag-pill">Wireframing</span>
                  <span className="expertise-tag-pill">Design Systems</span>
                  <span className="expertise-tag-pill">Prototyping</span>
                </div>
                <div className="expertise-card-border" aria-hidden="true"></div>
              </div>

              {/* 6. Database Administration */}
              <div className="expertise-card itsupport">
                <div className="expertise-glow" aria-hidden="true"></div>
                <div className="expertise-card-top">
                  <div className="expertise-icon-wrap itsupport-icon">
                    <FaDatabase className="expertise-icon" />
                  </div>
                  <span className="expertise-category-badge">Database</span>
                </div>
                <div className="expertise-card-content">
                  <h4>{t.about.expertise6Title}</h4>
                  <p>{t.about.expertise6Desc}</p>
                </div>
                <div className="expertise-tags-row">
                  <span className="expertise-tag-pill">MySQL</span>
                  <span className="expertise-tag-pill">PostgreSQL</span>
                  <span className="expertise-tag-pill">MongoDB</span>
                  <span className="expertise-tag-pill">SQL Optimization</span>
                </div>
                <div className="expertise-card-border" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isImageOpen && (
        <div
          className="image-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded profile image"
          onClick={() => setIsImageOpen(false)}
        >
          <div className="image-modal-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="image-modal-close"
              onClick={() => setIsImageOpen(false)}
              aria-label="Close image viewer"
            >
              <FaTimes />
            </button>
            <img src={profile} alt="Ream Khorn enlarged profile" className="image-modal-photo" />
            <span className="image-modal-caption">Ream Khorn · Full-Stack Developer</span>
          </div>
        </div>
      )}
    </section>
  );
}

export default About;
