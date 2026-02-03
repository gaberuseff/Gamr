import CheckoutForm from "../_components/CheckoutForm"
import CheckoutFullPage from "../_components/CheckoutFullPage"
import Heading from "../_components/Heading"

function page() {
    return (
        <div className="section-md">
            <div className="max-w-7xl mx-auto">
                <Heading as="h1">Checkout Page</Heading>

                <CheckoutFullPage />
            </div>
        </div>
    )
}

export default page
