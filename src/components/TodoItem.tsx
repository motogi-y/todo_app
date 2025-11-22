import React, { useState } from 'react';
import { Check, Trash2, Edit2, X, Save, ChevronDown, ChevronUp } from 'lucide-react';
import type { Todo } from '../types/todo';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, title: string, description?: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(todo.description || '');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSave = () => {
        if (!editTitle.trim()) return;
        onUpdate(todo.id, editTitle, editDescription);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(todo.title);
        setEditDescription(todo.description || '');
        setIsEditing(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className={cn(
                "group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200",
                todo.completed && "bg-gray-50 dark:bg-gray-800/50"
            )}
        >
            <div className="p-4 flex items-start gap-4">
                <button
                    onClick={() => onToggle(todo.id)}
                    className={cn(
                        "mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 flex-shrink-0",
                        todo.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-300 text-transparent hover:border-green-500"
                    )}
                >
                    <Check size={14} strokeWidth={3} />
                </button>

                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                autoFocus
                            />
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder="説明（任意）"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20 dark:text-white"
                            />
                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={handleCancel}
                                    className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <X size={18} />
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                >
                                    <Save size={18} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-start justify-between gap-2">
                                <h3 className={cn(
                                    "text-lg font-medium text-gray-900 dark:text-white transition-all duration-200",
                                    todo.completed && "text-gray-400 dark:text-gray-500 line-through"
                                )}>
                                    {todo.title}
                                </h3>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(todo.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            {todo.description && (
                                <div className="mt-1">
                                    <p className={cn(
                                        "text-gray-600 dark:text-gray-300 text-sm transition-all duration-200 line-clamp-2",
                                        todo.completed && "text-gray-400 dark:text-gray-500",
                                        isExpanded && "line-clamp-none"
                                    )}>
                                        {todo.description}
                                    </p>
                                    {todo.description.length > 100 && (
                                        <button
                                            onClick={() => setIsExpanded(!isExpanded)}
                                            className="mt-1 text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1"
                                        >
                                            {isExpanded ? (
                                                <>閉じる <ChevronUp size={12} /></>
                                            ) : (
                                                <>もっと見る <ChevronDown size={12} /></>
                                            )}
                                        </button>
                                    )}
                                </div>
                            )}
                            <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                                {new Date(todo.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
