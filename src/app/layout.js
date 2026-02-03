import { Cinzel, Lato } from "next/font/google";
import { CartPriceSync } from "./_components/CartPriceSync";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import MessageBanner from "./_components/MessageBanner";
import Providers from "./_providers/Providers";
import './_styles/globals.css'

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});
export const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Premium Perfumes & Luxury Fragrances | Exclusive Collection",
  description: "Discover luxury fragrances crafted with the finest ingredients. Explore 500+ premium perfumes from world's finest brands. Shop exclusive collections today.",
  keywords: "luxury perfumes, premium fragrances, designer perfumes, fragrance collection",
  openGraph: {
    title: "Premium Perfumes & Luxury Fragrances | Exclusive Collection",
    description: "Discover luxury fragrances crafted with the finest ingredients. Shop exclusive collections today.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Perfumes & Luxury Fragrances",
    description: "Discover luxury fragrances from the world's finest brands.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Premium Perfumes",
              "url": "https://example.com",
              "logo": "https://example.com/logo.png",
              "description": "Luxury fragrances and premium perfumes",
              "sameAs": [
                "https://www.facebook.com/",
                "https://www.instagram.com/",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${cinzel.className} antialiased min-h-screen`}
      >
        <Providers>
          <CartPriceSync />
          <MessageBanner />
          <Header />
          <main className="min-h-[50vh]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
