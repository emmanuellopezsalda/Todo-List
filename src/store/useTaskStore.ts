import { create } from 'zustand';
import { Task } from '@/types/task';

interface TaskState {
    tasks: Task[];
    fetchTasks: () => Promise<void>;
    addTask: (title: string, description?: string) => Promise<void>;
    toggleTask: (id: string) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],

    fetchTasks: async () => {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        set({ tasks: data });
    },

    addTask: async (title, description = '') => {
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description }),   
        });
        const newTask = await res.json();
        set((state) => ({ tasks: [newTask, ...state.tasks] }));
    },

    toggleTask: async (id) => {
        const res = await fetch(`/api/tasks/${id}`, { method: 'PATCH' });
        const updated = await res.json();
        set((state) => ({
            tasks: state.tasks.map((t) => (t.id === id ? updated : t)),
        }));
    },

    deleteTask: async (id) => {
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
    },
}));
