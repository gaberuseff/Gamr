"use client"
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '../_utils/helpers';
import ButtonLink from './ButtonLink';

function Item({ item }) {
    const firstSize = item?.sizes?.[0] || {};
    const discountedPrice = item.discount > 0
        ? (firstSize.price * (1 - item.discount / 100)).toFixed(2)
        : firstSize.price || null;

    return (
        <Link href={`/shop/${item.id}`} className="group bg-white rounded-lg overflow-hidden 
            border border-gray-200 hover:shadow-[0_4px_15px_rgba(0,0,0,0.06)] transition-shadow duration-300 
            flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-[5/6] bg-gradient-to-br 
                from-gray-50 to-gray-100 overflow-hidden">
                {/* Discount Badge */}
                {item.discount > 0 && (
                    <div className="absolute top-2 right-2 z-10 
                        bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg">
                        -{item.discount}%
                    </div>
                )}

                {/* Stock Status */}
                {!item.in_stock && (
                    <div className="absolute top-2 left-2 z-10 bg-gray-800 
                        text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-lg">
                        Out of Stock
                    </div>
                )}

                {/* image */}
                <div className="relative w-full h-full flex items-center justify-center p-1.5 sm:p-2">
                    <div className="relative w-full h-full">
                        <Image
                            src={item?.images?.[0] || '/imgs/placeholder.png'}
                            alt={item.name_en}
                            fill
                            className={`object-contain group-hover:scale-110 transition-transform duration-500 
                            ${!item.in_stock ? 'opacity-50' : 'opacity-100'}`}
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-2 sm:p-2.5 space-y-2.5 sm:space-y-3">
                {/* Product Name */}
                <div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 min-h-[1.75rem]">
                        {item.name_en}
                    </h3>
                </div>

                {/* Price & Add to Cart */}
                <div className="flex flex-col justify-between pt-2 border-t border-gray-100">
                    <div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm sm:text-base font-bold text-gray-900">
                                {formatCurrency(discountedPrice)}
                            </span>
                        </div>
                    </div>

                    <div className="mt-3 w-full">
                        <ButtonLink href={`/shop/${item.id}`} className='btn btn-primary btn-sm w-full text-xs' >
                            View Details
                        </ButtonLink>
                    </div>
                </div>
            </div>
        </Link >
    )
}

export default Item
