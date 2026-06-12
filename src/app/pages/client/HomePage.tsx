import { HeroSection } from "../../components/client/HeroSection";
import { CategoriesSection } from "../../components/client/CategoriesSection";
import { FeaturedProducts } from "../../components/client/FeaturedProducts";
import { ProductCatalog } from "../../components/client/ProductCatalog";

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <ProductCatalog />
    </div>
  );
}
