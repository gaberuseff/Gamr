import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./_redux/cart/cartSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;