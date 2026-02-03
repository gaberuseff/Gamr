import supabase from "./supabase"

export const getProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('*')

    if (error) {
        console.error(error)
        throw new Error('Failed to fetch products')
    }

    return data
}

export const getOffersProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .gt('discount', 0)

    if (error) {
        console.error(error)
        throw new Error('Failed to fetch offers products')
    }

    return data
}

export const getProductById = async (id) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error(error)
        throw new Error('Failed to fetch product by ID')
    }

    return data
}

export const getSettings = async () => {
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single()
        .eq('id', 1)

    if (error) {
        console.error(error)
        throw new Error('Failed to fetch settings')
    }

    return data
}

export const getDiscountCode = async (code) => {
    const { data, error } = await supabase
        .from('discount_codes')
        .select('*')
        .eq('code', code)
        .single()

    if (error) {
        return null
    }

    return data
}
