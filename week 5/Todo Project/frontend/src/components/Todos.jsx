export function Todos({ todos }) {
  async function markAsComplete(id) {
    await fetch("http://localhost:3000/completed", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  }

  return (
    <div>
      {todos.map(function (todo) {
        return (
          <div>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button
              onClick={() => {
                markAsComplete(todo._id);
              }}
              disabled={todo.completed}
            >
              {todo.completed == true ? "completed" : "complete"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
