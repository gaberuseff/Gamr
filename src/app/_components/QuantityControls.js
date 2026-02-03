'use client"'

import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "../_redux/cart/cartSlice";
import DeleteItem from "./DeleteItem"

function QuantityControls({ item }) {
    const dispatch = useDispatch();

    const handleIncrease = (id, size) => {
        dispatch(increaseItemQuantity({ id, size }));
    };

    const handleDecrease = (id, size) => {
        dispatch(decreaseItemQuantity({ id, size }));
    };


    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-300 rounded">
                <button
                    onClick={() => handleDecrease(item.id, item.size)}
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    aria-label="Decrease quantity"
                >
                    −
                </button>
                <span className="w-6 h-6 flex items-center justify-center text-xs font-semibold text-gray-900">
                    {item.quantity}
                </span>
                <button
                    onClick={() => handleIncrease(item.id, item.size)}
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>

            {/* Delete Button */}
            <div className="ml-auto">
                <DeleteItem itemId={item.id} size={item.size} />
            </div>
        </div>
    )
}

export default QuantityControls
