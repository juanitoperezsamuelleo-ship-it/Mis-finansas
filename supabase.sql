-- Mis Finanzas · tabla de sincronización (Supabase → SQL Editor → Run)
-- Seguridad: cada usuario solo ve sus propios datos (RLS) y SOLO después de pasar
-- la verificación en dos pasos (nivel aal2). Con usuario y contraseña robados no basta.
create table if not exists public.finanzas (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.finanzas enable row level security;
alter table public.finanzas force row level security;

drop policy if exists "finanzas: leer lo propio" on public.finanzas;
drop policy if exists "finanzas: crear lo propio" on public.finanzas;
drop policy if exists "finanzas: actualizar lo propio" on public.finanzas;
drop policy if exists "finanzas: borrar lo propio" on public.finanzas;

create policy "finanzas: leer lo propio" on public.finanzas for select to authenticated
  using ((select auth.uid()) = user_id and (select auth.jwt() ->> 'aal') = 'aal2');
create policy "finanzas: crear lo propio" on public.finanzas for insert to authenticated
  with check ((select auth.uid()) = user_id and (select auth.jwt() ->> 'aal') = 'aal2');
create policy "finanzas: actualizar lo propio" on public.finanzas for update to authenticated
  using ((select auth.uid()) = user_id and (select auth.jwt() ->> 'aal') = 'aal2')
  with check ((select auth.uid()) = user_id and (select auth.jwt() ->> 'aal') = 'aal2');
create policy "finanzas: borrar lo propio" on public.finanzas for delete to authenticated
  using ((select auth.uid()) = user_id and (select auth.jwt() ->> 'aal') = 'aal2');

revoke all on public.finanzas from anon;
grant select, insert, update, delete on public.finanzas to authenticated;

-- ===== Finanzas en pareja (hogar compartido) =====
-- Ver migración "hogar_compartido": tablas hogar_miembros e invitaciones,
-- función private.es_miembro(owner), políticas de finanzas que permiten al miembro
-- leer/escribir la fila del dueño, y RPCs crear_invitacion() / aceptar_invitacion(code, nombre).
-- Todo exige aal2 (verificación en dos pasos). Códigos de 8 caracteres, 24 h, un solo uso.
