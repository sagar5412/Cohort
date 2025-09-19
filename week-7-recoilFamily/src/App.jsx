import { RecoilRoot, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { todoAtom } from "./atom";
import "./App.css";
import { Suspense } from "react";

function App() {
  return (
    <>
      <RecoilRoot>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
          <Todo id={1} />
          <Todo id={2} />
          <Todo id={3} />
          <Todo id={2} />
          <Todo id={1} />
          <Todo id={3} />
          <Todo id={3} />
        {/* </Suspense> */}
      </RecoilRoot>
    </>
  );
}

// function Todo({id}){
//   console.log(`run by ${id}`)
//   const currectTodo = useRecoilValue(todoAtom(id));
//   return <div>
//      {currectTodo.title} <br />
//      {currectTodo.description}
//   </div>
// }

function Todo({ id }) {
  // console.log(`run by ${id}`)
  const currectTodo = useRecoilValueLoadable(todoAtom(id));
  console.log(currectTodo.state);
  if (currectTodo.state == "loading") {
    return <div>loading...</div>;
  } else if(currectTodo.state=="hasValue"){
    return (
    <div>
      {currectTodo.contents.notification} <br />
      {currectTodo.contents.messages} <br /><br />
    </div>
  );
  } 
}

export default App;
