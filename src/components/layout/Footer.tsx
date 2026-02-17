import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import GradientText from '../shared/GradientText';

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5 text-center">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © 2026 <GradientText>Khitab Anand</GradientText>. Built with React & TypeScript.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="mailto:kjanand09@gmail.com"
            aria-label="Send email to Khitab"
            className="text-gray-500 hover:text-violet-400 transition-colors"
            data-cursor="link"
          >
            <Mail size={18} aria-hidden="true" />
          </a>
          <a
            href="https://github.com/Khitab90"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View GitHub profile"
            className="text-gray-500 hover:text-violet-400 transition-colors"
            data-cursor="link"
          >
            <FaGithub size={18} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/khitabanand/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View LinkedIn profile"
            className="text-gray-500 hover:text-violet-400 transition-colors"
            data-cursor="link"
          >
            <FaLinkedin size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
