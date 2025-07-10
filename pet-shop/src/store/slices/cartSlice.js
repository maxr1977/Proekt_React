import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        list: [], 
    },
    reducers: {
        
        addToCart: (state, action) => {
            const { product, quantity } = action.payload;
            const existingProduct = state.list.find(item => item.id === product.id);

            if (existingProduct) {
                
                existingProduct.count += quantity;
            } else {
                
                state.list.push({ ...product, count: quantity });
            }
        },

        
        incrementItem: (state, action) => {
            const id = action.payload;
            const existingProduct = state.list.find(item => item.id === id);
            if (existingProduct) {
                existingProduct.count += 1;
            }
        },

        
        decrementItem: (state, action) => {
            const id = action.payload;
            const existingProduct = state.list.find(item => item.id === id);
            if (existingProduct) {
                if (existingProduct.count === 1) {
                    
                    state.list = state.list.filter(item => item.id !== id);
                } else {
                    existingProduct.count -= 1;
                }
            }
        },

        
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.list = state.list.filter(item => item.id !== id);
        },

        
        clearCart: (state) => {
            state.list = [];
        }
    }
});

export const { 
    addToCart, 
    incrementItem, 
    decrementItem, 
    removeFromCart, 
    clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;