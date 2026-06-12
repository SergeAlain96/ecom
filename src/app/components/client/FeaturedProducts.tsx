import { motion } from "motion/react";
import { products } from "../../data/mockData";
import { ProductCard } from "./ProductCard";

export function FeaturedProducts() {
  const featuredProducts = products.filter(p => p.isFeatured);

  return (
    <section id="featured" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-[#FF5722]/10 text-[#FF5722] px-4 py-2 rounded-full text-sm font-medium mb-4">
            ⭐ Sélection du moment
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#303841] mb-4">
            Produits Vedettes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nos meilleures ventes et coups de cœur sélectionnés pour vous
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} featured />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
