create table if not exists public.sd_players (
  id text primary key,
  name text not null check (char_length(name) between 1 and 16),
  avatar int not null default 0 check (avatar between 0 and 11),
  photo text check (photo is null or char_length(photo) < 60000),
  best int not null default 0 check (best between 0 and 100000),
  stars int not null default 0 check (stars between 0 and 100000),
  updated_at timestamptz not null default now()
);

create index if not exists sd_players_best_idx on public.sd_players (best desc);
create index if not exists sd_players_stars_idx on public.sd_players (stars desc);

alter table public.sd_players enable row level security;

drop policy if exists "read all" on public.sd_players;
drop policy if exists "insert all" on public.sd_players;
drop policy if exists "update all" on public.sd_players;

create policy "read all" on public.sd_players for select using (true);
create policy "insert all" on public.sd_players for insert with check (true);
create policy "update all" on public.sd_players for update using (true) with check (true);
