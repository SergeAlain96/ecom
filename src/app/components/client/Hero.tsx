import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag, Star, TrendingUp, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router';

const floatingCards = [
  { name: 'Robe africaine', price: '35 000 FCFA', badge: '-20%', color: 'from-orange-400 to-pink-500', emoji: '👗' },
  { name: 'Montre Sport', price: '45 000 FCFA', badge: '⭐ 4.8', color: 'from-blue-400 to-cyan-500', emoji: '⌚' },
  { name: 'Écouteurs BT', price: '25 000 FCFA', badge: 'Nouveau', color: 'from-violet-400 to-purple-500', emoji: '🎧' },
];

const stats = [
  { value: '500+', label: 'Produits', icon: ShoppingBag },
  { value: '2k+', label: 'Clients', icon: Star },
  { value: '98%', label: 'Satisfaits', icon: TrendingUp },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#303841] via-[#3d4a56] to-[#303841] min-h-[92vh] flex items-center">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#76ABAE]/20 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left — text content */}
          <div className="text-center lg:text-left">
            {/* Announcement chip */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/30 px-4 py-1.5 mb-6"
            >
              <Zap className="h-3.5 w-3.5 text-primary fill-primary" />
              <span className="text-primary text-sm font-medium">Commandez via WhatsApp — Livraison rapide</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-['Poppins'] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Vos produits préférés{' '}
                <span className="relative">
                  <span className="text-primary">à portée</span>
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none">
                    <path d="M2 6C50 2 100 1 150 3C200 5 250 4 298 2" stroke="#FF5722" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>{' '}
                de main
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg text-white/75 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Commandez rapidement et échangez directement avec le vendeur via WhatsApp. Sans inscription, sans complication.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10"
            >
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
              >
                <Link to="/products" className="flex items-center gap-2">
                  Découvrir les produits
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 px-8 py-6 text-base font-semibold transition-all"
              >
                <a
                  href="https://wa.me/22667384509"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.117 1.524 5.847L.057 23.49a.5.5 0 00.614.614l5.644-1.467A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-4.987-1.357l-.357-.213-3.354.872.895-3.253-.232-.377A9.818 9.818 0 112 12 9.83 9.83 0 0112 21.818z" />
                  </svg>
                  Contacter le vendeur
                </a>
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-6 justify-center lg:justify-start"
            >
              {stats.map(({ value, label, icon: Icon }, i) => (
                <div key={label} className="flex items-center gap-2">
                  {i > 0 && <div className="h-8 w-px bg-white/20" />}
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="font-['Poppins'] text-xl font-bold text-white">{value}</span>
                    <span className="text-xs text-white/50">{label}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — floating product cards */}
          <div className="relative hidden lg:flex items-center justify-center h-[500px]">
            {/* Central glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            </div>

            {/* Main featured card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 100 }}
              className="absolute z-20"
            >
              <div className="w-52 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl">
                <div className="h-28 rounded-xl bg-gradient-to-br from-primary/40 to-orange-600/40 flex items-center justify-center mb-3 text-5xl">
                  🛍️
                </div>
                <p className="font-['Poppins'] font-semibold text-white text-sm mb-0.5">Collection Africaine</p>
                <p className="text-white/60 text-xs">Nouvelle saison 2025</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-primary font-bold text-sm">Dès 12 000 F</span>
                  <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full font-medium">Vedette</span>
                </div>
              </div>
            </motion.div>

            {/* Top-right card */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute top-8 right-4 z-10"
            >
              <div className="w-40 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-xl">🎧</div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-tight">Écouteurs BT</p>
                    <p className="text-primary text-xs font-bold">25 000 FCFA</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                </div>
              </div>
            </motion.div>

            {/* Bottom-left card */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="absolute bottom-16 left-4 z-10"
            >
              <div className="w-44 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-xl">⌚</div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-tight">Montre Sport</p>
                    <p className="text-primary text-xs font-bold">45 000 FCFA</p>
                  </div>
                </div>
                <span className="inline-block text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                  En stock
                </span>
              </div>
            </motion.div>

            {/* Bottom-right order notification */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8, type: 'spring' }}
              className="absolute bottom-8 right-2 z-30"
            >
              <div className="w-48 bg-white rounded-xl p-3 shadow-2xl border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-6 w-6 rounded-full bg-[#25D366] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-[#303841]">Nouvelle commande !</span>
                </div>
                <p className="text-xs text-gray-500">Aminata vient de commander via WhatsApp</p>
                <p className="text-xs text-gray-400 mt-0.5">Il y a 2 min</p>
              </div>
            </motion.div>

            {/* Promo badge floating */}
            <motion.div
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -6, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="absolute top-16 left-10 z-10"
            >
              <div className="bg-primary text-white font-bold text-sm px-3 py-1.5 rounded-xl shadow-lg shadow-primary/40 rotate-[-6deg]">
                -25% 🎉
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 34.7C840 32 960 32 1080 37.3C1200 43 1320 53 1380 58.7L1440 64V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
