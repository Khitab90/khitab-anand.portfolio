import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#about-section', label: 'About'    },
  { href: '#exp-section',   label: 'Work'     },
  { href: '#proj-section',  label: 'Projects' },
  { href: '#contact-wrap',  label: 'Contact'  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [menuOpen]);

  return (
    <header style={{ position: 'relative', zIndex: 200 }}>
      <nav
        aria-label="Main navigation"
        style={{ padding: '28px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        {/* Logo */}
        <a
          href="#"
          className="nav-logo"
          aria-label="Khitab Anand — back to top"
        >
          Khitab Anand
        </a>

        {/* Desktop links */}
        <ul className="nav-links" role="list" style={{ display: 'flex' }}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '4px' }}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen
            ? <X size={22} aria-hidden="true" />
            : <Menu size={22} aria-hidden="true" />
          }
        </button>
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
            style={{
              background: 'rgba(242,235,224,0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              overflow: 'hidden',
            }}
          >
            <ul
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', gap: '20px', listStyle: 'none' }}
              role="list"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '10px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      textDecoration: 'none',
                    }}
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
