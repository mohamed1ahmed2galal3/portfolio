import Reveal from "./Reveal";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <p className="mb-2 text-sm uppercase tracking-widest text-copper">Achievements</p>
        <h2 className="mb-10 text-3xl font-semibold text-ivory md:text-4xl">
          Competitive Programming
        </h2>
      </Reveal>

      {/* Primary achievement: ECPC */}
      <Reveal>
        <div className="hover-lift mb-10 rounded-xl border border-darkstone bg-graphite p-8 hover:border-copper/40">
          <h3 className="mb-2 text-xl font-semibold text-ivory">
            ECPC Regional Finalist
          </h3>
          <p className="mb-4 text-stone">
            Ranked 9th among 295 teams as part of the team{" "}
            <span className="text-sand">&ldquo;One Keyboard Three Opinions&rdquo;</span>,
            alongside teammates Saif El-Din and Abanoub Samy.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="tech-badge">Rank 9 / 295 teams</span>
            <span className="tech-badge">ECPC Regionals</span>
          </div>
        </div>
      </Reveal>

      {/* Academic achievement: visually secondary */}
      <Reveal delay={100}>
        <div className="rounded-lg border border-darkstone/60 bg-transparent p-5">
          <p className="text-sm uppercase tracking-wide text-stone/70">
            Academic Achievement
          </p>
          <p className="mt-1 text-sm text-stone">
            Computer Science student — GPA 3.62, ranked 3rd in cohort.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
