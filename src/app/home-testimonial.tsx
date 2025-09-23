"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function HomeTestimonial() {
    const [active, setActive] = useState(0);
    const [iconShake, setIconShake] = useState(false);
    const [imageShake, setImageShake] = useState(false);
    const [nameShake, setNameShake] = useState(false);

    const text = [
        {
            name: "Nisha Oliver",
            content: "I HAD AN INCREDIBLE EXPERENCE! THE STAFF'S DEDICATION AND METICULOUS CARE MADE ALL THE DIFFERENCE.I'M ALREADY LOOKING FORWARD TO MY NEXT VISIT!",
        },
        {
            name: "Nisha Oliver",
            content: "DINING HERE WAS A TRUE PLEASURE! THE STAFF'S PASSION FOR SERVICE AND METICULOUS CARE MADE MY MEAL UNFORGETTABLE. I'M ALREADY LOOKING FORWARD TO MY NEXT VISIT!",
        },
        {
            name: "Nisha Oliver",
            content: "WHAT AN INCREDIBLE DINING EXPERIENCE! THE TEAM'S DEDICATION AND THOUGHTFUL SERVICE REALLY STOOD OUT.I CAN'T WAIT TO COME BACK FOR ANOTHER MEAL!",
        }
    ];

    const images: string[] = ["/images/testimg1.png", "/images/testimg2.png", "/images/testimg3.png"];

    const handleClick = (index: number) => {
        setActive(index);
        setImageShake(true);
        setTimeout(() => setImageShake(false), 500);
        setIconShake(true);
        setTimeout(() => setIconShake(false), 500);
        setNameShake(true);
        setTimeout(() => setNameShake(false), 300);
    };

    const centerIndex = Math.floor(images.length / 2);

    const getShakeClass = (index: number) => {
        if (!imageShake) return "";
        if (index === centerIndex) return "shake-center";
        if (index < centerIndex) return "shake-right";
        if (index > centerIndex) return "shake-left";
        return "";
    };

    return (
        <div className="container relative max-w-4xl mx-auto p-8 my-5">
            <div className="absolute md:-top-15 -top-10 left-0">
                <Image src="/images/test1.svg" alt="corner 1" width={150} height={120} className="md:w-[150px] md:h-[120px] w-[120px] h-[100px]" />
            </div>
            <div className="hidden md:block absolute -top-15 right-0 ">
                <Image src="/images/test2.svg" alt="corner 2" width={140} height={110} />
            </div>
            <div className="hidden md:block absolute -top-5 -right-4">
                <Image src="/images/test5.svg" alt="corner 2" width={80} height={80} />
            </div>
            <div className="block md:hidden absolute -top-10 right-0 ">
                <Image src="/images/test4.svg" alt="corner 4" width={100} height={120}/>
            </div>
            <div className="absolute -bottom-10 left-0">
                <Image src="/images/test3.svg" alt="corner 3" width={180} height={200} className="md:w-[180] md:h-[200] w-[100] h-[120]" />
            </div>
            <div className="hidden md:block absolute -bottom-10 right-0">
                <Image src="/images/test4.svg" alt="corner 4" width={150} height={180} />
            </div>
            <div className="block md:hidden absolute -bottom-10 right-0 ">
                <Image src="/images/test5.svg" alt="corner 2" width={100} height={100} />
            </div>

            <div className={`w-15 h-15 flex justify-center items-center rounded-full mb-7 bg-[#FFFFFF] shadow-lg mx-auto  ${iconShake ? "shake-left" : ""}`}>
                <Image src="/images/testquote.png" alt="icon" width={30} height={30} />
            </div>

            <div className= "text-center font-normal mb-7 "style={{ fontFamily: "var(--font-bebas)" }}>
                <p className="mb-2 md:text-3xl text-2xl text-[#000000] text-dissolve" key={active}>
                    {text[active].content}
                </p>
                <span className={`inline-block md:text-2xl text-xl text-[#EF9748] ${nameShake ? "shake-left" : ""}`}>{text[active].name}</span>
            </div>

            <div className="flex justify-center gap-4">
                {images.map((img, index) => (
                    <button key={index} onClick={() => handleClick(index)}>
                        <div className={getShakeClass(index)}>
                            <Image
                                src={img}
                                alt={`image ${index}`}
                                width={100}
                                height={100}
                                className={`rounded-full w-[70px] h-[70px] md:w-[100px] md:h-[100px] transition-opacity duration-300 ${active === index ? "opacity-100" : "opacity-50"
                                    }`}
                            />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
