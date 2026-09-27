import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import type { Item } from "@/types/item";

export default function ItemCard({ item, index }: { item: Item; index?: number }) {
  return (
    <div className="hover-lift group rounded-xl border border-darkstone bg-graphite p-6 transition-colors hover:border-copper/50">
      <div className="mb-3 flex items-center justify-between">
        {typeof index === "number" && (
          <span className="text-sm font-medium text-stone">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        {item.featured && (
          <span className="rounded-full bg-copper/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-copper">
            Featured
          </span>
        )}
      </div>

      <Link href={`/item/${item.id}`}>
        <h3 className="mb-2 text-lg font-semibold text-ivory group-hover:text-sand">
          {item.title}
        </h3>
      </Link>

      <p className="mb-4 text-sm leading-relaxed text-stone">{item.shortDescription}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {item.technologies.map((tech) => (
          <span key={tech} className="tech-badge">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {item.demoUrl && (
          <a
            href={item.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-olive hover:text-sand"
          >
            <ExternalLink size={14} /> Live Demo
          </a>
        )}
        {item.githubUrl && (
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-stone hover:text-ivory"
          >
            <Github size={14} /> Code
          </a>
        )}
      </div>
    </div>
  );
}
