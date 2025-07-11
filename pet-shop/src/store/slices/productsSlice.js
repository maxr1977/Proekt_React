import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/products/all')
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchProductsByCategoryId = createAsyncThunk(
  'products/fetchProductsByCategoryId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/categories/${id}`)

      if (data.status === 'ERR' && data.message === 'empty category') {
        return rejectWithValue('Category not found')
      }

      return data
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message
      return rejectWithValue(errorMessage)
    }
  }
)

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${id}`)
      return data[0]
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    currentCategoryProducts: [],
    currentProduct: null,
    category: null,
    status: 'idle',
    error: null,
    filters: {
      minPrice: '',
      maxPrice: '',
      showDiscounted: false,
      sortBy: 'default',
    },
  },
  reducers: {
    setMinPrice: (state, action) => {
      state.filters.minPrice = action.payload
    },
    setMaxPrice: (state, action) => {
      state.filters.maxPrice = action.payload
    },
    setShowDiscounted: (state, action) => {
      state.filters.showDiscounted = action.payload
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload
    },
    resetFilters: (state) => {
      state.filters.minPrice = ''
      state.filters.maxPrice = ''
      state.filters.showDiscounted = false
      state.filters.sortBy = 'default'
    },

    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },

    clearProductError: (state) => {
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.allProducts = action.payload
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      .addCase(fetchProductsByCategoryId.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.currentCategoryProducts = []
      })
      .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentCategoryProducts = action.payload.data
        state.category = action.payload.category
      })
      .addCase(fetchProductsByCategoryId.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.currentProduct = null
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        if (!action.payload) {
          state.status = 'failed'
          state.error = 'Product not found'
        } else {
          state.status = 'succeeded'
          state.currentProduct = action.payload
        }
      })

      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const {
  setMinPrice,
  setMaxPrice,
  setShowDiscounted,
  setSortBy,
  resetFilters,
  clearCurrentProduct,
  clearProductError,
} = productsSlice.actions

export default productsSlice.reducer
