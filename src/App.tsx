import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useTodos } from './hooks/useTodos'
import { useProfile } from './hooks/useProfile'

// Components
import Layout from './components/Layout'
import AuthForm from './modules/auth/AuthForm'
import TodoList from './modules/todos/TodoList'
import ProfileView from './modules/profile/ProfileView'
import ProfileEdit from './modules/profile/ProfileEdit'

import './App.css'

export default function App() {
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth()
  const { todos, loading: todosLoading, addTodo, toggleComplete, deleteTodo } = useTodos(user)
  const { profile, loading: profileLoading, updateProfile } = useProfile(user)
  
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  // Show auth form if not logged in
  if (!user) {
    return <AuthForm onSignIn={signIn} onSignUp={signUp} />
  }

  // Main app with modular layout
  return (
    <Layout 
      userName={profile?.full_name || user.email || 'User'} 
      onSignOut={signOut}
    >
      {/* Todos Module */}
      <div data-tab-id="todos">
        <TodoList
          todos={todos}
          loading={todosLoading}
          onAdd={addTodo}
          onToggle={toggleComplete}
          onDelete={deleteTodo}
        />
      </div>

      {/* Profile Module */}
      <div data-tab-id="profile">
        {isEditingProfile ? (
          <ProfileEdit
            profile={profile}
            onSave={updateProfile}
            onCancel={() => setIsEditingProfile(false)}
          />
        ) : (
          <ProfileView
            profile={profile}
            loading={profileLoading}
            userEmail={user.email || ''}
            onEdit={() => setIsEditingProfile(true)}
          />
        )}
      </div>
    </Layout>
  )
}
