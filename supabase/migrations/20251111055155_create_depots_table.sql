-- 20251111121000_create_depots_table.sql
-- Migration: create depots table

create table if not exists public.depots (
  id bigserial primary key,
  name varchar(100) not null,
  location varchar(100) not null,
  created_at timestamp default current_timestamp
);
