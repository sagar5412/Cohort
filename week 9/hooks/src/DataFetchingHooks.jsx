import { useEffect, useState } from "react";
import axios from "axios";

export function DataFetching() {
  const { todos, loading } = useTodos(5);

  if (loading) {
    return <div>Laoding...</div>;
  }
  return (
    <>
      {todos.map((todo) => {
        <Track todo={todo} />;
      })}
    </>
  );
}

function Track({ todo }) {
  return (
    <div>
      {todo.title}
      <br />
      {todo.description}
    </div>
  );
}

function useTodos(n) {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const value = setInterval(() => {
      axios.get("http://localhost:3000/todos").then((res) => {
        setTodos(res.data.todos);
        setLoading(false);
      });
    }, n * 1000);
    axios.get("http://localhost:3000/todos").then((res) => {
      setTodos(res.data.todos);
      setLoading(false);
    });

    return () => {
      clearInterval(value);
    };
  }, [n]);

  return {
    todos,
    loading,
  };
}
