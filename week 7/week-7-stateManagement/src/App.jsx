import { useState } from "react";
import { countAtom } from "./store/atoms/count";
import { evenSelector } from "./store/selectors/evenCount";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import { CountContext } from "./context";
import { useContext } from "react";

function App() {
  // const [count, setCount] = useState(0);
  console.log("main function rendered");
  return (
    <div>
      {/* <CountContext.Provider value={{count,setCount}}> */}
      <RecoilRoot>
        <Counter></Counter>
      </RecoilRoot>
      {/* </CountContext.Provider> */}
    </div>
  );
}

function Counter() {
  console.log("Counter");
  return (
    <div>
      <CountRender></CountRender>
      <CounterButton></CounterButton>
      <EvenCounter></EvenCounter>
    </div>
  );
}

function CountRender() {
  console.log("CountRendered");
  const count = useRecoilValue(countAtom);
  return <div>{count}</div>;
}

function EvenCounter() {
  const count = useRecoilValue(evenSelector);
  console.log("Even counter");
  return <div>{count % 2 == 0 ? "It is even" : null}</div>;
}

function CounterButton() {
  console.log("Button Rendered");
  // const [count, setCount] = useRecoilState(countAtom);
  const setCount = useSetRecoilState(countAtom);
  return (
    <div>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Increase
      </button>
      <button
        onClick={() => {
          setCount((count) => count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}
export default App;
