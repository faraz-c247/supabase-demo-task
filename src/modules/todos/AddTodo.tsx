import { useState } from 'react'
import './Todos.css'

interface AddTodoProps {
  onAdd: (task: string) => Promise<any>
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [task, setTask] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!task.trim()) return

    setLoading(true)
    await onAdd(task)
    setTask('')
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="What needs to be done?"
        className="add-todo-input"
        disabled={loading}
      />
      <button 
        type="submit" 
        className="btn btn-add"
        disabled={loading || !task.trim()}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path 
            d="M10 4v12M4 10h12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
        Add
      </button>
    </form>
  )
}
