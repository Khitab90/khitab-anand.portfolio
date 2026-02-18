import { motion } from 'framer-motion';
import SectionWrapper from '../shared/SectionWrapper';
import GlassCard from '../shared/GlassCard';
import GradientText from '../shared/GradientText';
import { certifications } from '../../data/certifications';
import { ExternalLink, Award, CheckCircle2 } from 'lucide-react';

export default function Certifications() {
  return (
    <SectionWrapper id="certifications" className="bg-white/[0.01]">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-medium text-violet-400 tracking-[0.2em] uppercase mb-4">Credentials</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            <GradientText>Certifications</GradientText>
          </h2>
        </div>

        {/* Cards */}
        <div className="space-y-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard className="p-10 md:p-12">
                <div className="flex items-start gap-7">
                  {/* Icon */}
                  <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 shrink-0">
                    <Award size={30} className="text-violet-400" aria-hidden="true" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <h3 className="font-semibold text-white text-xl leading-snug">{cert.title}</h3>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View credential for ${cert.title}`}
                          className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 border border-violet-500/30 hover:border-violet-400/60 px-4 py-2 rounded-full transition-all duration-200 shrink-0"
                        >
                          View Credential <ExternalLink size={11} aria-hidden="true" />
                        </a>
                      )}
                    </div>

                    {/* Issuer + year */}
                    <p className="text-sm text-gray-400 mb-5">
                      <span className="text-violet-300 font-medium">{cert.issuer}</span>
                      {' · '}{cert.platform}{' · '}{cert.year}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-loose mb-7">{cert.description}</p>

                    {/* Highlights */}
                    <ul className="space-y-4" aria-label="Certificate highlights">
                      {cert.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                          <CheckCircle2 size={16} className="text-violet-400 mt-0.5 shrink-0" aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
