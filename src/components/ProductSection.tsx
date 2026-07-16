"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

const ACCENT_CLASSES: Record<Product["accent"], { text: string; border: string }> = {
  flame: { text: "text-flame", border: "border-flame" },
  blue: { text: "text-blue", border: "border-blue" },
  violet: { text: "text-violet", border: "border-violet" },
};

export default function ProductSection({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0].id);
  const accent = ACCENT_CLASSES[product.accent];

  return (
    <section id={product.slug} className="py-20 border-b border-line">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="flex items-center gap-3.5 mb-2">
          <span className={`mono text-[13px] ${accent.text}`}>{String(index).padStart(2, "0")}</span>
          <span className="flex-1 h-px bg-line" />
        </div>

        <div className="grid md:grid-cols-[0.95fr_1.05fr] gap-14 items-start">
          <div className="bg-panel border border-line rounded-sm p-6 relative">
            <div className="flex justify-between flex-wrap gap-1.5 mb-3.5 mono text-[11px] text-steel">
              <span>FIG. {String(index).padStart(2, "0")} — {product.name.toUpperCase()}</span>
              <span>{product.tagline.toUpperCase()}</span>
            </div>

            <div className="relative w-full aspect-[4/3] border border-line rounded-sm overflow-hidden">
              <Image src={activeImage} alt={product.name} fill className="object-cover" />
            </div>

            {product.thumbs && (
              <div className="flex gap-2 mt-2.5">
                {product.thumbs.map((thumb) => (
                  <button
                    key={thumb.src}
                    onClick={() => setActiveImage(thumb.src)}
                    className={`relative w-16 h-16 rounded-sm overflow-hidden border-2 cursor-pointer transition-opacity ${
                      activeImage === thumb.src ? `opacity-100 ${accent.border}` : "opacity-70 border-line"
                    }`}
                  >
                    <Image src={thumb.src} alt={thumb.alt} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4.5 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="mono text-[12.5px] flex justify-between gap-2.5 border-b border-dashed border-line pb-2 text-steel"
                >
                  <span>{spec.label}</span>
                  <b className="text-paper font-medium text-right">{spec.value}</b>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className={`inline-block mono text-[11px] uppercase tracking-wide ${accent.text} border ${accent.border} rounded-full px-3 py-1 mb-3.5`}>
              {product.badge}
            </span>
            <h2 className="text-[28px] md:text-[42px] mb-1.5">{product.name}</h2>
            <p className="text-paper/85 leading-relaxed text-base max-w-[54ch] mt-2">{product.description}</p>

            <div className="mt-6 flex flex-col gap-3">
              {product.variants.map((variant) => (
                <label
                  key={variant.id}
                  className={`flex justify-between items-center gap-3 bg-panel-2 border rounded-sm px-5 py-4 cursor-pointer transition-colors ${
                    selectedVariant === variant.id ? accent.border : "border-line"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={`${product.id}-variant`}
                      checked={selectedVariant === variant.id}
                      onChange={() => setSelectedVariant(variant.id)}
                      className="accent-flame"
                    />
                    <span className="text-sm">
                      {variant.label}
                      {variant.sublabel && <small className="block text-steel text-xs mt-0.5">{variant.sublabel}</small>}
                    </span>
                  </span>
                  <span className={`mono text-lg font-semibold whitespace-nowrap ${accent.text}`}>
                    ${variant.price.toFixed(2)}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex gap-3 mt-6 flex-wrap">
              <button
                onClick={() => addItem(product.id, selectedVariant)}
                className="font-mono text-[13px] uppercase tracking-wide px-6 py-3.5 rounded-sm bg-gradient-to-r from-flame to-violet text-ink-black font-bold cursor-pointer"
              >
                Add to Cart
              </button>
            </div>

            {product.isWheel && (
              <div className="mt-14">
                <div className="font-mono text-xs uppercase tracking-wide text-steel mb-3">See it spin</div>
                <iframe
                  className="w-full aspect-video border border-line rounded-sm"
                  src="https://www.youtube.com/embed/TG0FLR5pm7M"
                  title="INKd 360 demo video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
