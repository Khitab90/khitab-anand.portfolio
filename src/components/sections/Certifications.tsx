import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const CERTS = [
  {
    id: 'ibm-rag',
    period: '2026',
    company: 'IBM RAG & Agentic AI',
    role: 'Professional Certificate — Coursera',
    desc: 'Built AI agents and multi-agent orchestration workflows using LangChain, LangGraph, CrewAI, AG2, and BeeAI. Engineered multimodal RAG applications with ChromaDB vector databases and hybrid retrieval strategies.',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef);

  return (
    <div
      ref={sectionRef}
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section" id="cert-section">

        {/* Heading — stacked label + title, matches design pattern */}
        <div className="heading-row">
          <div style={{ height: 50 }}>
            <p className="sec-label" data-fade style={{ color: 'rgb(188,99,42)', fontSize: '16px' }}>Certification</p>
            <h2 className="sec-title" data-wipe>Certifications</h2>
          </div>
        </div>

        {/* Cert rows — same exp-item grid as Experience */}
        <div className="exp-list">
          {CERTS.map((cert, i) => (
            <div
              key={cert.id}
              className="exp-item"
              data-fade
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="exp-period">{cert.period}</span>
              <div>
                <div className="exp-company">{cert.company}</div>
                <div className="exp-role">{cert.role}</div>
              </div>
              <p className="exp-desc">{cert.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
