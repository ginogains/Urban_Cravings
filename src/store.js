import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const food = action.payload;
      const existing = state.items.find((item) => item.id === food.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...food, quantity: 1 });
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    changeQuantity(state, action) {
      const { id, amount } = action.payload;
      const item = state.items.find((food) => food.id === id);
      if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) state.items = state.items.filter((food) => food.id !== id);
      }
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions;
export const store = configureStore({ reducer: { cart: cartSlice.reducer } });