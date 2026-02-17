export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  date: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  role: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  bullets: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  platform: string;
  year: number;
  description: string;
  highlights: string[];
  credentialUrl?: string;
}
