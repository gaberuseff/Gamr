'use client'

import { useEffect, useState } from 'react'
import { formatCurrency } from '../_utils/helpers'
import { useCheckout } from './CheckoutContext'
import { Input } from '@heroui/react'
import { Button } from './Button'

// ============================================================================
// Constants
// ============================================================================

const SUCCESS_MESSAGE_DURATION = 3000 // 3 seconds

// ============================================================================
// Component
// ============================================================================

/**
 * CheckoutTotal component displays order summary and discount code input
 * @param {Object} props - Component props
 * @param {string} props.locale - Current locale ('ar' or 'en')
 * @returns {JSX.Element|null} Order summary or null if not mounted
 */
function CheckoutTotal({ locale = 'en' }) {
    const {
        subtotal,
        shipping,
        discount,
        total,
        isFreeShipping,
        freeShippingThreshold,
        loading,
        error,
        discountCodeData,
        discountError,
        discountLoading,
        applyDiscountCode,
        removeDiscountCode
    } = useCheckout()

    const [mounted, setMounted] = useState(false)
    const [discountInput, setDiscountInput] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        setMounted(true)
    }, [])

    /**
     * Handle discount code application
     */
    const handleApplyDiscount = async () => {
        if (!discountInput.trim()) return

        setSuccessMessage('')
        const success = await applyDiscountCode(discountInput.trim())

        if (success) {
            const message = locale === 'ar'
                ? 'تم تطبيق كود الخصم بنجاح!'
                : 'Discount code applied successfully!'
            setSuccessMessage(message)
            setTimeout(() => setSuccessMessage(''), SUCCESS_MESSAGE_DURATION)
        }
    }

    /**
     * Handle discount code removal
     */
    const handleRemoveDiscount = () => {
        removeDiscountCode()
        setDiscountInput('')
        setSuccessMessage('')
    }

    /**
     * Handle Enter key press in discount input
     */
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleApplyDiscount()
        }
    }

    // Prevent hydration errors by not rendering until mounted on client
    if (!mounted) {
        return null
    }

    return (
        <div className="w-full md:w-96 flex flex-col gap-4 p-6 
            bg-white rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>

            {/* Subtotal */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-gray-700 font-medium">Subtotal</span>
                <span className="text-gray-900 font-semibold">
                    {formatCurrency(subtotal)}
                </span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">Shipping</span>
                    {!loading && isFreeShipping && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                            FREE
                        </span>
                    )}
                </div>
                <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {loading ? 'Loading...' : formatCurrency(shipping)}
                </span>
            </div>

            {/* Free Shipping Info */}
            {subtotal < freeShippingThreshold && freeShippingThreshold > 0 && (
                <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
                    Free shipping on orders over {formatCurrency(freeShippingThreshold)}
                </div>
            )}

            {/* Discount Code Section */}
            {!discountCodeData ? (
                <div className="flex items-end gap-2 mt-4">
                    <Input
                        label="Discount Code"
                        labelPlacement="outside"
                        name="discount_code"
                        placeholder="Enter your Discount Code"
                        type="text"
                        className="flex-1"
                        value={discountInput}
                        onChange={(e) => setDiscountInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        isDisabled={discountLoading}
                    />
                    <Button
                        variant="primary"
                        onClick={handleApplyDiscount}
                        isLoading={discountLoading}
                        isDisabled={!discountInput.trim() || discountLoading}
                    >
                        Apply
                    </Button>
                </div>
            ) : (
                <div className="flex justify-between items-center bg-green-50 p-3 rounded mt-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-green-800 font-medium">
                            Code: {discountCodeData.code}
                        </span>
                    </div>
                    <button
                        onClick={handleRemoveDiscount}
                        className="text-xs text-red-600 hover:text-red-800 font-medium transition-colors"
                        aria-label="Remove discount code"
                    >
                        Remove
                    </button>
                </div>
            )}

            {/* Discount Error */}
            {discountError && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                    {discountError}
                </div>
            )}

            {/* Success Message */}
            {successMessage && (
                <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                    {successMessage}
                </div>
            )}

            {/* Discount Amount */}
            {discount > 0 && (
                <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Discount</span>
                    <span className="text-green-600 font-semibold">
                        -{formatCurrency(discount)}
                    </span>
                </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(total)}
                </span>
            </div>

            {/* General Error */}
            {error && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                    {error}
                </div>
            )}
        </div>
    )
}

export default CheckoutTotal

