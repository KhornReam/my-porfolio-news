import { useState, useEffect, useRef } from "react";
import "../css/Contact.css";
import {
  FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaCheckCircle, FaPaperPlane,
  FaUser, FaCommentAlt, FaArrowRight, FaRobot, FaCopy, FaCheck, FaRedo,
  FaCode, FaBriefcase, FaGraduationCap
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
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

  // Modern Chatbot states
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState(null);
  const chatMessagesContainerRef = useRef(null);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: lang === "km"
        ? "សួស្តី! ខ្ញុំជាជំនួយការ AI របស់រាម។ សួរខ្ញុំអំពីជំនាញ គម្រោង ការសិក្សា ឬឱកាសការងាររបស់គាត់បាន។"
        : "Hi! I'm Ream's AI portfolio assistant. Ask me anything about his skills, projects, education, experience, or availability.",
      time: "Online",
    },
  ]);

  // Synchronize initial greeting when language changes
  useEffect(() => {
    setChatMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 1) {
        return [
          {
            id: 1,
            sender: "bot",
            text: lang === "km"
              ? "សួស្តី! ខ្ញុំជាជំនួយការ AI របស់រាម។ សួរខ្ញុំអំពីជំនាញ គម្រោង ការសិក្សា ឬឱកាសការងាររបស់គាត់បាន។"
              : "Hi! I'm Ream's AI portfolio assistant. Ask me anything about his skills, projects, education, experience, or availability.",
            time: "Online",
          },
        ];
      }
      return prev;
    });
  }, [lang]);

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
        ? "គម្រោងសំខាន់ៗរួមមាន My Journey of PNC (Next.js, TypeScript, Docker), Student Management System (Vue.js, Laravel, REST API), Achar Booking System, Personal Finance Tracker, Business Selling System, E-commerce Platform, Weather App និង Power BI Dashboard។ អ្នកអាចមើលព័ត៌មានលម្អិត និង Live Demo នៅផ្នែក Projects!"
        : "Ream’s featured projects include 'My Journey of PNC' (Next.js, TypeScript, Docker, Vercel), 'Student Management System' (Vue.js, Laravel, REST API, Docker), Achar Event Booking System, Personal Finance Tracker, Product Selling System, E-commerce Platform, Weather App, and Power BI Dashboard. Explore them all with live demos and code in the Projects section!";
    }
    if (/(education|study|school|សិក្សា|ការអប់រំ)/i.test(query)) {
      return isKhmer
        ? "រាមបានសិក្សា 2 ឆ្នាំនៅ Passerelles Numériques Cambodia (PNC) ក្នុងវិស័យ Full-Stack Web Development និង Information Technology។ គាត់បានបញ្ចប់វិទ្យាល័យក្នុងឆ្នាំ 2024។"
        : "Ream completed two years of study at Passerelles Numériques Cambodia (PNC), focusing on Full-Stack Web Development and Information Technology. He completed high school in 2024.";
    }
    if (/(certif|achievement|qualys|palo|dell|proofpoint|checkpoint|credly|license|វិញ្ញាបនបត្រ|សមិទ្ធផល)/i.test(query)) {
      return isKhmer
        ? "រាមមានវិញ្ញាបនបត្រជំនាញវិជ្ជាជីវៈកម្រិតអន្តរជាតិចំនួន 5 រួមមាន៖\n1. Qualys Certified Specialist: Vulnerability Management Detection and Response (VMDR)\n2. Palo Alto Networks: Network Threats and Security (Cert ID: C625337)\n3. Proofpoint Cybersecurity Academy: Partner Program Sales Engineer\n4. Check Point Sales Certification (Credly Verifiable)\n5. Dell Technologies Partner Program: SE: Hyper-Converged Infrastructure (HCI) 2026\nអ្នកអាចមើលរូបភាពវិញ្ញាបនបត្រដើមពេញលេញនៅផ្នែក Additional Experiences!"
        : "Ream holds 5 prestigious, verified industry certifications:\n1. Qualys Certified Specialist: Vulnerability Management Detection and Response (VMDR) (2026 - 2028)\n2. Palo Alto Networks: Network Threats and Security (Cert ID: C625337)\n3. Proofpoint Cybersecurity Academy: Partner Program Sales Engineer\n4. Check Point Sales Certification (Credly verified, 2026 - 2028)\n5. Dell Technologies Partner Program: SE: Hyper-Converged Infrastructure (HCI) 2026\nYou can view and inspect all original certificate documents in the Additional Experiences section!";
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
    if (/(available|hire|job|intern|work|full time|full-time|software|program|programming|web dev|web program|ការងារ|ជួល|ពេញម៉ោង)/i.test(query)) {
      return isKhmer
        ? "បាទ! រាមត្រៀមខ្លួនរួចរាល់ និងកំពុងបើកចំហទទួលយកការងារពេញម៉ោង (Full-Time Job) ក្នុងការធ្វើជា Software Engineer ឬ Web Programmer / Developer ព្រមទាំងឱកាស Internship ផងដែរ។ គាត់មានជំនាញច្បាស់លាស់ក្នុងការបង្កើតគេហទំព័រនិងកម្មវិធីទំនើបជាមួយ React, TypeScript, Node.js, Express និង Laravel ព្រមទាំងមូលដ្ឋានទិន្នន័យរឹងមាំ (PostgreSQL, MySQL)។ រាមត្រៀមខ្លួនចូលរួមជាមួយក្រុមការងារទាំង On-site នៅភ្នំពេញ, Hybrid ឬ Remote ទូទាំងពិភពលោក! អ្នកអាចទាក់ទងគាត់បានតាម form ខាងក្រោម ឬតាមអ៊ីមែល reamkhorn12345@gmail.com / ទូរស័ព្ទ +855 863 393 350។"
        : "Yes! Ream is actively available and seeking a Full-Time Job as a Software Engineer or Web Programmer / Developer, as well as professional internships. He specializes in building modern, high-performance web applications with React, TypeScript, Node.js, Express, and Laravel, backed by solid database architecture (PostgreSQL, MySQL). Ream is ready to join a collaborative tech team on-site in Phnom Penh, hybrid, or remote worldwide! You can contact him directly through the form below or via email at reamkhorn12345@gmail.com / phone +855 863 393 350.";
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

  const scrollToBottom = (behavior = "smooth") => {
    if (chatMessagesContainerRef.current) {
      chatMessagesContainerRef.current.scrollTo({
        top: chatMessagesContainerRef.current.scrollHeight,
        behavior: behavior,
      });
    }
  };

  useEffect(() => {
    scrollToBottom("smooth");
  }, [chatMessages, isTyping]);

  const sendChatMessage = (message = chatInput) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isTyping) return;

    const userMsgId = Date.now();
    const botReplyText = getBotReply(trimmedMessage);
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Instantly append user's question
    setChatMessages((previous) => [
      ...previous,
      { id: userMsgId, sender: "user", text: trimmedMessage, time: nowTime },
    ]);
    setChatInput("");
    setIsTyping(true);

    // Realistic smooth typing delay
    setTimeout(() => {
      setChatMessages((previous) => [
        ...previous,
        {
          id: userMsgId + 1,
          sender: "bot",
          text: botReplyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, 550);
  };

  const handleCopyMessage = (id, text) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedMsgId(id);
      setTimeout(() => setCopiedMsgId(null), 2000);
    }
  };

  const handleResetChat = () => {
    setChatMessages([
      {
        id: 1,
        sender: "bot",
        text: lang === "km"
          ? "សួស្តី! ខ្ញុំជាជំនួយការ AI របស់រាម។ សួរខ្ញុំអំពីជំនាញ គម្រោង ការសិក្សា ឬឱកាសការងាររបស់គាត់បាន។"
          : "Hi! I'm Ream's AI portfolio assistant. Ask me anything about his skills, projects, education, experience, or availability.",
        time: "Online",
      },
    ]);
    setIsTyping(false);
  };

  const quickSuggestions = lang === "km"
    ? [
        { label: "⚡ ជំនាញ & Stack", query: "តើជំនាញរបស់រាមមានអ្វីខ្លះ?" },
        { label: "🚀 គម្រោងសំខាន់ៗ", query: "តើរាមបានបង្កើតគម្រោងអ្វីខ្លះ?" },
        { label: "🎓 ការសិក្សា PNC", query: "តើរាមបានសិក្សានៅឯណា?" },
        { label: "💬 ភាសាទំនាក់ទំនង", query: "តើរាមនិយាយភាសាអ្វីខ្លះ?" },
        { label: "🎯 គោលដៅអាជីព", query: "តើគោលដៅអាជីពរបស់រាមជាអ្វី?" },
        { label: "💼 ការងារ Full-Time", query: "តើរាមបើកចំហការងារ Full-Time ឬ Internship ទេ?" },
      ]
    : [
        { label: "⚡ Skills & Stack", query: "What are your core skills and tech stack?" },
        { label: "🚀 Featured Projects", query: "What featured projects has Ream built?" },
        { label: "🎓 PNC Education", query: "Tell me about Ream's education and PNC" },
        { label: "💬 Languages", query: "What languages does he speak?" },
        { label: "🎯 Career Goals", query: "What is your career goal?" },
        { label: "💼 Full-Time Job", query: "Is Ream available for hire or internship as a software or web programmer?" },
      ];

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
                  <FaPaperPlane />
                </div>
                <h3 className="form-title">{t.contacts.formTitle}</h3>
                <p className="form-subtitle">{t.contacts.formSubtitle}</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <span>{t.contacts.nameLabel}</span>
                    <span className="req-star">*</span>
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
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <span>{t.contacts.emailLabel}</span>
                    <span className="req-star">*</span>
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
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message" className="form-label">
                    <span>{t.contacts.messageLabel}</span>
                    <span className="req-star">*</span>
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
                  </div>
                </div>
              </div>

              <button type="submit" className="form-submit">
                <FaPaperPlane className="submit-icon" />
                <span>{t.contacts.sendBtn}</span>
                <span className="submit-glow"></span>
              </button>

              <div className="form-trust-badges">
                <span className="trust-pill">
                  <FaCheckCircle className="trust-icon" />
                  {lang === "km" ? "ឆ្លើយតបក្នុងរយៈពេល < 24 ម៉ោង" : "Response within 24h"}
                </span>
                <span className="trust-pill">
                  <FaCheckCircle className="trust-icon" />
                  {lang === "km" ? "ផ្ញើផ្ទាល់ទៅកាន់ Ream" : "Direct to Ream's Inbox"}
                </span>
              </div>

              {status && (
                <p className={`form-status ${statusType}`}>
                  {statusType === "success" && <FaCheckCircle />} {status}
                </p>
              )}
            </form>
          </div>
        </div>

        <div id="portfolio-chatbot" className="portfolio-chatbot" ref={(el) => (itemsRef.current[6] = el)}>
          {/* Ambient Glow Aura */}
          <div className="chatbot-glow" aria-hidden="true"></div>

          {/* Chatbot Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar-wrap">
              <div className="chatbot-avatar" aria-hidden="true">
                <FaRobot />
              </div>
              <span className="chatbot-avatar-status"></span>
            </div>
            <div className="chatbot-title-box">
              <div className="chatbot-name-row">
                <h3>{lang === "km" ? "ជំនួយការ AI របស់រាម" : "Ask Ream's AI Assistant"}</h3>
                <span className="ai-badge"><HiSparkles className="sparkle-icon" /> AI 2.0</span>
              </div>
              <p>
                <span className="chatbot-status-dot"></span>
                {lang === "km" ? "ជំនួយការផតថលីអូ · Online" : "Portfolio Assistant · Online"}
              </p>
            </div>
            <div className="chatbot-header-actions">
              <button
                type="button"
                className="chatbot-reset-btn"
                onClick={handleResetChat}
                title={lang === "km" ? "ចាប់ផ្តើមសារថ្មី" : "Reset conversation"}
              >
                <FaRedo className="reset-icon" />
                <span className="reset-label">{lang === "km" ? "សារថ្មី" : "Reset"}</span>
              </button>
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div className="chatbot-messages" ref={chatMessagesContainerRef} aria-live="polite">
            {chatMessages.map((message) => (
              <div key={message.id} className={`chat-message ${message.sender}`}>
                {message.sender === "bot" && (
                  <div className="bot-avatar-mini" aria-hidden="true">
                    <FaRobot />
                  </div>
                )}
                <div className={`message-content-wrap ${message.sender === "user" ? "user-wrap" : ""}`}>
                  <div className={`message-bubble ${message.sender === "user" ? "user-bubble" : "bot-bubble"}`}>
                    <p>{message.text}</p>
                  </div>
                  <div className="message-meta-bar">
                    <span className="message-time">{message.time || "Just now"}</span>
                    {message.sender === "bot" && (
                      <button
                        type="button"
                        className={`copy-msg-btn ${copiedMsgId === message.id ? "copied" : ""}`}
                        onClick={() => handleCopyMessage(message.id, message.text)}
                        title={lang === "km" ? "ចម្លងចម្លើយ" : "Copy response"}
                      >
                        {copiedMsgId === message.id ? <FaCheck /> : <FaCopy />}
                        <span>{copiedMsgId === message.id ? (lang === "km" ? "បានចម្លង" : "Copied") : (lang === "km" ? "ចម្លង" : "Copy")}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Smooth Typing Bubble Indicator */}
            {isTyping && (
              <div className="chat-message bot typing-bubble">
                <div className="bot-avatar-mini" aria-hidden="true">
                  <FaRobot />
                </div>
                <div className="message-content-wrap">
                  <div className="message-bubble bot-bubble typing-box">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              </div>
            )}

            {/* Starter Topic Cards (Shown when chat is new) */}
            {chatMessages.length === 1 && !isTyping && (
              <div className="chatbot-starter-grid">
                <button
                  type="button"
                  className="starter-card"
                  onClick={() => sendChatMessage(lang === "km" ? "តើជំនាញរបស់រាមមានអ្វីខ្លះ?" : "What are your core skills and tech stack?")}
                >
                  <div className="starter-icon-wrap code-icon"><FaCode /></div>
                  <div className="starter-text">
                    <h4>{lang === "km" ? "ជំនាញ & Tech Stack" : "Tech Stack & Skills"}</h4>
                    <p>React, TypeScript, Node.js, Laravel</p>
                  </div>
                  <FaArrowRight className="starter-arrow" />
                </button>

                <button
                  type="button"
                  className="starter-card"
                  onClick={() => sendChatMessage(lang === "km" ? "តើរាមបានបង្កើតគម្រោងអ្វីខ្លះ?" : "What featured projects has Ream built?")}
                >
                  <div className="starter-icon-wrap project-icon"><FaBriefcase /></div>
                  <div className="starter-text">
                    <h4>{lang === "km" ? "គម្រោងសំខាន់ៗ" : "Featured Projects"}</h4>
                    <p>Business App, Weather, E-commerce</p>
                  </div>
                  <FaArrowRight className="starter-arrow" />
                </button>

                <button
                  type="button"
                  className="starter-card"
                  onClick={() => sendChatMessage(lang === "km" ? "តើរាមបានសិក្សានៅឯណា?" : "Tell me about Ream's education and PNC")}
                >
                  <div className="starter-icon-wrap edu-icon"><FaGraduationCap /></div>
                  <div className="starter-text">
                    <h4>{lang === "km" ? "ការសិក្សានៅ PNC" : "PNC Education"}</h4>
                    <p>Passerelles numériques Cambodia</p>
                  </div>
                  <FaArrowRight className="starter-arrow" />
                </button>

                <button
                  type="button"
                  className="starter-card"
                  onClick={() => sendChatMessage(lang === "km" ? "តើរាមបើកចំហការងារ Full-Time ឬ Internship ទេ?" : "Is Ream available for hire or internship as a software or web programmer?")}
                >
                  <div className="starter-icon-wrap hire-icon"><HiSparkles /></div>
                  <div className="starter-text">
                    <h4>{lang === "km" ? "ការងារ Full-Time & Hire" : "Full-Time Job & Hire"}</h4>
                    <p>{lang === "km" ? "Software & Web Programming" : "Software & Web Programming"}</p>
                  </div>
                  <FaArrowRight className="starter-arrow" />
                </button>
              </div>
            )}
          </div>

          {/* Quick-Prompt Strip */}
          <div className="chatbot-quick-strip">
            <span className="strip-label">{lang === "km" ? "សំណួររហ័ស ៖" : "Quick Prompts :"}</span>
            <div className="quick-pills-row">
              {quickSuggestions.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="quick-action-pill"
                  onClick={() => sendChatMessage(item.query)}
                  disabled={isTyping}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Form */}
          <form className="chatbot-form" onSubmit={(event) => { event.preventDefault(); sendChatMessage(); }}>
            <div className="input-glow-wrapper">
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder={lang === "km" ? "សួរអំពីរាម (ឧ. ជំនាញ គម្រោង ការងារ)..." : "Ask about Ream's skills, experience, or hire status..."}
                aria-label={lang === "km" ? "សំណួរ" : "Question about Ream"}
                maxLength={300}
                disabled={isTyping}
              />
              <button
                type="submit"
                className="chatbot-send-btn"
                aria-label={lang === "km" ? "ផ្ញើ" : "Send question"}
                disabled={!chatInput.trim() || isTyping}
              >
                <FaPaperPlane />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;