import { IProject } from "../types/projectTypes";
import blankPhoto from "@/public/todo.jpg";

export const ProjectsList: IProject[] = [
  {
    name: "AI Fashion Mirror",
    role: "Tech Lead & Project Manager",
    shortDescription: "AI-powered fashion advice and social media predictions",
    date: "2024-25",
    description: `
      The AI Fashion Mirror project delivers two prototypes that integrate the PRE API to offer fashion advice and social media like predictions from user photos. The first is a full-body smart mirror with a Next.js frontend and Raspberry Pi hardware. The second, AI Shop Pal, is a portable tablet version that uses OpenAI Vision and Pinecone to recommend products scraped from the Canada Goose website using Python. The system is built with Next.js, Express.js, and showcases AI's role in fashion and retail.
    `,
    photo: blankPhoto,
    githubLink: "https://github.com/natapokie/ai-fashion-mirror",
    websiteLink: "https://ai-fashion-mirror.vercel.app/",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Pinecone",
      "Python",
    ],
    class: "pattern-geometric",
  },
  {
    name: "Campus Connect",
    role: "Frontend & UI/UX Designer",
    shortDescription: "A secure platform for UofT students to buy and sell second-hand items",
    date: "2024",
    description: `
    Campus Connect is a student-centered web platform designed to streamline the buying and selling of second-hand items exclusively within the University of Toronto community. Developed by our team to address student needs, the system ensures secure, campus-only transactions by verifying university affiliation. By limiting exchanges to UofT students, Campus Connect fosters a trusted environment where peers can connect, trade affordably, and coordinate exchanges easily due to geographic proximity.
    `,
    photo: blankPhoto,
    websiteLink: "https://youtu.be/NDSRftYCTtI?si=iClaqOUp9Reo4npS",
    techStack: ["Next.js", "Tailwind CSS", "Flask", "SQL"],
    class: "pattern-grid",
  },
  {
    name: "Peckish",
    role: "Frontend & UI/UX Designer",
    shortDescription: "AI-powered personal chef and smart fridge manager",
    date: "2024",
    description: `
      Peckish is an AI-powered personal chef and smart fridge manager designed to minimize food waste and simplify meal planning. Built with busy users in mind, the system automatically tracks fridge inventory, detects expiry dates, sends timely reminders, and generates personalized recipes based on available ingredients, user preferences, and kitchen tools. By learning from user behavior.
    `,
    photo: blankPhoto,
    githubLink: "https://github.com/michaeljsXu/peckish",
    techStack: ["Next.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    class: "pattern-geometric",
  },
  {
    name: "Frosh Orientation Website",
    role: "Contributor",
    shortDescription: "Central hub for UofT Engineering Frosh Orientation",
    date: "2022-23",
    description: `
      University of Toronto Engineering Frosh Orientation Website is the central hub for over 1,000 incoming students each year to seamlessly navigate their orientation experience. Designed to streamline the registration process and enhance student engagement, the platform offers a wide range of features—including event sign-up and payment, personalized profiles, a detailed schedule, live announcements, QR code check-ins, and a digital Scunt (scavenger hunt) game. 
    `,
    photo: blankPhoto,
    githubLink: "https://github.com/UofT-Frosh-Orientation/orientation-website",
    techStack: ["React", "Express.js", "MongoDB"],
    class: "pattern-stars",
  },
];
