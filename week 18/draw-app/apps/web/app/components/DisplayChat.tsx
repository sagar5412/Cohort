"use client"

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket"

export function DisplayChat({ messages, id }: {
    messages: { message: string }[],
    id: string
}) {
    const { socket, loading } = useSocket();
    const [message, setMessage] = useState(messages);
    const [currentMessage, setCurrentMessage] = useState("");
    useEffect(() => {
        if (socket && !loading) {

            socket.send(JSON.stringify({
                type: "join_room",
                roomId: `${id}`,
            }))

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                console.log("parsed data", parsedData);
                if (parsedData.type === "chat") {
                    setMessage(c => [...c, {message:parsedData.message}]);
                }
            }
        }
    }, [socket, loading, id])
    return (
        <div>{message.map((m,i) => <div key={i}>{m.message}</div>)}
            <input type="text" name="" id="" value={currentMessage} onChange={(e) => {
                setCurrentMessage(e.target.value);
            }} />
            <button onClick={() => {
                setMessage(c=>[...c,{message:currentMessage}])
                socket?.send(JSON.stringify({
                    type: "chat",
                    roomId: `${id}`,
                    message: currentMessage
                }))

                setCurrentMessage("");
            }}>Send</button>
        </div>
    );
}