import MenuPageSlider from "../slider-menu-page";

export default function Menu(){
    return(
        <>
        <div className="p-10 text-center text-3xl text-orange-500 w-full">This is Menu</div>
        <div>
            <h1 className="block md:hidden text-center font-bebas font-semibold text-[#073027] text-xl mb-7">“EXPLORE OUR MENU”</h1>
            <MenuPageSlider />
        </div>
        </>
    );
}