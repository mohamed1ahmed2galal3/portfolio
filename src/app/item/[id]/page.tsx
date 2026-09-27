import { notFound } from "next/navigation";
import { Github, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = await prisma.item.findUnique({ where: { id: params.id } });
  if (!item || item.status !== "PUBLISHED") notFound();

  return (
    <>
      <Navbar />
      <article className="mx-auto max-w-3xl px-6 py-16">
        {item.thumbnailUrl && (
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="mb-8 h-64 w-full rounded-xl border border-darkstone object-cover"
          />
        )}

        <p className="mb-2 text-sm uppercase tracking-widest text-copper">
          {item.category.replace("_", " ")} · {item.type.replace("_", " ")}
        </p>
        <h1 className="mb-4 text-3xl font-semibold text-ivory">{item.title}</h1>
        <p className="mb-6 text-stone">{item.shortDescription}</p>

        <div className="mb-8 flex flex-wrap gap-2">
          {item.technologies.map((tech: string) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>

        <div className="mb-10 flex gap-4">
          {item.demoUrl && (
            <a
              href={item.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md bg-copper px-4 py-2 text-sm font-medium text-charcoal hover:bg-sand"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-darkstone px-4 py-2 text-sm text-ivory hover:border-copper"
            >
              <Github size={14} /> View Code
            </a>
          )}
        </div>

        <div className="whitespace-pre-line leading-relaxed text-ivory/90">
          {item.content}
        </div>
      </article>
      <Footer />
    </>
  );
}
