import CategoriesSection from '../../components/CategoriesSection/CategoriesSection'
import DiscountFormSection from '../../components/DiscountFormSection/DiscountFormSection'
import PromoSection from '../../components/PromoSection/PromoSection'
import SaleSection from '../../components/SaleSection/SaleSection'
import styles from './MainPage.module.css'

export default function MainPage() {
  return (
    <>
      <div className={styles.container_promo}>
        <PromoSection />
      </div>
      <div className={styles.container}>
        <CategoriesSection />
      </div>
      <div className={styles.container}>
        <DiscountFormSection />
      </div>
      <div className={styles.container}>
        <SaleSection />
      </div>
    </>
  )
}
