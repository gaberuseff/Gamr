import CallToAction from "./_components/CallToAction"
import Hero from "./_components/Hero"
import Offers from "./_components/Offers"
import TopSelling from "./_components/TopSelling"

async function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Premium Perfumes & Luxury Fragrances",
            "description": "Discover luxury fragrances crafted with the finest ingredients. Shop 500+ premium perfumes from world's finest brands.",
            "url": "https://example.com",
            "mainEntity": {
              "@type": "Product",
              "name": "Premium Perfume Collection",
              "description": "Exclusive collection of luxury fragrances and designer perfumes",
              "brand": {
                "@type": "Brand",
                "name": "Premium Perfumes"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              }
            }
          }),
        }}
      />
      <Hero />
      <Offers />
      <CallToAction />
      <TopSelling />
    </>
  )
}

export default page
