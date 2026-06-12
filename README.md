# Yiriwa - Plateforme E-commerce Moderne

Une plateforme e-commerce complète et professionnelle permettant aux visiteurs de consulter des produits et de passer commande facilement via WhatsApp.

## 🎨 Design

- **Design moderne et premium** avec interface épurée
- **Mobile First** - Entièrement responsive (Desktop, Tablet, Mobile)
- **Palette de couleurs**:
  - Orange principal: `#FF5722`
  - Bleu foncé: `#303841`
  - Bleu-gris: `#76ABAE`
  - Blanc: `#FFFFFF`
  - Gris clair: `#F8F9FA`
- **Typographie**: Poppins & Inter
- **Animations fluides** avec Motion/Framer Motion

## ✨ Fonctionnalités

### Site Client

#### 🏠 Page d'accueil
- Hero section avec appel à l'action
- Affichage des catégories sous forme de cartes
- Produits vedettes
- Section "Pourquoi nous choisir"

#### 🛍️ Catalogue Produits
- Recherche instantanée
- Filtrage par catégorie
- Tri par prix ou nom
- Affichage en grille responsive
- Badges promotionnels

#### 📱 Page Détail Produit
- Galerie d'images
- Description détaillée
- Caractéristiques du produit
- Gestion de quantité
- Produits similaires
- Commande directe via WhatsApp

#### 📋 Processus de Commande
**Aucune inscription requise !**
- Formulaire rapide (Nom, WhatsApp, Ville, Adresse, Commentaire)
- Enregistrement automatique en base de données
- Redirection vers WhatsApp avec message pré-rempli
- Message personnalisé avec détails de commande

### Espace Administrateur

#### 📊 Dashboard
- Statistiques en temps réel
  - Total produits
  - Total commandes
  - Commandes du jour
  - Nombre de clients
- Graphiques de l'activité hebdomadaire
- Produits les plus commandés
- Commandes récentes

#### 📦 Gestion des Produits
- Liste complète avec recherche
- Ajouter/Modifier/Supprimer
- Activer/Désactiver un produit
- Gestion du stock
- Upload d'images multiples
- Organisation par catégories

#### 📂 Gestion des Catégories
- Ajout/Modification/Suppression
- Attribution d'icônes personnalisées
- Génération automatique de slug

#### 🛒 Gestion des Commandes
- Vue d'ensemble de toutes les commandes
- Filtrage par statut
- Changement de statut en temps réel
- Statuts disponibles:
  - En attente
  - Confirmée
  - En préparation
  - Livrée
  - Annulée
- Contact direct WhatsApp avec le client
- Détails complets de chaque commande

#### 👥 Gestion des Clients
- Création automatique après première commande
- Historique des achats
- Statistiques par client
- Contact WhatsApp direct

#### ⚙️ Paramètres
- Informations de la boutique
- Numéro WhatsApp principal
- Liens réseaux sociaux (Facebook, Instagram, Twitter)
- Configuration des bannières

## 🚀 Technologies Utilisées

- **React** avec TypeScript
- **React Router** pour la navigation
- **Tailwind CSS** v4 pour le styling
- **Motion** (Framer Motion) pour les animations
- **Recharts** pour les graphiques
- **Lucide React** pour les icônes
- **Shadcn/ui** pour les composants UI
- **Sonner** pour les notifications toast

## 📁 Structure du Projet

```
src/
├── app/
│   ├── components/
│   │   ├── client/          # Composants du site client
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CategoryCard.tsx
│   │   │   ├── WhatsAppButton.tsx
│   │   │   └── ClientLayout.tsx
│   │   ├── admin/           # Composants de l'admin
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── AdminLayout.tsx
│   │   └── ui/              # Composants UI réutilisables
│   ├── pages/
│   │   ├── client/          # Pages client
│   │   │   ├── Home.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── Categories.tsx
│   │   │   └── Contact.tsx
│   │   └── admin/           # Pages admin
│   │       ├── Dashboard.tsx
│   │       ├── Products.tsx
│   │       ├── Orders.tsx
│   │       ├── Categories.tsx
│   │       ├── Customers.tsx
│   │       └── Settings.tsx
│   ├── data/
│   │   └── mockData.ts      # Données de démonstration
│   ├── routes.tsx           # Configuration des routes
│   └── App.tsx              # Composant principal
└── styles/
    ├── fonts.css            # Imports Google Fonts
    ├── theme.css            # Variables de thème
    └── index.css            # Styles globaux
```

## 🎯 Navigation

### Site Client
- `/` - Page d'accueil
- `/products` - Catalogue de produits
- `/products/:id` - Détail d'un produit
- `/categories` - Liste des catégories
- `/contact` - Page de contact

### Administration
- `/admin` - Dashboard
- `/admin/products` - Gestion des produits
- `/admin/categories` - Gestion des catégories
- `/admin/orders` - Gestion des commandes
- `/admin/customers` - Gestion des clients
- `/admin/settings` - Paramètres

## 💡 Points Clés

1. **Pas de système d'authentification client** - Les clients commandent sans créer de compte
2. **Intégration WhatsApp** - Communication directe vendeur-client
3. **Design premium** - Interface moderne adaptée au marché africain
4. **Responsive** - Fonctionne parfaitement sur tous les appareils
5. **Gestion complète** - Dashboard admin complet pour gérer la boutique

## 🔮 Évolutions Futures

Pour connecter cette application à une vraie base de données et ajouter la persistance des données, vous pouvez :
- Intégrer Supabase pour le backend
- Ajouter l'authentification pour l'espace admin
- Implémenter le système de paiement
- Ajouter la gestion des livraisons
- Créer un système de notifications par email

---

**Yiriwa** - Votre boutique en ligne simplifiée et professionnelle 🛍️
