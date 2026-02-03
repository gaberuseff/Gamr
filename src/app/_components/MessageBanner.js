'use client';

import Link from "next/link";

function MessageBanner() {
    const isBannerVisible = true;

    const message = "✨ Special Offer: Free shipping on orders over EGP 999";


    if (!isBannerVisible) {
        return null;
    }

    return (
        <Link href="/shop">
            <div className="relative w-full overflow-hidden bg-gray-900 text-white">
                <div className="py-2">
                    <div className="marquee flex w-max items-center gap-10">
                        {
                            Array(5).fill(message).map((msg, index) => (
                                <span key={index} className="whitespace-nowrap text-sm md:text-base">
                                    {msg}
                                </span>
                            ))
                        }
                    </div>
                </div>

                <style jsx>{`
                .marquee {
                    animation: marquee 12s linear infinite;
                }

                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
            </div>
        </Link>
    )
}

export default MessageBanner
