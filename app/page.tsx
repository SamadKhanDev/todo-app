"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/finisher-header.es5.min.js";
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      if (window.FinisherHeader) {
        // @ts-ignore
        new window.FinisherHeader({
          count: 100,
          size: { min: 2, max: 8, pulse: 0 },
          speed: {
            x: { min: 0, max: 0.4 },
            y: { min: 0, max: 0.6 },
          },
          colors: {
            background: "#201e30",
            particles: ["#fbfcca", "#d7f3fe", "#ffd0a7"],
          },
          blending: "overlay",
          opacity: { center: 1, edge: 0 },
          skew: -2,
          shapes: ["c"],
        });
      }
    };

    document.body.appendChild(script);
  }, []);

  const addTodo = () => {
    if (!input.trim()) return;

    const saved = localStorage.getItem("todos");
    const todos: Todo[] = saved ? JSON.parse(saved) : [];

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    const updated = [...todos, newTodo];

    localStorage.setItem("todos", JSON.stringify(updated));

    setMessage(`Task: "${input}" added successfully!`);
    setInput("");

    setTimeout(() => setMessage(""), 3000);
  };

  const clearInput = () => {
    setInput("");
    setMessage("");
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      

      {/* BACKGROUND (FIXED CLICK ISSUE) */}
      <div className="finisher-header fixed inset-0 w-full h-[225px] z-0 pointer-events-none" />

   
      {/* CONTENT */}
      <div className="relative z-10">
 <Navbar />
        <motion.h1
          className="text-center mt-10 text-5xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ToDo App
        </motion.h1>

        <div className="max-w-xl mx-auto p-6 mt-10">

          <div className="flex gap-2">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a task..."
              className="flex-1 p-3 rounded bg-white text-black"
            />

            <button
              onClick={addTodo}
              className="bg-indigo-600 px-4 py-3 rounded hover:bg-indigo-700"
            >
              Add
            </button>

            <button
              onClick={clearInput}
              className="bg-red-500 px-4 py-3 rounded hover:bg-red-600"
            >
              Clear
            </button>

          </div>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-green-400 text-center"
            >
              {message}
            </motion.p>
          )}

        </div>

      </div>
    </div>
  );
}