import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './slices/categoriesSlice'
import productsReducer from './slices/productsSlice'
import discountReducer from './slices/discountSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    discount: discountReducer,
    cart: cartReducer,
  },
})
