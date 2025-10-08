"use client";

export default function PaymentSection() {
  return (
    <section className="rounded-xl border border-[#E6E0D9] bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-xs font-extrabold tracking-[0.08em] text-[#0F3B2F]">
        PAYMENT
      </h3>

      <div className="flex w-full items-center justify-between rounded-lg border border-[#EFEAE5] p-3">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* VISA Logo */}
          <div className="flex h-8 w-14 items-center justify-center rounded-md bg-white">
            <svg viewBox="0 0 48 16" className="h-6 w-14">
              <rect x="0" y="11" width="48" height="3" fill="#E09B4A" />
              <text
                x="8"
                y="11"
                fontSize="10"
                fontFamily="sans-serif"
                fontWeight="800"
                fill="#1F3E3A"
              >
                VISA
              </text>
            </svg>
          </div>

          {/* Card info */}
          <div className="leading-tight">
            <div className="text-sm font-medium text-[#2B2B2B]">Visa</div>
            <div className="text-[11px] text-[#8C7B6A]">1585 XXXX XXXX XXXX</div>
          </div>
        </div>

        {/* Chevron */}
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="#E09B4A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </section>
  );
}
