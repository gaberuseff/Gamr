import Image from "next/image"
import Link from "next/link"

function Logo() {
    return (
        <Link href="/" className="relative w-10 sm:w-12 h-10 sm:h-12 block">
            <Image src="/logo.png" alt="Logo" fill />
        </Link>
    )
}

export default Logo
