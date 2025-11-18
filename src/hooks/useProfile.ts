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

  const uploadAvatar = async (file: File) => {
    if (!user) return { error: new Error('No user logged in') }

    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Math.random()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath)

      // Update profile with avatar URL
      const { data, error } = await updateProfile({ avatar_url: publicUrl })

      return { data, error, publicUrl }
    } catch (error: any) {
      return { error }
    }
  }

  const deleteAvatar = async (avatarUrl: string) => {
    if (!user) return { error: new Error('No user logged in') }

    try {
      // Extract file path from URL
      const urlParts = avatarUrl.split('/profile-images/')
      if (urlParts.length < 2) {
        throw new Error('Invalid avatar URL')
      }
      const filePath = urlParts[1]

      // Delete file from storage
      const { error: deleteError } = await supabase.storage
        .from('profile-images')
        .remove([filePath])

      if (deleteError) {
        throw deleteError
      }

      // Update profile to remove avatar URL
      const { data, error } = await updateProfile({ avatar_url: null })

      return { data, error }
    } catch (error: any) {
      return { error }
    }
  }

  return { 
    profile, 
    loading, 
    updateProfile, 
    uploadAvatar, 
    deleteAvatar,
    refetch: fetchProfile 
  }
}
