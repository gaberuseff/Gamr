'use client'

import { useSelector } from "react-redux"
import { cartItemsSelector } from "../_redux/cart/CartSelector"
import { CheckoutProvider } from "./CheckoutContext"
import CheckoutForm from "./CheckoutForm"
import CheckoutTotal from "./CheckoutTotal"
import EmptyCart from "./EmptyCart"

function CheckoutFullPage() {
    const cartItems = useSelector(cartItemsSelector)
    if (cartItems.length === 0) return <EmptyCart />

    return (
        <CheckoutProvider>
            <div className="flex md:flex-row flex-col 
                md:gap-12 md:justify-between gap-6">
                <CheckoutForm />

                <CheckoutTotal />
            </div>
        </CheckoutProvider>
    )
}

export default CheckoutFullPage
