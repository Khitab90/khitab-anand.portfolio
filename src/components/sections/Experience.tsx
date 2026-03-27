import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';
import SectionWrapper from '../shared/SectionWrapper';
import GradientText from '../shared/GradientText';
import { experience } from '../../data/experience';
import { certifications } from '../../data/certifications';

export default function Experience() {
  const topCert = certifications[0];

  return (
    <SectionWrapper id="work">
      <div className="max-w-[1100px] mx-auto w-full">

        {/* Section header */}
        <div className="flex items-center gap-6 mb-20">
          <h2 className="font-heading text-5xl font-bold whitespace-nowrap">
            <GradientText>Experience</GradientText>
          </h2>
          <div className="h-px bg-[#464555] flex-grow opacity-30" />
        </div>

        {/* Zigzag timeline */}
        <div className="relative space-y-20">
          {/* Center vertical line — desktop only */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'rgba(70,69,85,0.25)' }}
            aria-hidden="true"
          />

          {experience.map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative md:grid md:grid-cols-2 gap-20"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-1/2 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#c4c0ff] border-4 border-[#131318] hidden md:block z-10"
                  aria-hidden="true"
                />

                {/* Meta column — alternates left/right */}
                <div className={isEven ? 'md:text-right' : 'md:order-2'}>
                  <span className="font-heading text-[#a2e7ff] font-bold tracking-widest text-sm uppercase">
                    {item.startDate} — {item.endDate}
                  </span>
                  <h3 className="font-heading text-2xl font-bold mt-2 text-[#e4e1e9]">{item.company}</h3>
                  <p className="text-[#c4c0ff] font-medium mt-1">{item.role}</p>
                </div>

                {/* Description column */}
                <div className={`mt-6 md:mt-0 ${!isEven ? 'md:order-1 md:text-right' : ''}`}>
                  <p className="text-[#918fa1] leading-relaxed">
                    {item.bullets[0]}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certification callout card */}
        {topCert && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-24 p-8 rounded-xl bg-[#1f1f25] border border-[rgba(196,192,255,0.1)] flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-[rgba(196,192,255,0.3)] transition-all duration-300"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-lg bg-[#35343a] flex items-center justify-center text-[#c4c0ff] shrink-0">
                <Award size={28} aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#e4e1e9]">{topCert.title}</h4>
                <p className="text-[#464555] font-heading uppercase tracking-widest text-xs mt-1">
                  {topCert.platform} · {topCert.year}
                </p>
              </div>
            </div>
            {topCert.credentialUrl && (
              <a
                href={topCert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View credential for ${topCert.title}`}
                className="inline-flex items-center gap-2 bg-[#35343a] px-6 py-3 rounded-lg font-bold text-sm text-[#e4e1e9] hover:text-[#c4c0ff] transition-colors shrink-0"
              >
                VIEW CREDENTIAL <ExternalLink size={14} aria-hidden="true" />
              </a>
            )}
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
