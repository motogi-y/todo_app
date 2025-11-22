import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import type { TodoFilter } from './types/todo';
import { cn } from './utils/cn';
import { CheckCircle2, ListTodo, Trash2, Download, Upload } from 'lucide-react';
import { useRef } from 'react';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted, importTodos } = useTodos();
  const [filter, setFilter] = useState<TodoFilter>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'todos.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          importTodos(parsed);
        } else {
          alert('Invalid JSON format');
        }
      } catch (error) {
        console.error('Error importing todos:', error);
        alert('Error importing todos');
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = '';
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
              <CheckCircle2 size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              タスク管理
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            タスクを整理して効率化しましょう
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
              title="エクスポート"
            >
              <Download size={16} />
              エクスポート
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
              title="インポート"
            >
              <Upload size={16} />
              インポート
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
          </div>
        </header>

        <main>
          <TodoInput onAdd={addTodo} />

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
                <button
                  onClick={() => setFilter('all')}
                  className={cn(
                    "px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
                    filter === 'all'
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  すべて
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={cn(
                    "px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
                    filter === 'active'
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  未完了
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={cn(
                    "px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
                    filter === 'completed'
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  完了済み
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <ListTodo size={16} />
                  <span>残り {activeCount} 件</span>
                </div>
                {completedCount > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                    <span>完了済みを削除</span>
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 min-h-[400px] bg-gray-50/30 dark:bg-gray-900/30">
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            </div>
          </div>
        </main>

        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Task Master. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
