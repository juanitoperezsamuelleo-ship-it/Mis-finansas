-- Mis Finanzas · tabla de sincronización
-- Pégalo en Supabase → SQL Editor → New query → Run.
create table if not exists public.finanzas (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.finanzas enable row level security;

drop policy if exists "finanzas: leer lo propio" on public.finanzas;
drop policy if exists "finanzas: crear lo propio" on public.finanzas;
drop policy if exists "finanzas: actualizar lo propio" on public.finanzas;
drop policy if exists "finanzas: borrar lo propio" on public.finanzas;

create policy "finanzas: leer lo propio" on public.finanzas
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "finanzas: crear lo propio" on public.finanzas
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "finanzas: actualizar lo propio" on public.finanzas
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "finanzas: borrar lo propio" on public.finanzas
  for delete to authenticated using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.finanzas to authenticated;
