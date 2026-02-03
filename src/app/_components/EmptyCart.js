import { ArrowBigLeft } from "lucide-react"
import ButtonLink from "./ButtonLink"

function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-24 h-24 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</p>
            <p className="text-sm text-gray-600">Add some items to get started</p>

            <div className="mt-6">
                <ButtonLink href="/shop" className="btn btn-primary btn-md">
                    <ArrowBigLeft className="mr-2 h-5 w-5" /> Shop Now
                </ButtonLink>
            </div>
        </div>
    )
}

export default EmptyCart
