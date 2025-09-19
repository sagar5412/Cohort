import React, { useState, useEffect, useCallback, useMemo, useRef, memo } from "react";

// 🔹 Child component - memoized
const TodoItem = memo(({ todo, onDelete }) => {
  console.log("Rendering TodoItem:", todo.text);

  return (
    <li>
      {todo.text}
      <button style={{
        margin:10
      }} onClick={() => onDelete(todo.id)}>❌</button>
    </li>
  );
});

// 🔹 Another child (memoized) that shows stats
const TodoStats = memo(({ todos }) => {
  console.log("Rendering TodoStats");

  // useMemo → compute stats only when todos change
  const total = useMemo(() => todos.length, [todos]);
  const longTodos = useMemo(
    () => todos.filter((t) => t.text.length > 5).length,
    [todos]
  );

  return (
    <p>
      Total: {total} | Long Todos: {longTodos}
    </p>
  );
});

export default function App() {
  const [todos, setTodos] = useState(() => {
    // Load from localStorage on first render
    return JSON.parse(localStorage.getItem("todos")) || [];
  });
  const [text, setText] = useState("");

  const inputRef = useRef();

  // 🔹 useEffect → Save todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 🔹 useCallback → Stable add & delete functions
  const addTodo = useCallback(() => {
    if (text.trim() === "") return;
    setTodos((prev) => [...prev, { id: Date.now(), text }]);
    setText("");
    inputRef.current.focus(); // useRef → focus input after add
  }, [text]);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div>
      <h1>✅ Todo App</h1>

      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
        ))}
      </ul>

      <TodoStats todos={todos} />
    </div>
  );
}
