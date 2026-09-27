import Reveal from "./Reveal";

const INTERESTS = [
  "Web Development",
  "Backend Engineering",
  "Full-Stack Development",
  "Problem Solving",
  "Competitive Programming",
  "Software Architecture",
  "APIs",
  "Developer Tools",
];

export default function InterestsSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <Reveal>
        <p className="mb-6 text-sm uppercase tracking-widest text-copper">Interests</p>
        <div className="flex flex-wrap justify-center gap-2">
          {INTERESTS.map((interest) => (
            <span key={interest} className="tech-badge">
              {interest}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
