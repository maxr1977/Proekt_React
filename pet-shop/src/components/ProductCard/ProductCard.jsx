import { Link } from 'react-router-dom'
import UIButton from '../../ui/UIButton/UIButton'
import styles from './ProductCard.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../store/slices/cartSlice'

const calculateDiscount = (price, discont_price) => {
  if (!discont_price || discont_price >= price) return 0
  return Math.round(((price - discont_price) / price) * 100)
}

export default function ProductCard({ product }) {
  const { id, title, image, price, discont_price } = product
  const discount = calculateDiscount(price, discont_price)
  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.list)

  const isAdded = cartItems.some((item) => item.id === id)

  const handleAddToCart = (e) => {
    e.preventDefault()

    dispatch(addToCart({ product, quantity: 1 }))
  }

  return (
    <div className={styles.product_card_wrapper}>
      <Link to={`/products/${id}`} className={styles.product_card}>
        <div className={styles.image_wrapper}>
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}${image}`}
            alt={title}
          />
          <div className={styles.add_to_cart_btn_wrapper}>
            {isAdded ? (
              <UIButton theme="added" disabled>
                Added
              </UIButton>
            ) : (
              <UIButton theme="primary" onClick={handleAddToCart}>
                Add to cart
              </UIButton>
            )}
          </div>
        </div>

        {discount > 0 && (
          <div className={styles.discount_badge}>-{discount}%</div>
        )}

        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <div className={styles.price_wrapper}>
            <p className={styles.new_price}>${discont_price ?? price}</p>
            {discont_price && <p className={styles.old_price}>${price}</p>}
          </div>
        </div>
      </Link>
    </div>
  )
}
