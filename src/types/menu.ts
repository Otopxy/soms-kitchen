export type MenuCategory =
  | 'Rice Meals'
  | 'Spaghetti'
  | 'Pizza'
  | 'Burgers'
  | 'Chicken & Chips'
  | 'Peppered Proteins'
  | 'Shawarma'
  | 'Drinks'
  | 'Food Trays & Platters'
  | 'Bulk & Party Orders';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number | null;
  image?: string;
  featured?: boolean;
};
