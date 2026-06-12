import { motion } from 'motion/react';
import { Link } from 'react-router';
import * as Icons from 'lucide-react';

interface CategoryCardProps {
  readonly category: {
    readonly id: string;
    readonly name: string;
    readonly icon: string;
    readonly slug: string;
  };
  readonly index: number;
}

const categoryStyles: Record<string, { gradient: string; iconBg: string; textColor: string; glow: string }> = {
  mode: {
    gradient: 'from-rose-50 to-pink-50',
    iconBg: 'from-rose-400 to-pink-500',
    textColor: 'group-hover:text-rose-500',
    glow: 'shadow-rose-100',
  },
  beaute: {
    gradient: 'from-violet-50 to-purple-50',
    iconBg: 'from-violet-400 to-purple-500',
    textColor: 'group-hover:text-violet-500',
    glow: 'shadow-violet-100',
  },
  electronique: {
    gradient: 'from-blue-50 to-cyan-50',
    iconBg: 'from-blue-400 to-cyan-500',
    textColor: 'group-hover:text-blue-500',
    glow: 'shadow-blue-100',
  },
  maison: {
    gradient: 'from-emerald-50 to-green-50',
    iconBg: 'from-emerald-400 to-green-500',
    textColor: 'group-hover:text-emerald-500',
    glow: 'shadow-emerald-100',
  },
  accessoires: {
    gradient: 'from-amber-50 to-orange-50',
    iconBg: 'from-amber-400 to-orange-400',
    textColor: 'group-hover:text-amber-500',
    glow: 'shadow-amber-100',
  },
  divers: {
    gradient: 'from-slate-50 to-gray-100',
    iconBg: 'from-slate-400 to-gray-500',
    textColor: 'group-hover:text-slate-500',
    glow: 'shadow-slate-100',
  },
};

const defaultStyle = {
  gradient: 'from-orange-50 to-amber-50',
  iconBg: 'from-primary to-orange-600',
  textColor: 'group-hover:text-primary',
  glow: 'shadow-orange-100',
};

export function CategoryCard({ category, index }: CategoryCardProps) {
  const Icon = (Icons as any)[category.icon] || Icons.Package;
  const style = categoryStyles[category.slug] || defaultStyle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/products?category=${category.slug}`}>
        <div className={`group relative overflow-hidden rounded-2xl border-2 border-transparent hover:border-gray-200 bg-gradient-to-br ${style.gradient} p-5 text-center cursor-pointer hover:shadow-lg ${style.glow} transition-all duration-300`}>
          {/* Icon circle */}
          <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${style.iconBg} shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
            <Icon className="h-7 w-7 text-white" />
          </div>

          {/* Label */}
          <h3 className={`font-['Poppins'] font-semibold text-sm text-[#303841] ${style.textColor} transition-colors duration-200`}>
            {category.name}
          </h3>

          {/* Decorative corner blob */}
          <div className="absolute -bottom-3 -right-3 h-10 w-10 rounded-full bg-white/40 blur-sm" />
        </div>
      </Link>
    </motion.div>
  );
}
