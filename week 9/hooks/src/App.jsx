import "./App.css";
import { DataFetching } from "./DataFetchingHooks";
import { CheckStatus } from "./BrowserFunctionality";
import { useDebounce } from "./Debounced";
import { useState } from "react";
// This can be done with swr 


function App() {
  const [value,setValue] = useState("");
  const debouncedValue = useDebounce(value,500);
    // const isOnline = CheckStatus();
    // if(isOnline){
    //   return "You are online"
    // }
  return <div>
    {/* <DataFetching></DataFetching> */}
    {/* you are offline */}
    Enter value {debouncedValue}
    <input type="text" onChange={(e)=>{
      setValue(e.target.value);
    }}/>
    </div>
}
export default App; 