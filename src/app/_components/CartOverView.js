'use client'

import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { totalQuantitySelector } from "../_redux/cart/CartSelector";

function CartOverView() {
    const totalItemsInCart = useSelector(totalQuantitySelector);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Link href="/cart" className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full 
            transition-colors duration-200">
            <ShoppingBasket />
            {isMounted && totalItemsInCart > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                    text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItemsInCart}
                </span>
            )}
        </Link>
    )
}

export default CartOverView
