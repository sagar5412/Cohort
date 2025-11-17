import WebSocket = require("ws");
import WebSocketServer = require("ws");
const ws = new WebSocketServer.Server({ port: 8080 });

interface User {
    socket: WebSocket,
    room: string
}

let allSocket: User[] = [];

ws.on("connection", (socket) => {
    console.log("Connected");

    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message as unknown as string)
        if (parsedMessage.type === "join") {
            allSocket.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }

        if (parsedMessage.type === "chat") {
            const currentSocket = allSocket.find(x => x.socket === socket);
            if (!currentSocket) return;
            allSocket
                .filter(s => s.room === currentSocket.room)
                .forEach(s => s.socket.send(parsedMessage.payload.message));
        }

    })
})