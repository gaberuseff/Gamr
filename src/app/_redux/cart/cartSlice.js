'use strict';

const { createSlice } = require("@reduxjs/toolkit");

// Load initial state from localStorage
const getInitialState = () => {
    try {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? { cart: JSON.parse(savedCart) } : { cart: [] };
        }
    } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
    }
    return { cart: [] };
};

const initialState = getInitialState();

// Helper function to save to localStorage
const saveCartToLocalStorage = (cart) => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        addItemToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cart.find(i => i.id === item.id && i.size === item.size);

            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.total = existingItem.unitPrice * existingItem.quantity;
            } else {
                state.cart.push({ ...item, quantity: 1, total: item.unitPrice });
            }
            saveCartToLocalStorage(state.cart);
        },

        removeItemFromCart: (state, action) => {
            const { id, size } = action.payload;
            state.cart = state.cart.filter(i => !(i.id === id && i.size === size));
            saveCartToLocalStorage(state.cart);
        },

        increaseItemQuantity: (state, action) => {
            const { id, size } = action.payload;
            const item = state.cart.find(i => i.id === id && i.size === size);
            if (item) {
                item.quantity++;
                item.total = item.unitPrice * item.quantity;
                saveCartToLocalStorage(state.cart);
            }
        },

        decreaseItemQuantity: (state, action) => {
            const { id, size } = action.payload;
            const item = state.cart.find(i => i.id === id && i.size === size);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                item.total = item.unitPrice * item.quantity;
                saveCartToLocalStorage(state.cart);
            }
        },

        clearCart: (state) => {
            state.cart = [];
            saveCartToLocalStorage(state.cart);
        },

        // New action to load cart from localStorage (useful on app initialization)
        loadCartFromLocalStorage: (state, action) => {
            state.cart = action.payload || [];
        },

        // Update prices from database
        updateCartPricesFromDB: (state, action) => {
            const productsFromDB = action.payload; // Array of products with current prices from DB

            state.cart = state.cart.map(cartItem => {
                // Find matching product in DB by id
                const dbProduct = productsFromDB.find(p => p.id === cartItem.id);

                if (dbProduct) {
                    // Find matching size in the DB product
                    const sizeData = dbProduct.sizes?.find(s => s.size === cartItem.size);

                    if (sizeData) {
                        // Get current price from DB
                        const currentBasePrice = Number(sizeData.price ?? 0);
                        const discount = Number(dbProduct.discount ?? 0);
                        const currentPrice = discount > 0
                            ? currentBasePrice * (1 - discount / 100)
                            : currentBasePrice;

                        // Update unit price and recalculate total
                        return {
                            ...cartItem,
                            unitPrice: currentPrice,
                            total: currentPrice * cartItem.quantity
                        };
                    }
                }

                // If product not found in DB, keep original price
                return cartItem;
            });

            saveCartToLocalStorage(state.cart);
        }
    }
});

export const {
    addItemToCart,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
    loadCartFromLocalStorage,
    updateCartPricesFromDB
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalItemsInCart = (state) =>
    state.cart.cart.reduce((total, item) => total + item.quantity, 0);

export const getTotalPriceInCart = (state) =>
    state.cart.cart.reduce((total, item) => total + item.total, 0);