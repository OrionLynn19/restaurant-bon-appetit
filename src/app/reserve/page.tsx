"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import{useRouter} from "next/navigation";
import ConfirmBox from "@/components/ConfirmBox";

const BRANCHES = [
  "Pathum Thani",
  "Silom",
  "Mo Chit",
];

const ALL_SLOTS = {
  breakfast: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
  lunch: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM"],
};

const UNAVAILABLE: Record<string, Record<string, string[]>> = {};

type Slot = { label: string; disabled?: boolean };

/* ---------- helpers ---------- */
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

function formatDate(d: Date | null) {
  if (!d) return "DD/MM/YY";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd}/${mm}/${yy}`;
}
function isoDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
}
function buildMonthGrid(view: Date) {
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const startIdx = first.getDay(); // Sun=0
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const prevMonthDays = new Date(view.getFullYear(), view.getMonth(), 0).getDate();

  const cells: { day: number; inMonth: boolean; date: Date }[] = [];
  // leading
  for (let i = startIdx - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    cells.push({ day, inMonth: false, date: new Date(view.getFullYear(), view.getMonth() - 1, day) });
  }
  // current
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true, date: new Date(view.getFullYear(), view.getMonth(), d) });
  }
  // trailing
  while (cells.length < 42) {
    const d = cells.length - (startIdx + daysInMonth) + 1;
    cells.push({ day: d, inMonth: false, date: new Date(view.getFullYear(), view.getMonth() + 1, d) });
  }
  return cells;
}
function parseLabelToDate(baseDate: Date, label: string) {
  const [timeStr, meridianRaw] = label.trim().split(/\s+/);
  const mer = (meridianRaw || "AM").toUpperCase();
  const [hhStr, mmStr] = timeStr.split(":");
  let h = Number(hhStr);
  const m = Number(mmStr ?? "0");
  if (mer === "PM" && h !== 12) h += 12;
  if (mer === "AM" && h === 12) h = 0;
  const d = new Date(baseDate);
  d.setHours(h, m, 0, 0);
  return d;
}
function isPastForToday(label: string, selectedDate: Date | null) {
  if (!selectedDate) return false;
  const today = startOfDay(new Date());
  if (!isSameDay(startOfDay(selectedDate), today)) return false;
  return parseLabelToDate(selectedDate, label).getTime() < Date.now();
}
/** Thai-ish phone check */
function isValidPhoneTH(input: string) {
  const s = input.replace(/[^\d+]/g, "");
  if (s.startsWith("+66")) return /^\+66\d{8,9}$/.test(s);
  if (s.startsWith("0")) return /^0\d{8,9}$/.test(s);
  return /^\+\d{8,15}$/.test(s);
}

/* ---------- page ---------- */
export default function ReservePage() {
  const router= useRouter();
  // form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [guests, setGuests] = useState(0);
  const [message, setMessage] = useState("");

  // popovers
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showBranch, setShowBranch] = useState(false);

  // Add confirmation modal state
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [showBookingConfirmed, setShowBookingConfirmed] = useState(false);

  // selections
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("");
  const [branch, setBranch] = useState<string>("");

  const cells = useMemo(() => buildMonthGrid(viewMonth), [viewMonth]);

  // disabled slots
  const manualUnavailable = selectedDate && branch ? UNAVAILABLE[isoDate(selectedDate)]?.[branch] ?? [] : [];
  const BREAKFAST: Slot[] = ALL_SLOTS.breakfast.map((label) => ({
    label,
    disabled: isPastForToday(label, selectedDate) || manualUnavailable.includes(label),
  }));
  const LUNCH: Slot[] = ALL_SLOTS.lunch.map((label) => ({
    label,
    disabled: isPastForToday(label, selectedDate) || manualUnavailable.includes(label),
  }));

  const phoneValid = phone.length > 0 && isValidPhoneTH(phone);
  const canProceed =
    !!name.trim() && phoneValid && !!selectedDate && !!time && !!branch && guests > 0;

  // Update onSubmit function
  function onSubmit() {
    if (!canProceed || !selectedDate) return;
    
    // Show confirmation modal instead of navigating immediately
    setShowConfirmBox(true);
  }

  // Handle confirmation
  function handleConfirm() {
    if (!selectedDate) return;
    
    // Close the confirmation modal and show booking confirmed
    setShowConfirmBox(false);
    setShowBookingConfirmed(true);
    
    // Optional: Auto-close the success modal after 3 seconds
    setTimeout(() => {
      setShowBookingConfirmed(false);
    }, 6000);
  }

  // Handle cancellation
  function handleCancel() {
    setShowConfirmBox(false);
  }

  const todayStart = startOfDay(new Date());

  /* ---- UI ---- */
  const fieldBase =
    "rounded-md border border-stone-300 bg-white/90 px-3 h-10 outline-none focus:border-emerald-600"; // ← unified height

  return (
    <div className="bg-[#fff9ef] text-stone-800">
      {/* Title */}
      <section className="mx-auto max-w-6xl px-6 pt-10">
        <h2 className="text-2xl font-extrabold tracking-wide text-emerald-900">
          MAKE A RESERVATION
        </h2>
      </section>

      {/* Form + Image */}
      <section className="mx-auto grid max-w-6xl items-start gap-8 px-6 py-6 md:grid-cols-[minmax(0,560px)_minmax(0,520px)]">
        {/* LEFT: FORM */}
        <form
          className="grid grid-cols-1 gap-x-6 gap-y-5 text-sm md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {/* Name */}
          <label className="grid gap-1">
            <span className="text-[12px] font-semibold text-emerald-900">Name*</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name...."
              className={fieldBase}
            />
          </label>

          {/* Phone */}
          <label className="grid gap-1">
            <span className="text-[12px] font-semibold text-emerald-900">Phone*</span>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => setPhoneTouched(true)}
              placeholder="+66 81 234 5678"
              inputMode="tel"
              autoComplete="tel"
              className={[
                "px-3 h-10 rounded-md outline-none",
                phoneTouched && !phoneValid
                  ? "border border-red-500 focus:border-red-600 bg-white/90"
                  : "border border-stone-300 focus:border-emerald-600 bg-white/90",
              ].join(" ")}
            />
            {phoneTouched && !phoneValid && (
              <span className="text-[12px] text-red-600">
                Enter a valid Thai number, e.g. <b>0812345678</b> or <b>+66812345678</b>.
              </span>
            )}
          </label>

          {/* Date */}
          <div className="relative">
            <label className="grid gap-1">
              <span className="text-[12px] font-semibold text-emerald-900">Date*</span>
              <button
                type="button"
                onClick={() => {
                  setShowDate((s) => !s);
                  setShowTime(false);
                  setShowBranch(false);
                }}
                className={`flex w-full items-center justify-between text-left ${fieldBase}`}
              >
                <span className={!selectedDate ? "text-stone-400" : ""}>
                  {formatDate(selectedDate)}
                </span>
                <svg className="h-4 w-4 text-stone-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.23 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
                </svg>
              </button>
            </label>

            {showDate && (
              <>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setShowDate(false)}
                  className="fixed inset-0 z-20 bg-transparent"
                />
                <div className="absolute z-30 mt-2 w-[320px] rounded-2xl border border-stone-300 bg-white p-4 shadow-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <button
                      type="button"
                      className="rounded-md p-1 hover:bg-stone-100"
                      onClick={() =>
                        setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))
                      }
                      aria-label="Prev month"
                    >
                      ‹
                    </button>
                    <div className="font-semibold">
                      {viewMonth.toLocaleString(undefined, { month: "long", year: "numeric" })}
                    </div>
                    <button
                      type="button"
                      className="rounded-md p-1 hover:bg-stone-100"
                      onClick={() =>
                        setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))
                      }
                      aria-label="Next month"
                    >
                      ›
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center text-xs text-stone-500">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                      <div key={d}>{d}</div>
                    ))}
                  </div>

                  <div className="mt-2 grid grid-cols-7 gap-2">
                    {cells.map((c, idx) => {
                      const isSelected =
                        selectedDate && c.date.toDateString() === selectedDate.toDateString();
                      const isPastDay = startOfDay(c.date).getTime() < todayStart.getTime();
                      const base = "h-9 rounded-md text-sm grid place-items-center";
                      const styles = c.inMonth
                        ? isSelected
                          ? "bg-emerald-600 text-white"
                          : isPastDay
                          ? "text-stone-400 border border-stone-200 cursor-not-allowed"
                          : "hover:bg-stone-100 text-stone-800 cursor-pointer"
                        : "text-stone-400";
                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={isPastDay}
                          className={`${base} ${styles}`}
                          onClick={() => {
                            if (isPastDay) return;
                            setSelectedDate(c.date);
                            setShowDate(false);
                            setTime("");
                          }}
                        >
                          {c.day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

         
          <div className="relative">
            <label className="grid gap-1">
              <span className="text-[12px] font-semibold text-emerald-900">SelectTime*</span>
              <button
                type="button"
                onClick={() => {
                  setShowTime((s) => !s);
                  setShowDate(false);
                  setShowBranch(false);
                }}
                className={`flex w-full items-center justify-between text-left ${fieldBase}`}
              >
                <span className={!time ? "text-stone-400" : ""}>{time || "Select Time"}</span>
                <svg className="h-4 w-4 text-stone-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.23 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
                </svg>
              </button>
            </label>

            {showTime && (
              <>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setShowTime(false)}
                  className="fixed inset-0 z-20 bg-transparent"
                />
                <div className="absolute z-30 mt-2 w-[520px] max-w-[95vw] rounded-2xl border border-stone-300 bg-white p-5 shadow-xl">
                  <h3 className="mb-4 text-center text-xl font-extrabold tracking-wide text-emerald-900">
                    SELECT A TIME
                  </h3>

                  <section className="mb-6">
                    <h4 className="mb-3 text-center text-lg font-semibold text-stone-800">Breakfast</h4>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {ALL_SLOTS.breakfast.map((label) => {
                        const isDisabled = BREAKFAST.find((s) => s.label === label)?.disabled ?? false;
                        const selected = label === time;
                        return (
                          <button
                            key={label}
                            type="button"
                            disabled={isDisabled}
                            data-selected={selected}
                            onClick={() => {
                              if (isDisabled) return;
                              setTime(label);
                              setShowTime(false);
                            }}
                            className="
                              rounded-lg border px-6 py-3 text-center font-semibold tracking-wide
                              border-emerald-900/40 text-emerald-900 hover:bg-emerald-50
                              disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500 disabled:border-stone-300
                              data-[selected=true]:bg-emerald-600 data-[selected=true]:text-white data-[selected=true]:border-emerald-600
                            "
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  <section>
                    <h4 className="mb-3 text-center text-lg font-semibold text-stone-800">Lunch</h4>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {ALL_SLOTS.lunch.map((label) => {
                        const isDisabled = LUNCH.find((s) => s.label === label)?.disabled ?? false;
                        const selected = label === time;
                        return (
                          <button
                            key={label}
                            type="button"
                            disabled={isDisabled}
                            data-selected={selected}
                            onClick={() => {
                              if (isDisabled) return;
                              setTime(label);
                              setShowTime(false);
                            }}
                            className="
                              rounded-lg border px-6 py-3 text-center font-semibold tracking-wide
                              border-emerald-900/40 text-emerald-900 hover:bg-emerald-50
                              disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500 disabled:border-stone-300
                              data-[selected=true]:bg-emerald-600 data-[selected=true]:text-white data-[selected=true]:border-emerald-600
                            "
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </div>
              </>
            )}
          </div>

          
          <div className="relative">
            <label className="grid gap-1">
              <span className="text-[12px] font-semibold text-emerald-900">Restaurant Branch</span>
              <button
                type="button"
                onClick={() => {
                  setShowBranch((s) => !s);
                  setShowDate(false);
                  setShowTime(false);
                }}
                className={`flex w-full items-center justify-between text-left ${fieldBase}`}
              >
                <span className={!branch ? "text-stone-400" : ""}>{branch || "Branch"}</span>
                <svg className="h-4 w-4 text-stone-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.23 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
                </svg>
              </button>
            </label>

            {showBranch && (
              <>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setShowBranch(false)}
                  className="fixed inset-0 z-20 bg-transparent"
                />
                <div className="absolute z-30 mt-2 w-full rounded-2xl border border-stone-300 bg-white py-2 shadow-xl">
                  {BRANCHES.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        setBranch(b);
                        setShowBranch(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-emerald-900 hover:bg-emerald-50"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

         
          <label className="grid gap-1">
            <span className="text-[12px] font-semibold text-emerald-900">Amount Of Guest*</span>
            <div className="flex items-center gap-2">
              <input
                value={guests}
                readOnly
                className="w-full rounded-md border border-stone-300 bg-white/90 px-3 h-10 outline-none"
              />
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(0, g - 1))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-stone-300 bg-white text-stone-700"
                aria-label="decrease"
              >
                –
              </button>
              <button
                type="button"
                onClick={() => setGuests((g) => g + 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-stone-300 bg-white text-stone-700"
                aria-label="increase"
              >
                +
              </button>
            </div>
          </label>

          
          <label className="col-span-full grid gap-1">
            <span className="text-[12px] font-semibold text-emerald-900">Message</span>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any Additional Request?"
              className="w-full rounded-md border border-stone-300 bg-white/90 px-3 py-2 outline-none focus:border-emerald-600"
            />
          </label>
<div className="col-span-full flex justify-end">
  <div className="relative inline-block"> 
    <div
      aria-hidden="true"
      className="absolute inset-0 translate-y-[2px] rounded-[12px] bg-black"
    />
    <button
      type="submit"
      disabled={!canProceed}
      className="
        relative z-10
        rounded-[12px] border-2 border-[#0E4B3B] bg-[#EA954E]
        px-6 py-2 text-[15px] font-extrabold uppercase tracking-wide text-[#0E4B3B]
        hover:translate-y-[1px] hover:[&+div]:translate-y-[7px]
        active:translate-y-[2px]
        disabled:opacity-150 disabled:cursor-not-allowed
      "
    >
      NEXT
    </button>
  </div>
</div>



        </form>

        
        <div className="hidden md:block self-start -mt-4 mb-2">
          <div className="h-[60vh] w-full overflow-hidden rounded-xl border border-stone-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
              <Image
                src="/images/Dinningroom.png"
                alt=""
                fill
                className="object-cover [backface-visibility:hidden]"
                style={{ inset: "-1px" }} 
                loading="lazy"
                fetchPriority="auto"
                sizes="(min-width:768px) 520px, 0px"
              />
            </div>
          </div>
        </div>
      </section>
      
     
      {showConfirmBox && selectedDate && (
        <ConfirmBox
          fullName={name}
          phoneNumber={phone}
          date={formatDate(selectedDate)}
          time={time}
          branch={branch}
          guests={guests}
          message={message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      
      {showBookingConfirmed && (
        <div className="fixed inset-0 flex items-center justify-center  z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md  mx-4 text-center">
            <div className="mb-4">
              <svg 
                className="mx-auto h-16 w-16 text-rgba(7, 48, 39, 1)" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-rgba(7, 48, 39, 1) mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-rgba(7, 48, 39, 1) mb-4">
              Your reservation has been successfully confirmed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
