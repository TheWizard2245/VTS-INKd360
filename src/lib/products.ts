export type ProductVariant = {
  id: string;
  label: string;
  sublabel?: string;
  price: number; // in dollars
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  thumbs?: { src: string; alt: string }[];
  badge: string;
  accent: "flame" | "blue" | "violet";
  specs: { label: string; value: string }[];
  variants: ProductVariant[];
  isWheel?: boolean;
};

export const products: Product[] = [
  {
    id: "inkd360",
    slug: "wheel",
    name: "Motorized Rotary Ink & Paint Display Wheel",
    tagline: "The Original Ink Wheel",
    description:
      "Wall-mount it and stop digging through drawers for ink. The INKd 360 spins your entire tray of tattoo ink or paint bottles slowly and continuously, keeping pigment mixed and fresh while it's on display — no more shaking bottles mid-session or scraping settled pigment off the bottom. Every wheel ships with a Bluetooth remote and a wireless wall switch, and holds 48 bottles of any brand, any size from 1oz to 8oz.",
    image: "/images/wheel-main.jpg",
    badge: "The Original Ink Wheel",
    accent: "blue",
    isWheel: true,
    specs: [
      { label: "Bottle capacity", value: "48 (72 available)" },
      { label: "Fits bottles", value: "1, 2, 4, 6, 8 oz" },
      { label: "Dimensions", value: "21.75″ dia. × 5.25″ deep" },
      { label: "Lighting", value: "Programmable LED, app/remote" },
      { label: "Controls", value: "Bluetooth remote + wireless wall switch" },
      { label: "Mounting", value: "Wall-mount, all hardware included" },
      { label: "Warranty", value: "1 year" },
      { label: "Desktop stand", value: "Sold separately" },
    ],
    variants: [
      {
        id: "standard",
        label: "Standard color spectrum graphics",
        sublabel: "Stock rainbow wheel finish",
        price: 549.99,
      },
      {
        id: "custom",
        label: "Custom graphics + custom clip colors",
        sublabel: "Your design, your studio's colors",
        price: 599.99,
      },
    ],
  },
  {
    id: "chalk",
    slug: "chalk",
    name: "Chalk Holder",
    tagline: "Pool Room Accessory",
    description:
      "A two-piece magnetic system built for mid-game speed. One magnet rides in your pocket. The other holds your chalk and clips to the outside of your pants — right through the fabric — so it's always within reach. Grab it, chalk your cue, and snap it straight back onto your pants. No fumbling, no setting your chalk down on the rail. Buy it empty and load your own cube, or grab it pre-loaded with premium TAOM chalk so it's ready to go the moment it shows up.",
    image: "/images/chalk-joe-napoli.jpg",
    thumbs: [
      { src: "/images/chalk-joe-napoli.jpg", alt: "Joe Napoli chalk holder cap" },
      { src: "/images/chalk-yinyang-marino.jpg", alt: "Yin-yang and Dan Marino chalk holder caps" },
    ],
    badge: "Pool Room Accessory",
    accent: "violet",
    specs: [
      { label: "Comes empty", value: "$29.99" },
      { label: "Loaded w/ TAOM chalk", value: "$49.99" },
      { label: "Built for", value: "Chalking a pool cue mid-game" },
      { label: "Made by", value: "VTS, Milford MA" },
    ],
    variants: [
      { id: "empty", label: "Empty holder", price: 29.99 },
      { id: "loaded", label: "Loaded with TAOM chalk", price: 49.99 },
    ],
  },
  {
    id: "ouchie",
    slug: "ouchie",
    name: "Lil’ Ouchie Pain Stimulator",
    tagline: "New",
    description:
      "A keychain that doubles as your tattoo aftercare kit, so you're never caught without it. Clip it to your keys, your kit bag, or hand it straight to a client walking out the door fresh off the table.",
    image: "/images/ouchie-main.jpg",
    badge: "New",
    accent: "flame",
    specs: [
      { label: "Format", value: "Keychain" },
      { label: "Contains", value: "Tattoo aftercare, built in" },
      { label: "Price", value: "$14.99" },
    ],
    variants: [{ id: "standard", label: "Lil’ Ouchie keychain", price: 14.99 }],
  },
  {
    id: "clips",
    slug: "clips",
    name: "Quick Clip System",
    tagline: "Built by VTS",
    description:
      "Years of trial and error went into getting these right. The clip securely holds everything from ½ oz bottles up to 8 oz tattoo ink bottles — and beyond. Color-code sets for specific palettes so you never lose track mid-session, or use them to hang your machines while they charge. Simple. Clean. Efficient.",
    image: "/images/clips-gold-orange.jpg",
    thumbs: [
      { src: "/images/clips-gold-orange.jpg", alt: "Quick clips, gold and orange finish" },
      { src: "/images/clips-assorted.jpg", alt: "Quick clips, assorted colors" },
    ],
    badge: "Built by VTS",
    accent: "violet",
    specs: [
      { label: "Bottle range", value: "½ oz – 8 oz+" },
      { label: "Also holds", value: "Tattoo machines while charging" },
      { label: "Single clip", value: "$20" },
      { label: "Bundle", value: "Buy 2, get 1 free" },
    ],
    variants: [
      { id: "single", label: "1 clip", price: 20 },
      { id: "bundle", label: "3-clip bundle (buy 2, get 1 free)", sublabel: "3 for $40", price: 40 },
    ],
  },
];

export function findProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function findVariant(productId: string, variantId: string) {
  const product = findProduct(productId);
  return product?.variants.find((v) => v.id === variantId);
}
