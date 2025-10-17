// src/components/MenuDetail.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { menuApi } from "@/lib/api";
import type { MenuItem } from "@/types/content";

const addOnList = [
  { key: "cheese", name: "Cheese", price: 0 },
  { key: "bacon", name: "Extra Bacon", price: 50 },
  { key: "sauce", name: "Extra Sauce", price: 30 },
  { key: "egg", name: "Extra Egg", price: 15 },
] as const;

type AddOnKey = (typeof addOnList)[number]["key"];

function TimePill({ label }: { label: string }) {
  return (
    <span className="inline-flex min-w-[2rem] min-h-[2rem] items-center justify-center rounded-md bg-white px-2 py-1 text-base font-extrabold leading-none text-[#EA7D33]">
      {label}
    </span>
  );
}

function RadioRow({
  name,
  label,
  price,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  price: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between px-1 font-['Schibsted_Grotesk']">
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          className="relative h-8 w-8 appearance-none rounded-md border-2 border-black
            before:absolute before:inset-0 before:flex before:items-center before:justify-center
            before:text-base before:text-[#073027] before:opacity-0 before:scale-75 before:transition-all
            checked:before:content-['✔'] checked:before:opacity-100 checked:before:scale-100"
        />
        <span className="text-sm text-[#073027]">{label}</span>
      </div>
      <span className="text-sm text-[#6a7f79]">{price}</span>
    </label>
  );
}

function CheckboxRow({
  label,
  price,
  checked,
  onChange,
}: {
  label: string;
  price: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between px-1 font-['Schibsted_Grotesk']">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="relative h-8 w-8 appearance-none rounded-md border-2 border-black
            before:absolute before:inset-0 before:flex before:items-center before:justify-center
            before:text-base before:text-[#073027] before:opacity-0 before:scale-75 before:transition-all
            checked:before:content-['✔'] checked:before:opacity-100 checked:before:scale-100"
        />
        <span className="text-sm text-[#073027]">{label}</span>
      </div>
      <span className="text-sm text-[#6a7f79]">{price}</span>
    </label>
  );
}

function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-left text-lg font-['Bebas_Neue'] font-extrabold tracking-wide text-[#073027] ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- page ---------- */
export default function MenuDetail() {
  // get the dish name from /menu/detail/[name]
  const params = useParams<{ name: string }>();
  const displayName = decodeURIComponent(params?.name ?? "Menu Item");
  const baseId = displayName.toLowerCase().replace(/\s+/g, "-");

  // State for fetched menu item data
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [portion, setPortion] = useState<"regular" | "large">("regular");
  const [secondsLeft, setSecondsLeft] = useState(7 * 3600 + 36 * 60 + 57);
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const [addOns, setAddOns] = useState<Record<AddOnKey, boolean>>({
    cheese: false,
    bacon: false,
    sauce: false,
    egg: false,
  });

  const { addItem } = useCart();

  // Fetch menu item data based on name
  useEffect(() => {
    const fetchMenuItem = async () => {
      if (!displayName) return;

      setLoading(true);
      setError(null);

      try {
        // First try to search for menu item by exact name
        const response = await menuApi.getAll({
          search: displayName,
          available: true,
          limit: 10, // Get more results to find better match
        });

        if (response.success && response.data && response.data.length > 0) {
          // Find exact match (case-insensitive) first
          let exactMatch = response.data.find(
            (item) => item.name.toLowerCase() === displayName.toLowerCase()
          );

          // If no exact match, try fuzzy matching
          if (!exactMatch) {
            exactMatch = response.data.find(
              (item) =>
                item.name.toLowerCase().includes(displayName.toLowerCase()) ||
                displayName.toLowerCase().includes(item.name.toLowerCase())
            );
          }

          setMenuItem(exactMatch || response.data[0]);
        } else {
          // If search fails, try getting all items and find a match
          const allItemsResponse = await menuApi.getAll({
            available: true,
            limit: 100,
          });

          if (allItemsResponse.success && allItemsResponse.data) {
            const foundItem = allItemsResponse.data.find(
              (item) => item.name.toLowerCase() === displayName.toLowerCase()
            );

            if (foundItem) {
              setMenuItem(foundItem);
            } else {
              setError("Menu item not found");
            }
          } else {
            setError("Menu item not found");
          }
        }
      } catch (err) {
        setError("Failed to load menu item");
        console.error("Error fetching menu item:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [displayName]);

  const portionUpcharge = useMemo(
    () => (portion === "large" ? 100 : 0),
    [portion]
  );

  const addOnsTotal = useMemo(
    () =>
      addOnList.reduce((sum, a) => (addOns[a.key] ? sum + a.price : sum), 0),
    [addOns]
  );

  // Use actual menu item price or fallback to default
  const basePrice = menuItem?.discount_price || menuItem?.price || 90;
  const linePrice = basePrice + portionUpcharge + addOnsTotal;
  const total = linePrice * qty;
  const fmtB = (n: number) => `${n.toFixed(2)} B`;

  useEffect(() => {
    const id = setInterval(
      () => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)),
      1000
    );
    return () => clearInterval(id);
  }, []);

  const handleAddToCart = () => {
    if (isAdded || !menuItem) return;

    // encode options so each choice is a distinct line
    const selectedAddOnKeys = Object.entries(addOns)
      .filter(([, on]) => on)
      .map(([k]) => k)
      .sort()
      .join(",");

    const optionKey = `${portion}|${selectedAddOnKeys || "none"}`;
    const lineId = `${baseId}__${
      menuItem.discount_price ? "promo" : "regular"
    }__${optionKey}`;

    addItem({
      id: lineId,
      name: `${displayName}${menuItem.discount_price ? " (Promo)" : ""}`,
      price: linePrice, // unit price incl. portion/add-ons
      qty,
      image: menuItem.image_url || "/images/placeholder-food.jpg",
    });

    setIsAdded(true);
  };

  return (
    <main className="min-h-dvh bg-[#FFF5E2] text-[#073027] overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 md:px-6 pb-6 md:py-10">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EA7D33] mx-auto mb-4"></div>
              <p className="text-[#073027]">Loading menu item...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-[#EA7D33] text-[#073027] rounded-lg hover:bg-[#d86b28]"
              >
                Go Back
              </button>
            </div>
          </div>
        ) : menuItem ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <section>
              <div className="relative mx-[calc(50%-50vw)] md:mx-0 aspect-[4/3] overflow-hidden rounded-none md:rounded-lg bg-white">
                <Image
                  fill
                  src={menuItem.image_url || "/images/placeholder-food.jpg"}
                  alt={displayName}
                  className="object-fill object-center"
                />
                {menuItem.discount_price && (
                  <div className="absolute right-0 -top-0 z-10">
                    <span className="inline-block bg-[#EF9748] px-6 py-2 text-sm font-['Schibsted_Grotesk'] text-black [--notch:18px] [clip-path:polygon(0_0,100%_0,100%_100%,0_100%,var(--notch)_50%)]">
                      Best Seller
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3 text-left">
                <h1 className="text-3xl font-['Bebas_Neue'] md:text-4xl">
                  {displayName.toUpperCase()}
                </h1>
                <p className="text-sm font-['Schibsted_Grotesk'] text-[#28564D] md:text-base">
                  {menuItem.description ||
                    "Lorem Ipsum Dolor Sit Amet Consectetur. Dui Et Varius Vel Est. Integer In Quam Justo Vestibulum Lectus Etiam. A Sit Imperdiet Aliquam Tortor Tincidunt. Lorem Ipsum Dolor Sit Amet Consectetur. Dui Et Varius Vel Est."}
                </p>
              </div>
            </section>

            <aside>
              <div className="p-0 bg-transparent shadow-none ring-0 md:rounded-2xl md:bg-[#FFF3DA] md:p-5 md:shadow-sm md:ring-1 md:ring-black/5">
                {menuItem.discount_price && (
                  <div className="mb-6 flex items-center justify-between rounded-xl bg-[#155241] px-4 py-4">
                    <div>
                      <div className="text-sm font-extrabold uppercase tracking-wider text-[#EA7D33]">
                        Special Discount
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <TimePill
                          label={String(
                            Math.floor(secondsLeft / 3600)
                          ).padStart(2, "0")}
                        />
                        <span className="-mx-1 text-xl font-bold text-[#EA7D33]">
                          :
                        </span>
                        <TimePill
                          label={String(
                            Math.floor((secondsLeft % 3600) / 60)
                          ).padStart(2, "0")}
                        />
                        <span className="-mx-1 text-xl font-bold text-[#EA7D33]">
                          :
                        </span>
                        <TimePill
                          label={String(secondsLeft % 60).padStart(2, "0")}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold tracking-wide text-[#EA7D33]">
                        {Math.round(
                          ((menuItem.price - menuItem.discount_price) /
                            menuItem.price) *
                            100
                        )}
                        % OFF
                      </div>
                      <div className="mt-2 text-lg font-extrabold leading-none text-[#EA7D33]">
                        {menuItem.discount_price} {menuItem.currency || "THB"}
                      </div>
                      <div className="text-xs line-through text-white/70 opacity-70">
                        {menuItem.price} {menuItem.currency || "THB"}
                      </div>
                    </div>
                  </div>
                )}

                <SectionTitle>Portion</SectionTitle>
                <div className="mt-3 space-y-2">
                  <RadioRow
                    name="portion"
                    label="Regular"
                    price="Free"
                    checked={portion === "regular"}
                    onChange={() => setPortion("regular")}
                  />
                  <RadioRow
                    name="portion"
                    label="Large"
                    price="+ 100 B"
                    checked={portion === "large"}
                    onChange={() => setPortion("large")}
                  />
                </div>

                <SectionTitle className="mt-6">Add-on</SectionTitle>
                <div className="mt-3 space-y-2">
                  {addOnList.map((a) => (
                    <CheckboxRow
                      key={a.key}
                      label={a.name}
                      price={a.price === 0 ? "Free" : `${a.price} B`}
                      checked={addOns[a.key]}
                      onChange={() =>
                        setAddOns((prev) => ({
                          ...prev,
                          [a.key]: !prev[a.key],
                        }))
                      }
                    />
                  ))}
                </div>

                <SectionTitle className="mt-6">Add Request</SectionTitle>
                <textarea
                  placeholder="Any Special Request?"
                  className="mt-3 text-sm w-full resize-none rounded-xl border border-[#D9C9A9] bg-white/80 p-4 outline-none focus:border-[#155241] focus:bg-white"
                  rows={3}
                />

                <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3 mx-auto mb-5 md:mx-0 md:mb-0">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="flex h-7 w-7 font-['Schibsted_Grotesk'] items-center justify-center rounded-md bg-[#EA7D33] text-white text-lg font-bold leading-none border border-[#073027] shadow-[0_3px_0_#155241]"
                    >
                      −
                    </button>
                    <span className="min-w-[1.5rem] text-center text-sm">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="flex h-7 w-7 font-['Schibsted_Grotesk'] items-center justify-center rounded-md bg-[#EA7D33] text-white text-lg font-bold leading-none border border-[#073027] shadow-[0_3px_0_#155241]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className="relative inline-flex items-center justify-between gap-2 font-['Schibsted_Grotesk'] rounded-lg bg-[#EA7D33] px-4 py-3 text-sm text-[#073027] ring-2 ring-[#0B3C33] shadow-[0_4px_0_#0B3C33] transition-transform hover:translate-y-[1px] hover:shadow-[0_3px_0_#0B3C33] active:translate-y-[2px] active:shadow-[0_2px_0_#0B3C33] w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isAdded ? (
                      <span className="flex items-center gap-1">Added ✓</span>
                    ) : (
                      <>
                        <span className="flex items-center gap-1">
                          Add{" "}
                          <span className="font-bold text-[#D62B1F]">
                            {qty}
                          </span>{" "}
                          Cart
                        </span>
                        <span className="mx-1">&gt;</span>
                        <span className="text-sm font-bold tracking-wide">
                          {fmtB(total)}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        ) : null}
      </div>
    </main>
  );
}
