import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
}

interface CartState {
    items: { product: Product; quantity: number }[];
    totalAmount: number;
}

const initialState: CartState = {
    items: [],
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<Product>) {
            const existingItem = state.items.find(
                (item) => item.product.id === action.payload.id
            );

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ product: action.payload, quantity: 1 });
            }

            state.totalAmount += action.payload.price;
        },
        removeItem(state, action: PayloadAction<number>) {
            const existingItemIndex = state.items.findIndex(
                (item) => item.product.id === action.payload
            );

            if (existingItemIndex >= 0) {
                state.totalAmount -= state.items[existingItemIndex].product.price * state.items[existingItemIndex].quantity;
                state.items.splice(existingItemIndex, 1);
            }
        },
    },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
