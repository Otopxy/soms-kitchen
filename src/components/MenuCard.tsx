import type { MenuItem } from '../types/menu';
import { formatCurrency } from '../utils/currency';

type MenuCardProps = {
  item: MenuItem;
  onAddItem: (item: MenuItem) => void;
  onOpenCart: () => void;
  compact?: boolean;
};

function getCategoryInitials(category: string) {
  return category
    .split(/[\s&]+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 3);
}

export function MenuCard({ item, onAddItem, onOpenCart, compact = false }: MenuCardProps) {
  const priceLabel = item.price === null ? 'Confirm price on WhatsApp' : formatCurrency(item.price);

  const handleAdd = () => {
    onAddItem(item);
    onOpenCart();
  };

  return (
    <article className={`menu-card ${compact ? 'menu-card--compact' : ''}`}>
      <div className={`menu-card__visual ${item.image ? 'menu-card__visual--image' : ''}`} aria-hidden={!item.image}>
        {item.image ? (
          <img src={item.image} alt={`${item.name} from Som's Kitchen`} loading="lazy" />
        ) : (
          <span>{getCategoryInitials(item.category)}</span>
        )}
      </div>
      <div className="menu-card__body">
        <div className="menu-card__topline">
          <span className="category-tag">{item.category}</span>
          {item.featured ? <span className="featured-tag">Featured</span> : null}
        </div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="menu-card__footer">
          <strong className={item.price === null ? 'price price--variable' : 'price'}>{priceLabel}</strong>
          <button
            className="button button--primary button--small"
            type="button"
            onClick={handleAdd}
            data-testid={`add-${item.id}`}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
