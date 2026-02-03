"use client"

import Link from "next/link";

function ButtonLink({ children, className, href, ...props }) {
    return (
        <Link
            href={href}
            {...props}
            className={className}
        >
            {children}
        </Link>
    );
}

export default ButtonLink;
