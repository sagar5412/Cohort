import { memo, use, useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function App() {
  // const [SelectedID, setSelectedID] = useState(1);

  const [counter, setCounter] = useState(0);
  // const [inputValue, setValue] = useState(1);

  // Memoization
  // let finalCount = useMemo(() => {
  //   let count = 0;
  //   for (let i = 0; i <= inputValue; i++) {
  //     count += i;
  //   }
  //   return count;
  // }, [inputValue]);

  // Callbacks

  const inputFunction = useCallback(() => {
    console.log("Function called");
  }, []);

  return (
    <div>
      {/* <button onClick={function(){
        setSelectedID(1);
      }}>1</button>
      <button onClick={function(){
        setSelectedID(2);
      }}>2</button>
      <button onClick={function(){
        setSelectedID(3);
      }}>3</button>
      <button onClick={function(){
        setSelectedID(4);
      }}>4</button>
      <Todo id={SelectedID}/> */}

      {/* <input
        type="text"
        onChange={function (e) {
          setValue(e.target.value);
        }}
      />{" "}
      <br />
      Sum from 1 to {inputValue} is {finalCount};
      <br />
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Counter ({counter})
      </button> */}

      <ButtonComponent inputFunction={inputFunction}></ButtonComponent>
      <button
        onClick={() => {
          setCounter(counter + 1);
          console.log("button is clicked");
        }}
      >
        Counter {counter}
      </button>
    </div>
  );
}

const ButtonComponent = memo(({ inputFunction }) => {
  console.log("childer render");
  return (
    <div>
      <button onClick={inputFunction}>clicked</button>
    </div>
  );
});

function Todo({ id }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/todos?id=" + id)
      .then((res) => {
        setTodos(res.data.todo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <h1>{todos.title}</h1>
      <h3>{todos.description}</h3>
    </div>
  );
}

export default App;
