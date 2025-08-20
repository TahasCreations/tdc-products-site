-- Supabase schema for TDC Products
-- Run in Supabase SQL editor

create table if not exists profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role text default 'user' check (role in ('user','admin')),
  locale text default 'tr',
  currency text default 'TRY',
  created_at timestamp with time zone default now()
);

create table if not exists wishlists (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now()
);

create table if not exists wishlist_items (
  id bigserial primary key,
  wishlist_id bigint references wishlists(id) on delete cascade,
  product_slug text not null,
  variant_key text,
  created_at timestamp with time zone default now()
);

create table if not exists orders (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'pending' check (status in ('pending','paid','shipped','cancelled','refunded')),
  total numeric(12,2) not null default 0,
  currency text not null default 'TRY',
  created_at timestamp with time zone default now()
);

create table if not exists order_items (
  id bigserial primary key,
  order_id bigint references orders(id) on delete cascade,
  product_slug text not null,
  variant_key text,
  qty integer not null default 1,
  unit_price numeric(12,2) not null default 0
);

create table if not exists coupons (
  id bigserial primary key,
  code text unique not null,
  type text not null check (type in ('percent','amount')),
  value numeric(12,2) not null,
  starts_at timestamp with time zone,
  ends_at timestamp with time zone,
  target text not null default 'all' check (target in ('all','product','category')),
  target_ids text[],
  single_use boolean default false,
  max_uses integer,
  used_count integer default 0,
  created_at timestamp with time zone default now()
);

create table if not exists discounts (
  id bigserial primary key,
  name text not null,
  type text not null check (type in ('percent','amount')),
  value numeric(12,2) not null,
  starts_at timestamp with time zone,
  ends_at timestamp with time zone,
  target text not null default 'all' check (target in ('all','product','category')),
  target_ids text[],
  priority integer default 0,
  created_at timestamp with time zone default now()
);

create table if not exists finance_costs (
  id bigserial primary key,
  product_slug text not null,
  variant_key text,
  cost numeric(12,2) not null default 0,
  labor numeric(12,2) not null default 0,
  shipping numeric(12,2) not null default 0,
  effective_at timestamp with time zone default now()
);

create table if not exists bist_prices (
  id bigserial primary key,
  date date not null,
  price numeric(12,2) not null,
  source text not null default 'sim',
  note text
);

-- RLS
alter table profiles enable row level security;
alter table wishlists enable row level security;
alter table wishlist_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table coupons enable row level security;
alter table discounts enable row level security;
alter table finance_costs enable row level security;
alter table bist_prices enable row level security;

-- Profiles policies
create policy if not exists "Profiles read self" on profiles for select using ( auth.uid() = user_id or exists (select 1 from profiles p where p.user_id = auth.uid() and p.role = 'admin') );
create policy if not exists "Profiles upsert self" on profiles for all using ( auth.uid() = user_id ) with check ( auth.uid() = user_id );

-- Wishlists policies
create policy if not exists "Wishlists read own" on wishlists for select using ( user_id = auth.uid() );
create policy if not exists "Wishlists write own" on wishlists for all using ( user_id = auth.uid() ) with check ( user_id = auth.uid() );

-- Wishlist items policies
create policy if not exists "Wishlist items read own" on wishlist_items for select using (
  exists(select 1 from wishlists w where w.id = wishlist_id and w.user_id = auth.uid())
);
create policy if not exists "Wishlist items write own" on wishlist_items for all using (
  exists(select 1 from wishlists w where w.id = wishlist_id and w.user_id = auth.uid())
 ) with check (
  exists(select 1 from wishlists w where w.id = wishlist_id and w.user_id = auth.uid())
 );

-- Orders policies
create policy if not exists "Orders read own" on orders for select using ( user_id = auth.uid() or exists (select 1 from profiles p where p.user_id = auth.uid() and p.role='admin') );
create policy if not exists "Orders write own" on orders for all using ( user_id = auth.uid() ) with check ( user_id = auth.uid() );

-- Order items policies
create policy if not exists "Order items read own" on order_items for select using (
  exists(select 1 from orders o where o.id = order_id and (o.user_id = auth.uid() or exists(select 1 from profiles p where p.user_id = auth.uid() and p.role='admin')))
);
create policy if not exists "Order items write own" on order_items for all using (
  exists(select 1 from orders o where o.id = order_id and o.user_id = auth.uid())
 ) with check (
  exists(select 1 from orders o where o.id = order_id and o.user_id = auth.uid())
 );

-- Admin-only tables
create policy if not exists "Coupons read all" on coupons for select using ( true );
create policy if not exists "Coupons admin write" on coupons for all using (
  exists(select 1 from profiles p where p.user_id = auth.uid() and p.role='admin')
 ) with check (
  exists(select 1 from profiles p where p.user_id = auth.uid() and p.role='admin')
 );

create policy if not exists "Discounts read all" on discounts for select using ( true );
create policy if not exists "Discounts admin write" on discounts for all using (
  exists(select 1 from profiles p where p.user_id = auth.uid() and p.role='admin')
 ) with check (
  exists(select 1 from profiles p where p.user_id = auth.uid() and p.role='admin')
 );

create policy if not exists "Finance read all" on finance_costs for select using ( true );
create policy if not exists "Finance admin write" on finance_costs for all using (
  exists(select 1 from profiles p where p.user_id = auth.uid() and p.role='admin')
 ) with check (
  exists(select 1 from profiles p where p.user_id = auth.uid() and p.role='admin')
 );

create policy if not exists "BIST read all" on bist_prices for select using ( true );
create policy if not exists "BIST admin write" on bist_prices for all using (
  exists(select 1 from profiles p where p.user_id = auth.uid() and p.role='admin')
 ) with check (
  exists(select 1 from profiles p where p.user_id = auth.uid() and p.role='admin')
 );


