import { Suspense } from "react"
import { getProducts } from "../_lib/data-services"
import { Spinner } from "../_heroui/herouiComponents"
import ItemsList from "./ItemsList"
import SectionHeader from "./SectionHeader"

async function TopSelling() {
    const topSelling = await getProducts()

    return (
        <section className="section-md bg-background-2">
            <div className="max-w-7xl mx-auto">
                <SectionHeader title="Top Selling Fragrances"
                    subtitle="Explore our most popular perfumes loved by customers worldwide." />

                <Suspense fallback={<Spinner size="lg" />}>
                    <ItemsList items={topSelling} />
                </Suspense>
            </div>
        </section>
    )
}

export default TopSelling
