import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-600">
        <div className="font-semibold text-neutral-800">BON APPÉTIT</div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className="text-[11px]">
          © {new Date().getFullYear()} Bon Appétit
        </div>
      </div>
    </footer>
  );
}
