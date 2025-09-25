"use client";

export default function CartPage() {
  // TODO: replace with real data/store
  const items = [
    { id: "1", name: "Signature Salad", qty: 1, price: 159 },
    { id: "2", name: "Grilled Chicken", qty: 2, price: 199 },
  ];
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-[#073027] mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-semibold text-[#073027]">{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.qty}</p>
              </div>
              <p className="font-semibold text-[#073027]">
                ฿{(item.qty * item.price).toLocaleString()}
              </p>
            </div>
          ))}

          <div className="flex justify-between font-bold text-lg pt-4">
            <span>Total</span>
            <span>฿{total.toLocaleString()}</span>
          </div>

          <button className="mt-4 w-full rounded-lg bg-[#b87a63] text-white font-semibold py-3 shadow hover:brightness-95 active:scale-[0.99] transition">
            Checkout
          </button>
        </div>
      )}
    </main>
  );
}
