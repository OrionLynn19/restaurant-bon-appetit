export interface FAQ {
  id: string;
  q: string;
  a: string;
}

export interface WhyUs {
  id: string;
  title: string;
  description: string;
}

export interface MenuItem {
  image: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  categories: string[];
  specialPromotion?: boolean;
}
