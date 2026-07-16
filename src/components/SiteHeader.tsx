"use client";

import Link from "next/link";
import VtsBadge from "./VtsBadge";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "#wheel", label: "INKd 360 Wheel" },
  { href: "#chalk", label: "Chalk Holder" },
  { href: "#ouchie", label: "Lil' Ouchie" },
  { href: "#clips", label: "Quick Clips" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  const { count, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[rgba(11,12,14,0.92)] backdrop-blur-sm border-b border-line">
      <nav className="flex items-center justify-between gap-5 max-w-[1180px] mx-auto px-6 py-5 flex-wrap">
        <Link
          href="#top"
          className="flex items-center gap-4 font-display font-black text-[40px] leading-none tracking-wide no-underline text-paper max-md:text-[28px] max-md:gap-2.5"
          style={{ textShadow: "0 0 26px rgba(255,107,53,0.45)" }}
        >
          <VtsBadge size={68} />
          <span>
            VTS
            <span className="block mt-[3px] font-mono font-semibold text-xs tracking-[0.16em] text-steel uppercase">
              Vachon Technical Systems
            </span>
          </span>
        </Link>

        <div className="flex gap-6 text-[13px] flex-wrap max-md:gap-4 max-md:text-xs">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="no-underline text-steel hover:text-paper transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={openDrawer}
          className="relative font-mono text-xs uppercase tracking-wide border border-line rounded-sm px-4 py-2.5 text-paper bg-[rgba(20,15,34,0.4)] hover:border-blue transition-colors cursor-pointer"
        >
          Cart
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-flame text-ink-black text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
