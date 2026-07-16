"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function SuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-[700px] mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl md:text-4xl mb-4">Order confirmed</h1>
      <p className="text-steel mb-8">
        Thanks for your order. You&rsquo;ll get a confirmation email shortly. Custom builds ship
        in 5–7 business days after we confirm your artwork.
      </p>
      <Link href="/" className="text-blue underline">
        Back to the shop
      </Link>
    </div>
  );
}
