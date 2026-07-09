import { useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { CateringSection } from './components/CateringSection';
import { ContactSection } from './components/ContactSection';
import { FeaturedMeals } from './components/FeaturedMeals';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { OpeningHours } from './components/OpeningHours';
import { ReviewsSection } from './components/ReviewsSection';
import { ServicesSection } from './components/ServicesSection';
import { business } from './config/business';
import { menuItems } from './data/menu';
import { useCart } from './hooks/useCart';

function App() {
  const cart = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <a className="skip-link" href="#menu">
        Skip to menu
      </a>
      <Header business={business} itemCount={cart.itemCount} onOpenCart={() => setIsCartOpen(true)} />
      <main>
        <Hero business={business} />
        <FeaturedMeals items={menuItems} onAddItem={cart.addItem} onOpenCart={() => setIsCartOpen(true)} />
        <MenuSection items={menuItems} onAddItem={cart.addItem} onOpenCart={() => setIsCartOpen(true)} />
        <CateringSection business={business} />
        <ServicesSection />
        <OpeningHours business={business} />
        <ContactSection business={business} />
        <ReviewsSection />
      </main>
      <Footer business={business} />
      <CartDrawer
        items={cart.items}
        itemCount={cart.itemCount}
        knownSubtotal={cart.knownSubtotal}
        hasVariableItems={cart.hasVariableItems}
        allVariableItems={cart.allVariableItems}
        isOpen={isCartOpen}
        business={business}
        onOpen={() => setIsCartOpen(true)}
        onClose={() => setIsCartOpen(false)}
        onIncrease={cart.increaseQuantity}
        onDecrease={cart.decreaseQuantity}
        onRemove={cart.removeItem}
        onClear={cart.clearCart}
      />
    </>
  );
}

export default App;
