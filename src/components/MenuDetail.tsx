"use client"
import React,{ useEffect, useState } from "react";

function TimePill({ label }: { label: string }) {
  return (
    <span className="inline-flex min-w-[2.5rem] items-center justify-center rounded-md bg-white px-2 py-1 text-base font-extrabold leading-none text-[#EA7D33]">
      {label}
    </span>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`text-lg font-extrabold tracking-wide text-[#073027] ${className}`}>{children}</div>;
}

export default function MenuDetail() {
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
      <div className="rounded-2xl bg-[#FFF3DA] p-5 shadow-sm ring-1 ring-black/5">
        <div className="mb-6 flex items-center justify-between rounded-xl bg-[#155241] px-4 py-4">
          <div>
            <div className="text-sm font-extrabold uppercase tracking-wider text-[#EA7D33]">Special Discount</div>
            <div className="mt-2 flex items-center gap-2">
              <TimePill label={hh} />
              <span className="-mx-1 text-xl font-bold">:</span>
              <TimePill label={mm} />
              <span className="-mx-1 text-xl font-bold">:</span>
              <TimePill label={ss} />
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold tracking-wide text-[#EA7D33]">30% OFF</div>
            <div className="mt-2 text-lg font-extrabold leading-none text-[#EA7D33]">90 BHT</div>
            <div className="text-xs line-through text-white/70 opacity-70">150 BHT</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}
