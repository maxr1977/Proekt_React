import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllProducts,
  resetFilters,
  setShowDiscounted,
} from '../../store/slices/productsSlice'
import { useProductsFilter } from '../../hooks/useProductsFilter'
import styles from '../ProductListPage.module.css'

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import ProductCard from '../../components/ProductCard/ProductCard'
import FiltersPanel from '../../components/FiltersPanel/FiltersPanel'

export default function AllSalesPage() {
  const dispatch = useDispatch()

  const {
    allProducts: list,
    status,
    error,
  } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(setShowDiscounted(true))

    if (list.length === 0) {
      dispatch(fetchAllProducts())
    }

    return () => {
      dispatch(resetFilters())
    }
  }, [dispatch, list.length])

  const filteredAndSortedProducts = useProductsFilter(list)

  const breadcrumbPaths = [
    { label: 'Main Page', path: '/' },
    { label: 'All sales', path: '/sales' },
  ]

  return (
    <div className={styles.products_page}>
      <div className={styles.container}>
        <Breadcrumbs paths={breadcrumbPaths} />
        <h1>Discounted items</h1>
        <FiltersPanel hideDiscountCheckbox={true} />

        {status === 'loading' && list.length === 0 && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <div className={styles.products_grid}>
          {status === 'succeeded' && filteredAndSortedProducts.length > 0
            ? filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            : status === 'succeeded' && (
                <p>No products found matching your criteria.</p>
              )}
        </div>
      </div>
    </div>
  )
}
