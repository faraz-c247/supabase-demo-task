# 🚚 Reynolds Logistics - Supabase Database Project

A logistics management database system built with Supabase for driver management, vehicle tracking, shift scheduling, and delivery operations.

![Supabase](https://img.shields.io/badge/Supabase-Latest-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![React](https://img.shields.io/badge/React-19-blue)

## 📋 Features

- 🏢 Depot Management
- 👷 Driver Operations & Scheduling
- 🚛 Vehicle Fleet Tracking
- 📦 Delivery Management
- 🤝 Contractor Relations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account

### Installation

```bash
# Clone repository
git clone <repository-url>
cd supabase-demo-task

# Install dependencies
npm install

# Create .env file
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
```

## 📦 Database Setup

### Apply Migrations

```bash
# Link to your Supabase project
npx supabase link --project-ref your-project-ref

# Push local migrations to remote database
npx supabase db push

# Pull remote schema to local migrations
npx supabase db pull
```

### Seed Database

```bash
npm run seed
```

**⚠️ Warning:** Seeder uses `TRUNCATE CASCADE` - backs up data first!

## 🗄️ Database Schema

**12 interconnected tables:**

- `depots` - Distribution centers
- `skills` - Driver certifications
- `contractors` - External contractors
- `drivers` - Driver profiles
- `driver_skills` - Driver-skill assignments
- `vehicles` - Fleet inventory
- `vehicle_status` - Maintenance records
- `customers` - Client information
- `customer_shift_demands` - Capacity requirements
- `driver_shifts` - Shift assignments
- `deliveries` - Delivery tracking

## 🔄 Development Workflow

```bash
# Create new migration
npx supabase migration new create_new_table

# Test locally
npx supabase start
npx supabase db reset

# Push changes to remote
npx supabase db push

# Run frontend
npm run dev
```

## 🛠️ Common Commands

| Command | Description |
|---------|-------------|
| `npx supabase db push` | Apply local migrations to remote |
| `npx supabase db pull` | Pull remote schema to local |
| `npx supabase db reset` | Reset local DB (migrations + seed) |
| `npm run seed` | Seed database with test data |
| `npm run dev` | Start development server |

## 📝 Sample Queries

```sql
-- Drivers with skills
SELECT d.name, s.name as skill
FROM drivers d
JOIN driver_skills ds ON d.id = ds.driver_id
JOIN skills s ON s.id = ds.skill_id;

-- Shifts for specific date
SELECT dr.name, ds.shift_type, dep.name as depot
FROM driver_shifts ds
JOIN drivers dr ON dr.id = ds.driver_id
JOIN depots dep ON dep.id = ds.depot_id
WHERE ds.shift_date = '2025-11-11';
```

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [Database Migrations Guide](https://supabase.com/docs/guides/database/migrations)

## 📄 License

MIT License

---

**Built with** 🚀 **Supabase** | 🐘 **PostgreSQL** | ⚛️ **React**
