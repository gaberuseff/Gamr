'use client'

import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getSettings, getDiscountCode } from '../_lib/data-services'
import { totalPriceSelector } from '../_redux/cart/CartSelector'

// ============================================================================
// Constants
// ============================================================================


const DISCOUNT_TYPES = {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed'
}

const getErrorMessages = (locale) => ({
    INACTIVE_CODE: locale === 'ar'
        ? 'هذا الكود غير نشط'
        : 'This code is inactive',

    NOT_STARTED: locale === 'ar'
        ? 'هذا الكود لم يبدأ بعد'
        : 'This code has not started yet',

    EXPIRED: locale === 'ar'
        ? 'هذا الكود منتهي الصلاحية'
        : 'This code has expired',

    INVALID_CODE: locale === 'ar'
        ? 'كود الخصم غير صحيح'
        : 'Invalid discount code',

    APPLY_ERROR: locale === 'ar'
        ? 'حدث خطأ أثناء تطبيق الكود'
        : 'An error occurred while applying the code',

    MIN_ORDER: (amount) => locale === 'ar'
        ? `الحد الأدنى للطلب هو ${amount} جنيه`
        : `Minimum order amount is ${amount} EGP`
})

// ============================================================================
// Context
// ============================================================================

const CheckoutContext = createContext()

// ============================================================================
// Helper Functions
// ============================================================================

function calculateShippingCost(subtotal, settings) {
    if (!settings) return 0

    const shippingPrice = settings.shipping_price || 0
    const freeShippingThreshold = settings.free_shipping || 0

    // Free shipping if threshold is met
    if (freeShippingThreshold > 0 && subtotal >= freeShippingThreshold) {
        return 0
    }

    return shippingPrice
}

function calculateDiscountAmount(subtotal, discountData) {
    if (!discountData) return 0

    let discountAmount = 0

    if (discountData.discount_type === DISCOUNT_TYPES.PERCENTAGE) {
        // Calculate percentage discount
        discountAmount = (subtotal * discountData.discount_value) / 100

        // Apply maximum discount cap if exists
        if (discountData.max_discount_amount && discountAmount > discountData.max_discount_amount) {
            discountAmount = discountData.max_discount_amount
        }
    } else if (discountData.discount_type === DISCOUNT_TYPES.FIXED) {
        // Fixed amount discount
        discountAmount = discountData.discount_value
    }

    // Ensure discount is a positive number
    return Math.max(0, discountAmount)
}

function calculateOrderTotal(subtotal, shipping, discount) {
    const total = subtotal + shipping - discount

    // Ensure total is never negative
    return Math.max(0, total)
}


function validateDiscountCode(discountData, subtotal, locale) {
    const now = new Date()
    const ERROR_MESSAGES = getErrorMessages(locale)

    // Check if discount code is active
    if (!discountData.is_active) {
        return { valid: false, error: ERROR_MESSAGES.INACTIVE_CODE }
    }

    // Check if discount code has started
    if (discountData.start_date && new Date(discountData.start_date) > now) {
        return { valid: false, error: ERROR_MESSAGES.NOT_STARTED }
    }

    // Check if discount code has expired
    if (discountData.end_date && new Date(discountData.end_date) < now) {
        return { valid: false, error: ERROR_MESSAGES.EXPIRED }
    }

    // Check minimum order amount requirement
    if (discountData.min_order_amount && subtotal < discountData.min_order_amount) {
        return {
            valid: false,
            error: ERROR_MESSAGES.MIN_ORDER(discountData.min_order_amount)
        }
    }

    return { valid: true }
}

// ============================================================================
// Provider Component
// ============================================================================

export function CheckoutProvider({ children, locale = 'ar' }) {
    // State management
    const [settings, setSettings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [discountCodeData, setDiscountCodeData] = useState(null)
    const [discountError, setDiscountError] = useState(null)
    const [discountLoading, setDiscountLoading] = useState(false)

    const subtotal = useSelector(totalPriceSelector)

    // Fetch settings on mount
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setLoading(true)
                const data = await getSettings()
                setSettings(data)
                setError(null)
            } catch (err) {
                console.error('Error fetching settings:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchSettings()
    }, [])



    const applyDiscountCode = async (code) => {
        setDiscountLoading(true)
        setDiscountError(null)

        const ERROR_MESSAGES = getErrorMessages(locale)

        try {
            const discountData = await getDiscountCode(code)

            if (!discountData) {
                setDiscountError(ERROR_MESSAGES.INVALID_CODE)
                setDiscountCodeData(null)
                return false
            }

            const validation = validateDiscountCode(discountData, subtotal, locale)

            if (!validation.valid) {
                setDiscountError(validation.error)
                setDiscountCodeData(null)
                return false
            }

            setDiscountCodeData(discountData)
            setDiscountError(null)
            return true
        } catch (err) {
            console.error('Error applying discount code:', err)
            setDiscountError(ERROR_MESSAGES.APPLY_ERROR)
            setDiscountCodeData(null)
            return false
        } finally {
            setDiscountLoading(false)
        }
    }

    /**
     * Remove the currently applied discount code
     */
    const removeDiscountCode = () => {
        setDiscountCodeData(null)
        setDiscountError(null)
    }

    // Calculate all checkout values
    const checkoutValues = useMemo(() => {
        const shipping = calculateShippingCost(subtotal, settings)
        const discount = calculateDiscountAmount(subtotal, discountCodeData)
        const total = calculateOrderTotal(subtotal, shipping, discount)

        const freeShippingThreshold = settings?.free_shipping || 0
        const isFreeShipping = shipping === 0 && freeShippingThreshold > 0

        return {
            subtotal,
            shipping,
            discount,
            total,
            isFreeShipping,
            shippingPrice: settings?.shipping_price || 0,
            freeShippingThreshold
        }
    }, [settings, subtotal, discountCodeData])

    return (
        <CheckoutContext.Provider
            value={{
                settings,
                loading,
                error,
                discountCodeData,
                discountError,
                discountLoading,
                applyDiscountCode,
                removeDiscountCode,
                ...checkoutValues
            }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}

// ============================================================================
// Hook
// ============================================================================

export function useCheckout() {
    const context = useContext(CheckoutContext)

    if (!context) {
        throw new Error('useCheckout must be used within CheckoutProvider')
    }

    return context
}
