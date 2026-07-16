"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart, type CartItem } from "@/lib/cart-context";
import WheelCustomizer from "@/components/WheelCustomizer";

export default function CheckoutPage() {
  const { items, subtotal, removeItem, updateQty, setCustomPreview } = useCart();
  const [customizerFor, setCustomizerFor] = useState<CartItem | null>(null);
  const [promptedWheels, setPromptedWheels] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pop the wheel customizer automatically for any wheel line item that hasn't been offered yet.
  useEffect(() => {
    const nextWheel = items.find(
      (i) => i.isWheel && !i.customPreview && !promptedWheels.has(i.key)
    );
    if (nextWheel && !customizerFor) {
      setCustomizerFor(nextWheel);
    }
  }, [items, promptedWheels, customizerFor]);

  const closeCustomizer = () => {
    if (customizerFor) {
      setPromptedWheels((prev) => new Set(prev).add(customizerFor.key));
    }
    setCustomizerFor(null);
  };

  const handlePay = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-[700px] mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl mb-4">Your cart is empty</h1>
        <Link href="/#wheel" className="text-blue underline">
          Go shop the INKd 360
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[820px] mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl mb-8">Checkout</h1>

      <ul className="flex flex-col gap-5 mb-8">
        {items.map((item) => (
          <li key={item.key} className="flex gap-4 border border-line rounded-sm p-4 bg-panel">
            <div className="relative w-24 h-24 shrink-0 rounded-sm overflow-hidden border border-line">
              {item.customPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.customPreview} alt={`${item.name} custom preview`} className="w-full h-full object-cover" />
              ) : (
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base">{item.name}</p>
              <p className="text-steel text-xs mt-1">{item.variantLabel}</p>

              {item.isWheel && (
                <button
                  onClick={() => setCustomizerFor(item)}
                  className="mt-2 font-mono text-xs uppercase tracking-wide text-blue underline cursor-pointer"
                >
                  {item.customPreview ? "Edit custom graphic" : "Add custom graphic preview"}
                </button>
              )}

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center border border-line rounded-sm">
                  <button
                    onClick={() => updateQty(item.key, item.qty - 1)}
                    className="px-2.5 py-1 text-steel hover:text-paper cursor-pointer"
                  >
                    −
                  </button>
                  <span className="px-2 text-sm mono">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.key, item.qty + 1)}
                    className="px-2.5 py-1 text-steel hover:text-paper cursor-pointer"
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
            <div className="mono text-flame whitespace-nowrap">${(item.price * item.qty).toFixed(2)}</div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mono text-xl mb-6 border-t border-line pt-5">
        <span>Total</span>
        <span className="text-flame">${subtotal.toFixed(2)}</span>
      </div>

      {error && <p className="text-flame text-sm mb-4">{error}</p>}

      <button
        onClick={handlePay}
        disabled={submitting}
        className="w-full font-mono text-[13px] uppercase tracking-wide px-6 py-4 rounded-sm bg-gradient-to-r from-flame to-violet text-ink-black font-bold cursor-pointer disabled:opacity-50"
      >
        {submitting ? "Redirecting to secure payment…" : "Pay now — one payment for entire cart"}
      </button>
      <p className="text-steel text-xs mt-3 text-center">
        Custom orders and custom ink wheels: questions before you order? Email{" "}
        <a href="mailto:VTSmade@gmail.com" className="text-blue underline">
          VTSmade@gmail.com
        </a>
      </p>

      <WheelCustomizer
        open={customizerFor !== null}
        onClose={closeCustomizer}
        onSave={(dataUrl) => {
          if (customizerFor) setCustomPreview(customizerFor.key, dataUrl);
        }}
        initialPreview={customizerFor?.customPreview}
      />
    </div>
  );
}
