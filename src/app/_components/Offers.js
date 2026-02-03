import { Suspense } from "react"
import { getOffersProducts } from "../_lib/data-services"
import ItemsList from "./ItemsList"
import SectionHeader from "./SectionHeader"
import { Spinner } from "../_heroui/herouiComponents"

async function Offers() {
    const offers = await getOffersProducts()

    if (!offers || offers.length === 0) {
        return null
    }

    return (
        <section className="section-md">
            <div className="max-w-7xl mx-auto">
                <SectionHeader title="Special Offers"
                    subtitle="Don't miss out on our exclusive deals!" />

                <Suspense fallback={<Spinner size="lg" />}>
                    <ItemsList items={offers} />
                </Suspense>
            </div>
        </section>
    )
}

export default Offers
