import MenuPageSlider from "../slider-menu-page";
import CartButton from "@/components/CartButton";

export default function Menu(){
    return(
        <>
        <div>
            <h1 className="block md:hidden text-center font-bebas font-semibold text-[#073027] text-xl mb-7">“EXPLORE OUR MENU”</h1>
            <MenuPageSlider />
            <CartButton />
        </div>
        </>
    );
}





