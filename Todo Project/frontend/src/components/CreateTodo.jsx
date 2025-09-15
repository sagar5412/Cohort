import { useState } from "react";

export function CreateTodo() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  return (
    <div>
      <input type="text" name="" id="" placeholder="Enter title" onChange={function(e){
        const value = e.target.value;
        setTitle(value);
      }}/>
      <input type="text" name="" id="" placeholder="Enter description" onChange={function(e){
        const value = e.target.value;
        setDescription(value);
      }}/>

      <button onClick={()=>{
        fetch("http://localhost:3000/todo", {
            method:"POST",
            body: JSON.stringify({
                title:title,
                description:description
            }),
                headers:{
                    "content-type":"application/json"
                }
        })
        .then(async function(res){
            const json = await res.json();
            alert("Todo added");
        })
      }}>Add a todo</button>
    </div>
  );
}
