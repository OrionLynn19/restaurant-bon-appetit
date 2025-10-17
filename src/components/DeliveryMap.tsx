export default function DeliveryMap() {
  return (
    <div className="relative gap-[48px] md:p-8">
      {/* Desktop-only header over image */}
      <div className="hidden md:block absolute mb-10 top-[16px] left-1/2 transform -translate-x-1/2 z-10">
        <h2
          className="text-[40px] font-normal uppercase text-black"
          style={{
            fontFamily: "var(--font-bebas)",
            lineHeight: "100%",
            letterSpacing: "0%",
          }}
        >
          BON APPÉTIT SILOM
        </h2>
      </div>
      {/* Map image container */}
      <div
        className="border border-gray-400 rounded-md overflow-hidden mt-4 md:mt-12 
                      w-[343px] h-[217px] md:w-[1312px] md:h-[467.52px] md:rounded-lg relative mx-auto"
      >
        <img
          src="/images/mapimage.png"
          alt="Delivery Route Map"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Desktop Delivery Status Card */}
      <div
        className="hidden md:flex flex-col w-[1312px] mx-auto mt-6 bg-white rounded-[9.55px] shadow p-6 gap-6"
        style={{ minHeight: "214.76px" }}
      >
        <div>
          <h2
            className="text-[#073027] text-[32px] font-bold font-bebas mb-1"
            style={{ letterSpacing: 0 }}
          >
            GET READY ALMOST !!!
          </h2>
          <p className="text-black text-[18px] font-normal">
            Arrive Around 1 Min
          </p>
        </div>
        <div className="flex items-center justify-between w-full mt-2">
          {/* Icon 1 */}
          <img
            src="/images/icon-park-solid_pot.png"
            alt="pot"
            className="w-[48px] h-[48px]"
          />
          {/* Line */}
          <div className="flex-1 h-[4px] bg-[#073027] mx-2 rounded" />
          {/* Icon 2 */}
          <img
            src="/images/ri_e-bike-2-fill.png"
            alt="bike"
            className="w-[48px] h-[48px]"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(69%) sepia(56%) saturate(1042%) hue-rotate(338deg) brightness(97%) contrast(92%)",
            }}
          />
          {/* Line */}
          <div className="flex-1 h-[4px] bg-[#073027] mx-2 rounded" />
          {/* Icon 3 */}
          <img
            src="/images/mingcute_location-3-fill.png"
            alt="location"
            className="w-[48px] h-[48px]"
          />
          {/* Line */}
          <div className="flex-1 h-[4px] bg-[#073027] mx-2 rounded" />
          {/* Icon 4 */}
          <img
            src="/images/clarity_note-solid.png"
            alt="note"
            className="w-[48px] h-[48px]"
          />
        </div>
      </div>
      {/* Mobile Delivery Status Card */}
      <div
        className="flex md:hidden flex-col w-[343px] mx-auto mt-4 bg-white rounded-[4px] shadow p-3 gap-6"
        style={{ minHeight: "113.88px" }}
      >
        <div>
          <h2
            className="text-[#073027] text-[18px] font-bold font-bebas mb-1"
            style={{ letterSpacing: 0 }}
          >
            GET READY ALMOST !!!
          </h2>
          <p className="text-black text-[14px] font-normal">
            Arrive Around 1 Min
          </p>
        </div>
        <div className="flex items-center justify-between w-full mt-2">
          {/* Icon 1 */}
          <img
            src="/images/icon-park-solid_pot.png"
            alt="pot"
            className="w-[28px] h-[28px]"
          />
          {/* Line */}
          <div className="flex-1 h-[2px] bg-[#073027] mx-1 rounded" />
          {/* Icon 2 */}
          <img
            src="/images/ri_e-bike-2-fill.png"
            alt="bike"
            className="w-[28px] h-[28px]"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(69%) sepia(56%) saturate(1042%) hue-rotate(338deg) brightness(97%) contrast(92%)",
            }}
          />
          {/* Line */}
          <div className="flex-1 h-[2px] bg-[#073027] mx-1 rounded" />
          {/* Icon 3 */}
          <img
            src="/images/mingcute_location-3-fill.png"
            alt="location"
            className="w-[28px] h-[28px]"
          />
          {/* Line */}
          <div className="flex-1 h-[2px] bg-[#073027] mx-1 rounded" />
          {/* Icon 4 */}
          <img
            src="/images/clarity_note-solid.png"
            alt="note"
            className="w-[28px] h-[28px]"
          />
        </div>
      </div>
    </div>
  );
}
