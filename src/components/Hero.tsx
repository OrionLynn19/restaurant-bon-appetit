import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-[#FFFCF1] overflow-visible">
      <div className="container w-full max-w-[1200px] lg:max-w-[100%] px-6 md:px-0 md:pl-10">
        <div className="min-h-[92vh] flex flex-col md:flex-row items-center justify-between md:gap-10">
          <div className="order-2 md:order-1 flex-1 md:max-w-none">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-12 bg-[#E9B883]" />
              <p className="text-[13px] font-semibold tracking-[0.18em] text-[#EA7D33]">SINCE 2012</p>
            </div>

            <h1 className="mt-5 text-[32px] md:text-[36px] font-extrabold leading-snug text-[#073027]">
              A TASTE OF EUROPE, A CULINARY JOURNEY
            </h1>

            <p className="mt-6 max-w-[560px] text-[15px] leading-7 text-[#2E3A36]">
              Lorem ipsum dolor sit amet consectetur. Dui et varius vel est. Integer in quam justo vestibulum lectus etiam. 
              A sit imperdiet aliquam tortor tincidunt.Lorem ipsum dolor sit amet consectetur. Dui et varius vel est. 
              Integer in quam justo vestibulum lectus etiam. A sit imperdiet aliquam tortor tincidunt..
            </p>

            <div className="mt-7 flex gap-2 md:gap-3">
              <Link
                href="/about"
                className="flex items-center justify-center
                          min-w-[140px] h-[44px] px-4 text-[13px]   /* mobile */
                          md:min-w-[180px] md:h-[56px] md:px-5 md:text-[15px]  /* md+ */
                          rounded-[12px] bg-[#EF9748] border-2 border-[#073027] text-[#073027] font-extrabold
                          shadow-[0_4px_0_0_#073027] md:shadow-[0_5px_0_0_#073027]
                          hover:translate-y-[1px] hover:shadow-[0_4px_0_0_#073027] hover:bg-[#FAB170] transition-transform duration-150
                          active:translate-y-[3px] active:shadow-[0_3px_0_0_#073027]"
              >
                ABOUT RESTAURANT
              </Link>

              <Link
                href="/reserve"
                className="flex items-center justify-center
                          min-w-[140px] h-[44px] px-4 text-[13px]
                          md:min-w-[180px] md:h-[56px] md:px-5 md:text-[15px]
                          rounded-[12px] bg-[#EF9748] border-2 border-[#073027] text-[#073027] font-extrabold
                          shadow-[0_4px_0_0_#073027] md:shadow-[0_5px_0_0_#073027]
                          hover:translate-y-[1px] hover:shadow-[0_4px_0_0_#073027] hover:bg-[#FAB170] transition-transform duration-150
                          active:translate-y-[3px] active:shadow-[0_3px_0_0_#073027]"
              >
                RESERVE A TABLE
              </Link>
            </div>

            <div className="my-8 grid grid-cols-2 gap-6 justify-items-center md:flex md:items-center md:gap-12 md:justify-start">
              <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-center md:gap-4">
                <div className="grid h-20 w-20 md:h-16 md:w-16 place-items-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
                  <Image src="/images/Award1.png" alt="Michelin Gourmand" width={44} height={44} className="md:w-[35px] md:h-[35px]" />
                </div>
                <div className="mt-2 md:mt-0 leading-tight text-center md:text-left">
                  <p className="text-[#073027] font-extrabold tracking-tighter text-lg md:text-[15px] whitespace-nowrap">MICHELIN GOURMAND</p>
                  <p className="text-[10px] md:text-xs text-black/60">2018–2025</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-center md:gap-4">
                <div className="grid h-20 w-20 md:h-16 md:w-16 place-items-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
                  <Image src="/images/Award2.png" alt="Thai Select" width={44} height={44} className="md:w-[40px] md:h-[40px]" />
                </div>
                <div className="mt-2 md:mt-0 leading-tight text-center md:text-left">
                  <p className="text-[#073027] font-extrabold tracking-tighter text-lg md:text-[15px] whitespace-nowrap">THAI SELECT</p>
                  <p className="text-[10px] md:text-xs text-black/60">2020</p>
                </div>
              </div>
            </div>

          </div>

          <div className="order-1 md:order-2 flex-1 relative min-h-[440px] md:min-h-[680px]">
            <Image
              src="/images/maindish.png"
              alt="Main Dish"
              width={650}
              height={650}
              priority
              className="absolute left-1/2 top-1/2 z-10 w-[78vw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 md:right-[250px] md:top-[50%] md:w-[82%]"
            />

            <Image
              src="/images/Chilli.png"
              alt="Chili"
              width={160}
              height={160}
              className="hidden md:block absolute right-[0px] top-[3px] w-[120px] lg:w-[150px] pointer-events-none"
            />
            <Image
              src="/images/Cucumber.png"
              alt="Cucumber"
              width={100}
              height={100}
              className="hidden md:block absolute right-0 top-[150px] pointer-events-none"
            />

            <Image
              src="/images/CarrotSide.png"
              alt="Side bowl"
              width={160}
              height={160}
              className="absolute left-[-200px] bottom-[10px] mt-3 w-[28vw] max-w-[90px] md:left-[10%] md:top-[80px] md:bottom-auto md:w-[120px] pointer-events-none"
            />

            <Image
              src="/images/nannanpin.png"
              alt="Green herbs"
              width={120}
              height={120}
              className="hidden md:block absolute bottom-[90px] right-[10%] pointer-events-none"
            />

            <Image
              src="/images/Tomatoes.png"
              alt="Tomatoes"
              width={100}
              height={100}
              className="hidden md:block absolute bottom-[30px] right-[0px] pointer-events-none"
            />

            <Image
              src="/images/corrindor.png"
              alt="Tomatoes"
              width={120}
              height={120}
              className="absolute left-[-200px] z-10 mt-3 w-[28vw] max-w-[90px] md:left-[25px] md:bottom-[90px] md:top-auto md:translate-x-0 md:mt-0 md:w-[120px] md:max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
