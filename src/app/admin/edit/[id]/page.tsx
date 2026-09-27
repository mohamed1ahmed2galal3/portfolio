import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ItemForm from "@/components/ItemForm";

export default async function EditItemPage({ params }: { params: { id: string } }) {
  const item = await prisma.item.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-ivory">Edit: {item.title}</h1>
      <ItemForm initialValues={item as any} />
    </div>
  );
}
