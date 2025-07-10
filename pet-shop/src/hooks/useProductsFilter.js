import { useSelector } from 'react-redux'

export const useProductsFilter = (products) => {
  const filters = useSelector((state) => state.products.filters)

  const filteredAndSortedProducts = [...products]
    .filter((product) => {
      const currentPrice = product.discont_price ?? product.price
      if (filters.showDiscounted && !product.discont_price) return false
      if (filters.minPrice && currentPrice < parseFloat(filters.minPrice))
        return false
      if (filters.maxPrice && currentPrice > parseFloat(filters.maxPrice))
        return false
      return true
    })
    .sort((a, b) => {
      const priceA = a.discont_price ?? a.price
      const priceB = b.discont_price ?? b.price
      switch (filters.sortBy) {
        case 'price_high_low':
          return priceB - priceA
        case 'price_low_high':
          return priceA - priceB
        case 'newest':
          return b.id - a.id
        default:
          return 0
      }
    })

  return filteredAndSortedProducts
}
