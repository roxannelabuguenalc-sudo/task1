import React, { useState, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="relative flex items-center w-full mb-8 group">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task..."
        className="w-full px-5 py-4 text-base text-white bg-zinc-900 border-2 border-zinc-800 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 placeholder-zinc-500 shadow-lg shadow-black/50"
      />
      <button
        onClick={handleSubmit}
        disabled={!inputValue.trim()}
        className="absolute right-2 p-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-purple-900/30"
        aria-label="Add task"
      >
        <Plus size={20} strokeWidth={3} />
      </button>
    </div>
  );
};

export default TodoInput;
