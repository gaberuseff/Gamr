'use client';

import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../_redux/cart/cartSlice";
import { Button } from "./Button";

function AddToCart({ product, selectedSize = null }) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { size, finalPrice } = useMemo(() => {
        const selectedSizeValue = selectedSize ? selectedSize.size : product.sizes[0].size;
        const basePrice = selectedSize ? selectedSize.price : product.sizes[0].price;
        const discount = product?.discount ?? 0;
        const calculatedPrice = discount > 0 ? basePrice * (1 - discount / 100) : basePrice;

        return {
            size: selectedSizeValue,
            finalPrice: calculatedPrice
        };
    }, [selectedSize, product.sizes, product.discount]);

    async function handleAddToCart() {
        setIsLoading(true);
        setIsSuccess(false);

        // Simulate loading for UI interaction
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newProduct = {
            image: product.images?.[0] || "/imgs/placeholder.png",
            name: product.name_ar,
            id: product.id,
            size: size,
            unitPrice: finalPrice,
            quantity: 1,
            total: finalPrice * 1
        }
        dispatch(addItemToCart(newProduct));

        setIsLoading(false);
        setIsSuccess(true);

        // Reset success state after 2 seconds
        setTimeout(() => {
            setIsSuccess(false);
        }, 1000);
    }

    return (
        <>
            <Button
                size="lg"
                fullWidth
                onPress={handleAddToCart}
                isLoading={isLoading}
                isDisabled={isLoading || isSuccess}
                color={isSuccess ? "success" : "primary"}
            >
                {isSuccess ? "✓ Added to Cart!" : "Add to Cart"}
            </Button>
        </>
    )
}

export default AddToCart
