import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import MakerSection from "@/components/MakerSection";
import SiteFooter from "@/components/SiteFooter";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Hero />
      {products.map((product, i) => (
        <ProductSection key={product.id} product={product} index={i + 1} />
      ))}
      <MakerSection />
      <SiteFooter />
    </>
  );
}
