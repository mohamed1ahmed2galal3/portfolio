import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ItemCard from "@/components/ItemCard";
import FilterBar from "@/components/FilterBar";
import SearchBox from "@/components/SearchBox";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface WorkPageProps {
  searchParams: { category?: string; type?: string; search?: string };
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const { category, type, search } = searchParams;

  const items = await prisma.item.findMany({
    where: {
      status: "PUBLISHED",
      ...(category ? { category: category as any } : {}),
      ...(type ? { type: type as any } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { technologies: { has: search } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="mb-8 text-3xl font-semibold text-ivory">All Work</h1>

        <SearchBox />
        <FilterBar />

        {items.length === 0 ? (
          <p className="text-stone">No matching results.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((item: typeof items[number], i: number) => (
              <ItemCard key={item.id} item={item as any} index={i} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
