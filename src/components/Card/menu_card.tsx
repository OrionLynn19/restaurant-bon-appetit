"use client";
import Image from "next/image";

interface MenuCardProps {
  image: string;
  name: string;
  ingredients: string[];
}

export default function MenuCard({ image, name, ingredients }: MenuCardProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 300px"
          priority
        />
      </div>

      <p
        className="text-center font-semibold pt-3 md:text-lg text-base text-[#073027] font-[bebas] truncate"
      >
        {name}
      </p>
      <p
        className="flex flex-wrap font-normal justify-center gap-2 text-[#000000B3] md:text-base text-sm font-[schibsted]"
      >
        {ingredients.map((ing, idx) => (
          <span key={idx} className="flex items-center gap-2">
            {idx > 0 && (
              <svg className="w-3 h-3" viewBox="0 0 8 8" fill="#07302799">
                <circle cx="4" cy="4" r="4" />
              </svg>
            )}
            {ing}
          </span>
        ))}
      </p>
    </div>
  );
}
