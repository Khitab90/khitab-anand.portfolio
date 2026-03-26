import { motion } from 'framer-motion';
import GradientText from '../shared/GradientText';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/khitabanand/',
    icon: <FaLinkedin size={14} aria-hidden="true" />,
    ariaLabel: 'View LinkedIn profile',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Khitab90',
    icon: <FaGithub size={14} aria-hidden="true" />,
    ariaLabel: 'View GitHub profile',
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-40 overflow-hidden"
      aria-label="Contact section"
    >
      {/* Subtle SVG wave background */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="#c4c0ff" strokeWidth="0.2" />
          <path d="M0,60 Q25,10 50,60 T100,60" fill="none" stroke="#a2e7ff" strokeWidth="0.2" />
          <path d="M0,40 Q25,90 50,40 T100,40" fill="none" stroke="#c4c0ff" strokeWidth="0.1" />
        </svg>
      </div>

      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'rgba(108,99,255,0.05)', filter: 'blur(100px)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-8 text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-5xl md:text-7xl font-bold mb-16 leading-tight"
        >
          Let's build something <GradientText>great</GradientText>.
        </motion.h2>

        {/* Email link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="mailto:kjanand09@gmail.com"
            className="inline-block font-heading text-2xl md:text-4xl text-[#c7c4d8] hover:text-[#c4c0ff] transition-all duration-300 border-b-2 border-[rgba(196,192,255,0.2)] hover:border-[#c4c0ff] pb-2"
          >
            kjanand09@gmail.com
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-10 justify-center mt-16"
        >
          {SOCIAL_LINKS.map(({ label, href, ariaLabel }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ariaLabel}
              className="group flex items-center gap-2 text-[#464555] hover:text-[#e4e1e9] transition-colors duration-200"
            >
              <span className="font-heading font-bold tracking-widest uppercase text-xs">{label}</span>
              <ExternalLink
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                aria-hidden="true"
              />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
