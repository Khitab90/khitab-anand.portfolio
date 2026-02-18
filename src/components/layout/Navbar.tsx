import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
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
        isScrolled ? 'bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5' : ''
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-center h-20"
      >
        {/* Desktop links — centered */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                  activeSection === href.slice(1)
                    ? 'text-violet-300'
                    : 'text-gray-400 hover:text-gray-100'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-violet-500 to-purple-400 transition-all duration-300 ${
                    activeSection === href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger — right-aligned on mobile */}
        <div className="md:hidden flex w-full justify-end">
          <button
            className="p-2 text-gray-400 hover:text-white transition-colors"
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
            className="md:hidden overflow-hidden bg-[#0a0a0f]/95 backdrop-blur-lg border-b border-white/5"
          >
            <ul className="flex flex-col items-center px-6 py-6 gap-5" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="block text-base font-medium text-gray-300 hover:text-violet-300 transition-colors py-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
