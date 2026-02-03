import Image from "next/image"
import ButtonLink from "./ButtonLink"

function CallToAction() {
    return (
        <section className="section-lg bg-background position-relative overflow-hidden" aria-labelledby="cta-heading">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left - Image */}
                    <figure className="flex justify-center">
                        <div className="relative w-full max-w-md">
                            <Image
                                src="/imgs/hero.webp"
                                alt="Limited Edition Perfume Collection - Luxury Fragrances"
                                width={400}
                                height={400}
                                className="w-full h-auto"
                                loading="lazy"
                            />
                        </div>
                    </figure>

                    {/* Right - Text and Button */}
                    <div className="flex flex-col justify-center">
                        <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-text mb-4">
                            Limited Edition Collection
                        </h2>
                        <p className="text-base md:text-lg text-text/80 mb-6 leading-relaxed">
                            This season's most exclusive fragrances are now available. Each bottle tells a story of sophistication and allure. Don't miss out on our curated selection before they're gone.
                        </p>
                        <div>
                            <ButtonLink href="/shop" className='btn btn-primary btn-md' aria-label="Shop Limited Edition Perfume Collection">
                                Shop Now
                            </ButtonLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CallToAction
