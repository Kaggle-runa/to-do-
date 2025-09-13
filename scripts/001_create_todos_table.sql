-- ToDoテーブルを作成
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  priority text check (priority in ('low', 'medium', 'high')) default 'medium',
  user_id uuid references auth.users(id) on delete cascade
);

-- Row Level Security (RLS) を有効化
alter table public.todos enable row level security;

-- RLSポリシーを作成（ユーザーは自分のToDoのみアクセス可能）
create policy "todos_select_own"
  on public.todos for select
  using (auth.uid() = user_id);

create policy "todos_insert_own"
  on public.todos for insert
  with check (auth.uid() = user_id);

create policy "todos_update_own"
  on public.todos for update
  using (auth.uid() = user_id);

create policy "todos_delete_own"
  on public.todos for delete
  using (auth.uid() = user_id);
