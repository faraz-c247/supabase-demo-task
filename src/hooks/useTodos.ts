import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../supabaseClient'
import type { Todo } from '../types'
import type { User } from '@supabase/supabase-js'

export function useTodos(user: User | null) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false)

  const fetchTodos = useCallback(async () => {
    if (!user) return
    
    setLoading(true)
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('inserted_at', { ascending: false })
    
    if (!error) {
      setTodos(data || [])
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    if (user) {
      fetchTodos()
    } else {
      setTodos([])
    }
  }, [user, fetchTodos])

  const addTodo = async (task: string) => {
    if (!user || !task.trim()) return { error: new Error('Invalid input') }
    
    const { error } = await supabase
      .from('todos')
      .insert([{ task, user_id: user.id }])
    
    if (!error) {
      fetchTodos()
    }
    return { error }
  }

  const toggleComplete = async (id: string, isComplete: boolean) => {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: !isComplete })
      .eq('id', id)
    
    if (!error) {
      fetchTodos()
    }
    return { error }
  }

  const deleteTodo = async (id: string) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
    
    if (!error) {
      fetchTodos()
    }
    return { error }
  }

  return { todos, loading, addTodo, toggleComplete, deleteTodo, refetch: fetchTodos }
}
