-- Set explicit search_path for linter compliance
create or replace function public.update_updated_at_column()
returns trigger
set search_path = public
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;