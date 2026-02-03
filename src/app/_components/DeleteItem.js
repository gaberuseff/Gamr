'use client'

import { Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../_redux/cart/cartSlice";
import { Button } from "./Button";

function DeleteItem({ itemId, size = null }) {
    const dispatch = useDispatch();

    function handleDeleteItem() {
        dispatch(removeItemFromCart({ id: itemId, size }));
    }

    return (
        <Button isIconOnly aria-label="Delete Item" color="danger"
            variant="light" size="sm"
            onPress={handleDeleteItem}>
            <Trash />
        </Button>
    )
}

export default DeleteItem
