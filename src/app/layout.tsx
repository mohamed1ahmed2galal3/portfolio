import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohamed Ahmed — Portfolio",
  description: "Backend, Frontend & Problem Solving — projects and learning notes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className="bg-obsidian text-ivory antialiased">{children}</body>
    </html>
  );
}
