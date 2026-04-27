import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    total: 0,
    totalItems: 0,
};

const calculateTotals = (items) => {
    return items.reduce(
        (acc, item) => {
            const price = item.price?.amount || 0;
            acc.total += price * item.quantity;
            acc.totalItems += item.quantity;
            return acc;
        },
        { total: 0, totalItems: 0 }
    );
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            const items = action.payload || [];
            state.items = items;
            const { total, totalItems } = calculateTotals(items);
            state.total = total;
            state.totalItems = totalItems;
        },
        addTheItem: (state, action) => {
            const newItem = action.payload;
            const existing = state.items.find(
                (item) =>
                    (item.productId?._id || item.productId) === (newItem.productId?._id || newItem.productId) &&
                    item.variantId === newItem.variantId
            );

            if (existing) {
                existing.quantity += newItem.quantity || 1;
            } else {
                state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
            }

            const { total, totalItems } = calculateTotals(state.items);
            state.total = total;
            state.totalItems = totalItems;
        },
        removeItemAction: (state, action) => {
            const { productId, variantId } = action.payload;
            state.items = state.items.filter(
                (item) =>
                    !((item.productId?._id || item.productId) === productId && item.variantId === variantId)
            );

            const { total, totalItems } = calculateTotals(state.items);
            state.total = total;
            state.totalItems = totalItems;
        },
        updateQuantityAction: (state, action) => {
            const { productId, variantId, quantity } = action.payload;
            const item = state.items.find(
                (item) =>
                    (item.productId?._id || item.productId) === productId && item.variantId === variantId
            );

            if (item) {
                item.quantity = quantity;
            }

            const { total, totalItems } = calculateTotals(state.items);
            state.total = total;
            state.totalItems = totalItems;
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            state.totalItems = 0;
        },
    },
});

export const { setCart, addTheItem, removeItemAction, updateQuantityAction, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
