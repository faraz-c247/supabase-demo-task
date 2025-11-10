import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../supabaseClient'
import type { Profile } from '../types'
import type { User } from '@supabase/supabase-js'

export function useProfile(user: User | null) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchProfile = useCallback(async () => {
    if (!user) return
    
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
    if (!error && data) {
      setProfile(data)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    if (user) {
      fetchProfile()
    } else {
      setProfile(null)
    }
  }, [user, fetchProfile])

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') }
    
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()
    
    if (!error && data) {
      setProfile(data)
    }
    setLoading(false)
    
    return { data, error }
  }

  return { profile, loading, updateProfile, refetch: fetchProfile }
}
