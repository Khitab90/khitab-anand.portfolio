import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef);

  return (
    <div id="about-section" ref={sectionRef}>
      <div className="section">
        <div id="about">
          <div className="about-content">
            <p className="sec-label" data-wipe>About</p>

            <h2 className="about-title" data-fade style={{ transitionDelay: '.1s' }}>
              Engineering with<br />
              <em>purpose &amp; precision.</em>
            </h2>

            <p className="about-body" data-fade style={{ transitionDelay: '.2s' }}>
              Senior Frontend Engineer dedicated to crafting immersive digital experiences.
              My approach blends the logic of robust engineering with the intuition of high-end design.
              At Walmart Global Tech, I built high-performance enterprise systems serving millions of users.
            </p>

            <div className="tags" data-fade style={{ transitionDelay: '.3s' }}>
              <span className="tag accent">Los Angeles, CA</span>
              <span className="tag accent">Open to Roles</span>
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">JavaScript</span>
              <span className="tag">Node.js</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
