import React, { useState, useEffect, useCallback } from 'react';
import { Task } from './types';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import { ListTodo } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'neon-tasker-data';

const App: React.FC = () => {
  // Initialize state lazily from localStorage to avoid flash of empty content
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse tasks", e);
      return [];
    }
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Save to local storage whenever tasks change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const addTask = useCallback((text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const activeTasksCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 mb-6 shadow-xl shadow-black/50 group hover:border-purple-500/50 transition-all duration-300">
             <ListTodo className="text-purple-500 group-hover:scale-110 transition-transform duration-300" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            Tasks
          </h1>
          <p className="text-zinc-500">
            {activeTasksCount === 0 
              ? "All caught up!" 
              : `You have ${activeTasksCount} pending ${activeTasksCount === 1 ? 'task' : 'tasks'}`
            }
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-zinc-950/50 backdrop-blur-sm rounded-3xl p-2 sm:p-0">
          
          <TodoInput onAdd={addTask} />

          <div className="space-y-1">
            {tasks.length === 0 ? (
              <div className="text-center py-12 bg-zinc-900/50 rounded-2xl border border-zinc-800/50 border-dashed">
                <p className="text-zinc-600">No tasks yet. Add one above!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))
            )}
          </div>

          {tasks.length > 0 && (
             <div className="mt-8 text-center">
                <p className="text-xs text-zinc-700 uppercase tracking-widest font-semibold">
                   {tasks.filter(t => t.completed).length} / {tasks.length} Completed
                </p>
                <div className="w-full bg-zinc-900 h-1 mt-4 rounded-full overflow-hidden">
                   <div 
                      className="bg-purple-600 h-full transition-all duration-500 ease-out"
                      style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
                   />
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
