"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

function TimePill({ label }: { label: string }) {
  return (
    <span className="inline-flex min-w-[2.5rem] items-center justify-center rounded-md bg-white px-2 py-1 text-base font-extrabold leading-none text-[#EA7D33]">
      {label}
    </span>
  );
}

function RadioRow({
  name, label, price, checked, onChange,
}: {
  name: string; label: string; price: string; checked: boolean; onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between px-1">
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          className="relative h-6 w-6 appearance-none rounded-md border-2 border-[#155241]
                     before:absolute before:inset-0 before:flex before:items-center before:justify-center
                     before:text-base before:text-[#155241] before:opacity-0 before:scale-75 before:transition-all
                     checked:before:content-['✔'] checked:before:opacity-100 checked:before:scale-100"
        />
        <span className="text-sm font-semibold text-[#073027]">{label}</span>
      </div>
      <span className="text-sm text-[#6a7f79]">{price}</span>
    </label>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`text-lg font-extrabold tracking-wide text-[#073027] ${className}`}>{children}</div>;
}

export default function MenuDetail() {
  const [portion, setPortion] = useState<"regular" | "large">("regular");
  const [secondsLeft, setSecondsLeft] = useState(7 * 3600 + 36 * 60 + 57);

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const hh = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const mm = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-[#FFF7E9] text-[#073027]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white shadow-sm">
              <Image fill src="/images/Carbonara.png" alt="Carbonara" className="z-0 object-cover" />
              <div className="absolute right-0 top-[-5px] z-10">
                <span className="inline-block bg-[#EA7D33] px-6 py-2 pr-5 text-sm font-semibold tracking-wide text-black [--notch:18px] [clip-path:polygon(0_0,100%_0,100%_100%,0_100%,var(--notch)_50%)]">
                  Best Seller
                </span>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-left">
              <h1 className="text-3xl font-extrabold tracking-wide md:text-4xl">CARBONARA</h1>
              <p className="text-sm leading-relaxed text-[#28564D] md:text-base">
                Lorem Ipsum Dolor Sit Amet Consectetur. Dui Et Varius Vel Est. Integer In Quam Justo Vestibulum Lectus Etiam.
                A Sit Imperdiet Aliquam Tortor Tincidunt. Lorem Ipsum Dolor Sit Amet Consectetur. Dui Et Varius Vel Est.
              </p>
            </div>
          </div>

          <div>
            <div className="rounded-2xl bg-[#FFF3DA] p-5 shadow-sm ring-1 ring-black/5">
              <div className="mb-6 flex items-center justify-between rounded-xl bg-[#155241] px-4 py-4">
                <div>
                  <div className="text-sm font-extrabold uppercase tracking-wider text-[#EA7D33]">Special Discount</div>
                  <div className="mt-2 flex items-center gap-2">
                    <TimePill label={hh} />
                    <span className="-mx-1 text-xl font-bold text-[#EA7D33]">:</span>
                    <TimePill label={mm} />
                    <span className="-mx-1 text-xl font-bold text-[#EA7D33]">:</span>
                    <TimePill label={ss} />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold tracking-wide text-[#EA7D33]">30% OFF</div>
                  <div className="mt-2 text-lg font-extrabold leading-none text-[#EA7D33]">90 BHT</div>
                  <div className="text-xs line-through text-white/70 opacity-70">150 BHT</div>
                </div>
              </div>

              <SectionTitle>Portion</SectionTitle>
              <div className="mt-3 space-y-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
