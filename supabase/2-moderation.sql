alter table public.sd_players add column if not exists hidden boolean not null default false;

drop policy if exists "read all" on public.sd_players;
drop policy if exists "read visible" on public.sd_players;
create policy "read visible" on public.sd_players for select using (hidden = false);

revoke insert, update on public.sd_players from anon, authenticated;
grant insert (id, name, avatar, photo, best, stars) on public.sd_players to anon, authenticated;
grant update (id, name, avatar, photo, best, stars, updated_at) on public.sd_players to anon, authenticated;

create table if not exists public.sd_reports (
  id bigint generated always as identity primary key,
  reported_id text not null,
  reporter_id text,
  reason text not null check (char_length(reason) <= 40),
  name text check (char_length(name) <= 40),
  created_at timestamptz not null default now()
);

alter table public.sd_reports enable row level security;

drop policy if exists "report insert" on public.sd_reports;
create policy "report insert" on public.sd_reports for insert with check (true);

revoke all on public.sd_reports from anon, authenticated;
grant insert on public.sd_reports to anon, authenticated;
