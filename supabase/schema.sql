-- ═══════════════════════════════════════════════════════════════
-- YIRIWA — Supabase Schema
-- Coller dans : Supabase Dashboard → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════

-- ── Extensions ───────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Tables ───────────────────────────────────────────────────

create table if not exists categories (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  icon       text not null default 'Package',
  slug       text not null unique,
  created_at timestamptz default now()
);

create table if not exists products (
  id                   uuid primary key default uuid_generate_v4(),
  name                 text not null,
  price                numeric(12,0) not null,
  description          text not null default '',
  detailed_description text not null default '',
  category_id          uuid references categories(id) on delete set null,
  images               text[] not null default '{}',
  stock                integer not null default 0,
  is_active            boolean not null default true,
  is_featured          boolean not null default false,
  has_promo            boolean not null default false,
  promo_text           text,
  characteristics      text[] default '{}',
  created_at           timestamptz default now()
);

create table if not exists customers (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  phone        text not null unique,
  city         text not null default '',
  total_orders integer not null default 0,
  created_at   timestamptz default now()
);

create table if not exists orders (
  id               uuid primary key default uuid_generate_v4(),
  order_number     text not null unique,
  customer_name    text not null,
  customer_phone   text not null,
  customer_city    text not null,
  product_id       uuid references products(id) on delete set null,
  product_name     text not null,
  quantity         integer not null default 1,
  total_amount     numeric(12,0) not null,
  delivery_address text,
  comment          text,
  status           text not null default 'pending'
                   check (status in ('pending','confirmed','preparing','delivered','cancelled')),
  created_at       timestamptz default now()
);

create table if not exists shop_settings (
  id               uuid primary key default uuid_generate_v4(),
  shop_name        text not null default 'Yiriwa',
  whatsapp_number  text not null default '',
  logo_url         text,
  banner_images    text[] default '{}',
  social_media     jsonb default '{}',
  updated_at       timestamptz default now()
);

-- ── Row Level Security ────────────────────────────────────────

alter table categories    enable row level security;
alter table products      enable row level security;
alter table orders        enable row level security;
alter table customers     enable row level security;
alter table shop_settings enable row level security;

-- Categories: public read, admin write
create policy "categories_public_read"  on categories    for select using (true);
create policy "categories_admin_all"    on categories    for all    using (auth.role() = 'authenticated');

-- Products: public read (active only), admin full
create policy "products_public_read"    on products      for select using (is_active = true);
create policy "products_admin_all"      on products      for all    using (auth.role() = 'authenticated');

-- Orders: anon can insert (place order), admin can read/update
create policy "orders_anon_insert"      on orders        for insert with check (true);
create policy "orders_admin_all"        on orders        for all    using (auth.role() = 'authenticated');

-- Customers: admin only
create policy "customers_admin_all"     on customers     for all    using (auth.role() = 'authenticated');

-- Shop settings: public read, admin write
create policy "settings_public_read"    on shop_settings for select using (true);
create policy "settings_admin_all"      on shop_settings for all    using (auth.role() = 'authenticated');

-- ── Seed: Categories ─────────────────────────────────────────

insert into categories (name, icon, slug) values
  ('Mode',         'Shirt',       'mode'),
  ('Beauté',       'Sparkles',    'beaute'),
  ('Électronique', 'Smartphone',  'electronique'),
  ('Maison',       'Home',        'maison'),
  ('Accessoires',  'Watch',       'accessoires'),
  ('Divers',       'Package',     'divers')
on conflict (slug) do nothing;

-- ── Seed: Shop Settings ──────────────────────────────────────

insert into shop_settings (shop_name, whatsapp_number, social_media) values
  ('Yiriwa', '+226 67 38 45 09', '{"facebook":"https://facebook.com/yiriwa","instagram":"https://instagram.com/yiriwa"}')
on conflict do nothing;

-- ── Seed: Products (uses category slugs) ─────────────────────

