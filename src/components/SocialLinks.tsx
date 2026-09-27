import { Github, Linkedin } from "lucide-react";

const SOCIAL_LINKS = {
  github: "https://github.com/mohamed1ahmed2galal3",
  linkedin: "https://www.linkedin.com/in/mohamedahmed-galal",
};

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

export default function SocialLinks({ className = "", iconSize = 20 }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="text-stone transition-colors hover:text-copper"
      >
        <Github size={iconSize} />
      </a>
      <a
        href={SOCIAL_LINKS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-stone transition-colors hover:text-copper"
      >
        <Linkedin size={iconSize} />
      </a>
    </div>
  );
}
