import type { BusinessConfig } from '../config/business';
import type { CartItem } from '../types/cart';
import { formatCurrency } from '../utils/currency';
import { CheckoutForm } from './CheckoutForm';

type CartDrawerProps = {
  items: CartItem[];
  itemCount: number;
  knownSubtotal: number;
  hasVariableItems: boolean;
  allVariableItems: boolean;
  isOpen: boolean;
  business: BusinessConfig;
  onOpen: () => void;
  onClose: () => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
};

function getSummaryText({
  itemCount,
  knownSubtotal,
  hasVariableItems,
  allVariableItems,
}: Pick<CartDrawerProps, 'itemCount' | 'knownSubtotal' | 'hasVariableItems' | 'allVariableItems'>) {
  if (itemCount === 0) {
    return 'Cart is empty';
  }

  if (allVariableItems) {
    return 'Final price will be confirmed on WhatsApp.';
  }

  if (hasVariableItems) {
    return `Known subtotal ${formatCurrency(knownSubtotal)}`;
  }

  return `Food total ${formatCurrency(knownSubtotal)}`;
}

export function CartDrawer({
  items,
  itemCount,
  knownSubtotal,
  hasVariableItems,
  allVariableItems,
  isOpen,
  business,
  onOpen,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}: CartDrawerProps) {
  const showMobileCartButton = itemCount > 0 && !isOpen;
  const summaryText = getSummaryText({ itemCount, knownSubtotal, hasVariableItems, allVariableItems });

  return (
    <>
      <button
        className={`mobile-cart-button ${showMobileCartButton ? 'mobile-cart-button--visible' : ''}`}
        type="button"
        onClick={onOpen}
        aria-label="Open order summary"
      >
        <span>{itemCount} item{itemCount === 1 ? '' : 's'}</span>
        <strong>{summaryText}</strong>
      </button>

      <div className={`cart-overlay ${isOpen ? 'cart-overlay--visible' : ''}`} onClick={onClose} aria-hidden={!isOpen} />

      <aside className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`} aria-labelledby="cart-heading">
        <div className="cart-drawer__header">
          <div>
            <p className="eyebrow">Order summary</p>
            <h2 id="cart-heading">Your cart</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close order summary">
            x
          </button>
        </div>

        <div className="cart-drawer__content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <strong>Your cart is empty.</strong>
              <p>Add meals from the menu, then send everything to Som's Kitchen on WhatsApp.</p>
            </div>
          ) : (
            <>
              <ul className="cart-list" aria-label="Selected items">
                {items.map((item) => (
                  <li className="cart-item" key={item.id}>
                    <div className="cart-item__details">
                      <strong>{item.name}</strong>
                      <span>{item.price === null ? 'Confirm price on WhatsApp' : formatCurrency(item.price * item.quantity)}</span>
                      <small>{item.category}</small>
                    </div>
                    <div className="quantity-control" aria-label={`${item.name} quantity`}>
                      <button type="button" onClick={() => onDecrease(item.id)} aria-label={`Decrease ${item.name}`}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => onIncrease(item.id)} aria-label={`Increase ${item.name}`}>
                        +
                      </button>
                    </div>
                    <button className="remove-button" type="button" onClick={() => onRemove(item.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <div className="cart-total-box" data-testid="cart-total-box">
                {allVariableItems ? (
                  <strong>Final price will be confirmed on WhatsApp.</strong>
                ) : hasVariableItems ? (
                  <>
                    <strong>Known Subtotal: {formatCurrency(knownSubtotal)}</strong>
                    <span>Final food total will be confirmed on WhatsApp because some items have flexible pricing.</span>
                  </>
                ) : (
                  <>
                    <strong>Food Total: {formatCurrency(knownSubtotal)}</strong>
                    <span>Delivery fee will be confirmed on WhatsApp.</span>
                  </>
                )}
                {(allVariableItems || hasVariableItems) && <span>Delivery fee will be confirmed on WhatsApp.</span>}
              </div>

              <button className="button button--ghost button--full" type="button" onClick={onClear}>
                Clear cart
              </button>
            </>
          )}

          <CheckoutForm items={items} business={business} />
        </div>
      </aside>
    </>
  );
}
