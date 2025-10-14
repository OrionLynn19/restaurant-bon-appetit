import MenuDetail from "@/components/MenuDetail";
import { getMenuBySlug } from "@/data/menu";
import { notFound } from "next/navigation";

function toSlug(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function MenuDetailPage({ params }: { params: { name: string } }) {
  const raw = decodeURIComponent(params.name);
  let menu = getMenuBySlug(raw);
  if (!menu) {
    const normalized = toSlug(raw);
    menu = getMenuBySlug(normalized);
  }

  if (!menu) return notFound();
  return <MenuDetail menu={menu} />;
}
