"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {

  const [title, setTitle] = useState("");

  const [todos, setTodos] =
    useState<Todo[]>([]);

  async function loadTodos() {
    const res =
      await fetch("/api/todos");

    const data = await res.json();

    setTodos(data);
  }

  async function addTodo() {

    if (!title.trim()) return;

    await fetch("/api/todos", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        title,
      }),
    });

    setTitle("");

    loadTodos();
  }

  async function deleteTodo(id: number) {

    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });

    loadTodos();
  }

  async function completeTodo(id: number) {

    await fetch(`/api/todos/${id}`, {
      method: "PATCH",
    });

    loadTodos();
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        Todo App
      </h1>

      <div className="flex gap-2 mb-6">

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="border p-2 flex-1"
          placeholder="New todo"
        />

        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4"
        >
          Add
        </button>

      </div>

      <ul className="space-y-2">

        {todos.map((todo) => (

          <li
            key={todo.id}
            className="border p-3 flex justify-between"
          >

            <span
              className={
                todo.completed
                  ? "line-through text-gray-500"
                  : ""
              }
            >
              {todo.title}
            </span>

            <div className="space-x-2">

              {!todo.completed && (
                <button
                  onClick={() =>
                    completeTodo(todo.id)
                  }
                  className="bg-green-500 text-white px-2"
                >
                  Done
                </button>
              )}

              <button
                onClick={() =>
                  deleteTodo(todo.id)
                }
                className="bg-red-500 text-white px-2"
              >
                Delete
              </button>

            </div>

          </li>

        ))}

      </ul>

    </main>
  );
}