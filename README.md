# 🎯 Modular Supabase Todo Application

A beautiful, scalable, and modular task management application built with React, TypeScript, Vite, and Supabase.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green)

## ✨ Features

### 🔐 Authentication
- ✅ Sign up with email, password, name, and address
- ✅ Secure sign in
- ✅ Automatic login after registration
- ✅ User session management

### ✅ Todo Management
- ✅ Create, read, update, delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Real-time synchronization with Supabase
- ✅ Progress tracking (completed/total)
- ✅ Beautiful empty and loading states

### 👤 Profile Management
- ✅ View user profile information
- ✅ Edit name and address
- ✅ User avatar with initials
- ✅ Display member since date

### 🎨 Modern UI/UX
- ✅ Beautiful purple gradient theme
- ✅ Smooth animations and transitions
- ✅ Responsive design (mobile & desktop)
- ✅ Card-based layouts
- ✅ Tab-based navigation
- ✅ Loading states and error handling

## 🏗️ Modular Architecture

The application follows a scalable modular architecture:

```
src/
├── components/        # Shared components
│   └── Layout.tsx    # Main layout with navigation
├── modules/          # Feature modules
│   ├── auth/        # Authentication module
│   ├── todos/       # Todo management module
│   └── profile/     # User profile module
├── hooks/           # Custom React hooks
│   ├── useAuth.ts   # Authentication logic
│   ├── useTodos.ts  # Todo CRUD operations
│   └── useProfile.ts # Profile management
├── App.tsx          # Main application
└── types.ts         # TypeScript definitions
```

### Benefits
- 🎯 **Scalability**: Easy to add new modules
- 🔧 **Maintainability**: Clear separation of concerns
- ♻️ **Reusability**: Shared hooks and components
- 🧪 **Testability**: Isolated, testable modules
- 👥 **Team-friendly**: Multiple developers can work independently

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd supabase-demo-task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   Run these SQL commands in your Supabase SQL editor:
   
   ```sql
   -- Create profiles table
   CREATE TABLE profiles (
     id UUID PRIMARY KEY REFERENCES auth.users(id),
     full_name TEXT,
     address TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create todos table
   CREATE TABLE todos (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     task TEXT NOT NULL,
     is_complete BOOLEAN DEFAULT FALSE,
     inserted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Users can view own profile" ON profiles
     FOR SELECT USING (auth.uid() = id);
   
   CREATE POLICY "Users can update own profile" ON profiles
     FOR UPDATE USING (auth.uid() = id);

   CREATE POLICY "Users can view own todos" ON todos
     FOR SELECT USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can insert own todos" ON todos
     FOR INSERT WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can update own todos" ON todos
     FOR UPDATE USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can delete own todos" ON todos
     FOR DELETE USING (auth.uid() = user_id);
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist/` folder.

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed architecture explanation and how to add new modules
- **[FEATURES.md](./FEATURES.md)** - Complete feature list and UI overview
- **[SUMMARY.md](./SUMMARY.md)** - Quick summary of changes and improvements

## 🎨 Design System

### Color Palette
- **Primary**: `#667eea` → `#764ba2` (Purple gradient)
- **Background**: `#f5f7fa` → `#e8eef5` (Light gradient)
- **Text**: `#1a202c` (Dark gray)
- **Success**: `#38a169` (Green)
- **Error**: `#c53030` (Red)

### Key Components
- Gradient buttons with hover effects
- Card-based layouts with shadows
- Smooth animations and transitions
- Responsive navigation tabs
- Beautiful form inputs with focus states

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 7
- **Backend**: Supabase (PostgreSQL + Auth)
- **Styling**: Pure CSS with CSS Variables
- **Icons**: Inline SVG

## 📱 Responsive Design

- **Desktop** (>768px): Full navigation with labels, spacious layout
- **Mobile** (<768px): Icon-only navigation, compact layout

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Future Enhancements

- [ ] Dark mode support
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Search and filter functionality
- [ ] Drag and drop task reordering
- [ ] Task priority levels
- [ ] Export/Import tasks
- [ ] Collaboration features
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Vite](https://vite.dev/)
- Powered by [Supabase](https://supabase.com/)
- Icons inspired by [Heroicons](https://heroicons.com/)

---

**Made with ❤️ using React, TypeScript, and Supabase**
