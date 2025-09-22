import { CustomAccordion } from "./Accordion/custom-accordion";
import { faqs } from "../data/faqData";
import Image from "next/image";

const COLORS = {
  primary: "#073027",
  divider: "rgba(10,10,10,0.3)",
  textDark: "#000000",
};

const FONTS = {
  primary: "Bebas Neue",
  secondary: "Schibsted Grotesk",
};

export default function Homepage_FAQ() {
  const questionClasses =
    "text-[20px] md:text-[32px] leading-[120%] md:leading-[100%] tracking-[0px] capitalize text-left break-words whitespace-normal w-full";
  const answerClasses =
    "text-[14px] md:text-[20px] font-normal leading-[120%] md:leading-[100%] tracking-[0px] break-words whitespace-normal w-full";

  const accordionItems = faqs.map((faq) => ({
    id: faq.id,
    trigger: (
      <span
        className={`${questionClasses}`}
        style={{ fontFamily: FONTS.primary, color: COLORS.primary }}
      >
        {faq.q}
      </span>
    ),
    content: (
      <div
        className={`${answerClasses}`}
        style={{ fontFamily: FONTS.secondary, color: COLORS.textDark }}
      >
        <div
          className="w-full border-t mt-4 mb-6"
          style={{ borderColor: COLORS.divider }}
        />
        {faq.a}
      </div>
    ),
  }));

  return (
    // mobile single, desktop two columns
    <div className="w-[343px] md:w-full md:max-w-[1440px] flex flex-col gap-[10px] md:gap-[96px] mx-auto md:px-16">
      <div className="flex flex-col md:flex-row md:justify-between py-[48px] md:py-[96px]">
        <div className="w-full md:w-[646px] items-start justify-start">
          <h2
            className="hidden md:block md:text-[40px] leading-[120%] md:leading-[100%] tracking-[0px] capitalize break-words whitespace-normal w-full text-center mb-8"
            style={{
              fontFamily: FONTS.primary,
              color: COLORS.primary,
            }}
          >
            FAQ
          </h2>
          <CustomAccordion
            items={accordionItems}
            type="multiple"
            className="flex flex-col gap-[10px]"
          />
        </div>
        {/* Desktop only */}
        <div className="hidden md:flex md:w-[646px] md:items-center md:justify-center">
          <Image
            src="/images/Rectangle.png"
            alt="FAQ Support"
            width={646}
            height={646}
            className="rounded-lg object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
