export type MenuItem = {
  slug: string;          // URL: /menu/detail/[name]
  name: string;          // display name
  image: string;         // public path
  ingredients: string[];
  basePrice?: number;
};

export const MENUS: MenuItem[] = [
  {
    slug: "cabonara",
    name: "CARBONARA",
    image: "/images/menu1.png",
    ingredients: ["Minced Chicken", "Savory Sauce"],
    basePrice: 90,
  },
  {
    slug: "steak-kaoli",
    name: "STEAK KAOLI",
    image: "/images/menu2.png",
    ingredients: ["Minced Chicken", "Savory Sauce"],
    basePrice: 120,
  },
  {
    slug: "kra-pao-fusion-lasagna",
    name: "KRA PAO FUSION LASAGNA",
    image: "/images/menu3.png",
    ingredients: ["Thai Basil", "Ragù", "Grounded Beef"],
    basePrice: 110,
  },
  {
    slug: "creamy-deliyocy",
    name: "Creamy Deliyocy",
    image: "/images/menu3.png",
    ingredients: ["Thai Basil", "Ragù", "Grounded Beef"],
    basePrice: 110,
  },
  {
    slug: "mafu-custard",
    name: "Mafu Custard",
    image: "/images/menu3.png",
    ingredients: ["Thai Basil", "Ragù", "Grounded Beef"],
    basePrice: 110,
  },
];

export const getMenuBySlug = (slug: string) => MENUS.find((m) => m.slug === slug);
export const getMenuSlugs = () => MENUS.map((m) => m.slug);
