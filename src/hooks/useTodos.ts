import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Todo } from '../types/todo';

const STORAGE_KEY = 'todo-app-data';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse todos from local storage', e);
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = (title: string, description?: string) => {
        const newTodo: Todo = {
            id: uuidv4(),
            title,
            description,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setTodos((prev) => [newTodo, ...prev]);
    };

    const toggleTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
                    : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const updateTodo = (id: string, title: string, description?: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        title,
                        description,
                        updatedAt: new Date().toISOString(),
                    }
                    : todo
            )
        );
    };

    const clearCompleted = () => {
        setTodos((prev) => prev.filter((todo) => !todo.completed));
    };

    const importTodos = (newTodos: Todo[]) => {
        setTodos(newTodos);
    };

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        clearCompleted,
        importTodos,
    };
};
