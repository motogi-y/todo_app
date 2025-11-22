import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../utils/cn';

interface TodoInputProps {
    onAdd: (title: string, description?: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title, description);
        setTitle('');
        setDescription('');
        setIsExpanded(false);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
            <div className={cn(
                "bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700",
                isExpanded ? "p-6" : "p-2"
            )}>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={cn(
                            "p-2 rounded-full transition-colors duration-200",
                            isExpanded ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
                        )}
                    >
                        <Plus size={24} className={cn("transition-transform duration-300", isExpanded && "rotate-45")} />
                    </button>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={() => setIsExpanded(true)}
                        placeholder="タスクを入力してください"
                        className="flex-1 bg-transparent text-lg font-medium placeholder:text-gray-400 focus:outline-none dark:text-white"
                    />
                    {!isExpanded && (
                        <button
                            type="submit"
                            disabled={!title.trim()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            追加
                        </button>
                    )}
                </div>

                {isExpanded && (
                    <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="説明を追加（任意）"
                            className="w-full p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none h-24 transition-all dark:text-gray-300"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsExpanded(false)}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                キャンセル
                            </button>
                            <button
                                type="submit"
                                disabled={!title.trim()}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
                            >
                                タスクを追加
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
};
