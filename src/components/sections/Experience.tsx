import { motion } from 'framer-motion';
import SectionWrapper from '../shared/SectionWrapper';
import GlassCard from '../shared/GlassCard';
import GradientText from '../shared/GradientText';
import { experience } from '../../data/experience';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  return (
    <SectionWrapper id="experience" className="bg-white/[0.01]">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-medium text-violet-400 tracking-[0.2em] uppercase mb-4">Career</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Work <GradientText>Experience</GradientText>
          </h2>
        </div>

        {/* Timeline — clean left-aligned, no split */}
        <div className="relative pl-10">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px"
            aria-hidden="true"
            style={{
              background: 'linear-gradient(to bottom, #7c3aed 0%, rgba(124,58,237,0.08) 100%)',
            }}
          />

          <div className="space-y-12">
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
                  className="absolute -left-[2.75rem] top-8 w-4 h-4 rounded-full border-2 border-violet-500 bg-[#0a0a0f] shadow-[0_0_12px_rgba(124,58,237,0.7)]"
                  aria-hidden="true"
                />

                <GlassCard className="p-10 md:p-12">
                  {/* Company + role */}
                  <div className="flex items-start gap-6 mb-9">
                    <div className="p-3.5 rounded-xl bg-violet-500/10 border border-violet-500/20 shrink-0 mt-0.5">
                      <Briefcase size={22} className="text-violet-400" aria-hidden="true" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-white text-xl leading-snug">{item.role}</h3>
                      <p className="text-violet-300 text-sm font-medium">{item.company}</p>
                      <p className="text-gray-500 text-sm">
                        {item.startDate} – {item.endDate} · {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-5" aria-label={`Responsibilities at ${item.company}`}>
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-4 text-sm text-gray-400 leading-loose">
                        <span className="mt-2.5 w-2 h-2 rounded-full bg-violet-500 shrink-0" aria-hidden="true" />
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
