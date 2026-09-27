import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-darkstone bg-charcoal py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center">
        <p className="text-sm text-stone">
          © {new Date().getFullYear()} Mohamed Ahmed Galal — Built with Next.js & Tailwind CSS
        </p>
        <SocialLinks iconSize={22} />
      </div>
    </footer>
  );
}
