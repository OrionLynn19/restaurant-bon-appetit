import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bon Appétit",
  description: "Restaurant website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col bg-white text-neutral-900">
        <Navbar />
        <main className="flex-1 flex flex-col min-h-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
