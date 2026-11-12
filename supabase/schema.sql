-- Salón de Casa del Obrero — bookings table (run once in Supabase > SQL Editor)
create table if not exists public.citas (
  id                uuid primary key default gen_random_uuid(),
  reference_code    text not null unique,
  client_name       text not null,
  client_phone      text not null,
  client_email      text not null,
  event_type        text not null,
  event_date        date not null,
  time_slot         text not null,
  guest_count       integer not null check (guest_count between 20 and 600),
  selected_items    jsonb not null default '{}'::jsonb,
  formatted_items   jsonb not null default '[]'::jsonb,
  additional_notes  text not null default '',
  venue_base_price  numeric(12,2) not null,
  items_subtotal    numeric(12,2) not null,
  total_estimated   numeric(12,2) not null,
  status            text not null default 'pendiente'
                    check (status in ('pendiente', 'confirmada', 'en_revision', 'cancelada')),
  whatsapp_notified boolean not null default false,
  created_at        timestamptz not null default now()
);

create index if not exists citas_event_date_idx on public.citas (event_date);

-- RLS on with no policies: the public anon key cannot read or write.
-- Only the backend (service role key, server-side only) can access the table.
alter table public.citas enable row level security;
