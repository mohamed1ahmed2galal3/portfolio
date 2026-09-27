"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("search", value);
    else params.delete("search");
    router.push(`/work?${params.toString()}`);
  }

  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone" size={16} />
      <input
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by title or technology..."
        className="w-full rounded-md border border-darkstone bg-charcoal py-2 pl-9 pr-3 text-sm text-ivory outline-none focus:border-copper"
      />
    </div>
  );
}
