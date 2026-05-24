-- ============================================================
-- Hanuman Chalisa Mahabhiyan — Supabase Setup
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Create storage bucket (public)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'hanuman-gallery',
  'hanuman-gallery',
  true,
  209715200, -- 200MB max per file
  array['image/jpeg','image/png','image/webp','image/gif','image/heic','video/mp4','video/webm','video/quicktime']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 209715200;

-- 2. Uploads table
create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  file_url text not null,
  file_type text not null,
  file_name text not null,
  uploaded_by text not null default 'Anonymous Devotee',
  city text default '',
  caption text default '',
  created_at timestamptz not null default now(),
  approved boolean not null default true,
  compressed boolean not null default false
);

create index if not exists uploads_created_at_idx on public.uploads (created_at desc);
create index if not exists uploads_approved_idx on public.uploads (approved);

-- 3. Row Level Security
alter table public.uploads enable row level security;

drop policy if exists "Public read approved uploads" on public.uploads;
create policy "Public read approved uploads"
  on public.uploads for select
  using (approved = true);

drop policy if exists "Public insert uploads" on public.uploads;
create policy "Public insert uploads"
  on public.uploads for insert
  with check (true);

-- No public update/delete — admin uses service role via API routes only

-- 4. Storage policies
drop policy if exists "Public read hanuman gallery" on storage.objects;
create policy "Public read hanuman gallery"
  on storage.objects for select
  using (bucket_id = 'hanuman-gallery');

drop policy if exists "Public upload hanuman gallery" on storage.objects;
create policy "Public upload hanuman gallery"
  on storage.objects for insert
  with check (bucket_id = 'hanuman-gallery');

-- Admin delete uses service role key in Next.js API routes (never exposed to browser)
