import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteItemButton from "@/components/DeleteItemButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const items = await prisma.item.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ivory">All Items ({items.length})</h1>
        <Link
          href="/admin/new"
          className="rounded-md bg-copper px-4 py-2 text-sm font-medium text-charcoal hover:bg-sand"
        >
          + Add New Item
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-darkstone">
        <table className="w-full text-sm">
          <thead className="bg-charcoal text-stone">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Featured</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: typeof items[number]) => (
              <tr key={item.id} className="border-t border-darkstone bg-graphite">
                <td className="px-4 py-3 text-ivory">{item.title}</td>
                <td className="px-4 py-3 text-stone">{item.category}</td>
                <td className="px-4 py-3 text-stone">{item.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      item.status === "PUBLISHED"
                        ? "bg-olive/20 text-olive"
                        : "bg-darkstone text-stone"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-stone">{item.featured ? "✔" : "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/edit/${item.id}`}
                      className="text-copper hover:text-sand"
                    >
                      Edit
                    </Link>
                    <DeleteItemButton id={item.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
