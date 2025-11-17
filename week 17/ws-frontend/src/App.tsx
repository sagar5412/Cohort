import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [received,setreceived] = useState("");

  function SendMessage() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(data);
    } else {
      alert("WebSocket is not connected.");
    }
  }

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    setSocket(socket);
    socket.onmessage = (event) => {
      console.log(event.data);
      setreceived(event.data);
    };
  }, []);
  
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
      <button onClick={SendMessage}>Send</button>
      <br />
      <div >{received}</div>
    </div>
  );
}

export default App;
