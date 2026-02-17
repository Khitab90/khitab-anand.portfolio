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
        <div className="mb-16 text-center">
          <p className="text-sm font-medium text-violet-400 tracking-[0.2em] uppercase mb-3">Career</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Work <GradientText>Experience</GradientText>
          </h2>
        </div>

        {/* Timeline — clean left-aligned, no split */}
        <div className="relative pl-8">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px"
            aria-hidden="true"
            style={{
              background: 'linear-gradient(to bottom, #7c3aed 0%, rgba(124,58,237,0.08) 100%)',
            }}
          />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Timeline node */}
                <div
                  className="absolute -left-[2.15rem] top-7 w-3.5 h-3.5 rounded-full border-2 border-violet-500 bg-[#0a0a0f] shadow-[0_0_10px_rgba(124,58,237,0.6)]"
                  aria-hidden="true"
                />

                <GlassCard className="p-7">
                  {/* Company + role */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 shrink-0 mt-0.5">
                      <Briefcase size={18} className="text-violet-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg leading-snug">{item.role}</h3>
                      <p className="text-violet-300 text-sm font-medium mt-0.5">{item.company}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {item.startDate} – {item.endDate} · {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3" aria-label={`Responsibilities at ${item.company}`}>
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
