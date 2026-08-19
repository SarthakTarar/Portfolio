// Central content file — edit resume facts here, components just render this.

export const profile = {
  name: "Sarthak Tarar",
  role: "Backend & Automation Engineer",
  location: "Ghaziabad, Uttar Pradesh, India",
  phone: "+91 9717219067",
  email: "sarthaktarar750@gmail.com", // TODO: confirm which inbox the site should show/send to
  linkedin: "https://www.linkedin.com/in/sarthak-tarar-53380b293/",
  github: "https://github.com/SarthakTarar",
  resumeFile: "/Sarthak_Tarar_Resume.pdf",
  summary:
    "Backend & Automation Engineer with 1.5+ years building production systems for enterprise banking CRM platforms. Experienced in Python, SQL, and n8n workflow automation, with hands-on delivery of an LLM-integrated root-cause analysis engine, backend observability tooling, and full-stack cloud deployments on AWS and GCP.",
};

export const skillGroups = [
  {
    label: "Languages",
    skills: ["Python", "JavaScript", "SQL"],
  },
  {
    label: "Backend & Frameworks",
    skills: ["Django", "Flask", "FastAPI", "REST APIs", "SQLAlchemy", "Alembic"],
  },
  {
    label: "Automation & AI",
    skills: [
      "n8n",
      "Workflow Automation",
      "LLM Integration",
      "ChromaDB",
      "NLP",
      "Machine Learning",
      "TensorFlow",
      "Keras",
      "Scikit-learn",
    ],
  },
  {
    label: "Databases",
    skills: ["SQL Server", "Google Cloud SQL"],
  },
  {
    label: "Cloud, DevOps & Observability",
    skills: [
      "AWS",
      "GCP",
      "Cloud SQL",
      "Artifact Registry",
      "Cloud Build",
      "Docker",
      "OpenShift",
      "Git",
      "AWS Kibana",
      "OpenTelemetry",
    ],
  },
  {
    label: "Third-Party APIs",
    skills: [
      "Google Places API",
      "Google Maps Geocoding API",
      "Gemini API",
      "Meta WhatsApp Cloud API",
    ],
  },
  {
    label: "Tools",
    skills: ["Postman", "Git", "VS Code", "Windows", "Ubuntu", "MS Office"],
  },
];

export const experience = [
  {
    company: "Businessnext (Acidaes Solutions)",
    role: "Junior Engineer",
    location: "Noida (Sector-62)",
    period: "Feb 2025 – Present",
    bullets: [
      'Selected among the top 30 in an internal AI assessment; onboarded onto the "AI Inversion" team to build AI-driven automation for enterprise CRM operations.',
      "Built a full-stack Smart RCA (Root Cause Analysis) CRM analytics platform integrating ChromaDB for semantic search and feedback memory, LLM-driven root cause narration via an OpenAI-compatible API (Gemma), multi-client SQL Server connectivity via pyodbc, and XML-based automation rule parsing — supporting production CRM deployments for HDFC Bank, AU Small Finance Bank, Maybank (Philippines), and Bank Negara Indonesia.",
      "Wrote Python scripts and SQL stored procedures to automate operational reporting; diagnosed production issues using AWS Kibana and OpenTelemetry (OTel) tracing, and monitored containerized services on OpenShift.",
    ],
  },
  {
    company: "Artclear Limited",
    role: "Python App Developer Intern",
    location: "London, UK",
    period: "Aug 2023 – Sep 2023",
    bullets: [
      "Built a weather application using the OpenWeather API and Python/Tkinter, processing and displaying real-time weather data based on user location input.",
    ],
  },
  {
    company: "4soft S.A",
    role: "Python Intern",
    location: "Wroclaw, Poland (Remote)",
    period: "Oct 2022 – Jan 2023",
    bullets: [
      "Built a flight-tracking application using the OpenSky API, with a Python backend and HTML/CSS frontend to process and display real-time flight details.",
    ],
  },
];

export const projects = [
  {
    name: "Employee Management System",
    stack: ["Python", "Django", "SQL"],
    description:
      "Web app streamlining employee data management: add/update/delete records, detail tracking, user-friendly forms.",
    github: "https://github.com/SarthakTarar/Employee-Management-System",
  },
  {
    name: "Crop Recommendation System",
    stack: ["Python", "Flask", "ML"],
    description:
      "ML app recommending crops from soil/climate data using predictive models on historical data.",
    github: "https://github.com/SarthakTarar/Crop_Recommendation_ML",
  },
  {
    name: "Image Classification API",
    stack: ["Python", "Flask", "Docker", "TensorFlow", "Keras"],
    description:
      "Backend API using Inception V3 to classify images, with token-based auth, tested via Postman.",
    github: "https://github.com/SarthakTarar/Image-Classification-API",
  },
  {
    name: "Bank API",
    stack: ["Python", "Flask", "MongoDB", "Docker"],
    description:
      "Backend banking API with bcrypt-secured, token-based auth for deposits, transfers, and loans.",
    github: "https://github.com/SarthakTarar/Bank-API",
  },
];

export const certifications = [
  {
    title: "CRM Developer (Post-Training Completion)",
    issuer: "Businessnext",
    link: "https://drive.google.com/file/d/1d1aQLbR4_bzjDutzu2JzCp7X9h1Jqd2u/view?usp=sharing",
  },
  {
    title: "Python Data Structures & Algorithms",
    issuer: "Coding Ninjas",
    link: "https://certificate.codingninjas.com/view/45e05ae243baf49f",
  },
  {
    title: "Python DevOps",
    issuer: "Udemy",
    link: "https://drive.google.com/file/d/1Kc7fItPDNeGY5eogLLe0-rWlnssSpCL2/view",
  },
  {
    title: "Research Paper — The Hinweis Research",
    issuer: "Published Paper",
    link: "https://drive.google.com/file/d/1ItNEdAK4PAXrRc2rwk0x2_Ny7X4_ORs4/view?usp=sharing",
  },
  {
    title: "Research Paper — Grenze",
    issuer: "Published Paper",
    link: "https://drive.google.com/file/d/1a5ZFd6ZGeidl2vJyX09ksobvCwAzz66T/view?usp=sharing",
  },
];

export const education = [
  {
    school: "JIMS Engineering Management Technical Campus (GGSIPU)",
    location: "Greater Noida",
    degree: "B.Tech, Computer Science Engineering",
    period: "June 2020 – June 2024",
  },
  {
    school: "Ch. Chhabil Dass Public School",
    location: "Ghaziabad",
    degree: "HSC, PCM",
    period: "May 2019 – May 2020",
  },
  {
    school: "Ch. Chhabil Dass Public School",
    location: "Ghaziabad",
    degree: "SSC",
    period: "May 2017 – May 2018",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
