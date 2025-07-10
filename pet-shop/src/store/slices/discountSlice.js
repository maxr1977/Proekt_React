import { createSlice } from '@reduxjs/toolkit';

const discountSlice = createSlice({
    name: 'discount',
    initialState: {
        isEligible: false, 
    },
    reducers: {
        
        setDiscountEligibility: (state, action) => {
            state.isEligible = action.payload;
        }
    }
});

export const { setDiscountEligibility } = discountSlice.actions;
export default discountSlice.reducer;