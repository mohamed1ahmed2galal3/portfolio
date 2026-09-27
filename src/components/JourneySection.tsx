import Reveal from "./Reveal";

const JOURNEY = [
  {
    step: "01",
    title: "Front-End Development",
    description:
      "Experience building responsive and interactive web interfaces using JavaScript, React, and Next.js.",
  },
  {
    step: "02",
    title: "Backend Development",
    description:
      "Currently expanding into backend engineering with Node.js, APIs, authentication, CRUD systems, databases, and server-side development.",
  },
  {
    step: "03",
    title: "Competitive Programming",
    description:
      "Active problem solving and competitive programming practice using C++ and Data Structures & Algorithms.",
  },
  {
    step: "04",
    title: "Full-Stack Development",
    description:
      "Combining frontend and backend skills to build complete web applications.",
  },
];

export default function JourneySection() {
  return (
    <section id="journey" className="bg-charcoal py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="mb-2 text-sm uppercase tracking-widest text-copper">Journey</p>
          <h2 className="mb-12 text-3xl font-semibold text-ivory md:text-4xl">
            Development Journey
          </h2>
        </Reveal>

        <div className="space-y-8 border-l border-darkstone pl-8">
          {JOURNEY.map((item, i) => (
            <Reveal key={item.step} delay={i * 100}>
              <div className="relative">
                <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border border-copper bg-obsidian text-xs text-copper">
                  {item.step}
                </span>
                <h3 className="mb-1 font-medium text-ivory">{item.title}</h3>
                <p className="text-sm leading-relaxed text-stone">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
