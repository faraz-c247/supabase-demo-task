import type { Todo } from '../../types'
import './Todos.css'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, isComplete: boolean) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className={`todo-item ${todo.is_complete ? 'completed' : ''}`}>
      <div className="todo-content" onClick={() => onToggle(todo.id, todo.is_complete)}>
        <div className={`todo-checkbox ${todo.is_complete ? 'checked' : ''}`}>
          {todo.is_complete && (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path 
                d="M1 5L4.5 8.5L11 1.5" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className="todo-text">{todo.task}</span>
      </div>
      <button 
        className="btn-delete"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path 
            d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0v9.333a1.333 1.333 0 01-1.334 1.334H4.667a1.333 1.333 0 01-1.334-1.334V4h9.334z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
