import { motion } from 'framer-motion';
import SectionWrapper from '../shared/SectionWrapper';
import GradientText from '../shared/GradientText';

const STATUS_CHIPS = [
  { label: 'Los Angeles, CA', color: 'text-[#a2e7ff]' },
  { label: 'Open to Roles', color: 'text-[#a2e7ff]' },
  { label: 'React', color: 'text-[#c4c0ff]' },
  { label: 'TypeScript', color: 'text-[#c4c0ff]' },
  { label: 'AI / ML', color: 'text-[#ffb785]' },
];

export default function About() {
  return (
    <SectionWrapper id="about" className="bg-[#0e0e13]">
      <div className="max-w-[1100px] mx-auto w-full">

        {/* Two-column: photo LEFT, text RIGHT */}
        <div className="grid md:grid-cols-2 gap-20 items-center mb-20">

          {/* Left: decorative placeholder (profile is in Hero) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden aspect-square bg-[#1f1f25] border border-[rgba(70,69,85,0.3)] flex items-center justify-center"
          >
            <img
              src="/assets/profile.png"
              alt="Khitab Anand"
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(196,192,255,0.05) 0%, rgba(162,231,255,0.03) 100%)' }}
            />
          </motion.div>

          {/* Right: text + chips */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Engineering with <GradientText>Purpose</GradientText>
            </h2>

            <p className="text-[#918fa1] text-lg leading-relaxed mb-10">
              Senior Frontend Engineer dedicated to creating immersive digital experiences. My approach blends the logic
              of robust engineering with the intuition of high-end design. At{' '}
              <span className="text-[#e4e1e9] font-medium">Walmart Global Tech</span>, I focused on high-performance
              enterprise systems that serve millions.
            </p>

            {/* Status chips */}
            <div className="flex flex-wrap gap-3">
              {STATUS_CHIPS.map(({ label, color }) => (
                <span
                  key={label}
                  className={`bg-[#35343a] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${color} hover:bg-[rgba(196,192,255,0.12)] transition-colors`}
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </SectionWrapper>
  );
}
