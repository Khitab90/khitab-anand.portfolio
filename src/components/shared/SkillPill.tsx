import { motion } from 'framer-motion';

interface SkillPillProps {
  label: string;
  index?: number;
}

export default function SkillPill({ label, index = 0 }: SkillPillProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
        border border-violet-500/30 bg-violet-500/10 text-violet-300
        hover:border-violet-400/60 hover:bg-violet-500/20 hover:text-violet-200
        transition-all duration-200 cursor-default"
    >
      {label}
    </motion.span>
  );
}
