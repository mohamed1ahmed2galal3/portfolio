import Reveal from "./Reveal";

const SKILL_GROUPS = [
  {
    title: "Programming Languages",
    items: ["C++", "Python", "JavaScript", "Dart"],
  },
  {
    title: "Frontend Development",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  },
  {
    title: "Backend Development",
    items: [
      "Node.js",
      "REST APIs",
      "HTTP",
      "Authentication",
      "CRUD",
      "File-based data handling",
      "Server-side development",
    ],
  },
  {
    title: "Database / Backend Tools",
    items: ["Prisma", "SQL", "SQLite"],
  },
  {
    title: "Tools & Workflow",
    items: ["Git", "GitHub", "Postman", "VS Code"],
  },
  {
    title: "Other",
    items: ["Problem Solving", "Competitive Programming", "Data Structures & Algorithms"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-charcoal py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="mb-2 text-sm uppercase tracking-widest text-copper">Expertise</p>
          <h2 className="mb-10 text-3xl font-semibold text-ivory md:text-4xl">
            Skills & Technologies
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <div className="hover-lift h-full rounded-xl border border-darkstone bg-graphite p-6 hover:border-copper/40">
                <h3 className="mb-4 font-medium text-ivory">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="tech-badge">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
