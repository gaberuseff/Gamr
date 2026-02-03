import { Suspense } from "react"
import Heading from "../_components/Heading"
import { getProducts } from "../_lib/data-services"
import ItemsList from "../_components/ItemsList"
import { Spinner } from "../_heroui/herouiComponents"
import { cacheLife } from "next/cache"

async function page() {
    'use cache'
    cacheLife('hours', 4);

    const items = await getProducts()

    return (
        <div className="section-md">
            <div className="max-w-7xl mx-auto">
                <div>
                    <Heading as="h1">Shop Our Collection</Heading>
                    <p className="text-gray-600 text-sm max-w-2xl">
                        Explore our curated selection of premium fragrances from the
                        world&apos;s most prestigious brands. Find your signature scent today.
                    </p>
                </div>

                <div className="mt-10">
                    <Suspense fallback={<Spinner />}>
                        <ItemsList items={items} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default page
