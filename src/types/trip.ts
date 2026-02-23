export interface Trip {
  id: number;
  title: string;
  description: string;
  slug: string;
  country: string;
  image: string;
  category: string;
  categoryColor: string;
  price: number;
  duration: string;
  rating: number | string;
  reviews: number;
}