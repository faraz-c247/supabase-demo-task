import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabaseClient'
import type { Todo } from './types'
import type { User } from '@supabase/supabase-js'

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTask, setNewTask] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')

    const [message, setMessage] = useState('')


  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const fetchTodos = useCallback(async () => {
    if (!user) return
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('inserted_at', { ascending: false })
    if (!error) setTodos(data || [])
  }, [user])

  useEffect(() => {
    if (user) fetchTodos()
  }, [user, fetchTodos])

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault()

    if (isSignUp) {
      // Sign up user
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) return alert(error.message)

      // User created
      const userId = data.user?.id
      if (userId) {
        // Update profile info
        await supabase
          .from('profiles')
          .update({ full_name: fullName, address })
          .eq('id', userId)
      }

      // Auto-login
      await supabase.auth.signInWithPassword({ email, password })
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) alert(error.message)
    }
  }

  async function addTodo() {
    if (!newTask.trim() || !user) return
    await supabase.from('todos').insert([{ task: newTask, user_id: user.id }])
    setNewTask('')
    fetchTodos()
  }

  async function toggleComplete(id: string, is_complete: boolean) {
    await supabase.from('todos').update({ is_complete: !is_complete }).eq('id', id)
    fetchTodos()
  }

  async function deleteTodo(id: string) {
    await supabase.from('todos').delete().eq('id', id)
    fetchTodos()
  }

   async function callEdgeFunction() {
    const res = await fetch(
      `https://ileyngdsdteudbbywmms.supabase.co/functions/v1/hello-world`,
      {
        method: 'GET',
      }
    )
    const data = await res.json()
    setMessage(data.message)
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (!user)
    return (
      <div style={{ maxWidth: 400, margin: '3rem auto' }}>
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </>
          )}
          <button
            type="submit"
            style={{ background: '#3b82f6', color: 'white', padding: '0.5rem', borderRadius: '6px', border: 'none' }}
          >
            {isSignUp ? 'Create Account' : 'Log In'}
          </button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    )

  return (
    <div style={{ maxWidth: 400, margin: '3rem auto' }}>
      <h2>Your Todos</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button
          onClick={addTodo}
          style={{
            background: '#16a34a',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid #ddd',
              padding: '0.5rem 0',
            }}
          >
            <span
              onClick={() => toggleComplete(todo.id, todo.is_complete)}
              style={{
                cursor: 'pointer',
                textDecoration: todo.is_complete ? 'line-through' : 'none',
              }}
            >
              {todo.task}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ color: 'red', fontSize: '0.8rem' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={signOut} style={{ marginTop: 20, color: '#3b82f6', textDecoration: 'underline' }}>
        Sign Out
      </button>

       <button
        onClick={callEdgeFunction}
        style={{
          background: '#3b82f6',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          border: 'none',
        }}
      >
        Call Edge Function
      </button>
      {message && <p style={{ marginTop: 12 }}>Response: {message}</p>}
    </div>
  )
}
