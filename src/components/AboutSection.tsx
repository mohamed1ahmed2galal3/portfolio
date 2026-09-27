import Reveal from "./Reveal";

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <p className="mb-2 text-sm uppercase tracking-widest text-copper">About</p>
        <h2 className="mb-6 text-3xl font-semibold text-ivory md:text-4xl">
          Who I am
        </h2>
        <p className="leading-relaxed text-stone">
          Mohamed is a Computer Science student and software developer with a
          strong interest in building modern web applications. He started with
          Front-End Development and has experience working with modern
          frontend technologies such as React and Next.js. He is currently
          expanding into Backend Development, with a focus on Node.js, APIs,
          server-side development, databases, authentication, and building
          complete full-stack applications. He also has a strong interest in
          Problem Solving and Competitive Programming.
        </p>
      </Reveal>
    </section>
  );
}
