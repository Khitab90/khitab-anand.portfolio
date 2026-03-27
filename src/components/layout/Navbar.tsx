import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 40);
  });

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav border-b border-[rgba(70,69,85,0.2)]' : ''
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-[1100px] mx-auto px-8 flex items-center justify-between h-20"
      >
        {/* KA Logo */}
        <a
          href="#"
          className="font-heading text-2xl font-bold tracking-tighter text-[#c4c0ff] hover:text-[#e3dfff] transition-colors"
          aria-label="Khitab Anand — back to top"
        >
          KA
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {navLinks.map(({ href, label }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <li key={href}>
                <a
                  href={href}
                  data-active={isActive}
                  className={`nav-link font-heading font-bold tracking-tight text-sm transition-colors duration-200 ${
                    isActive ? 'text-[#e4e1e9]' : 'text-[#918fa1] hover:text-[#e4e1e9]'
                  }`}
                >
                  {label}
                  <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0,5 Q50,0 100,5" fill="none" stroke="#c4c0ff" strokeWidth="2" />
                  </svg>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Resume button + mobile hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="https://drive.google.com/file/d/1AENobz5uhY6YvcO6Na_HpOLDhoqkKKnV/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center text-[#c4c0ff] font-heading font-bold tracking-tight text-sm border border-[rgba(196,192,255,0.3)] px-4 py-1.5 rounded-lg hover:bg-[rgba(196,192,255,0.08)] transition-all duration-200"
          >
            Resume
          </a>
          <button
            className="md:hidden p-2 text-[#918fa1] hover:text-[#e4e1e9] transition-colors"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#131318]/95 backdrop-blur-lg border-b border-[rgba(70,69,85,0.2)]"
          >
            <ul className="flex flex-col items-center px-6 py-6 gap-5" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="block text-base font-heading font-bold text-[#c7c4d8] hover:text-[#c4c0ff] transition-colors py-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://drive.google.com/file/d/1AENobz5uhY6YvcO6Na_HpOLDhoqkKKnV/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c4c0ff] font-bold text-sm border border-[rgba(196,192,255,0.3)] px-4 py-1.5 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
