import { motion } from 'framer-motion';
import SectionWrapper from '../shared/SectionWrapper';
import GlassCard from '../shared/GlassCard';
import GradientText from '../shared/GradientText';
import { experience } from '../../data/experience';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  return (
    <SectionWrapper id="experience" className="bg-white/[0.01]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-sm font-medium text-violet-400 tracking-[0.2em] uppercase mb-3">Career</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Work <GradientText>Experience</GradientText>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
            aria-hidden="true"
            style={{
              background: 'linear-gradient(to bottom, #7c3aed 0%, rgba(124,58,237,0.1) 100%)',
            }}
          />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-16 md:pl-0"
              >
                {/* Timeline node */}
                <div
                  className="absolute left-[18px] md:left-1/2 top-6 w-4 h-4 rounded-full border-2 border-violet-500 bg-[#0a0a0f] md:-translate-x-1/2 shadow-[0_0_12px_rgba(124,58,237,0.6)]"
                  aria-hidden="true"
                />

                {/* Card — offset right on desktop */}
                <div className="md:ml-[calc(50%+24px)]">
                  <GlassCard className="p-6">
                    {/* Company + role */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 shrink-0">
                        <Briefcase size={16} className="text-violet-400" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-base">{item.role}</h3>
                        <p className="text-violet-300 text-sm font-medium">{item.company}</p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {item.startDate} – {item.endDate} · {item.location}
                        </p>
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-2" aria-label={`Responsibilities at ${item.company}`}>
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-sm text-gray-400 leading-relaxed">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-500 shrink-0" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
