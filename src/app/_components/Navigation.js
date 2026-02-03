import Link from "next/link"
import { navLinks } from "../_utils/static"

const links = navLinks

function Navigation() {
    return (
        <>
            <nav className="md:flex items-center gap-4 hidden">
                {
                    links.map((link) => (
                        <Link key={link.href} href={link.href}
                            className="mx-4 text-text text-xl hover:underline underline-offset-4 un">
                            {link.label}
                        </Link>
                    ))
                }

            </nav>
        </>
    )
}

export default Navigation
