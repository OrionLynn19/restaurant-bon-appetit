import HomeMenuSlider from "@/app/home-menu-slider";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div>
      <div className="p-10 text-center text-3xl text-orange-500">This is Home Page</div>
    </div>
    <div>
       <div className="text-center text-[#EF9748]" style={{fontFamily:"var(--font-bebas)"}}>- Special Picks -</div>
       <div className="text-center text-2xl text-[#073027] pb-5" style={{fontFamily:"var(--font-bebas)"}}>Popular Menus</div>
        <HomeMenuSlider />
    </div>
    </>
  );
}
