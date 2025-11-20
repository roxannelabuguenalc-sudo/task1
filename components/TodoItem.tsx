import React from 'react';
import { Trash2, Check } from 'lucide-react';
import { Task } from '../types';

interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div
      className={`group flex items-center justify-between p-4 mb-3 rounded-xl border border-zinc-800/50 transition-all duration-300 hover:border-purple-500/30 hover:bg-zinc-900/80 ${
        task.completed ? 'bg-zinc-900/30' : 'bg-zinc-900'
      }`}
    >
      <div className="flex items-center flex-1 gap-4 min-w-0">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
            task.completed
              ? 'bg-purple-600 border-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.5)]'
              : 'border-zinc-600 hover:border-purple-400 bg-transparent'
          }`}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          <Check
            size={14}
            className={`text-white transform transition-transform duration-200 ${
              task.completed ? 'scale-100' : 'scale-0'
            }`}
            strokeWidth={4}
          />
        </button>
        
        <span
          className={`text-base font-medium truncate transition-all duration-300 cursor-pointer select-none ${
            task.completed
              ? 'text-zinc-500 line-through decoration-zinc-600'
              : 'text-zinc-100'
          }`}
          onClick={() => onToggle(task.id)}
        >
          {task.text}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="ml-3 p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 transform group-hover:translate-x-0 translate-x-2"
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TodoItem;
