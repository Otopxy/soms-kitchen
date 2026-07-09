import { useMemo, useState } from 'react';
import { menuCategories } from '../data/menu';
import type { MenuCategory, MenuItem } from '../types/menu';
import { MenuCard } from './MenuCard';

type MenuFilter = 'All' | MenuCategory;

type MenuSectionProps = {
  items: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onOpenCart: () => void;
};

export function MenuSection({ items, onAddItem, onOpenCart }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuFilter>('All');
  const categories: MenuFilter[] = ['All', ...menuCategories];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') {
      return items;
    }

    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  return (
    <section className="section-shell section-block menu-section" id="menu" aria-labelledby="menu-heading">
      <div className="section-heading">
        <p className="eyebrow">Digital menu</p>
        <h2 id="menu-heading">Build your WhatsApp order</h2>
        <p>Choose quantities now. Som's Kitchen will confirm flexible prices, delivery fee and availability on WhatsApp.</p>
      </div>

      <div className="category-filter" aria-label="Menu categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-chip ${activeCategory === category ? 'category-chip--active' : ''}`}
            type="button"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredItems.map((item) => (
          <MenuCard key={item.id} item={item} onAddItem={onAddItem} onOpenCart={onOpenCart} />
        ))}
      </div>
    </section>
  );
}
