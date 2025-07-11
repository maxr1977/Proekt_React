import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Navigate } from 'react-router-dom'

import {
  fetchSingleProduct,
  clearCurrentProduct,
} from '../../store/slices/productsSlice'

import { addToCart } from '../../store/slices/cartSlice'
import styles from './SingleProductPage.module.css'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import UIButton from '../../ui/UIButton/UIButton'

const calculateDiscount = (price, discont_price) => {
  if (!discont_price || discont_price >= price) return 0
  return Math.round(((price - discont_price) / price) * 100)
}

export default function SingleProductPage() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState(1)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const {
    currentProduct: product,
    status,
    error,
  } = useSelector((state) => state.products)
  const categories = useSelector((state) => state.categories.list)
  const cartItems = useSelector((state) => state.cart.list)

  const isAdded = product
    ? cartItems.some((item) => item.id === product.id)
    : false

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id))
    }

    return () => {
      dispatch(clearCurrentProduct())
    }
  }, [id, dispatch])

  if (status === 'loading') {
    return (
      <div className={styles.status_message}>
        <p>Loading...</p>
      </div>
    )
  }

  if (status === 'failed' && error === 'Product not found') {
    return <Navigate to="/404" replace />
  }

  if (error) {
    return (
      <div className={styles.status_message}>
        <p>Error: {error}</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className={styles.status_message}>
        <p>Loading...</p>
      </div>
    )
  }

  const discount = calculateDiscount(product.price, product.discont_price)
  const productCategory = categories.find(
    (cat) => cat.id === product.categoryId
  )
  const imageGallery = [product.image, product.image, product.image].map(
    (img) => `${import.meta.env.VITE_API_BASE_URL}${img}`
  )

  const breadcrumbPaths = [
    { label: 'Main Page', path: '/' },
    { label: 'Products', path: '/products' },
    ...(productCategory
      ? [
          {
            label: productCategory.title,
            path: `/categories/${productCategory.id}`,
          },
        ]
      : []),
    { label: product.title, path: `/products/${product.id}` },
  ]

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }))
  }

  return (
    <div className={styles.product_page}>
      <div className={styles.container}>
        <Breadcrumbs paths={breadcrumbPaths} />
        <div className={styles.product_content}>
          <div className={styles.gallery_section}>
            <div className={styles.thumbnail_list}>
              {imageGallery.map((imgUrl, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnail_wrapper} ${
                    index === activeImageIndex ? styles.active_thumbnail : ''
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={imgUrl} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className={styles.main_image_wrapper}>
              <img src={imageGallery[activeImageIndex]} alt={product.title} />
            </div>
          </div>

          <div className={styles.info_section}>
            <h1>{product.title}</h1>
            <div className={styles.price_wrapper}>
              <p className={styles.new_price}>
                ${product.discont_price ?? product.price}
              </p>
              {product.discont_price && (
                <p className={styles.old_price}>${product.price}</p>
              )}
              {discount > 0 && (
                <div className={styles.discount_badge}>-{discount}%</div>
              )}
            </div>

            <div className={styles.actions_wrapper}>
              <div className={styles.quantity_selector}>
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
              {isAdded ? (
                <UIButton theme="added" disabled>
                  Added to cart
                </UIButton>
              ) : (
                <UIButton onClick={handleAddToCart}>Add to cart</UIButton>
              )}
            </div>

            <div className={styles.description}>
              <h3>Description</h3>
              <p>
                {isExpanded || product.description.length < 300
                  ? product.description
                  : `${product.description.substring(0, 300)}...`}
              </p>
              {product.description.length >= 300 && (
                <span
                  className={styles.read_more_btn}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Read less' : 'Read more'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
