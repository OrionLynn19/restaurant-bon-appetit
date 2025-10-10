"use client";
import MenuPageSlider from "@/components/slider-menu-page";
import CartButton from "@/components/CartButton";
import DiscoverOurMenu from "@/components/DiscoverOurMenu";

export default function Menu(){
    return(
        <>
        <div>
            <div className="mt-15"></div>
            <MenuPageSlider />
            <div className="md:mb-20 mb-15"></div>
            <DiscoverOurMenu />
            <div className="md:mb-25 mb-15"></div>
            <CartButton />
        </div>
        </>
    );
}











