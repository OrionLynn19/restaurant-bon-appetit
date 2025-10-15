"use client";

export default function DeliveryDetails() {
  return (
    <section
      aria-labelledby="delivery-title"
      className="w-full [&_*]list-none"
      style={{ listStyle: "none" }} 
    >
      <h3
        id="delivery-title"
        className="mb-6 text-[18px] md:text-[20px] font-extrabold tracking-[0.08em] text-[#0F3B2F] uppercase"
      >
        Delivery Details
      </h3>

      <div className="flex items-start gap-4">
       
        <div className="flex flex-col items-center pt-1 shrink-0" style={{ listStyle: "none" }}>
          
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="w-5 h-5"
            style={{ fill: "#0F3B2F" }}
          >
            <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
          </svg>

          
          <span className="my-2 h-10 border-l-2 border-dashed" style={{ borderColor: "#E7A36B" }} />

          
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="w-5 h-5"
            style={{ fill: "#0F3B2F" }}
          >
            <path d="M12 3 2 12h2v9h6v-6h4v6h6v-9h2z" />
          </svg>
        </div>

        
        <div className="flex-1 text-[#0F3B2F]" style={{ listStyle: "none" }}>
          <div className="mb-6">
            <p className="font-semibold">From</p>
            <p className="text-[#3B5B52]">Bon Appétit Silom</p>
          </div>

          <div className="mb-2">
            <p className="font-semibold">Delivering To</p>
            <p className="text-[#3B5B52]">Home</p>
          </div>

          <p className="text-sm text-[#6B7D77] mt-4">
            * Next To North Building.....
          </p>
        </div>
      </div>
    </section>
  );
}
