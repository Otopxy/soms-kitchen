import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CartItem } from '../types/cart';
import type { MenuItem } from '../types/menu';
import {
  allItemsAreVariablePrice,
  calculateKnownSubtotal,
  getCartItemCount,
  hasVariablePriceItems,
} from '../utils/cart';

const CART_STORAGE_KEY = 'soms-kitchen-cart';

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const item = value as CartItem;
  return (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    (typeof item.price === 'number' || item.price === null) &&
    typeof item.quantity === 'number' &&
    item.quantity > 0 &&
    typeof item.category === 'string'
  );
}

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage can be unavailable in private browsing. The cart still works in memory.
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback((menuItem: MenuItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === menuItem.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...currentItems,
        {
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
          category: menuItem.category,
        },
      ];
    });
  }, []);

  const increaseQuantity = useCallback((id: string) => {
    setItems((currentItems) =>
      currentItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  }, []);

  const decreaseQuantity = useCallback((id: string) => {
    setItems((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.id !== id) {
          return item;
        }

        if (item.quantity <= 1) {
          return [];
        }

        return { ...item, quantity: item.quantity - 1 };
      }),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return useMemo(
    () => ({
      items,
      addItem,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      clearCart,
      itemCount: getCartItemCount(items),
      knownSubtotal: calculateKnownSubtotal(items),
      hasVariableItems: hasVariablePriceItems(items),
      allVariableItems: allItemsAreVariablePrice(items),
    }),
    [addItem, clearCart, decreaseQuantity, increaseQuantity, items, removeItem],
  );
}
