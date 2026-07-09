import type { CartItem } from '../types/cart';

export function calculateKnownSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    if (item.price === null) {
      return total;
    }

    return total + item.price * item.quantity;
  }, 0);
}

export function hasVariablePriceItems(items: CartItem[]): boolean {
  return items.some((item) => item.price === null);
}

export function allItemsAreVariablePrice(items: CartItem[]): boolean {
  return items.length > 0 && items.every((item) => item.price === null);
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}
