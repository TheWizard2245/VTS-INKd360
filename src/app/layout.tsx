import type { Metadata } from "next";
import { Big_Shoulders, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import SiteHeader from "@/components/SiteHeader";
import CartDrawer from "@/components/CartDrawer";

const display = Big_Shoulders({
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VTS — Vachon Technical Systems | Creators of the INKd 360",
  description:
    "VTS is the engineering shop behind the INKd 360, the motorized rotary tattoo ink display and mixer. Shop the ink wheel, chalk holders, quick clips, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${plexSans.variable} ${plexMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-ink-black text-paper font-sans antialiased">
        <CartProvider>
          <div className="bg-ribbon text-ink-black text-center font-display font-extrabold text-[18px] tracking-wide uppercase py-4 px-4 shadow-[0_4px_24px_rgba(255,107,53,0.35)] max-md:text-sm max-md:py-3">
            Creators of the famous INKd 360 <b className="font-black">&reg;</b> — Vachon Technical Systems, LLC
          </div>
          <SiteHeader />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
