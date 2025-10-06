"use client";
import MenuPageSlider from "../slider-menu-page";
import CartButton from "@/components/CartButton";
import DiscoverOurMenu from "@/components/DiscoverOurMenu";

export default function Menu(){
    return(
        <>
        <div>
            <div className="mt-15"></div>
            <MenuPageSlider />
            <div className="md:mb-15 mb-15"></div>
            <DiscoverOurMenu />
            <CartButton />
        </div>
        </>
    );
}











