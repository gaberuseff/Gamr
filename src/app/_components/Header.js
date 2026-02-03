'use client';

import { usePathname } from "next/navigation";
import Logo from "./Logo"
import Navigation from "./Navigation"
import { useEffect, useState } from "react";
import MobileNavigation from "./MobileNavigation";
import CartOverView from "./CartOverView";

function Header() {
    const pathName = usePathname();
    const isHomePage = pathName === "/";
    const [hasScroll, setHasScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setHasScroll(true);
            } else {
                setHasScroll(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`py-4 px-4 lg:px-8 ${isHomePage ? "bg-background" : "bg-white shadow-xs"} 
            ${hasScroll && isHomePage ? "shadow-xs" : ""} sticky top-0 z-50 
        flex items-center justify-between transition-shadow duration-300`}>
            <Logo />
            <Navigation />

            <div className="flex items-center gap-6">
                <CartOverView />
                <MobileNavigation />
            </div>

        </header>
    )
}

export default Header
