import { memo, useCallback, useMemo, useState } from "react";

// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
    const [counter,Setcount] = useState(0);
    const [count2,setCount2] = useState(0);
    const onIncrement = useCallback(()=>{
        console.log("inside increment")

        Setcount(counter=>counter+1)
    },[])

    const onDecrement = useCallback(()=>{
        console.log("inside decrement")
        Setcount(counter=>counter-1)
    },[])

    const demo = useCallback(()=>{
        console.log("inside demo")
        setCount2(count2=>count2+1);
    },[])

    return <div>
        <p>count {count2}</p>
        <Counter2 demo={demo}></Counter2>

        <br />
        <p>Count {counter}</p>

        <CalculateCounter onIncrement = {onIncrement} onDecrement = {onDecrement}></CalculateCounter>
    </div>
}

const CalculateCounter = memo(({onIncrement,onDecrement})=>{
    console.log("inside calculatecounter")
    return <div>
        <button onClick={onIncrement}>Increase count</button>
        <button onClick={onDecrement}>Decrease count</button>
    </div>
})

const Counter2 = memo(({demo})=>{
    console.log("Inside counter 2 demo")
    return <div>
        <button onClick={demo}>Demo</button>
    </div>
})




/*
import { set } from "mongoose";
import { memo, useCallback, useMemo, useState } from "react";

// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {

    function dummy(){
        console.log("inside dummy")
    }
  return (
    <div>
      <Counter2></Counter2>
      <br />
      <CalculateCounter></CalculateCounter>
    </div>
  );
}

const CalculateCounter = memo(() => {
  const [counter, Setcount] = useState(0);

  function onIncrement() {
    console.log("inside increment");

    Setcount((counter) => counter + 1);
  }

  function onDecrement() {
    console.log("inside decrement");
    Setcount((counter) => counter - 1);
  }

  console.log("inside calculatecounter");
  return (
    <div>
      <p>Count {counter}</p>
      <button onClick={onIncrement}>Increase count</button>
      <button onClick={onDecrement}>Decrease count</button>
    </div>
  );
});

const Counter2 = memo(({ demo }) => {
  const [count2, setCount2] = useState(0);

  function demo() {
    console.log("inside demo");
    setCount2(count2 + 1);
  }

  console.log("Inside counter 2 demo");
  return (
    <div>
      <p>count {count2}</p>
      <button onClick={demo}>Demo</button>
    </div>
  );
});

*/ 