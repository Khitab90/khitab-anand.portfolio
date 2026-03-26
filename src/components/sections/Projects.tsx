import { motion } from 'framer-motion';
import SectionWrapper from '../shared/SectionWrapper';
import GradientText from '../shared/GradientText';
import { projects } from '../../data/projects';
import type { ProjectItem } from '../../types';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';

// Tech tag colors — cyan text to denote "code/stack" per design spec
const techColors: Record<string, string> = {
  React: 'text-[#a2e7ff]',
  'Next.js': 'text-[#c7c4d8]',
  TypeScript: 'text-[#a2e7ff]',
  JavaScript: 'text-[#ffb785]',
  'Node.js': 'text-[#a2e7ff]',
  MongoDB: 'text-[#a2e7ff]',
  Express: 'text-[#c7c4d8]',
  'Ruby on Rails': 'text-[#ffb4ab]',
  'C# .NET': 'text-[#c4c0ff]',
  'Tailwind CSS': 'text-[#a2e7ff]',
};

function getTechClass(tech: string) {
  return techColors[tech] ?? 'text-[#c4c0ff]';
}

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      {/* border-beam-wrap adds rotating border glow on hover via CSS */}
      <div className="border-beam-wrap h-full">
        <div className="bg-[#1f1f25] rounded-xl border border-[rgba(70,69,85,0.15)] hover:border-[rgba(196,192,255,0.2)] transition-all duration-500 hover:scale-[1.02] p-8 h-full flex flex-col group">

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="space-y-1.5">
              <span className="text-xs text-[#464555] font-heading uppercase tracking-widest block">
                {project.date} · {project.role}
              </span>
              <h3 className="font-heading font-bold text-[#e4e1e9] text-xl leading-snug">
                {project.title}
              </h3>
            </div>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="text-[#464555] hover:text-[#a2e7ff] transition-colors shrink-0 mt-1"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={20} aria-hidden="true" />
            </a>
          </div>

          {/* Divider */}
          <div className="h-px bg-[rgba(70,69,85,0.3)] mb-5" />

          {/* Description */}
          <p className="text-sm text-[#918fa1] leading-loose flex-1 mb-6">
            {project.description}
          </p>

          {/* Tech tags */}
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

          {/* Live link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title}`}
              className="mt-5 inline-flex items-center gap-1.5 text-xs text-[#a2e7ff] hover:text-[#e4e1e9] transition-colors"
            >
              Live Demo <ExternalLink size={12} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="bg-[#0e0e13]">
      <div className="max-w-[1100px] mx-auto w-full">

        {/* Header */}
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-16 text-center">
          Selected <GradientText>Works</GradientText>
        </h2>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
