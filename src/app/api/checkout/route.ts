import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { findProduct, findVariant } from "@/lib/products";

type IncomingItem = {
  productId: string;
  variantId: string;
  qty: number;
};

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY to your environment." },
      { status: 500 }
    );
  }

  const { items } = (await req.json()) as { items: IncomingItem[] };
  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const stripe = new Stripe(secretKey);

  // Re-derive price and name server-side from the product catalog — never trust client-sent prices.
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of items) {
    const product = findProduct(item.productId);
    const variant = findVariant(item.productId, item.variantId);
    if (!product || !variant) {
      return NextResponse.json({ error: `Unknown product: ${item.productId}` }, { status: 400 });
    }
    const qty = Math.max(1, Math.floor(item.qty));
    line_items.push({
      quantity: qty,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(variant.price * 100),
        product_data: {
          name: `${product.name} — ${variant.sublabel ?? variant.label}`,
        },
      },
    });
  }

  const origin = req.headers.get("origin") ?? new URL(req.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
  });

  return NextResponse.json({ url: session.url });
}
