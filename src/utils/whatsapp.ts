import type { CartItem, CustomerDetails } from '../types/cart';
import { calculateKnownSubtotal, hasVariablePriceItems, allItemsAreVariablePrice } from './cart';
import { formatCurrency } from './currency';

type OrderMessageOptions = {
  items: CartItem[];
  customer: CustomerDetails;
};

export function buildWhatsAppOrderMessage({ items, customer }: OrderMessageOptions): string {
  const knownSubtotal = calculateKnownSubtotal(items);
  const hasVariableItems = hasVariablePriceItems(items);
  const allVariable = allItemsAreVariablePrice(items);
  const orderLines = items.map((item, index) => {
    const priceText =
      item.price === null ? 'Price to be confirmed' : formatCurrency(item.price * item.quantity);
    return `${index + 1}. ${item.name} x${item.quantity} - ${priceText}`;
  });

  const summaryLines = allVariable
    ? ['Final food price will be confirmed on WhatsApp.']
    : hasVariableItems
      ? [`Known Subtotal: ${formatCurrency(knownSubtotal)}`, '', 'Some items need price confirmation.']
      : [`Food Total: ${formatCurrency(knownSubtotal)}`];

  const noteLine = customer.note.trim() ? ['', `Note: ${customer.note.trim()}`] : [];

  return [
    "Hello Som's Kitchen, I would like to place an order.",
    '',
    `Name: ${customer.name.trim()}`,
    `Phone: ${customer.phone.trim()}`,
    `Delivery Location: ${customer.deliveryLocation.trim()}`,
    '',
    'Order:',
    ...orderLines,
    '',
    ...summaryLines,
    'Delivery fee will be confirmed separately on WhatsApp.',
    ...noteLine,
  ].join('\n');
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
