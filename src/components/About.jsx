import "../css/About.css";
import { FaReact, FaCode, FaLaptopCode, FaGraduationCap, FaNodeJs, FaDatabase, FaGitAlt, FaCloud, FaMobileAlt, FaPalette, FaChartLine, FaAward, FaRocket, FaGithub, FaLanguage, FaCertificate, FaHtml5, FaCss3Alt, FaJsSquare, FaPython, FaDocker, FaAws, FaFigma, FaServer, FaTools, FaStar, FaTrophy, FaBriefcase, FaCalendarAlt, FaWordpress, FaPhp, FaVuejs, FaHeadset, FaDownload, FaMapMarkerAlt, FaHeart, FaUser, FaHome, FaSmile, FaTimes, FaArrowRight, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { useEffect, useMemo, useRef, useState } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useLanguage } from "../contexts/LanguageContext";
import profile from "../assets/ream.png";
import aboutVideo from "../assets/262696.mp4";
import cvFile from "../assets/Deep Purple Professional College Student CV Resume.pdf";

const defaultMapCenter = [0, 0];
const posterImage = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="55%" stop-color="#111827"/>
        <stop offset="100%" stop-color="#1d4ed8"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="25%" r="60%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="700" fill="url(#bg)"/>
    <circle cx="620" cy="240" r="260" fill="url(#glow)"/>
    <rect x="110" y="110" width="980" height="480" rx="28" fill="rgba(15,23,42,0.38)" stroke="rgba(148,163,184,0.48)"/>
    <circle cx="430" cy="300" r="80" fill="rgba(59,130,246,0.45)"/>
    <circle cx="840" cy="260" r="120" fill="rgba(168,85,247,0.35)"/>
    <path d="M540 410L630 320L720 360L850 230" fill="none" stroke="#e2e8f0" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
    <text x="600" y="530" text-anchor="middle" font-family="Segoe UI, Arial" font-size="54" fill="#f8fafc" font-weight="700">Portfolio Reel</text>
  </svg>
`)}`;

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function MapCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 15, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [map, position]);

  return null;
}

