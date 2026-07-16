"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { findProduct, findVariant } from "./products";

export type CartItem = {
  key: string; // productId:variantId
  productId: string;
  variantId: string;
  name: string;
  variantLabel: string;
  price: number;
  image: string;
  qty: number;
  isWheel?: boolean;
  customPreview?: string; // data URL of the customer's uploaded wheel graphic preview
};

type CartContextValue = {
  items: CartItem[];
  addItem: (productId: string, variantId: string, qty?: number) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  setCustomPreview: (key: string, preview: string | undefined) => void;
  clear: () => void;
  subtotal: number;
  count: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "inkd360-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((productId: string, variantId: string, qty = 1) => {
    const product = findProduct(productId);
    const variant = findVariant(productId, variantId);
    if (!product || !variant) return;
    const key = `${productId}:${variantId}`;

    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          key,
          productId,
          variantId,
          name: product.name,
          variantLabel: variant.sublabel ?? variant.label,
          price: variant.price,
          image: product.image,
          qty,
          isWheel: product.isWheel,
        },
      ];
    });
    setDrawerOpen(true);
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const setCustomPreview = useCallback((key: string, preview: string | undefined) => {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, customPreview: preview } : i)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQty,
    setCustomPreview,
    clear,
    subtotal,
    count,
    isDrawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
