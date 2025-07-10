import { useDispatch, useSelector } from 'react-redux';
import { 
  setMinPrice, 
  setMaxPrice, 
  setShowDiscounted, 
  setSortBy 
} from '../../store/slices/productsSlice';
import styles from './FiltersPanel.module.css';

export default function FiltersPanel({ hideDiscountCheckbox = false }) {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.products.filters);

  return (
    <div className={styles.filters_panel}>
      <div className={styles.price_filter}>
        <label>Price</label>
        <input 
          type="number" 
          placeholder="from" 
          value={filters.minPrice}
          onChange={(e) => dispatch(setMinPrice(e.target.value))}
        />
        <input 
          type="number" 
          placeholder="to" 
          value={filters.maxPrice}
          onChange={(e) => dispatch(setMaxPrice(e.target.value))}
        />
      </div>

      {!hideDiscountCheckbox && (
        <div className={styles.discount_filter}>
          <label htmlFor="discounted">Discounted items</label>
          <input 
            id="discounted"
            type="checkbox" 
            checked={filters.showDiscounted}
            onChange={(e) => dispatch(setShowDiscounted(e.target.checked))}
          />
        </div>
      )}

      <div className={styles.sort_filter}>
        <label>Sorted</label>
        <select 
          value={filters.sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          <option value="default">by default</option>
          <option value="newest">newest</option>
          <option value="price_high_low">price: high-low</option>
          <option value="price_low_high">price: low-high</option>
        </select>
      </div>
    </div>
  );
}