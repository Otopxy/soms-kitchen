import { FormEvent, useState } from 'react';
import type { BusinessConfig } from '../config/business';
import type { CartItem, CustomerDetails } from '../types/cart';
import { buildWhatsAppOrderMessage, buildWhatsAppUrl } from '../utils/whatsapp';

type CheckoutFormProps = {
  items: CartItem[];
  business: BusinessConfig;
};

type CheckoutErrors = Partial<Record<keyof CustomerDetails | 'cart', string>>;

const initialDetails: CustomerDetails = {
  name: '',
  phone: '',
  deliveryLocation: '',
  note: '',
};

export function CheckoutForm({ items, business }: CheckoutFormProps) {
  const [details, setDetails] = useState<CustomerDetails>(initialDetails);
  const [errors, setErrors] = useState<CheckoutErrors>({});

  const updateField = (field: keyof CustomerDetails, value: string) => {
    setDetails((currentDetails) => ({ ...currentDetails, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: CheckoutErrors = {};

    if (items.length === 0) {
      nextErrors.cart = 'Add at least one item before sending your order.';
    }

    if (!details.name.trim()) {
      nextErrors.name = 'Enter your name.';
    }

    if (!details.phone.trim()) {
      nextErrors.phone = 'Enter your phone number.';
    }

    if (!details.deliveryLocation.trim()) {
      nextErrors.deliveryLocation = 'Enter your delivery location.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const message = buildWhatsAppOrderMessage({ items, customer: details });
    const whatsappUrl = buildWhatsAppUrl(business.whatsappPhoneNumber, message);
    const openedWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (!openedWindow) {
      window.location.assign(whatsappUrl);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      <div className="checkout-form__notice">
        Delivery fee is not included. Som's Kitchen will confirm delivery fee on WhatsApp after your order is reviewed.
      </div>

      {errors.cart ? <p className="form-error form-error--cart">{errors.cart}</p> : null}

      <label>
        <span>Name</span>
        <input
          type="text"
          value={details.name}
          onChange={(event) => updateField('name', event.target.value)}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <small className="form-error">{errors.name}</small> : null}
      </label>

      <label>
        <span>Phone number</span>
        <input
          type="tel"
          value={details.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
        />
        {errors.phone ? <small className="form-error">{errors.phone}</small> : null}
      </label>

      <label>
        <span>Delivery location/address</span>
        <textarea
          value={details.deliveryLocation}
          onChange={(event) => updateField('deliveryLocation', event.target.value)}
          rows={3}
          aria-invalid={Boolean(errors.deliveryLocation)}
        />
        {errors.deliveryLocation ? <small className="form-error">{errors.deliveryLocation}</small> : null}
      </label>

      <label>
        <span>Optional note</span>
        <textarea
          value={details.note}
          onChange={(event) => updateField('note', event.target.value)}
          rows={3}
          placeholder="Any timing, delivery, availability or packaging note"
        />
      </label>

      <button className="button button--primary button--full" type="submit" data-testid="send-order-button">
        Send Order on WhatsApp
      </button>
    </form>
  );
}
