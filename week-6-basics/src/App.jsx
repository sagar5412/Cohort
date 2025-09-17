import React, { use, useState } from "react";
import { Todos } from "./todos";
import { useEffect } from "react";
import axios from "axios";
function App() {
  // const [title, setTitle] = useState("My name is sagar");

  // function updateTitle() {
  //   setTitle("my name is " + Math.random());
  // }

  const [todo, setTodo] = useState([]);

  // fetch the data from the backend every 5 seconds
  // useEffect(() => {
  //   fetch("http://localhost:3000/todos")
  //     .then(async (res) => {
  //       const data = await res.json();
  //       console.log(data);
  //       setTodo(data.todos);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // using axios to fetch the data from the backend
  useEffect(() => {
    axios.get("http://localhost:3000/todos")
    .then((res)=>{
      setTodo(res.data.todos);
    })
  }, []);



  return (
    <div>
      {todo.map(function (todo) {
        return (
          <div
            key={todo._id}
            style={{ border: "1px solid black", margin: "10px" }}
          >
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </div>
        );
      })}
      {!todo && <div>Loading...</div>}
      {todo && todo.length === 0 && <div>No todos found</div>}
    </div>
  );

  // return (
  <div>
    {/* <HeaderWithButton></HeaderWithButton> */}
    {/* <button onClick={updateTitle}>Update the title</button>

      <Header title={title}></Header>
      <Header title="sagar2"></Header>
      <Header title="sagar3"></Header>
      <Header title="sagar3"></Header>
      <Header title="sagar3"></Header>
      <Header title="sagar3"></Header>
      <br /><br /><br />
      <Todos></Todos> */}

    {/* <CardWrapper innerComponent = {<TextComponent/>}></CardWrapper>
      <CardWrapper innerComponent = {<TextComponent2/>}></CardWrapper> */}
  </div>;
  // );
}

// component to wrap other component
function CardWrapper({ innerComponent }) {
  console.log(innerComponent);
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      {innerComponent}
    </div>
  );
}

function TextComponent() {
  return <div>This is the text component</div>;
}

function TextComponent2() {
  return <div>This is the text component 2</div>;
}

// passing the usestate and function in the child component

// function HeaderWithButton(){
//   const [title, setTitle] = useState("My name is sagar")

//   function updateTitle(){
//     setTitle("my name is "+ Math.random());
//   }

//   return <div>
//     <button onClick={updateTitle}>Update the title</button>
//     <Header title={title}></Header>
//   </div>
// }

// function Header({title}){
//   return <div>
//     {title}
//   </div>
// }

// using React.memo to avoid the re rendering of the component when props are not changed
// const Header = React.memo(function Header({ title }) {
//   return <div>{title}</div>;
// });

export default App;
