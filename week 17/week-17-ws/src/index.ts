import WebSocketServer = require("ws");
const wss = new WebSocketServer.Server({ port: 8080 });

wss.on("connection", function (socket) {
    console.log("Client connected")

    socket.on("message", (e) => {
        if (e.toString() === "ping") {
            socket.send("pong")
        }
    })
})