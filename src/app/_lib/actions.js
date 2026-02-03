'use server'

import { redirect } from "next/navigation"
import supabase from "./supabase";

export async function createOrder(order) {
    const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select('id')

    if (error) {
        console.error('Database error:', error)
        throw new Error(error.message || 'Failed to create order')
    }

    return data
}