import HomeMenuSlider from "@/app/home-menu-slider";
import Image from "next/image";
import HomeWelcomeSection from "./home-welcome-section";
import Hero from "@/components/Hero";
import Homepage_FAQ from "../components/Homepage_FAQ";


export default function Home() {
  return (
    <>
    <div>
      <Hero />
       <div>
       <div className="text-center text-[#EF9748]" style={{fontFamily:"var(--font-bebas)"}}>- Special Picks -</div>
       <div className="text-center text-2xl text-[#073027] pb-5" style={{fontFamily:"var(--font-bebas)"}}>Popular Menus</div>
        <HomeMenuSlider />
       </div>
      <HomeWelcomeSection /> 
      <Homepage_FAQ />
    </div>
   
    </>
  );
}
