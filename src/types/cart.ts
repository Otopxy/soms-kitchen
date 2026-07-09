import type { MenuCategory } from './menu';

export type CartItem = {
  id: string;
  name: string;
  price: number | null;
  quantity: number;
  category: MenuCategory;
};

export type CustomerDetails = {
  name: string;
  phone: string;
  deliveryLocation: string;
  note: string;
};
