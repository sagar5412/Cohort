import React from "react";
let counter=4;
export function Todos() {
  const [todos, setTodos] = React.useState([
    { id: 1, title: "Learn React", description: "Basics of React" },
    { id: 2, title: "Learn Redux", description: "Basics of Redux" },
    { id: 3, title: "Learn JavaScript", description: "Basics of JS" },
  ]);
  function addTodo(){
    setTodos([...todos,{
        id:counter++,
        title:"Learn Full Stack",
        description:"Advance Full stack"
    }])
  }
  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      {todos.map(function (todo) {
        return <Todo
          key={todo.id}
          title={todo.title}
          description={todo.description}
        ></Todo>;
      })}
    </div>
  );
}

function Todo({ title, description }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
