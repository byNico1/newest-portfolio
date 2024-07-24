interface Project {
  _id: string;
  name: string;
  description: string;
  slug: { _type: "slug"; current: string };
  date: string;
  poster: string;
  tags?: string[];
  githuburl?: string;
  projecturl?: string;
  badge?: string;
  content: string[];
}

const projects: Project[] = [
  {
    _id: "promptopia",
    name: "Promptopia",
    description:
      "A Next.js app leveraging MongoDB and Mongoose, allowing users to sign in and share their best ChatGPT prompts.",
    poster: "/promptopia.png",
    slug: { _type: "slug", current: "promptopia" },
    date: "2024",
    tags: ["Next.js", "MongoDb"],
    githuburl: "https://github.com/byNico1/promptopia",
    projecturl: "https://promptopia-nicolasforero.vercel.app/",
    badge: "NEW",
    content: [
      "Technologies used: JavaScript, Next.js, MongoDB, Mongoose, Tailwind",
      "Enabled users to Sign In, post, and categorize ChatGpt prompts like a social media",
    ],
  },
  {
    _id: "cvapp",
    name: "CV App",
    description:
      "A React.js and TypeScript-based web application that enables users to create and download resumes quickly and effortlessly.",
    poster: "/cv_app.png",
    slug: { _type: "slug", current: "cv-app" },
    date: "2024-02-15",
    tags: ["TypeScript", "React"],
    githuburl: "https://github.com/byNico1/react-cv-app",
    projecturl: "https://nicoiscoding-react-cv-app.netlify.app/",
    badge: "NEW",
    content: [
      "Technologies used: Typescript, React.js, Tailwind",
      "Helps you generate and download your resume fast",
    ],
  },
  {
    _id: "selfimprovingbooks",
    name: "Selfimproving books",
    description:
      "An Astro.js website designed for showcasing Amazon Affiliate products with a strong emphasis on SEO, utilizing React and TypeScript.",
    poster: "/selfimprovingbooks.png",
    slug: { _type: "slug", current: "selfimprovingbooks" },
    date: "2024-02-01",
    tags: ["Astro", "TypeScript"],
    githuburl: "https://github.com/byNico1/selfimprovingbooks",
    projecturl: "https://selfimprovingbooks.com",
    content: [
      "Technologies used: Astro, JavaScript, Mdx, Typescript",
      "SEO-optimized website with AI to reach more people and make revenue with the Amazon Affiliate Program",
    ],
  },
  {
    _id: "battleship",
    name: "Battleship",
    description:
      "A React.js-powered website recreating the classic Battleship game, providing an interactive and engaging user experience.",
    poster: "/battleship.png",
    slug: { _type: "slug", current: "battleship" },
    date: "2024-02-03",
    tags: ["React", "Tailwind"],
    githuburl: "https://github.com/byNico1/battleship",
    projecturl: "https://bynico1.github.io/battleship/",
    content: [
      "Technologies used: React, JavaScript, Tailwind",
      "Recreated battleship game with React.js",
    ],
  },
];

export default projects;
export type { Project };
