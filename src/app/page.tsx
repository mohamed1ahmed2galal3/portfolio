import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import SelectedWork from "@/components/SelectedWork";
import AchievementsSection from "@/components/AchievementsSection";
import JourneySection from "@/components/JourneySection";
import InterestsSection from "@/components/InterestsSection";
import ContactSection from "@/components/ContactSection";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredItems = await prisma.item.findMany({
    where: { status: "PUBLISHED", featured: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <>
      <Navbar />

      {/* Hero — two columns: text + photo */}
      <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 pb-20 pt-20 md:grid-cols-2 md:pt-28">
        <Reveal>
          <p className="mb-4 text-sm uppercase tracking-widest text-copper">
            Backend · Frontend · Problem Solving
          </p>
          <h1 className="mb-4 text-4xl font-semibold leading-tight text-ivory md:text-5xl">
            Mohamed Ahmed Galal
          </h1>
          <p className="mb-8 max-w-md text-stone">
            Computer Science Student & Software Developer, building modern
            web applications across the frontend, backend, and problem
            solving.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/work"
              className="inline-block rounded-md bg-copper px-6 py-2.5 font-medium text-charcoal transition hover:bg-sand"
            >
              Browse all work
            </Link>
            <Link
              href="/#contact"
              className="inline-block rounded-md border border-darkstone px-6 py-2.5 font-medium text-ivory transition hover:border-copper hover:text-sand"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative mx-auto max-w-xs md:max-w-sm">
            <div className="float-soft overflow-hidden rounded-2xl border border-darkstone shadow-2xl">
              <Image
                src="/images/mohamed.jpg"
                alt="Mohamed Ahmed Galal"
                width={896}
                height={1195}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Scroll cue */}
      <div className="flex justify-center pb-6">
        <span className="bounce-soft text-stone">↓</span>
      </div>

      <AboutSection />
      <SkillsSection />
      <SelectedWork items={featuredItems as any} />
      <AchievementsSection />
      <JourneySection />
      <InterestsSection />
      <ContactSection />

      <Footer />
    </>
  );
}
