import type { ProjectItem } from '../types';

export const projects: ProjectItem[] = [
  {
    id: 'elibrary',
    title: 'Interactive E-Library',
    description:
      'A Next.js web app displaying a list of books and individual book details with dynamic routes, theme toggling, and a clean Tailwind-styled UI.',
    date: 'Feb 2023',
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    githubUrl: 'https://github.com/Khitab90',
    role: 'Front-End Developer',
  },
  {
    id: 'weather',
    title: 'Weather App',
    description:
      'React app that fetches live weather data (temperature, pressure, humidity, visibility) via the OpenWeather API with a dynamic background that changes based on temperature.',
    date: 'Feb 2023',
    technologies: ['React', 'OpenWeather API', 'JavaScript'],
    githubUrl: 'https://github.com/Khitab90',
    role: 'Front-End Developer',
  },
  {
    id: 'shoppinglist',
    title: 'ShoppingList',
    description:
      'Full-stack MERN web application with RESTful APIs allowing users to create, edit, and delete shopping list items stored in MongoDB.',
    date: 'May 2020',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    githubUrl: 'https://github.com/Khitab90/mern_shoppinglist',
    role: 'Full Stack Developer',
  },
  {
    id: 'simpleblog',
    title: 'SimpleBlog',
    description:
      'Adaptive Ruby on Rails blog application with full CRUD for posts, plus the ability for users to add and delete comments on each post.',
    date: 'May 2020',
    technologies: ['Ruby on Rails', 'SQL'],
    githubUrl: 'https://github.com/Khitab90/SimpleBlog-with-Rails',
    role: 'Full Stack Developer',
  },
  {
    id: 'nodeapi',
    title: 'NodeJS REST API',
    description:
      'Pure Node.js REST API (no Express) implementing full CRUD operations on a JSON data store, following the MVC pattern with routers, models, and controllers.',
    date: 'Oct 2020',
    technologies: ['Node.js', 'REST API', 'MVC'],
    githubUrl: 'https://github.com/Khitab90',
    role: 'Back-End Developer',
  },
  {
    id: 'arborgrill',
    title: 'The Arbor Grill',
    description:
      'C# .NET backend for a campus food-ordering Android app with order placement, cart display, menu APIs, Prometheus monitoring, and an Azure SQL database.',
    date: 'Mar 2020',
    technologies: ['C# .NET', 'Azure SQL', 'Prometheus'],
    githubUrl: 'https://github.com/Khitab90/.NET-API',
    role: 'Back-End Developer',
  },
];
