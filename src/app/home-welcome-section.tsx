import Image from "next/image";

export default function HomeWelcomeSection() {
    return (
        <main className="flex flex-col items-center max-w-[90%] mx-auto pt-12 pb-8">
            <section className="flex flex-col md:flex-row w-full  ">
                <div className="w-full md:w-1/2 rounded-2xl overflow-hidden">
                    <Image
                        src="/images/wel1.png"
                        alt="Welcome Image 1"
                        width={600}
                        height={400}
                        className="w-full h-full object-contain"
                        priority
                    />
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center font-normal px-0 md:px-6 mt-7 md:mt-0">
                    <h1
                        className="md:text-3xl text-2xl font-semibold text-[#073027] mb-4 font-[bebas]"
                    >
                        WELCOME TO BON APPÉTIT
                    </h1>
                    <p
                        className="text-xl font-normal text-black mb-3 font-[schibsted]"
                    >
                        Welcome to Bon AppÉtit, where culinary excellence meets a warm
                        atmosphere. Our restaurant is dedicated to providing a unique dining
                        experience that celebrates the rich flavors of Thai and European
                        cuisines. Join us as we take you on a gastronomic journey filled
                        with delightful dishes crafted with care and creativity.
                    </p>
                    <p
                        className="text-xl font-normal text-black font-[schibsted]"
                    >
                        At Bon AppÉtit, we invite you to indulge in a fusion of tastes that
                        will tantalize your palate. Our chefs are passionate about blending
                        traditional recipes with modern techniques, ensuring every meal is a
                        masterpiece. Come and discover a place where every bite tells a
                        story.
                    </p>
                </div>
            </section>

            <section className="w-full rounded-2xl mt-7 overflow-hidden relative h-[180px] md:h-[300px]">
                <Image
                    src="/images/wel2.png"
                    alt="Welcome Image 2"
                    fill
                    className="object-cover"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-[#073027]/10">
                    <h2
                        className="md:text-3xl text-2xl font-semibold text-[#FEFEFE] mb-6 font-[bebas]"
                    >
                        GIVE IT A TRY?
                    </h2>
                    <p
                        className=" hidden md:block text-2xl font-normal text-[#FEFEFE] mb-8 max-w-xl font=[schibsted]"
                    >
                        Drop By One of Our location and Experience the best of the Bests
                    </p>
                    <div className="flex gap-5">
                        <button className="bg-gradient-to-r from-[#EF9748] via-[#EEB685] to-[#EF9748] text-[#073027] font-semibold md:text-base text-xs md:px-4 md:py-2 px-3 py-2 rounded-lg md:border-2 border-1 border-[#073027] hover:from-[#f1aa6a] hover:via-[#efbd91] hover:to-[#f1aa6a]  active:from-[#f1aa6a] active:via-[#efbd91] active:to-[#f1aa6a] transition font-[bebas]" >
                            SEE OUR MENU
                        </button>
                        <button className="bg-gradient-to-r from-[#EF9748] via-[#EEB685] to-[#EF9748] text-[#073027] font-semibold md:text-base  text-xs md:px-4 md:py-2 px-3 py-2 rounded-lg md:border-2 border-1 border-[#073027] hover:from-[#f1aa6a] hover:via-[#efbd91] hover:to-[#f1aa6a]  active:from-[#f1aa6a] active:via-[#efbd91] active:to-[#f1aa6a] transition font-[bebas]">
                            VIEW LOCATIONS
                        </button>
                    </div>
                </div>
            </section>

        </main>
    );
}
