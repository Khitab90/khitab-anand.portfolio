import { motion } from 'framer-motion';
import SectionWrapper from '../shared/SectionWrapper';
import GradientText from '../shared/GradientText';
import SkillPill from '../shared/SkillPill';
import { skills } from '../../data/skills';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-20 text-center">
          <p className="text-sm font-medium text-violet-400 tracking-[0.2em] uppercase mb-4">About Me</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Who I <GradientText>Am</GradientText>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-6 text-gray-400 leading-loose text-base">
              <p>
                I'm a <span className="text-gray-200 font-medium">Software Engineer</span> based
                in Los Angeles, CA, with over two years of professional experience building
                production-ready React and TypeScript applications at{' '}
                <span className="text-violet-300 font-medium">Walmart Global Tech</span>.
              </p>
              <p>
                I specialize in creating component-driven UIs, writing high-coverage test suites,
                and collaborating closely with UX designers and backend teams to ship features
                end-to-end. I've contributed to GraphQL migrations, multi-market deployments,
                and accessibility improvements.
              </p>
              <p>
                Outside of work I'm pursuing an <span className="text-gray-200 font-medium">MBA at Westcliff University</span>,
                exploring AI engineering, and building personal projects to stay sharp on the
                full stack.
              </p>
            </div>

            {/* Education callouts */}
            <div className="mt-10 space-y-4">
              {[
                { degree: 'MBA', school: 'Westcliff University', period: '2024 – Present' },
                { degree: 'M.S. Computer Science', school: 'California State University, Northridge', period: '2018 – 2021' },
                { degree: 'B.E. Electrical Engineering', school: 'LD College of Engineering, India', period: '2013 – 2017' },
              ].map((ed) => (
                <div
                  key={ed.degree}
                  className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-violet-500/20 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 shrink-0" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-200">{ed.degree}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{ed.school} · {ed.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <div className="space-y-8">
            {skills.map((cat, ci) => (
              <div key={cat.category}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                  {cat.category}
                </h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2.5"
                >
                  {cat.skills.map((skill, si) => (
                    <SkillPill key={skill} label={skill} index={ci * 8 + si} />
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
