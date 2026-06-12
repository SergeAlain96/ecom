import { CategoryCard } from '../../components/client/CategoryCard';
import { categories } from '../../data/mockData';

export function Categories() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-['Poppins'] text-3xl md:text-4xl font-bold text-[#303841] mb-3">
            Toutes nos Catégories
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explorez nos différentes catégories pour trouver exactement ce que vous cherchez
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
