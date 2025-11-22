import React from 'react';
import type { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import { AnimatePresence, motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, title: string, description?: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onUpdate }) => {
    if (todos.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center text-gray-500 dark:text-gray-400"
            >
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                    <ClipboardList size={48} className="text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">タスクがありません</h3>
                <p className="max-w-xs mx-auto">
                    新しいタスクを追加して始めましょう！
                </p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-3">
            <AnimatePresence mode="popLayout">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
