import { Hero } from '../../components/client/Hero';
import { CategoryCard } from '../../components/client/CategoryCard';
import { ProductCard } from '../../components/client/ProductCard';
import { useCategories } from '../../../hooks/useCategories';
import { useProducts } from '../../../hooks/useProducts';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import { Link } from 'react-router';
import { ArrowRight, MessageCircle, Zap, Shield, Headphones, Package, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const orderSteps = [
  {
    icon: Package,
    title: 'Parcourez le catalogue',
    desc: "Explorez nos produits, filtrez par catégorie et trouvez ce qu'il vous faut.",
    color: 'from-orange-400 to-primary',
  },
  {
    icon: CheckCircle,
    title: 'Remplissez le formulaire',
    desc: 'Entrez votre nom, numéro WhatsApp, ville et quantité. Aucun compte requis.',
    color: 'from-blue-400 to-[#76ABAE]',
  },
  {
    icon: MessageCircle,
    title: 'Confirmez sur WhatsApp',
    desc: 'Vous êtes redirigé vers WhatsApp avec un message prérempli. Simple !',
    color: 'from-green-400 to-emerald-600',
  },
];

const trustItems = [
  { icon: Zap,        title: 'Livraison Rapide',      desc: "Recevez vos commandes rapidement partout au Burkina Faso et en Afrique de l'Ouest.", color: 'bg-amber-50 text-amber-600' },
  { icon: Shield,     title: 'Produits Authentiques',  desc: 'Tous nos produits sont vérifiés et garantis 100% authentiques.',             color: 'bg-blue-50 text-blue-600' },
  { icon: Headphones, title: 'Support WhatsApp',       desc: 'Notre équipe répond rapidement sur WhatsApp pour vous aider.',               color: 'bg-green-50 text-green-600' },
];

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.117 1.524 5.847L.057 23.49a.5.5 0 00.614.614l5.644-1.467A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-4.987-1.357l-.357-.213-3.354.872.895-3.253-.232-.377A9.818 9.818 0 112 12 9.83 9.83 0 0112 21.818z" />
  </svg>
);

export function Home() {
  const { categories, loading: catLoading } = useCategories();
  const { products, loading: prodLoading } = useProducts({ onlyActive: true, onlyFeatured: true });

  const toCardProduct = (p: typeof products[number]) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    description: p.description,
    images: p.images.length ? p.images : ['product image'],
    hasPromo: p.has_promo,
    promoText: p.promo_text ?? undefined,
    stock: p.stock,
  });

  return (
    <div className="min-h-screen">
      <Hero />

      <div className="bg-primary text-white text-center py-2.5 px-4">
        <p className="text-sm font-medium">
          🎉 Livraison offerte sur toute commande &gt; 50 000 FCFA — Commandez sans inscription via WhatsApp
        </p>
      </div>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-2">Parcourir</span>
          <h2 className="font-['Poppins'] text-3xl md:text-4xl font-bold text-[#303841] mb-3">Nos Catégories</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Parcourez nos différentes catégories de produits</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {catLoading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)
            : categories.map((cat, i) => <CategoryCard key={cat.id} category={cat} index={i} />)
          }
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gradient-to-b from-gray-50/80 to-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-2">Sélection</span>
              <h2 className="font-['Poppins'] text-3xl md:text-4xl font-bold text-[#303841]">Produits Vedettes</h2>
              <p className="text-muted-foreground mt-2">Notre sélection des produits les plus populaires</p>
            </div>
            <Button asChild variant="outline" className="rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white self-start md:self-auto">
              <Link to="/products" className="flex items-center gap-2">Voir tout <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prodLoading
              ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-2xl" />)
              : products.slice(0, 6).map((p, i) => <ProductCard key={p.id} product={toCardProduct(p)} index={i} />)
            }
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-2">Simple & Rapide</span>
          <h2 className="font-['Poppins'] text-3xl md:text-4xl font-bold text-[#303841] mb-3">Comment commander ?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">3 étapes simples pour recevoir votre commande</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary/30 via-[#76ABAE]/40 to-primary/30 z-0" />
          {orderSteps.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className="relative z-10 text-center">
              <div className="flex flex-col items-center">
                <div className={`relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg`}>
                  <Icon className="h-9 w-9 text-white" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#303841] text-white text-xs font-bold">{i + 1}</span>
                </div>
                <h3 className="font-['Poppins'] font-semibold text-xl text-[#303841] mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-[#303841] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="font-['Poppins'] text-3xl md:text-4xl font-bold text-white mb-3">Pourquoi Choisir Yiriwa ?</h2>
            <p className="text-white/60 max-w-xl mx-auto">Une expérience d'achat simple, rapide et sécurisée</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustItems.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full hover:bg-white/10 transition-all">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${color} mb-4`}><Icon className="h-6 w-6" /></div>
                  <h3 className="font-['Poppins'] font-semibold text-lg text-white mb-2">{title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#25D366] via-[#20BA5A] to-[#128C7E] p-8 md:p-12 text-center">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-white">{WA_ICON}</div>
            </div>
            <h2 className="font-['Poppins'] text-3xl md:text-4xl font-bold text-white mb-3">Une question ? Contactez-nous !</h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">Notre équipe répond rapidement sur WhatsApp.</p>
            <Button asChild size="lg" className="rounded-xl bg-white text-[#128C7E] hover:bg-white/90 font-bold px-8 py-6 text-base shadow-xl">
              <a href="https://wa.me/22667384509" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Discuter sur WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
