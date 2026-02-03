import CartButtons from "../_components/CartButtons"
import CartItems from "../_components/CartItems"
import Heading from "../_components/Heading"

function page() {
    return (
        <div className="section-sm">
            <div className="max-w-7xl mx-auto">
                <Heading as="h1">Your Shopping Cart</Heading>

                <CartItems />
            </div>
        </div>
    )
}

export default page
