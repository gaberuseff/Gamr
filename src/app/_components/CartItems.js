'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cartItemsSelector } from "../_redux/cart/CartSelector";
import { formatCurrency } from "../_utils/helpers";
import EmptyCart from "./EmptyCart";
import QuantityControls from "./QuantityControls";
import CartButtons from "./CartButtons";

function CartItems() {
    const cartItems = useSelector(cartItemsSelector);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    if (cartItems.length === 0) {
        return <EmptyCart />;
    }

    return (
        <>
            <div className="space-y-3 mt-6">
                {cartItems.map((item) => (
                    <article
                        key={`${item.id}-${item.size}`}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow"
                    >
                        <div className="flex gap-3 p-3 items-center">
                            {/* Product Image - Small */}
                            <div className="relative w-20 h-20 bg-gradient-to-br 
                            from-gray-50 to-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src={item?.image || "/imgs/placeholder.png"}
                                    alt={item.name || "Product"}
                                    fill
                                    sizes="80px"
                                    className="object-contain"
                                />
                            </div>

                            {/* Product Info - Center */}
                            <div className="flex-1 min-w-0 space-y-1">
                                {/* Name */}
                                <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
                                    {item.name}
                                </h3>

                                {/* Price & Size */}
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-base font-bold text-gray-900">
                                            {formatCurrency(item.total)}
                                        </span>
                                        <span className="text-xs text-gray-500">LE</span>
                                    </div>
                                    <span className="text-xs font-medium bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                                        {item.size}
                                    </span>
                                </div>

                                {/* Quantity Controls */}
                                <QuantityControls item={item} />
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className="mt-6">
                <CartButtons />
            </div>
        </>

    )
}

export default CartItems
