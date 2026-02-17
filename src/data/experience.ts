import type { ExperienceItem } from '../types';

export const experience: ExperienceItem[] = [
  {
    id: 'walmart-2',
    company: 'Walmart Global Tech',
    role: 'Software Engineer (Frontend)',
    startDate: 'Jun 2023',
    endDate: 'Oct 2025',
    location: 'Remote',
    bullets: [
      'Developed components and screens using React and TypeScript with Material-UI, Tailwind, and an in-house component library.',
      'Wrote comprehensive test cases for components and UI using React Testing Library and Jest.',
      'Contributed to migrating RESTful APIs to GraphQL by developing queries and mutations.',
      'Used React Query for API calls and React Hook Form to handle form fields and state.',
      'Collaborated with UX designers and reviewed PRs with the team via Git.',
    ],
  },
  {
    id: 'walmart-1',
    company: 'Walmart Global Tech',
    role: 'Software Engineer (Frontend)',
    startDate: 'Jun 2022',
    endDate: 'Jan 2023',
    location: 'Remote',
    bullets: [
      'Modified the entire UI for a new market launch using React and documented all code changes and component rendering logic.',
      'Wrote test cases to increase code coverage using Mocha and Chai.',
      'Deployed web applications to multiple environments and documented the full end-to-end deployment workflow.',
      'Conducted regression testing with the frontend team and assisted new team members in onboarding.',
      'Participated in daily Agile scrums and bi-weekly sprint planning; tracked issues in Jira.',
    ],
  },
];
