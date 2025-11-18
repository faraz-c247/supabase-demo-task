import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signUp = async (email: string, password: string, fullName?: string, address?: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    
    if (error) return { error }

    // Update profile info if provided
    if (data.user?.id && (fullName || address)) {
      await supabase
        .from('profiles')
        .update({ 
          full_name: fullName || null, 
          address: address || null 
        })
        .eq('id', data.user.id)
    }

    return { data, error: null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return { user, loading, signIn, signUp, signOut }
}
