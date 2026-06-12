# Guide de Démarrage Rapide - Yiriwa

Bienvenue sur la plateforme e-commerce Yiriwa ! 🎉

## 🚀 Accès Rapide

### Site Client (Visiteurs)
- **Page d'accueil**: `/`
- **Catalogue produits**: `/products`
- **Détail produit**: `/products/:id`
- **Catégories**: `/categories`
- **Contact**: `/contact`

### Interface Admin
- **Dashboard**: `/admin`
- **Gestion produits**: `/admin/products`
- **Gestion catégories**: `/admin/categories`
- **Gestion commandes**: `/admin/orders`
- **Gestion clients**: `/admin/customers`
- **Paramètres**: `/admin/settings`

## 📱 Fonctionnalités Principales

### Pour les Visiteurs
1. **Navigation fluide** - Parcourez les produits par catégorie
2. **Recherche rapide** - Trouvez ce que vous cherchez instantanément
3. **Filtres avancés** - Filtrez par prix, catégorie, etc.
4. **Commande WhatsApp** - Commandez sans inscription via WhatsApp
5. **Responsive** - Fonctionne sur tous les appareils

### Pour l'Administrateur
1. **Dashboard complet** - Vue d'ensemble de votre activité
2. **Gestion produits** - CRUD complet avec gestion du stock
3. **Suivi commandes** - Changez les statuts en temps réel
4. **Base clients** - Historique automatique des clients
5. **Statistiques** - Graphiques et métriques de performance

## 🎨 Personnalisation

### Couleurs du thème
Les couleurs sont définies dans `/src/styles/theme.css`:
- `--yiriwa-orange: #FF5722` - Couleur principale
- `--yiriwa-blue-dark: #303841` - Couleur secondaire
- `--yiriwa-blue-gray: #76ABAE` - Accent

### Polices
- **Poppins** - Titres et éléments importants
- **Inter** - Texte courant

## 🔧 Configuration WhatsApp

Le numéro WhatsApp est actuellement configuré sur `+223 70 00 00 00`.

Pour le modifier:
1. Ouvrez `/src/data/mockData.ts`
2. Changez `whatsappNumber` dans `shopSettings`
3. Recherchez `wa.me/22370000000` dans le projet et remplacez par votre numéro

## 📊 Données de Démonstration

Les données actuelles sont stockées dans `/src/app/data/mockData.ts`:
- 8 produits d'exemple
- 6 catégories
- 3 commandes
- 3 clients

### Ajouter des Produits
Modifiez le tableau `products` dans `mockData.ts` ou utilisez l'interface admin.

### Ajouter des Catégories
Modifiez le tableau `categories` dans `mockData.ts` ou utilisez l'interface admin.

## 🎯 Workflow de Commande

1. **Client** parcourt les produits
2. **Client** clique sur "Commander"
3. **Formulaire** s'affiche (Nom, WhatsApp, Ville, etc.)
4. **Client** remplit et valide
5. **Système** enregistre la commande (actuellement simulé)
6. **Redirection** automatique vers WhatsApp avec message pré-rempli
7. **Vendeur** reçoit le message et peut traiter la commande

## 🔐 Sécurité & Production

### Pour passer en production:

1. **Authentification Admin**
   - Ajoutez un système d'authentification pour `/admin`
   - Protégez les routes admin

2. **Base de Données**
   - Connectez à Supabase ou autre backend
   - Remplacez les données mock par de vraies requêtes API

3. **Images Produits**
   - Uploadez de vraies images produits
   - Utilisez un service de stockage (Cloudinary, S3, etc.)

4. **WhatsApp Business API**
   - Intégrez l'API WhatsApp Business pour automatisation
   - Configurez les webhooks pour les notifications

5. **Analytics**
   - Ajoutez Google Analytics ou alternative
   - Suivez les conversions et le comportement utilisateur

## 🎨 Personnalisation Avancée

### Modifier le Logo
Le logo actuel est une simple lettre "Y". Pour le remplacer:
1. Ajoutez votre logo dans `/src/app/components/client/Header.tsx`
2. Remplacez également dans `/src/app/components/client/Footer.tsx`
3. Et dans `/src/app/components/admin/AdminSidebar.tsx`

### Ajouter des Pages
1. Créez le composant dans `/src/app/pages/client/`
2. Ajoutez la route dans `/src/app/routes.tsx`
3. Ajoutez le lien dans le Header si nécessaire

## 📞 Support

Pour toute question ou personnalisation:
- Email: contact@yiriwa.com
- WhatsApp: +223 70 00 00 00

---

**Bon commerce ! 🛍️**
