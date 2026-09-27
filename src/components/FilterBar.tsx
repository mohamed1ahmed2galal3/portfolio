"use client";

import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "BACKEND", label: "Backend" },
  { value: "FRONTEND", label: "Frontend" },
  { value: "PROBLEM_SOLVING", label: "Problem Solving" },
];

const TYPES = [
  { value: "", label: "All" },
  { value: "PROJECT", label: "Project" },
  { value: "LEARNING_NOTE", label: "Learning Note" },
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/work?${params.toString()}`);
  }

  return (
    <div className="mb-8 flex flex-wrap gap-4">
      <select
        defaultValue={searchParams.get("category") ?? ""}
        onChange={(e) => updateParam("category", e.target.value)}
        className="rounded-md border border-darkstone bg-charcoal px-3 py-2 text-sm text-ivory"
      >
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      <select
        defaultValue={searchParams.get("type") ?? ""}
        onChange={(e) => updateParam("type", e.target.value)}
        className="rounded-md border border-darkstone bg-charcoal px-3 py-2 text-sm text-ivory"
      >
        {TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
}
