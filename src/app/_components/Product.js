import Image from "next/image";
import ProductSizeSelector from "./ProductSizeSelector";

function Product({ product }) {

    const images = product?.images?.length ? product.images : ["/imgs/placeholder.png"]
    const primaryImage = images[0]
    const sizes = product?.sizes || []
    const firstSize = sizes[0] || {}
    const discount = Number(product?.discount ?? 0)
    const inStock = product?.in_stock !== false
    const name = product?.name_en || product?.name || "Product"
    const description = product?.description_en || product?.description || ""

    return (
        <article className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10">
                <section aria-labelledby="product-images">
                    <div className="relative w-full h-[340px] md:h-[420px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
                        <Image
                            src={primaryImage}
                            alt={name}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain"
                        />
                        {discount > 0 && (
                            <span className="absolute top-4 right-4 bg-red-500 text-white 
                                px-3 py-1 rounded-full text-sm font-semibold shadow">
                                -{discount}%
                            </span>
                        )}
                        {!inStock && (
                            <span className="absolute top-4 left-4 bg-gray-800 text-white 
                                px-3 py-1 rounded-full text-sm font-semibold shadow">
                                Out of Stock
                            </span>
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className="mt-4 flex gap-3 overflow-x-auto" id="product-images">
                            {images.map((img, index) => (
                                <div key={`${img}-${index}`} className="relative w-20 h-20 rounded-xl 
                                    border border-gray-200 bg-white overflow-hidden">
                                    <Image
                                        src={img}
                                        alt={`${name} thumbnail ${index + 1}`}
                                        fill
                                        sizes="80px"
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section aria-labelledby="product-title" className="flex flex-col gap-6">
                    <header className="space-y-3">
                        <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                            Premium Perfume
                        </p>
                        <h1 id="product-title" className="text-3xl md:text-4xl font-bold text-gray-900">
                            {name}
                        </h1>
                        {description && (
                            <p className="text-gray-600 leading-relaxed">
                                {description}
                            </p>
                        )}
                    </header>

                    <ProductSizeSelector product={product}
                        sizes={sizes} discount={discount} />
                </section>
            </div >
        </article >
    )
}

export default Product
