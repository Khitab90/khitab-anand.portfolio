import type { ExperienceItem } from '../types';

export const experience: ExperienceItem[] = [
  {
    id: 'walmart-2',
    company: 'Walmart Global Tech',
    role: 'Software Engineer',
    startDate: '2023',
    endDate: '2025',
    location: 'Remote',
    bullets: [
      'Architecting front-end solutions for core retail intelligence. Built scalable micro-frontends with React & TypeScript. 25% reduction in main-thread blocking time.',
    ],
  },
  {
    id: 'walmart-1',
    company: 'Walmart Global Tech',
    role: 'Software Engineer',
    startDate: '2022',
    endDate: '2023',
    location: 'Remote',
    bullets: [
      'Enabled country-specific UI across 2 markets (Canada and Mexico) by configuring 20+ CCM feature flags within a shared mono-repo. Increased automated test coverage from 65% to 85%, reducing regression incidents per release.',
    ],
  },
];
