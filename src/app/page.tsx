import HomeMenuSlider from "@/app/home-menu-slider";
import Image from "next/image";
import HomeWelcomeSection from "./home-welcome-section";
import Hero from "@/components/Hero";
import Homepage_FAQ from "../components/Homepage_FAQ";
import HomeTestimonial from "./home-testimonial";


export default function Home() {
  return (
    <>
    <div className="bg-[rgba(255,252,241,1)]">
      <Hero />
       <div>
       <div className="text-center text-[#EF9748]" style={{fontFamily:"var(--font-bebas)"}}>- Special Picks -</div>
       <div className="text-center text-2xl text-[#073027] pb-5" style={{fontFamily:"var(--font-bebas)"}}>Popular Menus</div>
        <HomeMenuSlider />
        <HomeWelcomeSection />
       </div>
       <div className='pt-12 pb-8'> 
        <HomeTestimonial/> 
       </div>
       
       <Homepage_FAQ />
    </div>

    </>
  );
}
