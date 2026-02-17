import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type VanillaTilt from 'vanilla-tilt';
import SectionWrapper from '../shared/SectionWrapper';
import GlassCard from '../shared/GlassCard';
import GradientText from '../shared/GradientText';
import { projects } from '../../data/projects';
import type { ProjectItem } from '../../types';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const techColors: Record<string, string> = {
  'React': 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  'Next.js': 'text-gray-300 border-gray-500/30 bg-gray-500/10',
  'TypeScript': 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  'JavaScript': 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  'Node.js': 'text-green-400 border-green-500/30 bg-green-500/10',
  'MongoDB': 'text-green-500 border-green-600/30 bg-green-600/10',
  'Express': 'text-gray-400 border-gray-600/30 bg-gray-600/10',
  'Ruby on Rails': 'text-red-400 border-red-500/30 bg-red-500/10',
  'C# .NET': 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  'Tailwind CSS': 'text-teal-400 border-teal-500/30 bg-teal-500/10',
};

function getTechClass(tech: string) {
  return techColors[tech] ?? 'text-violet-300 border-violet-500/30 bg-violet-500/10';
}

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !cardRef.current) return;

    let tilt: VanillaTilt | null = null;

    import('vanilla-tilt').then((mod) => {
      const VanillaTiltClass = mod.default as typeof VanillaTilt;
      if (cardRef.current) {
        VanillaTiltClass.init(cardRef.current, {
          max: 8,
          speed: 400,
          glare: true,
          'max-glare': 0.08,
          'glare-prerender': false,
          scale: 1.02,
          gyroscope: false,
        });
        tilt = (cardRef.current as unknown as Element & { vanillaTilt: VanillaTilt }).vanillaTilt;
      }
    });

    return () => {
      tilt?.destroy();
    };
  }, [prefersReduced]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div ref={cardRef} style={{ transformStyle: 'preserve-3d' }} data-cursor="link">
        <GlassCard className="p-6 h-full flex flex-col" hover={false}>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <span className="text-xs text-gray-500 mb-1 block">{project.date} · {project.role}</span>
              <h3 className="font-semibold text-white text-base leading-snug">{project.title}</h3>
            </div>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="text-gray-500 hover:text-violet-400 transition-colors shrink-0 mt-1"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={18} aria-hidden="true" />
            </a>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed flex-1 mb-4">{project.description}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getTechClass(tech)}`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Live link if present */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title}`}
              className="mt-4 inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              Live Demo <ExternalLink size={12} aria-hidden="true" />
            </a>
          )}
        </GlassCard>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-sm font-medium text-violet-400 tracking-[0.2em] uppercase mb-3">Portfolio</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Featured <GradientText>Projects</GradientText>
          </h2>
          <p className="mt-4 text-gray-500 text-sm max-w-lg mx-auto">
            A selection of projects spanning full-stack web apps, REST APIs, and mobile backends.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
