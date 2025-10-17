import HomeMenuSlider from "@/app/home-menu-slider";
import HomeWelcomeSection from "./home-welcome-section";
import Hero from "@/components/Hero";
import Homepage_FAQ from "../components/Homepage_FAQ";
import HomeTestimonial from "./home-testimonial";

export default function Home() {
  return (
    <div className="bg-[rgba(255,252,241,1)]">
      <Hero />
      <div>
        <div className="text-center font-semibold text-[#EF9748] md:text-base text-sm Font-[bebas]">
          - SPECIAL PICKS -
        </div>
        <div className="text-center font-semibold text-[#073027] md:text-3xl text-2xl pb-8 font-[bebas]">
          POPULAR MENUS
        </div>
        <HomeMenuSlider />
        <HomeWelcomeSection />
      </div>
      <div className="pt-12 md:pt-24">
        <HomeTestimonial />
      </div>
      <Homepage_FAQ />
    </div>
  );
}
