# KIW ✦ — Align Your Life

AI-powered personal assistant app for iOS and Android, built with **React Native + Expo**.

> *"KIW is not just a planner — it's an assistant that thinks with you."*

---

## Tech Stack

| Layer               | Technology                                        |
|---------------------|---------------------------------------------------|
| Mobile              | React Native + Expo SDK 51                        |
| Navigation          | React Navigation v6 (bottom tabs)                 |
| Themes / UI         | Custom theme system (6 color palettes + dark mode)|
| Database            | Supabase (PostgreSQL + Auth)                      |
| AI Conversation     | Claude API (Anthropic) — Phase 5                  |
| Maps / Traffic      | Google Maps API — Phase 5                         |
| Push Notifications  | Firebase Cloud Messaging — Phase 5                |

---

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/WilcyV/KIW-App.git
cd KIW-App

# 2. Install dependencies
npm install

# 3. Configure Supabase
# Edit src/config/supabase.ts and paste your project URL and anon key
# Get them at: https://supabase.com → Settings → API

# 4. Run the app
npx expo start
```

Scan the QR code with **Expo Go** on your phone (App Store / Google Play) — KIW will open instantly.

---

## Project Structure

```
KIW-App/
├── App.tsx                        ← Root entry + navigation setup
├── src/
│   ├── context/
│   │   └── ThemeContext.tsx       ← Global theme state (color + dark mode)
│   ├── theme/
│   │   └── colors.ts             ← 6 color palettes (light + dark for each)
│   ├── types/
│   │   └── index.ts              ← TypeScript types (Event, Task, Profile…)
│   ├── config/
│   │   └── supabase.ts           ← Supabase database client
│   └── screens/
│       ├── HomeScreen.tsx        ← Home: daily agenda + KIW suggestions
│       ├── ChatScreen.tsx        ← AI chat (demo → Claude API in Phase 5)
│       ├── CalendarScreen.tsx    ← Agenda: day strip + timeline view
│       ├── TasksScreen.tsx       ← Tasks: full CRUD, priorities, add modal
│       └── MoreScreen.tsx        ← Theme selector, settings, profile
```

---

## Color Themes

| Name          | Accent Color | Style            |
|---------------|-------------|------------------|
| Sage Green    | `#3D7A56`   | Natural, organic |
| Slate Blue    | `#4A7FA5`   | Cool, focused    |
| Soft Lavender | `#7063A8`   | Creative, calm   |
| Warm Terracotta | `#A0704A` | Editorial, cozy  |
| Blue Slate    | `#5A6480`   | Neutral, modern  |
| Dark Neon     | `#C8F060` on black | Night mode |

Every theme includes a **light and dark variant**. The KIW chat tab icon is the signature star **✦**.

---

## App Modules

- **✦ KIW Chat** — Conversational AI assistant (natural language → schedule actions)
- **📅 Calendar** — Unified view: classes, gym, exams, trips, meetings
- **✓ Tasks** — Full CRUD with auto-priority (urgent / medium / low)
- **💪 Gym** — Weekly routines, exercise tracking, progress
- **📓 Journal** — Personal diary with AI emotional analysis
- **🎯 Goals** — Short, medium, and long-term goal tracking
- **🔔 Smart Alerts** — Priority-based reminders + traffic-aware departure time
- **🌙 Sleep & Wellness** — Sleep tracker, hydration log, Pomodoro timer
- **📋 Lists** — Shopping, travel, personal — created by voice or text
- **✈️ Trips** — Travel planner with auto-generated packing lists
- **⚡ Crisis Mode** — Auto-detects overloaded weeks and proposes a survival plan
- **📊 Weekly Score** — 0–100 alignment score: tasks, sleep, gym, journal, goals

---

## Database Setup (Supabase SQL)

Run this in your Supabase **SQL Editor**:

```sql
-- User profiles
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  sleep_goal numeric default 8,
  theme text default 'sage',
  dark_mode boolean default false,
  created_at timestamptz default now()
);

-- Calendar events
create table events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  start_time timestamptz not null,
  end_time timestamptz not null,
  category text default 'personal',
  color text default '#3D7A56',
  location text,
  created_at timestamptz default now()
);

-- Tasks
create table tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  due_date timestamptz,
  priority text default 'media',
  done boolean default false,
  event_id uuid references events(id) on delete set null,
  created_at timestamptz default now()
);

-- Row Level Security (each user only sees their own data)
alter table profiles enable row level security;
alter table events   enable row level security;
alter table tasks    enable row level security;

create policy "own profile" on profiles for all using (auth.uid() = id);
create policy "own events"  on events   for all using (auth.uid() = user_id);
create policy "own tasks"   on tasks    for all using (auth.uid() = user_id);
```

---

## Development Roadmap

| Phase | What gets built | Status |
|-------|----------------|--------|
| 1 | Environment setup + project structure | ✅ Done |
| 2 | Navigation + full theme system | ✅ Done |
| 3 | Calendar module (UI + Supabase data) | ✅ Done |
| 4 | Tasks module (full CRUD + modal) | ✅ Done |
| 5 | KIW Chat with real Claude API + agenda context | 🔜 Next |
| 6 | Onboarding + Supabase Auth + multiple profiles | ⏳ Planned |

---

## Built by

**Wiwi (Wilcy Victoria)** — CS Student @ Florida International University  
Personal project in active development · 2026
