import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';

const footerLinks = {
    shop: [
        { name: 'Men\'s Fragrances', href: '/shop/men' },
        { name: 'Women\'s Fragrances', href: '/shop/women' },
        { name: 'Unisex Collection', href: '/shop/unisex' },
        { name: 'New Arrivals', href: '/shop/new' },
        { name: 'Best Sellers', href: '/shop/bestsellers' }
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ],
    support: [
        { name: 'FAQs', href: '/faq' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
    ]
};

const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
];

async function Footer() {
    return (
        <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 lg:py-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <Logo />
                        <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                            Discover luxury fragrances from the world's most prestigious brands.
                            Elevate your style with our curated collection of premium perfumes.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4 pt-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-900 
                                        flex items-center justify-center transition-all duration-300 
                                        group hover:scale-110"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5 text-gray-600 group-hover:text-white" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-4">
                            Shop
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-gray-900 text-sm 
                                            transition-colors duration-200 hover:translate-x-1 
                                            inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-gray-900 text-sm 
                                            transition-colors duration-200 hover:translate-x-1 
                                            inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-4">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-gray-900 text-sm 
                                            transition-colors duration-200 hover:translate-x-1 
                                            inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 py-6 text-center">
                    <span className='sm:text-base text-xs'>&copy; {await getCurrentYear()} Luxuria Fragrances. All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}

async function getCurrentYear() {
    'use cache';
    return new Date().getFullYear();
}

export default Footer