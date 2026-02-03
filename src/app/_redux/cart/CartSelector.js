import { createSelector } from 'reselect';

const cartSelector = (state) => state.cart.cart;

export const cartItemsSelector = createSelector(
    [cartSelector],
    (cartItems) => cartItems
);

export const totalQuantitySelector = createSelector(
    [cartSelector],
    (cartItems) => cartItems.reduce((total, item) => total + item.quantity, 0)
);

export const totalPriceSelector = createSelector(
    [cartSelector],
    (cartItems) => cartItems.reduce((total, item) => total + item.total, 0)
);
