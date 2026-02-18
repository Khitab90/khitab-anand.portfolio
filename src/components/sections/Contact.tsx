import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../shared/SectionWrapper';
import GlassCard from '../shared/GlassCard';
import GradientText from '../shared/GradientText';
import MagneticButton from '../shared/MagneticButton';
import { Mail, MapPin, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const inputClass =
  'w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-violet-500/60 focus:bg-violet-500/5 transition-all duration-200';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <SectionWrapper id="contact">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="text-sm font-medium text-violet-400 tracking-[0.2em] uppercase mb-4">Get In Touch</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Let's <GradientText>Connect</GradientText>
          </h2>
          <p className="mt-5 text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
            Have a project in mind, a role to discuss, or just want to say hi? I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <GlassCard className="p-8 md:p-10">
            <form
              action="mailto:kjanand09@gmail.com"
              method="post"
              encType="text/plain"
              aria-label="Contact form"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    aria-label="Your name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 }}
                >
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    aria-label="Your email address"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.16 }}
                >
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    aria-label="Your message"
                  />
                </motion.div>

                <MagneticButton variant="primary" className="w-full justify-center">
                  Send Message <Send size={15} aria-hidden="true" />
                </MagneticButton>
              </div>
            </form>
          </GlassCard>

          {/* Contact info */}
          <div className="space-y-5 flex flex-col justify-center">
            {[
              {
                icon: <Mail size={20} aria-hidden="true" />,
                label: 'Email',
                value: 'kjanand09@gmail.com',
                href: 'mailto:kjanand09@gmail.com',
                ariaLabel: 'Send email to Khitab',
              },
              {
                icon: <FaGithub size={20} aria-hidden="true" />,
                label: 'GitHub',
                value: 'github.com/Khitab90',
                href: 'https://github.com/Khitab90',
                ariaLabel: 'View GitHub profile',
              },
              {
                icon: <FaLinkedin size={20} aria-hidden="true" />,
                label: 'LinkedIn',
                value: 'linkedin.com/in/khitabanand',
                href: 'https://www.linkedin.com/in/khitabanand/',
                ariaLabel: 'View LinkedIn profile',
              },
              {
                icon: <MapPin size={20} aria-hidden="true" />,
                label: 'Location',
                value: 'Los Angeles, CA',
                href: null,
                ariaLabel: null,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-center gap-5">
                    <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          aria-label={item.ariaLabel ?? undefined}
                          className="text-sm text-gray-300 hover:text-violet-300 transition-colors"
                          data-cursor="link"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-300">{item.value}</p>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
