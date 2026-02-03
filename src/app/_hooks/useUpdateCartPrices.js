'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartPricesFromDB } from '../_redux/cart/cartSlice';
import { cartItemsSelector } from '../_redux/cart/CartSelector';

/**
 * Hook to sync cart prices with database on component mount
 * This ensures prices are always up-to-date even if they were stored from before
 */
export const useUpdateCartPrices = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(cartItemsSelector);

    useEffect(() => {
        // Only update if cart has items
        if (cartItems.length === 0) return;

        const updatePrices = async () => {
            try {
                // Get unique product IDs from cart
                const productIds = [...new Set(cartItems.map(item => item.id))];

                // Fetch only the products that exist in cart
                const response = await fetch('/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ids: productIds })
                });

                if (!response.ok) throw new Error('Failed to fetch products');

                const productsFromDB = await response.json();

                // Dispatch action to update prices
                dispatch(updateCartPricesFromDB(productsFromDB));
            } catch (error) {
                console.error('Failed to update cart prices from DB:', error);
            }
        };

        updatePrices();
    }, []); // Run only once on mount
};
