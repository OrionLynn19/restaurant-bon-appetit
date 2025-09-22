"use client"
import Image from "next/image" 
import {motion} from "framer-motion"
import { Bebas_Neue } from 'next/font/google'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const Story =  [ 
    { year: "2012 - 2018",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:  "/images/our-story-1.png"
    },
    { year: "2018 - 2020",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:  "/images/our-story-2.png"
    },
    { year: "2020 - 2023",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:  "/images/our-story-3.png"
    },
    { year: "2023 - 2025",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:  "/images/our-story-4.png"
    }
];

export default function OurStory() {
    return (
        <section className="relative w-full mx-auto bg-[rgba(255,252,241,1)] px-4 sm:px-6 lg:px-8 pb-4 md:pb-4 lg:pb-4">
            <div className="flex justify-center pt-8 pb-1  ">
                <div 
                    style={{
                        width: '132px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}
                >
                    <h2 
                    className={bebasNeue.className}
                    style={{
                        fontSize: '34px',
                        fontWeight: 400, 
                        letterSpacing: '0%', 
                        textTransform:'uppercase', 
                        color: 'rgba(7, 48, 39, 1)', 
                        lineHeight: '28px',
                        margin: 0, 
                        padding: 0,
                        whiteSpace: 'nowrap',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    > Our Story </h2>
                </div>
            </div>
            
            <div 
                className="absolute vertical-line rounded-full" 
                style={{
                    backgroundColor: 'rgba(239, 151, 72, 1)',
                    top: '120px',
                    bottom: '0',
                    width: '6px',
                    left: '45%', 
                    transform: 'translateX(-50%)'
                }}
            ></div>

            
            <style jsx>{`
                @media (min-width: 1024px) {
                    .vertical-line {
                        top: 165px !important;
                        bottom: 0 !important;
                        left: 50% !important; 
                        transform: translateX(-50%) !important;
                    }
                    .dot {
                        left: 50% !important; 
                    }
                }
            `}</style>

            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
                <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 space-y-4 md:space-y-4 lg:space-y-4 xl:space-y-4">
                    {Story.map((item, index) => (
                        <div key={index} className="relative">
                            
                            <div 
                                className="absolute w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full shadow-lg z-10 dot"
                                style={{
                                    backgroundColor: 'rgba(239, 151, 72, 1)',
                                    left: '44%', 
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            ></div>

                            <motion.div
                                className={`relative flex flex-row items-center gap-4 md:gap-6 lg:gap-8 xl:gap-16 ${
                                    index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                                }`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                               
                                <div
                                    className={`flex-1 text-center pr-4 md:pr-6 ${
                                        index % 2 === 0 
                                            ? "lg:pr-8 xl:pr-12 lg:text-center" 
                                            : "lg:pl-8 xl:pl-12 lg:text-center"
                                    }`}
                                >
                                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2.5xl xl:text-2.5xl font-bold mb-2 md:mb-3 lg:mb-4 text-black">
                                        {item.year}
                                    </h2>
                                    <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-black max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0 hidden md:block">
                                        {item.text}
                                    </p>
                                </div>

                               
                                <div 
                                    className={`flex-1 pl-4 md:pl-6 ${
                                        index % 2 === 0 
                                            ? "lg:pl-8 xl:pl-12" 
                                            : "lg:pr-8 xl:pr-12"
                                    }`}
                                >
                                    <div className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-none mx-auto lg:mx-0">
                                        <div 
                                            className="relative w-full"
                                            style={{
                                                aspectRatio: '514/378',
                                                maxWidth: '514px',
                                                maxHeight: '378px'
                                            }}
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.year}
                                                fill
                                                className="rounded-lg shadow-lg object-cover"
                                                sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 300px, 514px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}