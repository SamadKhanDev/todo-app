"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";

type Todo = {
  id: number;
  text: string;
  description?: string;
  completed: boolean;
};

export default function TaskPage() {
  const params = useParams();
  const id = params?.id;

  const [task, setTask] = useState<Todo | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("todos");

    if (saved && id) {
      const todos: Todo[] = JSON.parse(saved);

      // 🔥 IMPORTANT FIX HERE
      const found = todos.find((t) => t.id === Number(id));

      setTask(found || null);
    }
  }, [id]);

  if (!task) {
    
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-6">
        <Navbar />
        <p className="text-center mt-10">Task not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <Navbar />

      <div className="max-w-xl mx-auto mt-10 bg-zinc-800 p-6 rounded">
        <h1 className="text-2xl font-bold">{task.text}</h1>

        <p className="mt-2 text-gray-400">
          {task.completed ? "Completed" : "Pending"}
        </p>

        {task.description && (
          <p className="mt-4 text-gray-300">{task.description}</p>
        )}
      </div>
    </div>
  );
}
