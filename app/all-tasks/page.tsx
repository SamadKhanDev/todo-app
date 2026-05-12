"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { triggerTodoUpdate } from "@/lib/todoSync";
import { motion } from "framer-motion";
import Link from "next/link";

type Todo = {
  id: number;
  text: string;
  description?: string;
  completed: boolean;
};

export default function AllTasks() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  const [descInputs, setDescInputs] = useState<{ [key: number]: string }>({});
  const [showDesc, setShowDesc] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  const saveToStorage = (data: Todo[]) => {
    setTodos(data);
    localStorage.setItem("todos", JSON.stringify(data));
    triggerTodoUpdate();
  };

  const deleteTodo = (id: number) => {
    const updated = todos.filter((todo) => todo.id !== id);
    saveToStorage(updated);
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditedText(todo.text);
  };

  const saveEdit = (id: number) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editedText } : todo,
    );

    saveToStorage(updated);
    setEditingId(null);
    setEditedText("");
  };

  const toggleComplete = (id: number) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    saveToStorage(updated);
  };

  const saveDescription = (id: number) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, description: descInputs[id] || "" } : todo,
    );

    saveToStorage(updated);
  };

  const toggleDescription = (id: number) => {
    setShowDesc((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="p-6">
        <motion.h1
          className="text-center mt-5 mb-10 text-5xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          All Tasks
        </motion.h1>

        {todos.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks yet</p>
        ) : (
          <div className="max-w-xl mx-auto space-y-4">
            {todos.map((todo) => (
              <div key={todo.id} className="bg-zinc-800 p-4 rounded">
                {/* TASK ROW */}
                <div className="flex justify-between items-center">
                  {/* LEFT */}
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                      className="w-5 h-5"
                    />

                    {editingId === todo.id ? (
                      <input
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="bg-zinc-900 text-white p-2 rounded flex-1 border border-zinc-700"
                      />
                    ) : (
                      // 🔥 CLICKABLE TASK (DYNAMIC ROUTE)
                      <Link href={`/task/${todo.id}`}>
                        <span
                          className={
                            todo.completed
                              ? "line-through text-gray-400 cursor-pointer"
                              : "cursor-pointer"
                          }
                        >
                          {todo.text}
                        </span>
                      </Link>
                    )}
                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-2 ml-3">
                    {editingId === todo.id ? (
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="bg-green-600 px-3 py-1 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(todo)}
                        className="bg-amber-400 text-black px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="bg-rose-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* DESCRIPTION TOGGLE */}
                <button
                  onClick={() => toggleDescription(todo.id)}
                  className="mt-3 text-sm text-blue-400 hover:text-blue-300"
                >
                  {showDesc[todo.id] ? "Hide Description" : "Show Description"}
                </button>

                {/* DESCRIPTION AREA */}
                {showDesc[todo.id] && (
                  <div className="mt-2">
                    <textarea
                      placeholder="Write description..."
                      value={descInputs[todo.id] ?? todo.description ?? ""}
                      onChange={(e) =>
                        setDescInputs({
                          ...descInputs,
                          [todo.id]: e.target.value,
                        })
                      }
                      className="w-full p-2 text-sm rounded bg-zinc-900 text-white border border-zinc-700"
                    />

                    <button
                      onClick={() => saveDescription(todo.id)}
                      className="mt-2 bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
                    >
                      Save Description
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
