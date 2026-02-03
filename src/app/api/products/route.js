import { getProducts } from "@/app/_lib/data-services";

export async function GET() {
    try {
        const products = await getProducts();
        return Response.json(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return Response.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { ids } = await request.json();

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return Response.json(
                { error: 'ids array is required' },
                { status: 400 }
            );
        }

        // Fetch all products
        const allProducts = await getProducts();

        // Filter to only products in cart
        const cartProducts = allProducts.filter(product =>
            ids.includes(product.id)
        );

        return Response.json(cartProducts);
    } catch (error) {
        console.error('Failed to fetch cart products:', error);
        return Response.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}
