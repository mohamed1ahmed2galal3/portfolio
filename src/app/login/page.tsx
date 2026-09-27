"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-xl border border-darkstone bg-graphite p-8"
      >
        <h1 className="text-xl font-semibold text-ivory">Admin Login</h1>

        {error && (
          <p className="rounded-md border border-copper/40 bg-copper/10 px-3 py-2 text-sm text-copper">
            {error}
          </p>
        )}

        <div>
          <label className="mb-1 block text-sm text-stone">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-darkstone bg-charcoal px-3 py-2 text-ivory outline-none focus:border-copper"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-stone">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-darkstone bg-charcoal px-3 py-2 text-ivory outline-none focus:border-copper"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-copper py-2.5 font-medium text-charcoal hover:bg-sand disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
