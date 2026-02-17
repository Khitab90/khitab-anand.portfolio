import type { CertificationItem } from '../types';

export const certifications: CertificationItem[] = [
  {
    id: 'ibm-rag',
    title: 'IBM RAG and Agentic AI Professional Certificate',
    issuer: 'IBM',
    platform: 'Coursera',
    year: 2026,
    description:
      'Professional certification covering the design and development of AI agents and agentic applications using modern AI frameworks.',
    highlights: [
      'Built AI agents and applications using LangChain, LangGraph, CrewAI, and AG2 frameworks',
      'Developed multimodal applications with RAG systems, vector databases, and Gradio interfaces',
    ],
    credentialUrl: 'https://www.coursera.org',
  },
];
