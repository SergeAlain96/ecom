// Mock data for the Yiriwa e-commerce platform

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  detailedDescription: string;
  categoryId: string;
  images: string[];
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  hasPromo: boolean;
  promoText?: string;
  characteristics?: string[];
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  productId: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  deliveryAddress?: string;
  comment?: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  city: string;
  totalOrders: number;
  createdAt: Date;
}

export interface ShopSettings {
  shopName: string;
  whatsappNumber: string;
  logo?: string;
  bannerImages: string[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export const categories: Category[] = [
  { id: '1', name: 'Mode', icon: 'Shirt', slug: 'mode' },
  { id: '2', name: 'Beauté', icon: 'Sparkles', slug: 'beaute' },
  { id: '3', name: 'Électronique', icon: 'Smartphone', slug: 'electronique' },
  { id: '4', name: 'Maison', icon: 'Home', slug: 'maison' },
  { id: '5', name: 'Accessoires', icon: 'Watch', slug: 'accessoires' },
  { id: '6', name: 'Divers', icon: 'Package', slug: 'divers' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Robe élégante africaine',
    price: 35000,
    description: 'Robe en tissu wax coloré, parfaite pour toutes occasions',
    detailedDescription: 'Cette magnifique robe africaine est confectionnée à partir de tissu wax de haute qualité. Elle combine élégance et confort, idéale pour les cérémonies, les sorties ou le quotidien. Coupe flatteuse qui met en valeur la silhouette.',
    categoryId: '1',
    images: ['african fashion dress'],
    stock: 15,
    isActive: true,
    isFeatured: true,
    hasPromo: true,
    promoText: '-20%',
    characteristics: ['100% Coton', 'Disponible en plusieurs tailles', 'Lavable en machine', 'Coupe ajustée'],
  },
  {
    id: '2',
    name: 'Crème hydratante naturelle',
    price: 12000,
    description: 'Soin visage au beurre de karité et huiles essentielles',
    detailedDescription: 'Crème hydratante enrichie au beurre de karité bio et aux huiles essentielles naturelles. Formule douce qui nourrit et protège votre peau en profondeur. Convient à tous types de peaux.',
    categoryId: '2',
    images: ['natural skincare cream'],
    stock: 30,
    isActive: true,
    isFeatured: true,
    hasPromo: false,
    characteristics: ['100% Naturel', 'Sans parabènes', 'Hydratation 24h', 'Testé dermatologiquement'],
  },
  {
    id: '3',
    name: 'Écouteurs Bluetooth Premium',
    price: 25000,
    description: 'Son haute qualité avec réduction de bruit active',
    detailedDescription: 'Écouteurs sans fil Bluetooth 5.0 avec réduction de bruit active. Autonomie de 24h avec étui de charge. Design ergonomique et confortable pour un usage prolongé. Compatible avec tous les appareils.',
    categoryId: '3',
    images: ['bluetooth wireless earbuds'],
    stock: 20,
    isActive: true,
    isFeatured: true,
    hasPromo: false,
    characteristics: ['Bluetooth 5.0', 'Autonomie 24h', 'Réduction de bruit', 'Résistant à l\'eau IPX7'],
  },
  {
    id: '4',
    name: 'Set de couteaux professionnel',
    price: 18000,
    description: 'Kit complet de 6 couteaux en acier inoxydable',
    detailedDescription: 'Set de couteaux professionnels en acier inoxydable de haute qualité. Comprend 6 pièces pour tous vos besoins en cuisine. Lames ultra-tranchantes et ergonomiques. Livré avec support en bois.',
    categoryId: '4',
    images: ['kitchen knife set professional'],
    stock: 12,
    isActive: true,
    isFeatured: false,
    hasPromo: true,
    promoText: '-15%',
    characteristics: ['Acier inoxydable', '6 pièces', 'Support en bois inclus', 'Garantie 2 ans'],
  },
  {
    id: '5',
    name: 'Montre intelligente Sport',
    price: 45000,
    description: 'Smartwatch avec suivi fitness et notifications',
    detailedDescription: 'Montre connectée avec écran tactile AMOLED. Suivi d\'activité complet, moniteur de fréquence cardiaque, GPS intégré. Notifications intelligentes pour appels et messages. Étanche jusqu\'à 50m.',
    categoryId: '5',
    images: ['smartwatch sport fitness'],
    stock: 8,
    isActive: true,
    isFeatured: true,
    hasPromo: false,
    characteristics: ['Écran AMOLED', 'GPS intégré', 'Étanche 50m', 'Autonomie 7 jours'],
  },
  {
    id: '6',
    name: 'Sac à dos urbain',
    price: 22000,
    description: 'Sac à dos élégant avec compartiment laptop',
    detailedDescription: 'Sac à dos moderne et fonctionnel avec compartiment rembourré pour ordinateur portable jusqu\'à 15,6". Multiple poches de rangement, design anti-vol avec fermetures cachées. Matière résistante à l\'eau.',
    categoryId: '5',
    images: ['urban laptop backpack'],
    stock: 18,
    isActive: true,
    isFeatured: false,
    hasPromo: false,
    characteristics: ['Compartiment laptop 15,6"', 'Anti-vol', 'Résistant à l\'eau', 'Port USB'],
  },
  {
    id: '7',
    name: 'Ensemble de maquillage',
    price: 28000,
    description: 'Kit complet avec palette et pinceaux professionnels',
    detailedDescription: 'Ensemble de maquillage professionnel incluant une palette de 24 couleurs, 12 pinceaux de qualité et accessoires. Couleurs pigmentées et longue tenue. Parfait pour débutantes et professionnelles.',
    categoryId: '2',
    images: ['makeup kit palette brushes'],
    stock: 15,
    isActive: true,
    isFeatured: false,
    hasPromo: true,
    promoText: '-25%',
    characteristics: ['Palette 24 couleurs', '12 pinceaux inclus', 'Longue tenue', 'Hypoallergénique'],
  },
  {
    id: '8',
    name: 'Chargeur solaire portable',
    price: 15000,
    description: 'Batterie externe 20000mAh avec panneau solaire',
    detailedDescription: 'Chargeur portable avec panneau solaire intégré. Capacité 20000mAh pour charger plusieurs fois vos appareils. 2 ports USB + 1 port USB-C. Lampe LED intégrée. Résistant aux chocs et à l\'eau.',
    categoryId: '3',
    images: ['solar power bank charger'],
    stock: 25,
    isActive: true,
    isFeatured: false,
    hasPromo: false,
    characteristics: ['20000mAh', 'Panneau solaire', 'Lampe LED', 'Étanche'],
  },
];

export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'YRW-2024-001',
    customerName: 'Aminata Traoré',
    customerPhone: '+223 70 00 00 01',
    customerCity: 'Ouagadougou',
    productId: '1',
    productName: 'Robe élégante africaine',
    quantity: 1,
    totalAmount: 35000,
    deliveryAddress: 'Quartier Hippodrome, Rue 215',
    status: 'confirmed',
    createdAt: new Date('2024-06-10'),
  },
  {
    id: '2',
    orderNumber: 'YRW-2024-002',
    customerName: 'Ibrahim Coulibaly',
    customerPhone: '+223 76 00 00 02',
    customerCity: 'Abidjan',
    productId: '3',
    productName: 'Écouteurs Bluetooth Premium',
    quantity: 2,
    totalAmount: 50000,
    status: 'preparing',
    createdAt: new Date('2024-06-11'),
  },
  {
    id: '3',
    orderNumber: 'YRW-2024-003',
    customerName: 'Fatou Diallo',
    customerPhone: '+221 77 00 00 03',
    customerCity: 'Dakar',
    productId: '2',
    productName: 'Crème hydratante naturelle',
    quantity: 3,
    totalAmount: 36000,
    comment: 'Livraison urgente SVP',
    status: 'pending',
    createdAt: new Date('2024-06-12'),
  },
];

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Aminata Traoré',
    phone: '+223 70 00 00 01',
    city: 'Ouagadougou',
    totalOrders: 5,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Ibrahim Coulibaly',
    phone: '+223 76 00 00 02',
    city: 'Abidjan',
    totalOrders: 3,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Fatou Diallo',
    phone: '+221 77 00 00 03',
    city: 'Dakar',
    totalOrders: 7,
    createdAt: new Date('2024-03-10'),
  },
];

export const shopSettings: ShopSettings = {
  shopName: 'Yiriwa',
  whatsappNumber: '+226 67 38 45 09',
  bannerImages: ['ecommerce banner shopping', 'online store products', 'fashion shopping mobile'],
  socialMedia: {
    facebook: 'https://facebook.com/yiriwa',
    instagram: 'https://instagram.com/yiriwa',
    twitter: 'https://twitter.com/yiriwa',
  },
};