insert into products (name, price, description, detailed_description, category_id, stock, is_active, is_featured, has_promo, promo_text, characteristics)
select
  'Robe élégante africaine', 35000,
  'Robe en tissu wax coloré, parfaite pour toutes occasions',
  'Cette magnifique robe africaine est confectionnée à partir de tissu wax de haute qualité.',
  c.id, 15, true, true, true, '-20%',
  array['100% Coton','Disponible en plusieurs tailles','Lavable en machine']
from categories c where c.slug = 'mode'
on conflict do nothing;

insert into products (name, price, description, detailed_description, category_id, stock, is_active, is_featured, has_promo, characteristics)
select
  'Crème hydratante naturelle', 12000,
  'Soin visage au beurre de karité et huiles essentielles',
  'Crème hydratante enrichie au beurre de karité bio et aux huiles essentielles naturelles.',
  c.id, 30, true, true, false,
  array['100% Naturel','Sans parabènes','Hydratation 24h']
from categories c where c.slug = 'beaute'
on conflict do nothing;

insert into products (name, price, description, detailed_description, category_id, stock, is_active, is_featured, has_promo, characteristics)
select
  'Écouteurs Bluetooth Premium', 25000,
  'Son haute qualité avec réduction de bruit active',
  'Écouteurs sans fil Bluetooth 5.0 avec réduction de bruit active. Autonomie 24h.',
  c.id, 20, true, true, false,
  array['Bluetooth 5.0','Autonomie 24h','Réduction de bruit']
from categories c where c.slug = 'electronique'
on conflict do nothing;

insert into products (name, price, description, detailed_description, category_id, stock, is_active, is_featured, has_promo, promo_text, characteristics)
select
  'Montre intelligente Sport', 45000,
  'Smartwatch avec suivi fitness et notifications',
  'Montre connectée avec écran AMOLED. GPS intégré, étanche 50m.',
  c.id, 8, true, true, false, null,
  array['Écran AMOLED','GPS intégré','Étanche 50m','Autonomie 7 jours']
from categories c where c.slug = 'accessoires'
on conflict do nothing;

insert into products (name, price, description, detailed_description, category_id, stock, is_active, is_featured, has_promo, promo_text, characteristics)
select
  'Set de couteaux professionnel', 18000,
  'Kit complet de 6 couteaux en acier inoxydable',
  'Set de couteaux professionnels en acier inoxydable. 6 pièces avec support en bois.',
  c.id, 12, true, false, true, '-15%',
  array['Acier inoxydable','6 pièces','Support en bois','Garantie 2 ans']
from categories c where c.slug = 'maison'
on conflict do nothing;

insert into products (name, price, description, detailed_description, category_id, stock, is_active, is_featured, has_promo, characteristics)
select
  'Sac à dos urbain', 22000,
  'Sac à dos élégant avec compartiment laptop',
  'Sac moderne avec compartiment rembourré pour laptop 15,6". Anti-vol, résistant à l''eau.',
  c.id, 18, true, false, false,
  array['Compartiment laptop 15,6"','Anti-vol','Résistant à l''eau','Port USB']
from categories c where c.slug = 'accessoires'
on conflict do nothing;

insert into products (name, price, description, detailed_description, category_id, stock, is_active, is_featured, has_promo, promo_text, characteristics)
select
  'Ensemble de maquillage', 28000,
  'Kit complet avec palette et pinceaux professionnels',
  'Ensemble de maquillage pro incluant palette 24 couleurs et 12 pinceaux.',
  c.id, 15, true, false, true, '-25%',
  array['Palette 24 couleurs','12 pinceaux','Longue tenue','Hypoallergénique']
from categories c where c.slug = 'beaute'
on conflict do nothing;

insert into products (name, price, description, detailed_description, category_id, stock, is_active, is_featured, has_promo, characteristics)
select
  'Chargeur solaire portable', 15000,
  'Batterie externe 20000mAh avec panneau solaire',
  'Chargeur portable solaire 20000mAh, 2 USB + USB-C, lampe LED intégrée.',
  c.id, 25, true, false, false,
  array['20000mAh','Panneau solaire','Lampe LED','Étanche']
from categories c where c.slug = 'electronique'
on conflict do nothing;
