import Image from "next/image"
import { lato } from "../layout"
import ButtonLink from "./ButtonLink"

const numbers = [
    { value: "500+", label: "Premium Fragrances" },
    { value: "50K+", label: "Happy Customers" },
    { value: "100%", label: "High Quality" },
]

function Hero() {
    return (
        <section className="section-md bg-background" aria-labelledby="hero-heading">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 text-center md:text-left">
                        <div className="space-y-4">
                            <p className="text-sm md:text-base font-semibold text-[#2d2d2d] uppercase tracking-widest">
                                Luxury Fragrances
                            </p>
                            <h1 id="hero-heading" className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-[#1a1a1a]">
                                Discover Your Signature Scent
                            </h1>
                            <p className={`${lato.className} text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0`}>
                                Explore our curated collection of premium perfumes from the world's finest brands. Elevate your presence with luxurious fragrances that define your style and personality.
                            </p>
                        </div>

                        <div className="flex gap-4 justify-center md:justify-start">
                            <ButtonLink href="/shop" className="btn btn-primary btn-md" aria-label="Shop premium fragrances">Shop Now</ButtonLink>
                            <ButtonLink href="/about" className="btn btn-secondary btn-md" aria-label="Learn more about our perfume collection">Learn More</ButtonLink>
                        </div>

                        <div className="flex gap-8 pt-4 justify-center md:justify-start" role="region" aria-label="Company statistics">
                            {numbers.map((item) => (
                                <div key={item.value} className="text-center">
                                    <p className="text-xl md:text-3xl font-bold text-gray-800">{item.value}</p>
                                    <p className="text-gray-600 text-xs sm:text-sm md:text-base">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <figure className="relative w-full h-[300px] md:h-[500px] hidden md:block">
                        <Image
                            src="/imgs/hero.webp"
                            alt="Luxury Perfume Collection - Premium Fragrances"
                            fill
                            className="object-contain rounded-2xl"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </figure>
                </div>
            </div>
        </section>
    )
}

export default Hero