import type { Todo } from '../../types'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import './Todos.css'

interface TodoListProps {
  todos: Todo[]
  loading: boolean
  onAdd: (task: string) => Promise<any>
  onToggle: (id: string, isComplete: boolean) => void
  onDelete: (id: string) => void
}

export default function TodoList({ todos, loading, onAdd, onToggle, onDelete }: TodoListProps) {
  const completedCount = todos.filter(t => t.is_complete).length
  const totalCount = todos.length

  return (
    <div className="todos-container">
      <div className="todos-header">
        <h2 className="todos-title">My Tasks</h2>
        <div className="todos-stats">
          <span className="stat-badge">{completedCount}/{totalCount} completed</span>
        </div>
      </div>

      <AddTodo onAdd={onAdd} />

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your tasks...</p>
        </div>
      ) : todos.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="#e2e8f0" strokeWidth="4"/>
            <path 
              d="M32 20v24M20 32h24" 
              stroke="#cbd5e0" 
              strokeWidth="4" 
              strokeLinecap="round"
            />
          </svg>
          <h3>No tasks yet</h3>
          <p>Add your first task to get started!</p>
        </div>
      ) : (
        <div className="todos-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
