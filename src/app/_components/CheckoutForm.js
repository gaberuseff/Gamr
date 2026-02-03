'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Select, SelectItem } from "../_heroui/herouiComponents"
import { createOrder } from '../_lib/actions'
import { cartItemsSelector } from '../_redux/cart/CartSelector'
import { clearCart } from '../_redux/cart/cartSlice'
import { egyptGovernorates } from "../_utils/static"
import { useCheckout } from "./CheckoutContext"

// ============================================================================
// Constants
// ============================================================================

const LOCALE = 'en' // Can be made dynamic based on user preference

// ============================================================================
// Component
// ============================================================================

function CheckoutForm({ locale = 'en' }) {
    const cartItems = useSelector(cartItemsSelector)
    const dispatch = useDispatch()
    const router = useRouter()
    const formRef = useRef(null)
    const [mounted, setMounted] = useState(false)
    const [formError, setFormError] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        loading,
        subtotal,
        shipping,
        discount,
        total,
        isFreeShipping,
        discountCodeData,
        removeDiscountCode
    } = useCheckout()

    useEffect(() => {
        setMounted(true)
    }, [])

    const getGovName = (gov) => {
        return LOCALE === 'ar' ? gov.ar : gov.en
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        try {
            setIsSubmitting(true)
            // Extract form data
            const formData = new FormData(e.currentTarget)
            const data = Object.fromEntries(formData)

            // Validate cart items
            if (!cartItems || cartItems.length === 0) {
                const errorMsg = locale === 'ar'
                    ? 'سلة التسوق فارغة'
                    : 'Your cart is empty'
                setFormError(errorMsg)
                return
            }

            // Add checkout data from context
            data.cart = cartItems
            data.sub_total = subtotal
            data.shipping = shipping
            data.discount_amount = discount
            data.discount_code = discountCodeData?.code || null
            data.total = total
            data.is_free_shipping = isFreeShipping

            // Create order
            await createOrder(data)

            // Clear cart, form, and discount code BEFORE redirect
            dispatch(clearCart())
            removeDiscountCode()
            if (formRef.current) {
                formRef.current.reset()
            }
            // Now redirect to shop
            router.push('/shop')

        } catch (err) {
            console.error('Error submitting order:', err)
            const errorMsg = locale === 'ar'
                ? 'حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.'
                : 'An error occurred while submitting your order. Please try again.'
            setFormError(errorMsg)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Prevent hydration errors by not rendering until mounted on client
    if (!mounted) {
        return null
    }

    return (
        <Form
            ref={formRef}
            className="w-full max-w-xl space-y-2 flex flex-col gap-4 mt-6 font-semibold"
            onSubmit={handleSubmit}
        >
            <Input
                isRequired
                errorMessage="Please enter a valid Name"
                label="Name"
                labelPlacement="outside"
                name="customer_name"
                placeholder="Enter your Full Name"
                type="text"
            />

            <Input
                errorMessage="Please enter a valid Email"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your Email"
                type="email"
            />

            <Input
                isRequired
                errorMessage="Please enter a valid Phone Number"
                label="Phone Number"
                labelPlacement="outside"
                name="phone_number"
                placeholder="Enter your Phone Number"
                type="tel"
            />

            <div className='w-full'>
                <Select
                    isRequired
                    errorMessage="Please select a governorate"
                    label="Governorate"
                    labelPlacement="outside"
                    name="gov"
                    placeholder="Select your governorate"
                >
                    {egyptGovernorates.map((gov) => (
                        <SelectItem key={gov.key}>
                            {getGovName(gov)}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <Input
                isRequired
                errorMessage="Please enter a valid address"
                label="Address"
                labelPlacement="outside"
                name="address"
                placeholder="Enter your shipping address"
                type="text"
            />

            {/* Error message display */}
            {formError && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                    {formError}
                </div>
            )}

            <div className="flex gap-2">
                <Button
                    color="primary"
                    type="submit"
                    size='lg'
                    isDisabled={loading || !cartItems || cartItems.length === 0}
                    isLoading={isSubmitting}
                >
                    Submit Order
                </Button>
            </div>
        </Form>
    )
}

export default CheckoutForm

