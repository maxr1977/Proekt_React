import styles from './PromoSection.module.css'
import { Link } from 'react-router-dom'

export default function PromoSection() {
  return (
    <div className={styles.promo_section}>
      <div className={styles.content}>
        <h1>Amazing Discounts on Pets Products!</h1>

        <Link to="/sales" className={styles.promo_button}>
          Check out
        </Link>
      </div>
    </div>
  )
}
