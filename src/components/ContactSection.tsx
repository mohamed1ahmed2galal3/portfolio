import { Github, Linkedin, Mail } from "lucide-react";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

const EMAIL = "mohamedahmedgalal246@gmail.com";
const GITHUB = "https://github.com/mohamed1ahmed2galal3";
const LINKEDIN = "https://www.linkedin.com/in/mohamedahmed-galal";
const WHATSAPP = "https://wa.me/201017310653";

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-2xl px-6 py-24 text-center">
      <Reveal>
        <p className="mb-2 text-sm uppercase tracking-widest text-copper">Contact</p>
        <h2 className="mb-4 text-3xl font-semibold text-ivory md:text-4xl">
          Let&apos;s Work Together
        </h2>
        <p className="mb-10 text-stone">
          Have a project, idea, or opportunity? Feel free to get in touch.
        </p>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2 rounded-md bg-copper px-6 py-2.5 font-medium text-charcoal transition hover:bg-sand"
          >
            <Mail size={16} /> Email Me
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-darkstone px-6 py-2.5 font-medium text-ivory transition hover:border-olive hover:text-olive"
          >
            <WhatsAppIcon size={16} /> Chat on WhatsApp
          </a>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-stone transition-colors hover:text-copper"
          >
            <Github size={22} />
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-stone transition-colors hover:text-copper"
          >
            <Linkedin size={22} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
