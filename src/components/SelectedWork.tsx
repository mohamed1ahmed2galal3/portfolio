import ItemCard from "./ItemCard";
import type { Item } from "@/types/item";

export default function SelectedWork({ items }: { items: Item[] }) {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
      <p className="mb-2 text-sm uppercase tracking-widest text-copper">Selected Work</p>
      <h2 className="mb-3 max-w-xl text-3xl font-semibold text-ivory md:text-4xl">
        Projects that speak volumes.
      </h2>
      <p className="mb-10 max-w-xl text-stone">
        Each project represents a unique challenge solved with clean code and thoughtful design.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <ItemCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
