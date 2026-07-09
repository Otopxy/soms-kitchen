import type { MenuItem } from '../types/menu';
import { MenuCard } from './MenuCard';

type FeaturedMealsProps = {
  items: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onOpenCart: () => void;
};

export function FeaturedMeals({ items, onAddItem, onOpenCart }: FeaturedMealsProps) {
  const featuredItems = items.filter((item) => item.featured);

  return (
    <section className="section-shell section-block" aria-labelledby="featured-heading">
      <div className="section-heading">
        <p className="eyebrow">Featured meals</p>
        <h2 id="featured-heading">Popular picks from Som's Kitchen</h2>
        <p>Quick meals, food trays, pizza, chicken and flexible catering requests.</p>
      </div>
      <div className="featured-grid">
        {featuredItems.map((item) => (
          <MenuCard key={item.id} item={item} onAddItem={onAddItem} onOpenCart={onOpenCart} compact />
        ))}
      </div>
    </section>
  );
}
