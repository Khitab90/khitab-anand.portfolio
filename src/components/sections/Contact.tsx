import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef);

  return (
    <div id="contact-wrap" ref={sectionRef}>
      {/* Decorative "KA" watermark */}
      <div className="contact-deco" aria-hidden="true">KA</div>

      <div className="section" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '160px 60px' }}>

        <h2 className="contact-title" data-fade>
          Let's build<br />
          <strong>something great.</strong>
        </h2>

        <a
          href="mailto:kjanand09@gmail.com"
          className="contact-email"
          data-fade
          style={{ transitionDelay: '.15s', display: 'block' }}
        >
          kjanand09@gmail.com
        </a>

        <div className="contact-socials" data-fade style={{ transitionDelay: '.3s' }}>
          <a
            href="https://linkedin.com/in/khitabanand"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Khitab90"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            GitHub
          </a>
          <a
            href="https://drive.google.com/file/d/1AENobz5uhY6YvcO6Na_HpOLDhoqkKKnV/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            Resume
          </a>
        </div>

      </div>
    </div>
  );
}
