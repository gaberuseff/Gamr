'use client';

import { useState } from "react";
import { ButtonGroup, Button } from "../_heroui/herouiComponents";
import { formatCurrency } from "../_utils/helpers";
import AddToCart from "./AddToCart";

function ProductSizeSelector({ product, sizes, discount }) {
    const [selectedSize, setSelectedSize] = useState(sizes[0]);

    const basePrice = Number(selectedSize?.price ?? 0);
    const finalPrice = discount > 0 ? basePrice * (1 - discount / 100) : basePrice;

    return (
        <>
            <div className="flex items-center gap-3">
                <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(finalPrice || 0)}
                </p>
                {discount > 0 && (
                    <p className="text-lg text-gray-400 line-through">
                        {formatCurrency(basePrice)}
                    </p>
                )}
            </div>

            {sizes.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Available Sizes</p>
                    <div className="flex gap-3">
                        <ButtonGroup>
                            {sizes.map((size) => (
                                <Button
                                    key={size.size}
                                    color="primary"
                                    variant={selectedSize.size === size.size ? "solid" : "bordered"}
                                    onPress={() => setSelectedSize(size)}
                                    aria-label={`Select size ${size.size} for ${product.name_en || product.name}`}
                                >
                                    {size.size}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
                <AddToCart product={product} selectedSize={selectedSize} />
            </div>
        </>
    );
}

export default ProductSizeSelector;
