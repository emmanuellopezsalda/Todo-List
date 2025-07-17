# Todo App – Prueba Técnica Next.js + TypeScript

Este proyecto es el resultado de una prueba técnica para el rol de **Programador Junior**. Consiste en una aplicación web tipo **To-Do List**.

## Tecnologías utilizadas

- **Next.js** 
- **TypeScript** 
- **Zustand** 
- **Tailwind CSS** 
- **Prisma ORM**
- **SQLite**

## Funcionalidades

- Crear tareas
- Ver lista de tareas
- Marcar tareas como completadas
- Eliminar tareas
- Ordenar tareas (pendientes arriba, completadas abajo)
- Estadísticas de tareas totales y completadas
- Barra de progreso visual
- Persistencia con base de datos usando Prisma
- Estilos modernos y responsive con Tailwind

## Estructura del proyecto

```text
├── prisma/
│   └── schema.prisma          # Modelo de base de datos (Prisma + SQLite)
├── src/
│   ├── components/
│   │   └── TaskItem.tsx       # Componente de tarea individual
│   ├── lib/
│   │   ├── prisma.ts          # Cliente de Prisma
│   │   └── db.ts              # Funciones de acceso a la base de datos
│   ├── pages/
│   │   ├── api/
│   │   │   └── tasks/         # Endpoints REST (GET, POST, PATCH, DELETE)
│   │   ├── _app.tsx           # Configuración global de la app
│   │   ├── _document.tsx      # Documento HTML base
│   │   └── index.tsx          # Página principal con formulario y lista
│   ├── store/
│   │   └── useTaskStore.ts    # Estado global usando Zustand
│   ├── types/
│   │   └── task.ts            # Tipado de la entidad Task
│   └── styles/
│       └── globals.css        # Estilos globales y utilitarios
```

## Instalación y ejecución

1. Clona el repositorio:

git clone https://github.com/emmanuellopezsalda/Todo-List.git
cd todo-app

2. Instala las dependencias:

npm install

3. Prepara la base de datos:

npx prisma db push

4. Inicia el servidor de desarrollo:

npm run dev

La app estará disponible en: http://localhost:3000


👨‍💻 Autor
Emmanuel López Saldarriaga
GitHub: https://github.com/emmanuellopezsalda
