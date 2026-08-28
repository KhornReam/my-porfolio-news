import "../css/About.css";
import { FaReact, FaCode, FaLaptopCode, FaGraduationCap, FaNodeJs, FaDatabase, FaGitAlt, FaCloud, FaMobileAlt, FaPalette, FaChartLine, FaAward, FaRocket, FaGithub, FaLanguage, FaCertificate, FaHtml5, FaCss3Alt, FaJsSquare, FaPython, FaDocker, FaAws, FaFigma, FaServer, FaTools, FaStar, FaTrophy, FaBriefcase, FaCalendarAlt, FaWordpress, FaPhp, FaVuejs, FaHeadset, FaDownload, FaMapMarkerAlt, FaHeart, FaUser, FaHome, FaSmile, FaTimes, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import profile from "../assets/ream.png";
import aboutVideo from "../assets/262696.mp4";
import cvFile from "../assets/Deep Purple Professional College Student CV Resume.pdf";

function About() {
  const { t, lang } = useLanguage();
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
      {/* Hero Background */}
      <div className="hero-background">
        <video
          className="about-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={aboutVideo} type="video/mp4" />
        </video>
        <div className="about-video-overlay" aria-hidden="true"></div>
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
          <h2 className="section-heading">{t.about.heading}</h2>
          <p className="section-subheading">{t.about.subheading}</p>
          {lang === "km" && (
            <p className="khmer-intro">{t.about.khmerIntro}</p>
          )}
        </div>

        {/* Personal Info Section */}
        <div className="personal-info-section">
          <div className="personal-info-container">
            <div className="personal-info-left">
              <div className="personal-info-badge">
                <FaHeart className="badge-icon" />
                <span>{t.about.personalInfo}</span>
              </div>
              <h2 className="personal-info-title">{t.about.personalInfoSub}</h2>
              <p className="personal-info-bio">{t.about.personalBio}</p>
              <div className="personal-details-grid">
                <div className="personal-detail-item">
                  <div className="detail-icon"><FaUser /></div>
                  <div className="detail-content">
                    <span className="detail-label">{t.about.personalDetails.age}</span>
                    <span className="detail-value">{t.about.personalDetails.ageValue}</span>
                  </div>
                </div>
                <div className="personal-detail-item">
                  <div className="detail-icon"><FaHome /></div>
                  <div className="detail-content">
                    <span className="detail-label">{t.about.personalDetails.birthplace}</span>
                    <span className="detail-value">{t.about.personalDetails.birthplaceValue}</span>
                  </div>
                </div>
                <div className="personal-detail-item">
                  <div className="detail-icon"><FaHeart /></div>
                  <div className="detail-content">
                    <span className="detail-label">{t.about.personalDetails.family}</span>
                    <span className="detail-value">{t.about.personalDetails.familyValue}</span>
                  </div>
                </div>
                <div className="personal-detail-item">
                  <div className="detail-icon"><FaSmile /></div>
                  <div className="detail-content">
                    <span className="detail-label">{t.about.personalDetails.personality}</span>
                    <span className="detail-value">{t.about.personalDetails.personalityValue}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="personal-info-right">
              <div className="personal-profile-card">
                <div className="personal-profile-glow"></div>
                <div className="personal-image-wrapper">
                  <button
                    type="button"
                    className="image-trigger"
                    onClick={() => setIsImageOpen(true)}
                    aria-label="View a larger profile image"
                  >
                    <img src={profile} alt="Ream Khorn" className="personal-profile-image" />
                    <span className="image-view-label">View image</span>
                  </button>
                  <div className="profile-orbit" aria-hidden="true">
                    <span className="orbit-icon orbit-react"><FaReact /></span>
                    <span className="orbit-icon orbit-node"><FaNodeJs /></span>
                    <span className="orbit-icon orbit-js"><FaJsSquare /></span>
                    <span className="orbit-icon orbit-python"><FaPython /></span>
                  </div>
                  <div className="personal-sparkle"></div>
                  <div className="personal-sparkle"></div>
                  <div className="personal-sparkle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="location-card">
          <div className="location-map-wrap">
            <div className="map-toolbar">
              <span className="map-toolbar-title">{lang === "km" ? "ផែនទីទីតាំង" : "LOCATION MAP"}</span>
              <span className="map-toolbar-mode">{lang === "km" ? "កម្ពុជា" : "CAMBODIA"}</span>
            </div>
            <div className="location-map-visual" role="img" aria-label="Map illustration showing Kampong Thom, Cambodia">
              <svg viewBox="0 0 800 400" aria-hidden="true" focusable="false">
                <path className="map-river" d="M80 40 C180 100 140 155 260 190 S400 205 465 285 S650 330 760 370" />
                <path className="map-road road-main" d="M20 320 C160 275 265 300 370 230 S585 120 790 70" />
                <path className="map-road" d="M110 20 C180 105 220 160 205 370" />
                <path className="map-road" d="M420 20 C390 120 470 170 520 380" />
                <path className="map-road" d="M630 30 C590 130 650 200 760 260" />
                <path className="map-road road-small" d="M40 130 C175 180 300 135 420 160 S630 205 780 170" />
                <circle className="map-area" cx="150" cy="260" r="28" />
                <circle className="map-area" cx="650" cy="125" r="38" />
                <circle className="map-area" cx="345" cy="100" r="18" />
                <g className="map-marker" transform="translate(400 205) scale(1.25)">
                  <circle className="map-marker-pulse" cx="0" cy="0" r="30" />
                  <path d="M0 28 C-5 20 -22 4 -22 -9 A22 22 0 1 1 22 -9 C22 4 5 20 0 28Z" />
                  <circle cx="0" cy="-9" r="7" />
                </g>
              </svg>
              <div className="map-visual-label">
                <span>{lang === "km" ? "ទីតាំង" : "LOCATION"}</span>
                <strong>{lang === "km" ? "កំពង់ធំ" : "Kampong Thom"}</strong>
                <small>Cambodia · 12.25°N, 104.67°E</small>
              </div>
            </div>
            <div className="location-map-badge">
              <FaMapMarkerAlt />
              <span>{lang === "km" ? "កំពង់ធំ" : "Kampong Thom"}</span>
            </div>
          </div>
          <div className="location-content">
            <div className="location-icon"><FaMapMarkerAlt /></div>
            <span className="location-eyebrow">{lang === "km" ? "កន្លែងកំណើត" : "MY ROOTS"}</span>
            <h3>{lang === "km" ? "កំពង់ធំ ប្រទេសកម្ពុជា" : "Kampong Thom, Cambodia"}</h3>
            <p>{lang === "km" ? "ទីកន្លែងដែលខ្ញុំកើត និងជាកន្លែងដែលចាប់ផ្តើមដំណើររបស់ខ្ញុំជាមួយបច្ចេកវិទ្យា។" : "The place I was born and where my journey with technology began."}</p>
            <a
              className="location-link"
              href="https://www.google.com/maps/search/?api=1&query=Kampong+Thom%2C+Cambodia"
              target="_blank"
              rel="noopener noreferrer"
            >
              {lang === "km" ? "បើកក្នុង Google Maps" : "Open in Google Maps"}
              <FaArrowRight />
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
                          <div className="lang-marquee-item frontend-item"><FaJsSquare className="lang-icon ts" /><span>TypeScript</span></div>
                          <div className="lang-marquee-item frontend-item"><FaJsSquare className="lang-icon js" /><span>JavaScript</span></div>
                          <div className="lang-marquee-item frontend-item"><FaHtml5 className="lang-icon html" /><span>HTML</span></div>
                          <div className="lang-marquee-item frontend-item"><FaCss3Alt className="lang-icon css" /><span>CSS</span></div>
                          <div className="lang-marquee-item frontend-item"><FaFigma className="lang-icon figma" /><span>Figma</span></div>
                          <div className="lang-marquee-item frontend-item"><FaWordpress className="lang-icon wp" /><span>WordPress</span></div>
                        </div>
                        <div className="lang-marquee-content frontend-items" aria-hidden="true">
                          <div className="lang-marquee-item frontend-item"><FaVuejs className="lang-icon vue" /><span>Vue.js</span></div>
                          <div className="lang-marquee-item frontend-item"><FaJsSquare className="lang-icon ts" /><span>TypeScript</span></div>
                          <div className="lang-marquee-item frontend-item"><FaJsSquare className="lang-icon js" /><span>JavaScript</span></div>
                          <div className="lang-marquee-item frontend-item"><FaHtml5 className="lang-icon html" /><span>HTML</span></div>
                          <div className="lang-marquee-item frontend-item"><FaCss3Alt className="lang-icon css" /><span>CSS</span></div>
                          <div className="lang-marquee-item frontend-item"><FaFigma className="lang-icon figma" /><span>Figma</span></div>
                          <div className="lang-marquee-item frontend-item"><FaWordpress className="lang-icon wp" /><span>WordPress</span></div>
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
                          <div className="lang-marquee-item backend-item"><FaDatabase className="lang-icon mongo" /><span>MongoDB</span></div>
                          <div className="lang-marquee-item backend-item"><FaDatabase className="lang-icon sql" /><span>SQL</span></div>
                          <div className="lang-marquee-item backend-item"><FaPython className="lang-icon python" /><span>Python</span></div>
                          <div className="lang-marquee-item backend-item"><FaPhp className="lang-icon laravel" /><span>Laravel</span></div>
                        </div>
                        <div className="lang-marquee-content backend-items" aria-hidden="true">
                          <div className="lang-marquee-item backend-item"><FaPhp className="lang-icon php" /><span>PHP</span></div>
                          <div className="lang-marquee-item backend-item"><FaNodeJs className="lang-icon node" /><span>Node.js</span></div>
                          <div className="lang-marquee-item backend-item"><FaDatabase className="lang-icon mongo" /><span>MongoDB</span></div>
                          <div className="lang-marquee-item backend-item"><FaDatabase className="lang-icon sql" /><span>SQL</span></div>
                          <div className="lang-marquee-item backend-item"><FaPython className="lang-icon python" /><span>Python</span></div>
                          <div className="lang-marquee-item backend-item"><FaPhp className="lang-icon laravel" /><span>Laravel</span></div>
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
                          <div className="lang-marquee-item tools-item"><FaServer className="lang-icon vercel" /><span>Vercel</span></div>
                          <div className="lang-marquee-item tools-item"><FaChartLine className="lang-icon data" /><span>Data Analysis</span></div>
                          <div className="lang-marquee-item tools-item"><FaGithub className="lang-icon github" /><span>GitHub</span></div>
                          <div className="lang-marquee-item tools-item"><FaGitAlt className="lang-icon git" /><span>Git</span></div>
                          <div className="lang-marquee-item tools-item"><FaServer className="lang-icon laragon" /><span>Laragon</span></div>
                          <div className="lang-marquee-item tools-item"><FaServer className="lang-icon Power BI" /><span>Power BI</span></div>
                        </div>
                        <div className="lang-marquee-content tools-items" aria-hidden="true">
                          <div className="lang-marquee-item tools-item"><FaAws className="lang-icon aws" /><span>AWS</span></div>
                          <div className="lang-marquee-item tools-item"><FaServer className="lang-icon vercel" /><span>Vercel</span></div>
                          <div className="lang-marquee-item tools-item"><FaChartLine className="lang-icon data" /><span>Data Analysis</span></div>
                          <div className="lang-marquee-item tools-item"><FaGithub className="lang-icon github" /><span>GitHub</span></div>
                          <div className="lang-marquee-item tools-item"><FaGitAlt className="lang-icon git" /><span>Git</span></div>
                          <div className="lang-marquee-item tools-item"><FaServer className="lang-icon laragon" /><span>Laragon</span></div>
                          <div className="lang-marquee-item tools-item"><FaServer className="lang-icon Power BI" /><span>Power BI</span></div>
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
              <span className="achievement-value">12+</span>
              <span className="achievement-label">{t.about.achievements.projects}</span>
            </div>
            <div className="achievement-item">
              <FaBriefcase className="achievement-icon" />
              <span className="achievement-value">2+</span>
              <span className="achievement-label">{t.about.achievements.experience}</span>
            </div>
            <div className="achievement-item">
              <FaStar className="achievement-icon" />
              <span className="achievement-value">100%</span>
              <span className="achievement-label">{t.about.achievements.satisfaction}</span>
            </div>
            <div className="achievement-item">
              <FaAward className="achievement-icon" />
              <span className="achievement-value">4+</span>
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
            </div>
          </div>

          {/* Core Services Cards */}
          <div className="expertise-section">
            <h3 className="section-title">{t.about.expertise}</h3>
            <div className="expertise-grid">
              <div className="expertise-card frontend">
                <div className="expertise-glow"></div>
                <div className="expertise-card-bg"></div>
                <div className="expertise-icon-wrap" style={{background: 'linear-gradient(135deg, #61dafb, #38bdf8)'}}>
                  <FaPalette className="expertise-icon" />
                </div>
                <div className="expertise-card-content">
                  <h4>{t.about.expertise1Title}</h4>
                  <p>{t.about.expertise1Desc}</p>
                </div>
                <div className="expertise-footer">
                  <div className="expertise-tag" style={{background: 'rgba(97, 218, 251, 0.15)', color: '#61dafb'}}>{lang === 'km' ? 'ជំនាញ' : 'Expert'}</div>
                  <div className="expertise-stat">
                    <div className="expertise-stat-bar">
                      <div className="expertise-stat-fill" style={{width: '90%', background: 'linear-gradient(90deg, #61dafb, #38bdf8)'}}></div>
                    </div>
                    <span className="expertise-stat-value" style={{color: '#61dafb'}}>90%</span>
                  </div>
                </div>
                <div className="expertise-border"></div>
              </div>

              <div className="expertise-card backend">
                <div className="expertise-glow"></div>
                <div className="expertise-card-bg"></div>
                <div className="expertise-icon-wrap" style={{background: 'linear-gradient(135deg, #68a063, #4caf50)'}}>
                  <FaServer className="expertise-icon" />
                </div>
                <div className="expertise-card-content">
                  <h4>{t.about.expertise2Title}</h4>
                  <p>{t.about.expertise2Desc}</p>
                </div>
                <div className="expertise-footer">
                  <div className="expertise-tag" style={{background: 'rgba(104, 160, 99, 0.15)', color: '#68a063'}}>{lang === 'km' ? 'ជំនាញ' : 'Expert'}</div>
                  <div className="expertise-stat">
                    <div className="expertise-stat-bar">
                      <div className="expertise-stat-fill" style={{width: '85%', background: 'linear-gradient(90deg, #68a063, #4caf50)'}}></div>
                    </div>
                    <span className="expertise-stat-value" style={{color: '#68a063'}}>85%</span>
                  </div>
                </div>
                <div className="expertise-border"></div>
              </div>

              <div className="expertise-card mobile">
                <div className="expertise-glow"></div>
                <div className="expertise-card-bg"></div>
                <div className="expertise-icon-wrap" style={{background: 'linear-gradient(135deg, #4ecdc4, #2dd4bf)'}}>
                  <FaMobileAlt className="expertise-icon" />
                </div>
                <div className="expertise-card-content">
                  <h4>{t.about.expertise3Title}</h4>
                  <p>{t.about.expertise3Desc}</p>
                </div>
                <div className="expertise-footer">
                  <div className="expertise-tag" style={{background: 'rgba(78, 205, 196, 0.15)', color: '#4ecdc4'}}>{lang === 'km' ? 'ជំនាញ' : 'Advanced'}</div>
                  <div className="expertise-stat">
                    <div className="expertise-stat-bar">
                      <div className="expertise-stat-fill" style={{width: '95%', background: 'linear-gradient(90deg, #4ecdc4, #2dd4bf)'}}></div>
                    </div>
                    <span className="expertise-stat-value" style={{color: '#4ecdc4'}}>95%</span>
                  </div>
                </div>
                <div className="expertise-border"></div>
              </div>

              <div className="expertise-card tools">
                <div className="expertise-glow"></div>
                <div className="expertise-card-bg"></div>
                <div className="expertise-icon-wrap" style={{background: 'linear-gradient(135deg, #f59e0b, #eab308)'}}>
                  <FaTools className="expertise-icon" />
                </div>
                <div className="expertise-card-content">
                  <h4>{t.about.expertise4Title}</h4>
                  <p>{t.about.expertise4Desc}</p>
                </div>
                <div className="expertise-footer">
                  <div className="expertise-tag" style={{background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b'}}>{lang === 'km' ? 'ជំនាញ' : 'Proficient'}</div>
                  <div className="expertise-stat">
                    <div className="expertise-stat-bar">
                      <div className="expertise-stat-fill" style={{width: '80%', background: 'linear-gradient(90deg, #f59e0b, #eab308)'}}></div>
                    </div>
                    <span className="expertise-stat-value" style={{color: '#f59e0b'}}>80%</span>
                  </div>
                </div>
                <div className="expertise-border"></div>
              </div>

              {/* UX/UI Design */}
              <div className="expertise-card uxui">
                <div className="expertise-glow"></div>
                <div className="expertise-card-bg"></div>
                <div className="expertise-icon-wrap" style={{background: 'linear-gradient(135deg, #a855f7, #8b5cf6)'}}>
                  <FaFigma className="expertise-icon" />
                </div>
                <div className="expertise-card-content">
                  <h4>{t.about.expertise5Title}</h4>
                  <p>{t.about.expertise5Desc}</p>
                </div>
                <div className="expertise-footer">
                  <div className="expertise-tag" style={{background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7'}}>{lang === 'km' ? 'ជំនាញ' : 'Proficient'}</div>
                  <div className="expertise-stat">
                    <div className="expertise-stat-bar">
                      <div className="expertise-stat-fill" style={{width: '70%', background: 'linear-gradient(90deg, #a855f7, #8b5cf6)'}}></div>
                    </div>
                    <span className="expertise-stat-value" style={{color: '#a855f7'}}>70%</span>
                  </div>
                </div>
                <div className="expertise-border"></div>
              </div>

              {/* IT Support */}
              <div className="expertise-card itsupport">
                <div className="expertise-glow"></div>
                <div className="expertise-card-bg"></div>
                <div className="expertise-icon-wrap" style={{background: 'linear-gradient(135deg, #f43f5e, #e11d48)'}}>
                  <FaHeadset className="expertise-icon" />
                </div>
                <div className="expertise-card-content">
                  <h4>{t.about.expertise6Title}</h4>
                  <p>{t.about.expertise6Desc}</p>
                </div>
                <div className="expertise-footer">
                  <div className="expertise-tag" style={{background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e'}}>{lang === 'km' ? 'ជំនាញ' : 'Proficient'}</div>
                  <div className="expertise-stat">
                    <div className="expertise-stat-bar">
                      <div className="expertise-stat-fill" style={{width: '60%', background: 'linear-gradient(90deg, #f43f5e, #e11d48)'}}></div>
                    </div>
                    <span className="expertise-stat-value" style={{color: '#f43f5e'}}>60%</span>
                  </div>
                </div>
                <div className="expertise-border"></div>
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