function LiveLocationMap() {
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("requesting");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationStatus("unsupported");
      setErrorMessage("Location access is not supported in this browser.");
      return undefined;
    }

    const onSuccess = (position) => {
      const nextLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
      };

      setLocation(nextLocation);
      setLocationStatus("granted");
      setErrorMessage("");
    };

    const onError = (error) => {
      const message =
        error.code === error.PERMISSION_DENIED
          ? "Location permission was denied. Enable location access to show your live position."
          : "Unable to read your current location right now. Please try again.";

      setLocationStatus("denied");
      setErrorMessage(message);
    };

    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 1000,
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const markerIcon = useMemo(
    () =>
      L.divIcon({
        className: "live-location-marker",
        html: '<span class="live-marker-dot"></span>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    []
  );

  const initialCenter = location ? [location.lat, location.lng] : defaultMapCenter;
  const locationLabel = location
    ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
    : "Waiting for GPS";

  return (
    <div className="location-map-wrap">
      <div className="map-toolbar">
        <span className="map-toolbar-title">{"LOCATION MAP"}</span>
        <span className="map-toolbar-mode">{locationStatus === "granted" ? "LIVE" : "GPS"}</span>
      </div>

      <MapContainer
        className="location-map-visual"
        center={initialCenter}
        zoom={location ? 15 : 2}
        scrollWheelZoom
        zoomControl
        attributionControl
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {location && (
          <>
            <MapCenter position={location} />
            <Circle
              center={[location.lat, location.lng]}
              radius={location.accuracy || 25}
              pathOptions={{
                color: "#38bdf8",
                fillColor: "#38bdf8",
                fillOpacity: 0.12,
                weight: 1,
              }}
            />
            <Marker position={[location.lat, location.lng]} icon={markerIcon}>
              <Popup>
                You are here.\n{locationLabel}
              </Popup>
            </Marker>
          </>
        )}
      </MapContainer>

      <div className="location-map-badge">
        <span className="live-map-status-dot" aria-hidden="true" />
        <span>{locationStatus === "granted" ? "Live location" : "Location status"}</span>
      </div>

      <div className="map-visual-label">
        <span>LOCATION</span>
        <strong>{locationStatus === "granted" ? "Current Position" : "Waiting for access"}</strong>
        <small>{location ? locationLabel : "Requesting your GPS position…"}</small>
      </div>

      {locationStatus !== "granted" && (
        <div className="location-status-toast" role="status" aria-live="polite">
          {locationStatus === "requesting"
            ? "Requesting your location permission…"
            : errorMessage}
        </div>
      )}
    </div>
  );
}

function ModernVideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const syncValues = () => {
      setDuration(Number.isFinite(video.duration) ? video.duration : 0);
      setProgress(video.currentTime || 0);
      setIsPlaying(!video.paused && !video.ended);
      setIsMuted(video.muted || volume === 0);
    };

    const handleLoadedMetadata = () => {
      video.volume = volume;
      video.playbackRate = playbackRate;
      setDuration(Number.isFinite(video.duration) ? video.duration : 0);
      setIsLoading(false);
      setError("");
      syncValues();
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setError("");
      if (!video.paused) {
        setIsPlaying(true);
      }
    };

    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setProgress(video.currentTime);
    const handleError = () => {
      setIsLoading(false);
      setError("Unable to load the video. Please refresh or try again.");
    };
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("error", handleError);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("error", handleError);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [playbackRate, volume]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume;
    video.muted = isMuted;
  }, [isMuted, volume]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.autoPlay = true;
    video.loop = true;
    video.muted = isMuted;
    video.playsInline = true;
    video.preload = "metadata";
    video.play().catch(() => setIsPlaying(false));
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setError("Playback was blocked. Please interact with the player again.");
      }
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && volume === 0) {
      setVolume(0.7);
      video.volume = 0.7;
    }
  };

  const handleSeek = (event) => {
    const video = videoRef.current;
    if (!video) return;
    const nextTime = Number(event.target.value);
    video.currentTime = nextTime;
    setProgress(nextTime);
  };

  const handleVolume = (event) => {
    const nextVolume = Number(event.target.value);
    const video = videoRef.current;
    if (!video) return;

    video.volume = nextVolume;
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
    video.muted = nextVolume === 0;
  };

  const toggleFullscreen = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (!document.fullscreenElement) {
        await video.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      setError("Fullscreen is not available in this browser.");
    }
  };

  const cyclePlaybackRate = () => {
    const options = [1, 1.25, 1.5, 2];
    const nextIndex = (options.indexOf(playbackRate) + 1) % options.length;
    const nextRate = options[nextIndex];
    const video = videoRef.current;
    if (video) video.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  return (
    <div className="about-video-shell">
      <div className="video-topbar">
        <span className="video-badge">Featured reel</span>
        <span className={`video-status ${isLoading ? "loading" : isPlaying ? "playing" : "ready"}`}>
          {error ? "Error" : isLoading ? "Loading" : isPlaying ? "Playing" : "Ready"}
        </span>
      </div>

      <div className="video-frame">
        <video
          ref={videoRef}
          className="about-video-player"
          src={aboutVideo}
          poster={posterImage}
          playsInline
          preload="metadata"
          muted={isMuted}
          loop
          autoPlay
          aria-label="Portfolio video showcase"
        />

        {isLoading && (
          <div className="video-loading-overlay" aria-live="polite">
            <FaSpinner className="video-spinner" />
            <span>Loading video</span>
          </div>
        )}

        {error && (
          <div className="video-error-overlay" role="alert">
            <FaExclamationTriangle />
            <span>{error}</span>
          </div>
        )}

        <div className="video-play-overlay">
          <button
            type="button"
            className="video-main-toggle"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      </div>

      <div className="video-controls">
        <button type="button" className="video-control-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button type="button" className="video-control-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>

        <input
          aria-label="Video progress"
          className="video-progress"
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={progress}
          onChange={handleSeek}
        />

        <span className="video-time">{formatTime(progress)} / {formatTime(duration)}</span>

        <button type="button" className="video-speed-btn" onClick={cyclePlaybackRate} aria-label="Change playback speed">
          {playbackRate}x
        </button>

        <button type="button" className="video-control-btn" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
          <FaExpand />
        </button>
      </div>

      <div className="video-volume-wrap">
        <label htmlFor="video-volume" className="sr-only">Volume</label>
        <input
          id="video-volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
          className="video-volume"
          aria-label="Volume"
        />
      </div>
    </div>
  );
}

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
        <ModernVideoPlayer />
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
          <LiveLocationMap />
          <div className="location-content">
            <div className="location-icon"><FaMapMarkerAlt /></div>
            <span className="location-eyebrow">{lang === "km" ? "កន្លែងកំណើត" : "MY ROOTS"}</span>
            <h3>{lang === "km" ? "ទីតាំងបច្ចុប្បន្នរបស់ខ្ញុំ" : "My live location"}</h3>
            <p>
              {lang === "km"
                ? "ប្រើ GPS របស់កម្ម្មរលើក ដើម្បីបង្ហាញទីតាំងពិតប្រាកដ និងអាប់ដេតដោយស្វ័យប្រវត្តិ នៅពេលអ្នកផ្លាស់ទី។"
                : "This map requests your browser location permission and updates automatically as you move so your real-time position is shown accurately."}
            </p>
            <a
              className="location-link"
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
            >
              {lang === "km" ? "បើក Google Maps" : "Open Google Maps"}
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