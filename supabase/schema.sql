-- ============================================================
-- Costa Drive Club – Supabase Schema
-- Paste this entire file into:
-- Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- ── Profiles (extends Supabase Auth users) ──────────────────
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  name       text,
  email      text,
  phone      text,
  country    text,
  is_admin   boolean default false,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Cars ─────────────────────────────────────────────────────
create table if not exists public.cars (
  id                uuid primary key default gen_random_uuid(),
  type              text not null,
  name              text not null,
  price             numeric not null,
  weekly_price      numeric,
  high_season_price numeric,
  emoji             text default '🚗',
  badge             text,
  color             text default '#2563eb',
  availability      text default 'available'
                    check (availability in ('available','reserved','maintenance','hidden')),
  featured          boolean default false,
  image             text,
  features          text[] default '{}',
  description       text,
  year              integer,
  fuel              text,
  transmission      text,
  doors             integer,
  luggage           integer,
  sort_order        integer default 0,
  created_at        timestamptz default now()
);

alter table public.cars enable row level security;

create policy "Anyone can view cars"
  on public.cars for select using (true);

create policy "Authenticated users can insert cars"
  on public.cars for insert with check (auth.uid() is not null);

create policy "Authenticated users can update cars"
  on public.cars for update using (auth.uid() is not null);

create policy "Authenticated users can delete cars"
  on public.cars for delete using (auth.uid() is not null);

-- ── Seed the initial car fleet ───────────────────────────────
insert into public.cars
  (type, name, price, weekly_price, high_season_price, emoji, badge, color,
   availability, featured, features, description, year, fuel, transmission, doors, luggage, sort_order)
values
  ('Economy',    'Seat Ibiza',     189, 159, 239, '🚗', 'Populær',   '#2563eb', 'available', false,
   ARRAY['5 sæder','Manuel','A/C','Bluetooth'],        'Den perfekte økonomi-bil til kystudflugter og bykørsel.', 2023,'Benzin','Manuel',   5,2, 1),
  ('SUV',        'Nissan Qashqai', 349, 299, 419, '🚙', 'Bestseller', '#7c3aed', 'available', true,
   ARRAY['5 sæder','Automatik','A/C','GPS'],            'Rummelig SUV ideel til familier og bjergkørsel.',         2023,'Diesel','Automatik',5,4, 2),
  ('Cabriolet',  'Mazda MX-5',     449, 389, 549, '🏎️','Sommerhit',  '#db2777', 'available', true,
   ARRAY['2 sæder','Manuel','A/C','Soft-top'],          'Oplev Spanien med vinden i håret.',                       2022,'Benzin','Manuel',   2,1, 3),
  ('Luxury',     'BMW 5-serie',    699, 599, 849, '✨', 'Premium',    '#d97706', 'available', true,
   ARRAY['5 sæder','Automatik','Full option','Læder'],  'Ultimativ luksus på de spanske motorveje.',               2024,'Benzin','Automatik',5,3, 4),
  ('Family Van', 'VW Touran',      389, 329, 459, '🚐', 'Familie',    '#059669', 'available', false,
   ARRAY['7 sæder','Automatik','A/C','Stort bagagerum'],'Plads til hele familien med masser af bagage.',           2023,'Diesel','Automatik',5,6, 5),
  ('Economy',    'Renault Clio',   175, 149, 219, '🚗', 'Budget',     '#0891b2', 'available', false,
   ARRAY['5 sæder','Manuel','A/C','USB'],               'Kompakt og brændstoføkonomisk – perfekt til bykørsel.',   2023,'Benzin','Manuel',   5,2, 6);

-- ── Bookings ─────────────────────────────────────────────────
create table if not exists public.bookings (
  id             text primary key,
  user_id        uuid references auth.users(id) on delete set null,
  car_data       jsonb,
  pickup         text,
  dropoff        text,
  pick_date      date,
  return_date    date,
  days           integer,
  extras         jsonb default '{}',
  customer       jsonb,
  payment_method text,
  total          numeric,
  status         text default 'confirmed',
  created_at     timestamptz default now()
);

alter table public.bookings enable row level security;

create policy "Users can view own bookings"
  on public.bookings for select using (auth.uid() = user_id);

create policy "Authenticated users can create bookings"
  on public.bookings for insert with check (auth.uid() is not null);

create policy "Admins can view all bookings"
  on public.bookings for select using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- ── Contact messages ─────────────────────────────────────────
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  email      text,
  phone      text,
  message    text,
  created_at timestamptz default now()
);

alter table public.contact_messages enable row level security;

create policy "Anyone can submit contact messages"
  on public.contact_messages for insert with check (true);
