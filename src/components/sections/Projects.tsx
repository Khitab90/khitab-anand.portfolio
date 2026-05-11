import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ProjectEntry {
  id: string;
  title: string;
  year: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
}

const PROJECTS: ProjectEntry[] = [
  {
    id: 'elibrary',
    title: 'ReadKit',
    year: '2025',
    description:
      'A high-performance reading application built with Next.js and Tailwind CSS. Features liquid-smooth transitions and modular component architecture.',
    technologies: ['Next.js', 'Tailwind', 'TypeScript'],
    githubUrl: 'https://github.com/Khitab90',
  },
  {
    id: 'shoppinglist',
    title: 'ShoppingList Pro',
    year: '2024',
    description:
      'Full-stack MERN application for modern inventory management. Implements complex data relationships, RESTful APIs, and real-time updates.',
    technologies: ['MERN', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/Khitab90/mern_shoppinglist',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef);

  return (
    <div ref={sectionRef} className="section" id="proj-section">

      {/* Heading — stacked label + title, no horizontal rule */}
      <div className="heading-row">
        <div style={{ height: 50 }}>
          <p className="sec-label" data-fade style={{ color: 'rgb(188,99,42)', fontSize: '16px' }}>Projects</p>
          <h2 className="sec-title" data-wipe>Projects</h2>
        </div>
      </div>

      {/* Expandable project list */}
      <div className="projects-list">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className="project-item"
            data-fade
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {/* Row header — always visible */}
            <div className="project-header">
              <span className="project-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="project-name-text">{p.title}</span>
              <span className="project-year">{p.year}</span>
              <span className="project-arrow" aria-hidden="true">→</span>
            </div>

            {/* Expand panel — reveals on hover via CSS, desc + tags only */}
            <div className="project-expand" aria-hidden="true">
              <div>
                <p className="project-detail-desc">{p.description}</p>
                <div className="project-ptags">
                  {p.technologies.map((t) => (
                    <span key={t} className="ptag">{t}</span>
                  ))}
                </div>
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      marginTop: '16px',
                      fontFamily: 'var(--f-mono)',
                      fontSize: '9px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(196,112,58,0.3)',
                    }}
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
