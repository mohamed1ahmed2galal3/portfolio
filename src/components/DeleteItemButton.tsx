"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteItemButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this item?")) return;
    setLoading(true);
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-stone hover:text-copper disabled:opacity-50"
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}
