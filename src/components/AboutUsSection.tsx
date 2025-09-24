"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function AboutUsSection() {
  return (
    <section
      className={`${montserrat.className} w-full bg-[rgba(255,252,241,1)] px-6 py-16`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <h2 className="text-center text-2xl font-bold text-[#073027] mb-6">
          ABOUT US
        </h2>

        {/* Mobile image */}
        <div className="md:hidden mb-8">
          <Image
            src="/images/Hungry1.jpg"
            alt="Featured dish"
            width={1200}
            height={800}
            className="w-full h-56 rounded-lg object-cover"
            priority
          />
        </div>

        {/* Grid layout */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          <div className="text-center md:text-left transform md:-translate-x-10">
            <h3 className="text-lg md:text-2xl font-extrabold text-[#073027] mb-4 leading-snug">
              AT BON APPÉTIT, EVERY DISH <br></br>IS CRAFTED WITH LOVE.
            </h3>

            <p className="text-sm md:text-base text-gray-900 font-medium mb-6 leading-relaxed">
              At Bon Appétit, We Believe That Every Meal Tells A Story. Our Chefs
              Pour Their Passion Into Each Dish, Using Only The Finest Ingredients
              Sourced From Local Farms. With A Commitment To Excellence, We Create
              A Dining Experience That Delights The Senses And Warms The Heart.
              Join Us To Savor The Flavors Of Our Culinary Journey.
            </p>

            <div className="flex justify-center md:justify-start">
              <Button href="/reserve">RESERVE A TABLE</Button>
            </div>
          </div>

          {/* Images */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Image
                src="/images/Hungry1.jpg"
                alt="Dish 1"
                width={600}
                height={400}
                className="h-48 w-full rounded-lg object-cover"
              />
            </div>
            <div className="grid grid-rows-2 gap-4">
              <Image
                src="/images/Hungry2.jpg"
                alt="Dish 2"
                width={600}
                height={300}
                className="h-48 w-full rounded-lg object-cover"
              />
              <Image
                src="/images/Hungry3.jpg"
                alt="Dish 3"
                width={600}
                height={300}
                className="h-48 w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
