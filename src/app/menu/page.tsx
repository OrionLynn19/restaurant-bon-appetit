import CartButton from "@/components/CartButton";

export default function Menu() {
  return (
    <main className="min-h-screen">
      <div className="p-10 text-center text-3xl text-orange-500 w-full">
        This is Menu
      </div>

      {/* Cart button (sticky at bottom-right) */}
      <CartButton count={1} />
    </main>
  );
}
