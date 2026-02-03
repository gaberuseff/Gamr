import Product from "@/app/_components/Product";
import { getProductById, getProducts } from "@/app/_lib/data-services";
import { cacheLife } from "next/cache";

export async function generateStaticParams() {
    const products = await getProducts();
    const ids = products.map((product) => ({
        id: String(product.id),
    }));
    return ids;
}

async function page({ params }) {
    'use cache';
    cacheLife('hours', 4);

    const { id } = await params;
    const product = await getProductById(id);

    return (
        <article className="section-md">
            <Product product={product} />
        </article>
    )
}

export default page
