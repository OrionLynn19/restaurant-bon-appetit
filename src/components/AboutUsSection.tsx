"use client";

import Image from "next/image";
import Button from "@/components/Button";

export default function AboutUsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Heading above */}
      <h2 className="text-center text-2xl font-bold text-green-900 mb-12">
        ABOUT US
      </h2>

      {/* Grid content */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <div>
          <h3 className="text-2xl font-extrabold text-green-900 leading-snug mb-4">
            AT BON APPÉTIT, EVERY DISH <br /> IS CRAFTED WITH LOVE.
          </h3>
          <p className="text-gray-800 mb-6">
            At Bon Appétit, We Believe That Every Meal Tells A Story. Our Chefs
            Pour Their Passion Into Each Dish, Using Only The Finest Ingredients
            Sourced From Local Farms. With A Commitment To Excellence, We Create A
            Dining Experience That Delights The Senses And Warms The Heart. Join
            Us To Savor The Flavors Of Our Culinary Journey.
          </p>

          {/* Use the reusable button */}
          <Button href="/reserve">RESERVE A TABLE</Button>
        </div>

        {/* Images Section */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <Image
            src="/images/Hungry1.jpg"
            alt="Dish 1"
            width={500}
            height={500}
            className="rounded-lg object-cover w-full h-full row-span-2"
          />
          <Image
            src="/images/Hungry2.jpg"
            alt="Dish 2"
            width={250}
            height={200}
            className="rounded-lg object-cover w-full h-full"
          />
          <Image
            src="/images/Hungry3.jpg"
            alt="Dish 3"
            width={250}
            height={200}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
