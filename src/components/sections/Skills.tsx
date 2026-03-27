import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../shared/SectionWrapper';

const BOOKS = [
  {
    id: 'frontend',
    title: 'The Frontend Codex',
    icon: 'code',
    accentClass: 'text-[#c4c0ff]',
    borderClass: 'border-[rgba(196,192,255,0.3)]',
    dotClass: 'bg-[#c4c0ff]',
    headerClass: 'text-[#c4c0ff] border-[rgba(196,192,255,0.2)]',
    label: 'Technologies',
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML / CSS', 'Tailwind'],
  },
  {
    id: 'aiml',
    title: 'The AI/ML Ledger',
    icon: 'smart_toy',
    accentClass: 'text-[#a2e7ff]',
    borderClass: 'border-[rgba(162,231,255,0.3)]',
    dotClass: 'bg-[#a2e7ff]',
    headerClass: 'text-[#a2e7ff] border-[rgba(162,231,255,0.2)]',
    label: 'Architecture',
    skills: ['LangChain', 'LangGraph', 'RAG Systems', 'ChromaDB', 'CrewAI', 'LLM Agents'],
  },
];

function Book({ book }: { book: (typeof BOOKS)[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ width: 220, height: 320, perspective: 2000 }}
      onClick={() => setOpen((o) => !o)}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={`${open ? 'Close' : 'Open'} ${book.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen((o) => !o); } }}
    >
      {/* Spine */}
      <div
        className="absolute left-0 top-0 bottom-0 bg-[#0e0e13]"
        style={{
          width: 30,
          transformOrigin: 'left',
          transform: 'rotateY(-90deg) translateX(-15px)',
        }}
        aria-hidden="true"
      />

      {/* Cover */}
      <motion.div
        className={`absolute inset-0 bg-[#1f1f25] border ${book.borderClass} rounded-[4px_12px_12px_4px] flex flex-col justify-center items-center p-8 z-20`}
        style={{ transformOrigin: 'left', backfaceVisibility: 'hidden' }}
        animate={{ rotateY: open ? -160 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <span className={`material-symbols-outlined text-4xl ${book.accentClass} mb-4`}>{book.icon}</span>
        <h3 className="font-heading font-bold text-center text-xl text-[#e4e1e9]">{book.title}</h3>
        <p className={`text-xs mt-3 ${book.accentClass} uppercase tracking-widest font-bold`}>Click to open</p>
      </motion.div>

      {/* Inside pages */}
      <div
        className="absolute inset-0 bg-[#0e0e13] border border-[rgba(196,192,255,0.08)] rounded-sm p-6 flex flex-col z-10"
        aria-hidden={!open}
      >
        <h4 className={`font-bold text-sm mb-4 border-b pb-2 ${book.headerClass}`}>{book.label}</h4>
        <ul className="space-y-3 font-heading text-sm text-left">
          {book.skills.map((skill) => (
            <li key={skill} className="flex items-center gap-2 text-[#c7c4d8]">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${book.dotClass}`} />
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="bg-[#131318]/40 relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto w-full text-center">

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-5xl font-bold mb-20"
        >
          My <span className="text-[#c4c0ff]">Skillshelf</span>
        </motion.h2>

        {/* Bookshelf surface */}
        <div className="flex flex-wrap justify-center gap-16 md:gap-32 items-end pb-6">
          {BOOKS.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Book book={book} />
            </motion.div>
          ))}
        </div>

        {/* Shelf plank */}
        <div className="mt-6 h-3 max-w-2xl mx-auto rounded bg-[#1f1f25] border-t border-[rgba(196,192,255,0.08)]" aria-hidden="true" />
      </div>
    </SectionWrapper>
  );
}
