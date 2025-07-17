import { Task } from "@/types/task";
import { Check, Trash2 } from "lucide-react";
interface TaskItemProps {
    task: Task;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
}
export default function TaskItem({ task, toggleTask, deleteTask }: TaskItemProps) {
    return (
        <div className={`group relative overflow-hidden rounded-2xl backdrop-blur-sm transition-all 
                duration-300 hover:scale-[1.02] hover:shadow-xl mb-4 
                ${task.completed
                ? 'bg-white/40 border border-green-200/50'
                : 'bg-white/60 border border-white/50 hover:bg-white/70'
            }
            `}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            <div className="relative p-6 flex items-start gap-4">
                <button
                    onClick={() => toggleTask(task.id)}
                    className={`relative flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${task.completed
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 scale-110'
                        : 'border-gray-300 hover:border-blue-500 hover:scale-110'
                        }`}
                >
                    {task.completed && (
                        <Check className="w-4 h-4 text-white animate-in fade-in duration-200" />
                    )}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 transition-opacity duration-300 ${task.completed ? 'opacity-20' : ''
                        }`} />
                </button>

                <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-semibold transition-all duration-300 ${task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800 group-hover:text-gray-900"
                        }`}>
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className={`text-sm mt-1 transition-all duration-300 ${task.completed
                            ? "text-gray-400 line-through"
                            : "text-gray-600 group-hover:text-gray-700"
                            }`}>
                            {task.description}
                        </p>
                    )}
                </div>

                <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 rounded-full 
                    hover:bg-red-50 text-red-500 hover:text-red-700 hover:scale-110"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}