import { motion } from "motion/react";
import { Shirt, Sparkles, Laptop, Home, Watch, Package } from "lucide-react";
import { categories } from "../../data/mockData";
import { Card } from "../ui/card";

const iconMap: Record<string, any> = {
  Shirt,
  Sparkles,
  Laptop,
  Home,
  Watch,
  Package,
};

export function CategoriesSection() {
  return (
    <section id="categories" className="py-16 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#303841] mb-4">
            Explorez nos catégories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre large gamme de produits organisés par catégorie
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon];
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-[#FF5722] rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF5722] to-[#FF8A50] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#303841] group-hover:text-[#FF5722] transition-colors">
                    {category.name}
                  </h3>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
