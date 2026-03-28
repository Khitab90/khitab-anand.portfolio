import { motion } from 'framer-motion';
import SectionWrapper from '../shared/SectionWrapper';
import GradientText from '../shared/GradientText';
import { projects } from '../../data/projects';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';

// Only show the two flagship projects in the editorial layout
const FEATURED_IDS = ['elibrary', 'shoppinglist'];

// Scatter initial states — each card flies in from a unique direction
const SCATTER = [
  { x: -50, y: 70, rotate: -4 },
  { x: 50,  y: 90, rotate: 3  },
];

const techColors: Record<string, string> = {
  React: 'text-[#a2e7ff]',
  'Next.js': 'text-[#c4c0ff]',
  TypeScript: 'text-[#a2e7ff]',
  'Tailwind CSS': 'text-[#c4c0ff]',
  MongoDB: 'text-[#a2e7ff]',
  Express: 'text-[#c7c4d8]',
  'Node.js': 'text-[#a2e7ff]',
  MERN: 'text-[#a2e7ff]',
};

function getTechClass(tech: string) {
  return techColors[tech] ?? 'text-[#c4c0ff]';
}

// Gradient thumbnails keyed by project id
const THUMB_GRADIENTS: Record<string, string> = {
  elibrary: 'from-[#c4c0ff]/20 via-[#1f1f25] to-[#0e0e13]',
  shoppinglist: 'from-[#a2e7ff]/20 via-[#1f1f25] to-[#0e0e13]',
};

export default function Projects() {
  const featured = projects.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <SectionWrapper id="projects" className="bg-[#0e0e13]">
      <div className="max-w-[1100px] mx-auto w-full">

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl md:text-5xl font-bold mb-24 text-center"
        >
          Selected <GradientText>Works</GradientText>
        </motion.h2>

        {/* 2-column staggered editorial grid */}
        <div className="grid md:grid-cols-2 gap-20">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: SCATTER[i].x, y: SCATTER[i].y, rotate: SCATTER[i].rotate }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`space-y-8 ${i === 1 ? 'md:mt-40' : ''}`}
            >
              {/* Thumbnail */}
              <motion.div
                initial={{ scale: 0.92 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-video bg-[#1f1f25] rounded-xl overflow-hidden group border border-[rgba(70,69,85,0.2)] hover:border-[rgba(196,192,255,0.15)] transition-colors duration-300"
              >
                <div
                  className={`w-full h-full bg-gradient-to-br ${THUMB_GRADIENTS[project.id] ?? 'from-[#1f1f25] to-[#0e0e13]'} group-hover:scale-105 transition-transform duration-700 flex items-center justify-center`}
                >
                  <span className="font-heading font-bold text-2xl text-[rgba(196,192,255,0.15)] tracking-tighter">
                    {project.title}
                  </span>
                </div>
              </motion.div>

              {/* Info */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-heading font-bold text-[#e4e1e9] text-2xl leading-snug">
                    {project.title}
                  </h3>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                    className="text-[#464555] hover:text-[#a2e7ff] transition-colors shrink-0 mt-1"
                  >
                    <FaGithub size={20} aria-hidden="true" />
                  </a>
                </div>

                <p className="text-[#918fa1] leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-[#35343a] rounded ${getTechClass(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#a2e7ff] hover:text-[#e4e1e9] transition-colors"
                  >
                    Live Demo <ExternalLink size={12} aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
