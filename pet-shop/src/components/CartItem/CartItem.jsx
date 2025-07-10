import { useDispatch } from 'react-redux';
import { incrementItem, decrementItem, removeFromCart } from '../../store/slices/cartSlice';
import styles from './CartItem.module.css';


export default function CartItem({ item }) {
    const dispatch = useDispatch();
    const { id, title, image, price, discont_price, count } = item;
    
    const finalPrice = discont_price ?? price;

    return (
        <div className={styles.cart_item}>
            <img src={`${import.meta.env.VITE_API_BASE_URL}${image}`} alt={title} className={styles.product_image} />
            <div className={styles.info_wrapper}>
                <p className={styles.title}>{title}</p>
                <div className={styles.quantity_selector}>
                    <button onClick={() => dispatch(decrementItem(id))}>-</button>
                    <span>{count}</span>
                    <button onClick={() => dispatch(incrementItem(id))}>+</button>
                </div>
            </div>

            <div className={styles.price_block}>
                <p className={styles.current_price}>
                    ${(finalPrice * count).toFixed(2)}
                </p>
                {discont_price && (
                    <p className={styles.old_price}>
                        ${(price * count).toFixed(2)}
                    </p>
                )}
            </div>
            
            <button className={styles.remove_btn} onClick={() => dispatch(removeFromCart(id))}>×</button>
        </div>
    );
}