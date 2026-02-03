'use client'

import { useDispatch } from "react-redux"
import { clearCart } from "../_redux/cart/cartSlice"
import { Button } from "./Button"
import ButtonLink from "./ButtonLink"

function CartButtons() {
    const dispatch = useDispatch()

    return (
        <div className="mt-8 flex items-center">
            <ButtonLink href="/checkout" className="btn-primary btn btn-md">
                Checkout
            </ButtonLink>

            <Button variant="bordered" className="ml-4" size="lg"
                onClick={() => dispatch(clearCart())}>
                Clear Cart
            </Button>
        </div >
    )
}

export default CartButtons
