'use client';

import { useUpdateCartPrices } from '../_hooks/useUpdateCartPrices';

/**
 * Component that syncs cart prices with database on app load
 * Place this in your main layout or providers
 */
export function CartPriceSync() {
    useUpdateCartPrices();
    return null; // This component doesn't render anything
}
