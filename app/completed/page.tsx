"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Completed() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("todos");

    if (saved) {
      const allTodos: Todo[] = JSON.parse(saved);

      const completedTodos = allTodos.filter((todo) => todo.completed);

      setTodos(completedTodos);
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white text-center">
      <Navbar />

      <div className="p-6">
        <motion.h1
          className="text-center mt-5 text-5xl py-8 font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Completed Tasks
        </motion.h1>

        {todos.length === 0 ? (
          <p className="text-gray-400 text-center">No completed tasks yet</p>
        ) : (
          <div className="max-w-xl mx-auto space-y-2">
            {todos.map((todo) => (
              <div key={todo.id} className="bg-zinc-800 p-4 rounded">
                {todo.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
