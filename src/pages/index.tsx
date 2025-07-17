import { useState, useEffect } from "react";
import { Check, Plus, Calendar, Target } from "lucide-react";
import { useTaskStore } from "@/store/useTaskStore";
import TaskItem from "@/components/TaskItem";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isFormFocused, setIsFormFocused] = useState(false);

  const { tasks, fetchTasks, addTask, toggleTask, deleteTask } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim()) return setError("El título es requerido");
    if (title.trim().length < 3) return setError("El título debe tener al menos 3 caracteres");

    await addTask(title.trim(), description.trim());
    setTitle("");
    setDescription("");
    setError("");
  };

  const sortedTasks = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative 
      overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-blue-400/20
          to-purple-400/20 rounded-full blur-3xl animate-pulse" 
        />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-gradient-to-br from-pink-400/20 
          to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000" 
        />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-br from-green-400/10 
          to-blue-400/10 rounded-full blur-3xl animate-pulse delay-2000" 
        />
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text 
                text-transparent"
              >
                Todo List
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total de tareas</p>
                  <p className="text-2xl font-bold text-gray-800">{totalCount}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completadas</p>
                  <p className="text-2xl font-bold text-gray-800">{completedCount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 
            mb-8 transition-all duration-300 ${isFormFocused ? 'scale-[1.02] shadow-2xl' : ''}`}
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Título de la tarea *
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => setIsFormFocused(true)}
                  onBlur={() => setIsFormFocused(false)}
                  className="w-full border-2 border-gray-200 rounded-2xl px-4 py-4 text-lg focus:ring-4 
                  focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300
                  bg-white/50"
                  placeholder="Ej: Completar proyecto React"
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {error}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Descripción (opcional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-2xl px-4 py-4 text-lg focus:ring-4 
                  focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none transition-all 
                  duration-300 bg-white/50"
                  rows={3}
                  placeholder="Añade detalles sobre tu tarea..."
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 
                rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 
                font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center 
                justify-center gap-3"
              >
                <Plus className="w-5 h-5" />
                Agregar tarea
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {sortedTasks.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex 
                  items-center justify-center mx-auto mb-4"
                >
                  <Target className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No hay tareas aún
                </h3>
                <p className="text-gray-500">
                  Añade tu primera tarea para comenzar
                </p>
              </div>
            ) : (
              sortedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                />
              ))
            )}
          </div>

          {totalCount > 0 && (
            <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">Progreso</span>
                <span className="text-sm font-semibold text-gray-700">
                  {completedCount} de {totalCount}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all 
                  duration-500"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
