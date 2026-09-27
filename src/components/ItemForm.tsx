"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = "BACKEND" | "FRONTEND" | "PROBLEM_SOLVING";
type ItemType = "PROJECT" | "LEARNING_NOTE";
type Status = "DRAFT" | "PUBLISHED";

interface ItemFormValues {
  id?: string;
  title: string;
  shortDescription: string;
  content: string;
  category: Category;
  type: ItemType;
  technologies: string[];
  thumbnailUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  status: Status;
  featured: boolean;
}

interface ItemFormProps {
  initialValues?: Partial<ItemFormValues>;
}

const emptyValues: ItemFormValues = {
  title: "",
  shortDescription: "",
  content: "",
  category: "FRONTEND",
  type: "PROJECT",
  technologies: [],
  thumbnailUrl: "",
  githubUrl: "",
  demoUrl: "",
  status: "DRAFT",
  featured: false,
};

export default function ItemForm({ initialValues }: ItemFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<ItemFormValues>({
    ...emptyValues,
    ...initialValues,
  });
  const [techInput, setTechInput] = useState(values.technologies.join(", "));
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(values.id);

  function update<K extends keyof ItemFormValues>(key: K, val: ItemFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });
      if (!res.ok) throw new Error("Upload failed");
      const blob = await res.json();
      update("thumbnailUrl", blob.url);
    } catch (err) {
      setError("Something went wrong while uploading the image. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload: ItemFormValues = {
      ...values,
      technologies: techInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(
        isEditing ? `/api/items/${values.id}` : "/api/items",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error("Save failed");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("Something went wrong while saving. Please check the fields and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-6 rounded-xl border border-darkstone bg-graphite p-6"
    >
      {error && (
        <p className="rounded-md border border-copper/40 bg-copper/10 px-4 py-2 text-sm text-copper">
          {error}
        </p>
      )}

      <div>
        <label className="mb-1 block text-sm text-stone">Title</label>
        <input
          required
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
          className="w-full rounded-md border border-darkstone bg-charcoal px-3 py-2 text-ivory outline-none focus:border-copper"
          placeholder="Project name or Learning Note title"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-stone">Short description</label>
        <input
          required
          value={values.shortDescription}
          onChange={(e) => update("shortDescription", e.target.value)}
          className="w-full rounded-md border border-darkstone bg-charcoal px-3 py-2 text-ivory outline-none focus:border-copper"
          placeholder="One or two sentences shown on the card"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-stone">
          Full details (explanation, steps, code if needed)
        </label>
        <textarea
          required
          rows={6}
          value={values.content}
          onChange={(e) => update("content", e.target.value)}
          className="w-full rounded-md border border-darkstone bg-charcoal px-3 py-2 text-ivory outline-none focus:border-copper"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-stone">Category</label>
          <select
            value={values.category}
            onChange={(e) => update("category", e.target.value as Category)}
            className="w-full rounded-md border border-darkstone bg-charcoal px-3 py-2 text-ivory outline-none focus:border-copper"
          >
            <option value="BACKEND">Backend</option>
            <option value="FRONTEND">Frontend</option>
            <option value="PROBLEM_SOLVING">Problem Solving</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-stone">Type</label>
          <select
            value={values.type}
            onChange={(e) => update("type", e.target.value as ItemType)}
            className="w-full rounded-md border border-darkstone bg-charcoal px-3 py-2 text-ivory outline-none focus:border-copper"
          >
            <option value="PROJECT">Project</option>
            <option value="LEARNING_NOTE">Learning Note</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-stone">
          Technologies / Topics (comma-separated)
        </label>
        <input
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          placeholder="Next.js, TypeScript, Prisma"
          className="w-full rounded-md border border-darkstone bg-charcoal px-3 py-2 text-ivory outline-none focus:border-copper"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-stone">
          Thumbnail image (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full text-sm text-stone file:mr-3 file:rounded-md file:border-0 file:bg-copper file:px-3 file:py-2 file:text-charcoal"
        />
        {uploading && <p className="mt-1 text-xs text-sand">Uploading image...</p>}
        {values.thumbnailUrl && !uploading && (
          <img
            src={values.thumbnailUrl}
            alt="preview"
            className="mt-3 h-32 w-full rounded-md border border-darkstone object-cover"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-stone">GitHub link</label>
          <input
            type="url"
            value={values.githubUrl}
            onChange={(e) => update("githubUrl", e.target.value)}
            placeholder="https://github.com/username/repo"
            className="w-full rounded-md border border-darkstone bg-charcoal px-3 py-2 text-ivory outline-none focus:border-copper"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-stone">Live demo link</label>
          <input
            type="url"
            value={values.demoUrl}
            onChange={(e) => update("demoUrl", e.target.value)}
            placeholder="https://your-demo.vercel.app"
            className="w-full rounded-md border border-darkstone bg-charcoal px-3 py-2 text-ivory outline-none focus:border-copper"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="mb-1 block text-sm text-stone">Status</label>
          <select
            value={values.status}
            onChange={(e) => update("status", e.target.value as Status)}
            className="rounded-md border border-darkstone bg-charcoal px-3 py-2 text-ivory outline-none focus:border-copper"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-stone">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="h-4 w-4 accent-copper"
          />
          Featured (show on the homepage)
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting || uploading}
        className="w-full rounded-md bg-copper py-2.5 font-medium text-charcoal transition hover:bg-sand disabled:opacity-50"
      >
        {submitting ? "Saving..." : isEditing ? "Save changes" : "Add item"}
      </button>
    </form>
  );
}
