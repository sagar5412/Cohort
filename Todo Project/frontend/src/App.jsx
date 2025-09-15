import { useState } from "react";
import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";
function App() {
  const [todos, setTodos] = useState([]);

  async function fetchTodos() {
    const res = await fetch("http://localhost:3000/todos");
    const json = await res.json();
    setTodos(json.todos);
  }

  function clearTodos(){
    setTodos([]);
  }

  return (
    <div>
      <CreateTodo></CreateTodo>
      <button onClick={fetchTodos}>View Todos</button>
      <button onClick={clearTodos}>Clear page</button>
      <Todos todos={todos}></Todos>
    </div>
  );
}

export default App;
