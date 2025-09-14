import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");

  function addTodo() {
    setTodos([
      ...todos,
      {
        title: title,
        description: descr,
        completed: false,
      },
    ]);
    setTitle(""); // clear inputs after adding
    setDescr("");
  }

  return (
    <div>
      <input type="text" placeholder="enter title" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <input type="text" placeholder="enter description" value={descr} onChange={(e) => setDescr(e.target.value)}/>
      <button onClick={addTodo}>Add a todo</button>

      {todos.map((todo, index) => (
        <Todo key={index} title={todo.title} description={todo.description} />
      ))}
    </div>
  );
}

function Todo({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{description}</h2>
    </div>
  );
}

export default App;
