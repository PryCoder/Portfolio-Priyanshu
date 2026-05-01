import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Java } from "@/components/ui/svgs/java";

// Import from react-icons
import { SiMongodb, SiRedis, SiGraphql,  SiJavascript, SiGithub, SiMysql, SiExpress } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { FaGit } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";

export const DATA = {
  name: "Priyanshu Gupta",
  initials: "PG",
  url: "https://priyanshu.dev",
  location: "India",
  locationLink: "https://www.google.com/maps/place/india",
  description:
    "Full-Stack Developer | DSA Enthusiast | 167+ LeetCode Problems Solved",
  summary:
    "Software Engineer passionate about Data Structures & Algorithms with 167+ problems solved on LeetCode. Skilled in building scalable full-stack applications using React, Next.js, and Node.js. Active hackathon participant with experience in creating innovative solutions under pressure.",
  avatarUrl: "/me.jpeg",
  skills: [
    // Frontend (4 skills)
    { name: "React.js", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "TypeScript", icon: Typescript },
    { name: "JavaScript", icon: SiJavascript },
    
    // Backend (4 skills)
    { name: "Node.js", icon: Nodejs },
    { name: "Python", icon: Python },
    { name: "Java", icon: Java },
    { name: "Express.js", icon: SiExpress },
    
    // Database (3 skills)
    { name: "PostgreSQL", icon: Postgresql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "MySQL", icon: SiMysql },
    
    // DevOps & Tools (4 skills)
    { name: "Docker", icon: Docker },
    { name: "AWS", icon: FaAws },
    { name: "GitHub", icon: SiGithub },
    { name: "Git", icon: FaGit},
  ],

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/PryCoder",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/priyanshu-gupta-664b30321",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/PriyanshuG34",
        icon: Icons.x,

        navbar: true,
      },
      
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },
work : [
  {
    company: "Websites.co.in",
    href: "https://www.websites.co.in",
    badges: ["Internship"],
    location: "Remote",
    title: "Full Stack Developer Intern",
    logoUrl: "https://imgs.search.brave.com/FLCN6wCP2qLKww8lyWDI7NygnMmArLHF6imQgaYB_2s/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvZWQzMWU2Mjkz/MDJlZWJmM2U3NDdh/N2JiYzBhZDczNDgy/MGU1OWY2NDFiYmJj/ZWNiY2NhYjNjZTYz/MTM5OTc1Ny9pbnN0/YXdlYi53ZWJzaXRl/cy5jby5pbi8",
    start: "May 2025",
    end: "June 2025",
    description:
      "Spearheaded end-to-end design, development, and deployment of a scalable full-stack web application using React.js and Firebase for MicMac Environmental NGO, improving page load speed by 35% through code splitting, lazy loading, and CDN optimization.\n\nCollaborated with B2B stakeholders to gather requirements and built high-converting donation pipelines and dynamic campaign modules using RESTful APIs, increasing donor conversion rates by 20%.\n\nExecuted on-page SEO optimization including structured data and Core Web Vitals improvements, boosting organic traffic by 15% while working in Agile sprints with code reviews and daily standups.\n\nWorked closely with designers, project managers, and NGO stakeholders to deliver production-ready applications on time."
  },
],education :[
  {
    school: "SPP New Era High School",
    href: "",
    degree: "Secondary Education",
    logoUrl: "https://img.ezyschooling.com/image?url=https%3A%2F%2Fd3bat55ebwjhsf.cloudfront.net%2Fschools%2Flogos%2Fuser_generic_school_user%2F80b9f7bc-ab03-4d9a-9866-601fe1c43b99-612a9aea-4b_F80AzZn.webp&width=94&height=94&watermark=false", 
    start: "2008",
    end: "2020",
  },
  {
    school: "R.K. Talreja College of Arts, Science & Commerce",
    href: "",
    degree: "Higher Secondary (Science)",
    logoUrl: "https://www.collegebatch.com/static/clg-logo/r-k-talreja-college-of-arts-science-commerce-mumbai-13771.webp",
    start: "2020",
    end: "2022",
  },
  {
    school: "Lokmanya Tilak College of Engineering",
    href: "https://ltce.in",
    degree: "Bachelor of Engineering (B.E.)",
    logoUrl: "https://content.jdmagicbox.com/mumbai/74/022p9003774/logo/0ffb9759c2376fa64bf70c89a1784807.png",
    start: "2022",
    end: "2026",
  },
],projects: [
  {
    title: "EpicShot",
     href: "https://epicshot.onrender.com",
    dates: "2024",
    active: true,
    description:
      "A modern social media platform for creators with real-time sharing, media editing, and community engagement features.",
    technologies: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Socket.io",
      "Cloudinary",
    ],
    links: [
      {
        title: "Live Demo",
        href: "https://epicshot.onrender.com",
      },
    ],
    image: "/e.png",
  },

  {
    title: "BetterShop",
     href: "https://bettershop-ecom.onrender.com",
    dates: "2024",
    active: true,
    description:
      "A sleek and scalable ecommerce platform with advanced filtering, product discovery, and secure payment integration.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Stripe",
      "MongoDB",
      "Tailwind CSS",
      "Redux",
    ],
    links: [
      {
        title: "Live Demo",
        href: "https://bettershop-ecom.onrender.com",
      },
    ],
    image: "/b.png",
  },

  {
    title: "BookNerd",
   href: "https://booknerd.netlify.app/",
      
    dates: "2024",
    active: true,
    description:
      "A comprehensive book management system with reading tracking, reviews, and personalized recommendations.",
    technologies: [
      "React",
      "Express.js",
      "PostgreSQL",
      "JWT",
      "Node.js",
    ],
    links: [
      {
        title: "Live Demo",
        href: "https://booknerd.netlify.app/",
      },
    ],
    image: "/bo.png",
  },

  {
    title: "RestoNow",
    href: "https://resto-gold-iota.vercel.app/",
    dates: "2024",
    active: true,
    description:
      "An AI-powered restaurant POS system that automates ordering, payments, and kitchen communication.",
    technologies: [
      "Python",
      "React",
      "FastAPI",
      "PostgreSQL",
      "AI/ML",
    ],
    links: [
      {
        title: "Live Demo",
        href: "https://resto-gold-iota.vercel.app/",
      },
    ],
    image: "/d1.png",
  },
],hackathons :[
  {
    title: "Code Web Hackathon",
    dates: "2024",
    location: "SIES College, Vashi, Navi Mumbai",
    description:
      "Participated in a web development hackathon where I built a full-stack project under time constraints, focusing on UI/UX and real-world problem solving.",
    image: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/firstnet.png",
    logo: "https://imgs.search.brave.com/BR_gfArMxXr-ruuQfDAs1V7dPBXMeJa4sAqJFm9TP74/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Y3JlYXRpdmUtZ3Jh/ZGllbnQtY29kZS1s/b2dvXzIzLTIxNDg4/MjA1NzIuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw",
    links: [],
  },
  {
    title: "Google Hackathon",
    dates: "2024",
    location: "Vile Parle, Mumbai",
    description:
      "Worked on an innovative tech solution as part of a Google-backed hackathon, collaborating in a team and applying modern web technologies.",
    image: "https://www.google.com/favicon.ico",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    links: [],
  },
  {
    title: "Quasar National Hackathon",
    dates: "2024",
    location: "Sion, Mumbai",
    description:
      "Participated in a national-level hackathon, building a scalable project and presenting it to judges under competitive conditions.",
    image: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
    logo: "https://cdn-icons-png.flaticon.com/512/3212/3212608.png",
    links: [],
  },
]
} as const;
