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
}

const projects: Project[] = [
  {
    _id: "promptopia",
    name: "Promptopia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    poster: "/promptopia.png",
    slug: { _type: "slug", current: "#" },
    date: "2023-01-01",
    tags: ["Tag 1", "Tag 2"],
    githuburl: "https://github.com/example/project1",
    projecturl: "https://example.com/project1",
    badge: "NEW",
  },
  {
    _id: "selfimprovingbooks",
    name: "Selfimproving books",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    poster: "/selfimprovingbooks.png",
    slug: { _type: "slug", current: "#" },
    date: "2023-01-01",
    tags: ["Tag 1", "Tag 2"],
    githuburl: "https://github.com/example/project1",
    projecturl: "https://example.com/project1",
  },
  {
    _id: "cvapp",
    name: "CV App",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    poster: "/cv_app.png",
    slug: { _type: "slug", current: "#" },
    date: "2023-01-01",
    tags: ["Tag 1", "Tag 2"],
    githuburl: "https://github.com/example/project1",
    projecturl: "https://example.com/project1",
    badge: "NEW",
  },
  {
    _id: "battleship",
    name: "Battleship",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    poster: "/battleship.png",
    slug: { _type: "slug", current: "#" },
    date: "2023-01-01",
    tags: ["Tag 1", "Tag 2"],
    githuburl: "https://github.com/example/project1",
    projecturl: "https://example.com/project1",
  },
];

export default projects;
export type { Project };
