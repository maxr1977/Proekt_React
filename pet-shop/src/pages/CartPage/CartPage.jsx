import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from './CartPage.module.css'
import UIButton from '../../ui/UIButton/UIButton'
import CartItem from '../../components/CartItem/CartItem'
import ContactForm from '../../components/ContactForm/ContactForm'
import { clearCart } from '../../store/slices/cartSlice'
import api from '../../api'
import Modal from '../../ui/Modal/Modal'
import SectionHeader from '../../components/SectionHeader/SectionHeader'

export default function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const cartItems = useSelector((state) => state.cart.list)
  const isDiscountEligible = useSelector((state) => state.discount.isEligible)

  const uniqueItemsCount = cartItems.length

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.discont_price ?? item.price) * item.count,
    0
  )
  const discountAmount = isDiscountEligible ? subtotal * 0.05 : 0
  const total = subtotal - discountAmount

  const handleOrderSubmit = async (formData) => {
    try {
      await api.post('/order/send', { ...formData, items: cartItems })

      setIsModalOpen(true)
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error)
      alert('Failed to place the order. Please try again.')
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    dispatch(clearCart())
    navigate('/')
  }

  const handleSubmitWrapper = (data, event) => {
    const form = event.target
    handleOrderSubmit(data, { reset: () => form.reset() })
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.cart_page}>
        <div className={styles.container}>
          <SectionHeader
            title="Shopping cart"
            buttonText="Back to the store"
            linkTo="/products"
          />
          <div className={styles.empty_cart_container}>
            <p>Looks like you have no items in your basket currently.</p>
            <Link to="/products">
              <UIButton theme="primary">Continue Shopping</UIButton>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.cart_page}>
      <div className={styles.container}>
        <SectionHeader
          title="Shopping cart"
          buttonText="Back to the store"
          linkTo="/products"
        />

        <div className={styles.cart_content}>
          <div className={styles.cart_items_list}>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className={styles.order_details}>
            <h2>Order details</h2>
            <p>{uniqueItemsCount} items</p>
            <div className={styles.total_summary}>
              <div className={styles.summary_row}>
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              {isDiscountEligible && (
                <div className={styles.summary_row}>
                  <p>5% Discount</p>
                  <p className={styles.discount_amount}>
                    -${discountAmount.toFixed(2)}
                  </p>
                </div>
              )}
              <div className={`${styles.summary_row} ${styles.grand_total}`}>
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>
            <ContactForm
              buttonText="Order"
              onSubmit={handleSubmitWrapper}
              buttonTheme="primary"
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        contentClassName={styles.success_modal_content}
      >
        <h2>Congratulations!</h2>
        <p>Your order has been successfully placed on the website.</p>
        <p>A manager will contact you shortly to confirm your order.</p>
      </Modal>
    </div>
  )
}
