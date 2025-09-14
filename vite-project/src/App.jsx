import { useState } from 'react'
import './App.css'

function App() {
  const [count, counter] = useState(0)
  
  return (
    <div>
      <CustomButton count={count} counter={counter}></CustomButton>
    </div>
  )
}

function CustomButton(props){
  function onClickHandler(){
    props.counter(props.count+1);
  }

  return <button onClick={onClickHandler}>
    Counter {props.count}
  </button>
}

export default App
