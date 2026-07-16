"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQty, subtotal } = useCart();

  return (
    <>
      {isDrawerOpen && (
        <button
          aria-label="Close cart"
          onClick={closeDrawer}
          className="fixed inset-0 z-[90] bg-black/70 cursor-default"
        />
      )}
      <aside
        className={`fixed top-0 right-0 z-[95] h-full w-full max-w-md bg-panel border-l border-line flex flex-col transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h2 className="text-xl">Your Cart</h2>
          <button
            onClick={closeDrawer}
            aria-label="Close"
            className="text-steel hover:text-paper text-2xl leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-steel text-sm mt-8 text-center">Your cart is empty.</p>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 border-b border-line pb-5">
                  <div className="relative w-20 h-20 shrink-0 rounded-sm overflow-hidden border border-line">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] leading-tight">{item.name}</p>
                    <p className="text-steel text-xs mt-1">{item.variantLabel}</p>
                    {item.isWheel && (
                      <p className="text-blue text-xs mt-1 mono">
                        {item.customPreview ? "Custom graphic saved" : "Customize at checkout"}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-line rounded-sm">
                        <button
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          className="px-2.5 py-1 text-steel hover:text-paper cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-2 text-sm mono">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          className="px-2.5 py-1 text-steel hover:text-paper cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-steel hover:text-flame text-xs underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="mono text-sm text-flame whitespace-nowrap">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-line">
            <div className="flex justify-between mono text-lg mb-4">
              <span>Subtotal</span>
              <span className="text-flame">${subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="block text-center font-mono text-[13px] uppercase tracking-wide px-6 py-3.5 rounded-sm bg-gradient-to-r from-flame to-violet text-ink-black font-bold no-underline"
            >
              Checkout — one payment
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
