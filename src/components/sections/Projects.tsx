import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ProjectEntry {
  id: string;
  title: string;
  year: string;
  description: string;
  technologies: string[];
  thumbGradient: string;
  githubUrl?: string;
}

const PROJECTS: ProjectEntry[] = [
  {
    id: 'elibrary',
    title: 'ReadKit',
    year: '2025',
    description:
      'A high-performance reading application built with Next.js and Tailwind CSS. Features dynamic routes, theme toggling, and a clean component architecture.',
    technologies: ['Next.js', 'Tailwind', 'TypeScript'],
    thumbGradient: 'linear-gradient(135deg, #D4B896 0%, #C4A07A 50%, #B08860 100%)',
    githubUrl: 'https://github.com/Khitab90',
  },
  {
    id: 'shoppinglist',
    title: 'ShoppingList Pro',
    year: '2024',
    description:
      'Full-stack MERN application for modern inventory management. Implements complex data relationships, RESTful APIs, and real-time updates with MongoDB.',
    technologies: ['MERN', 'MongoDB', 'Express'],
    thumbGradient: 'linear-gradient(135deg, #C8B8A4 0%, #B8A08A 50%, #A88870 100%)',
    githubUrl: 'https://github.com/Khitab90/mern_shoppinglist',
  },
  {
    id: 'nodeapi',
    title: 'NodeJS REST API',
    year: '2023',
    description:
      'Pure Node.js REST API (no Express) implementing full CRUD operations on a JSON data store, following the MVC pattern with routers, models, and controllers.',
    technologies: ['Node.js', 'REST API', 'MVC'],
    thumbGradient: 'linear-gradient(135deg, #D0C0AC 0%, #C0A898 50%, #B09080 100%)',
    githubUrl: 'https://github.com/Khitab90',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef);

  return (
    <div ref={sectionRef} className="section" id="proj-section">

      {/* Heading row */}
      <div className="heading-row">
        <h2 className="sec-title" data-wipe>Projects</h2>
        <div className="heading-rule" data-fade style={{ transitionDelay: '.2s' }} />
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

            {/* Expand panel — reveals on hover via CSS */}
            <div className="project-expand" aria-hidden="true">
              {/* Thumbnail */}
              <div
                className="project-thumb"
                style={{ background: p.thumbGradient }}
              >
                <span
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '9px',
                    letterSpacing: '2px',
                    color: 'rgba(80,55,30,0.45)',
                    textTransform: 'uppercase',
                  }}
                >
                  Project Image
                </span>
              </div>

              {/* Description + tags */}
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
                    View on GitHub ↗
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
