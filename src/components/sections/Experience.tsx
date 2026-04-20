import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { experience } from '../../data/experience';

export default function Experience() {
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
      <div className="section" id="exp-section">

        {/* Heading row */}
        <div className="heading-row">
          <h2 className="sec-title" data-wipe>Experience</h2>
          <div className="heading-rule" data-fade style={{ transitionDelay: '.2s' }} />
        </div>

        {/* Experience rows */}
        <div className="exp-list">
          {experience.map((item, i) => (
            <div
              key={item.id}
              className="exp-item"
              data-fade
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="exp-period">
                {item.startDate} – {item.endDate}
              </span>
              <div>
                <div className="exp-company">{item.company}</div>
                <div className="exp-role">{item.role}</div>
              </div>
              <p className="exp-desc">{item.bullets[0]}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
