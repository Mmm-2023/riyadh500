-- Wave 2 public actions. Example profiles are not inserted into leaders.
-- user_votes stores one vote per signed-in user per example leader slug.
-- nominations and subscribers are insert-only for the public roles.

create table public.user_votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  leader_slug text not null,
  created_at timestamptz not null default now(),
  constraint user_votes_slug_check check (leader_slug ~ '^[a-z0-9-]{1,80}$'),
  constraint user_votes_one_per_leader unique (user_id, leader_slug)
);

create index user_votes_user_id_idx on public.user_votes (user_id);

alter table public.user_votes enable row level security;

create policy user_votes_select_own
  on public.user_votes
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy user_votes_insert_own
  on public.user_votes
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy user_votes_delete_own
  on public.user_votes
  for delete
  to authenticated
  using (auth.uid() = user_id);

grant select, insert, delete on public.user_votes to authenticated;

create table public.nominations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  nominee_name text not null,
  role text not null,
  organisation text not null,
  group_name text not null,
  sector_slug text not null,
  source_url text,
  why text not null,
  contact_email text not null,
  status text not null default 'in_review',
  created_at timestamptz not null default now(),
  constraint nominations_status_check check (status = 'in_review'),
  constraint nominations_why_len check (char_length(why) between 1 and 600)
);

alter table public.nominations enable row level security;

create or replace function public.nominations_force_review()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() is null then
    raise exception 'Sign in required';
  end if;
  new.user_id := auth.uid();
  new.status := 'in_review';
  return new;
end;
$$;

create trigger nominations_force_review
  before insert on public.nominations
  for each row
  execute function public.nominations_force_review();

create policy nominations_insert_own
  on public.nominations
  for insert
  to authenticated
  with check (auth.uid() = user_id and status = 'in_review');

revoke all on public.nominations from anon, authenticated;
grant insert on public.nominations to authenticated;

create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  constraint subscribers_email_check check (
    email = lower(email)
    and email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  ),
  constraint subscribers_email_unique unique (email)
);

alter table public.subscribers enable row level security;

create policy subscribers_insert
  on public.subscribers
  for insert
  to anon, authenticated
  with check (true);

revoke all on public.subscribers from anon, authenticated;
grant insert on public.subscribers to anon, authenticated;

-- Column-limited read for a later public list. The app does not query this.
-- security_invoker keeps the leaders RLS rule (published = true only).
create or replace view public.leaders_public
with (security_invoker = true) as
select
  id,
  sector_id,
  name,
  headline_role,
  company,
  vote_count
from public.leaders
where published = true;

revoke all on public.leaders_public from public, anon, authenticated;
grant select on public.leaders_public to anon, authenticated;
