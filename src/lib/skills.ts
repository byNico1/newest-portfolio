interface Skills {
  skill_name: string;
  skill_image: string;
}

const skills: Skills[] = [
  {
    skill_image: "/icons/html-1.svg",
    skill_name: "HTML",
  },
  {
    skill_image: "/icons/css.svg",
    skill_name: "CSS",
  },
  {
    skill_image: "/icons/javascript.svg",
    skill_name: "JavaScript",
  },
  {
    skill_image: "/icons/typescript.svg",
    skill_name: "TypeScript",
  },
  {
    skill_image: "/icons/react.svg",
    skill_name: "React.js",
  },
  {
    skill_image: "/icons/nextjs_icon_dark.svg",
    skill_name: "Next.js",
  },
  {
    skill_image: "/icons/nodejs.svg",
    skill_name: "Node.js",
  },
  {
    skill_image: "/icons/expressjs.svg",
    skill_name: "Express",
  },
  {
    skill_image: "/icons/mongodb.svg",
    skill_name: "MongoDB",
  },
];

export default skills;
export type { Skills };
