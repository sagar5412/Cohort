import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [data, setData] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  function SendMessage() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: data,
          },
        })
      );
    }
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (event) => {
      console.log(event.data);
      setMessages((m) => [...m, event.data]);
    };

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };
  }, []);

  return (
    <div className="h-screen bg-gray-700 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, i) => (
          <div key={i} className="m-8">
            <span className="bg-white text-black rounded p-3">{message}</span>
          </div>
        ))}
      </div>

      <div className="w-full bg-white flex p-2 gap-2">
        <input
          onChange={(e) => {
            setData(e.target.value);
          }}
          type="text"
          className="flex-1 p-3 border rounded"
        />
        <button
          onClick={SendMessage}
          className="px-6 py-3 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
