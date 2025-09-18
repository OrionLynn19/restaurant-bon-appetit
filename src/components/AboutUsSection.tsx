"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutUsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
      {/* Text Section */}
      <div>
        <h2 className="text-xl font-bold text-green-900 mb-4">ABOUT US</h2>
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
        <Link
          href="/reserve"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded shadow-md transition"
        >
          RESERVE A TABLE
        </Link>
      </div>

      {/* Images Section */}
      <div className="grid grid-cols-2 gap-4">
        <Image
          src="/images/steak.jpg"
          alt="Steak and wine"
          width={400}
          height={300}
          className="rounded-lg object-cover"
        />
        <Image
          src="/images/salad.jpg"
          alt="Salad dish"
          width={400}
          height={300}
          className="rounded-lg object-cover"
        />
        <Image
          src="/images/pasta.jpg"
          alt="Pasta dish"
          width={400}
          height={300}
          className="rounded-lg object-cover col-span-2"
        />
      </div>
    </section>
  );
}
