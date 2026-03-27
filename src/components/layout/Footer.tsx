import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-16 px-8 border-t border-[rgba(70,69,85,0.15)] bg-[#131318]">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-body text-sm uppercase tracking-widest text-[#464555]">
          © 2026 Khitab Anand. Built with Precision.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:kjanand09@gmail.com"
            aria-label="Send email to Khitab"
            className="text-[#464555] hover:text-[#c4c0ff] transition-colors"
          >
            <Mail size={18} aria-hidden="true" />
          </a>
          <a
            href="https://github.com/Khitab90"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View GitHub profile"
            className="text-[#464555] hover:text-[#c4c0ff] transition-colors"
          >
            <FaGithub size={18} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/khitabanand/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View LinkedIn profile"
            className="text-[#464555] hover:text-[#c4c0ff] transition-colors"
          >
            <FaLinkedin size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
