import { WebSocketServer, WebSocket, RawData } from "ws";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"
import db from "@repo/db/client"
const PORT = 8080;

interface AuthenticatedWebSocket extends WebSocket {
    userId: string,
    rooms: Set<string>
}

interface JwtPayload {
    id: string
}

interface JoinRoomMessage {
    type: "join_room"
    roomId: string,
}

interface LeaveRoomMessage {
    type: "leave_room"
    roomId: string
}

interface ChatRoomMessage {
    type: "chat"
    roomId: string
    message: string
}

type ClientMessage = JoinRoomMessage | LeaveRoomMessage | ChatRoomMessage;

interface ServerChatMessage {
    type: "chat"
    roomId: string
    message: string
    userId: string
    timestamp: number
}

interface ErrorMessage {
    type: "error"
    message: string
}

type ServerMessage = ServerChatMessage | ErrorMessage;

class RoomManager {
    private rooms = new Map<string, Set<AuthenticatedWebSocket>>();

    join(roomId: string, ws: AuthenticatedWebSocket): void {
        ws.rooms.add(roomId);
        if (!this.rooms.get(roomId)) {
            this.rooms.set(roomId, new Set());
        }
        this.rooms.get(roomId)!.add(ws);
    }

    leave(roomId: string, ws: AuthenticatedWebSocket): void {
        ws.rooms.delete(roomId);
        this.rooms.get(roomId)?.delete(ws);
    }

    leaveAll(ws: AuthenticatedWebSocket): void {
        for (const roomId of ws.rooms) {
            this.leave(roomId, ws);
        }
    }

    broadcast(roomId: string, message: ServerChatMessage, sender: AuthenticatedWebSocket): void {
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        const payload = JSON.stringify(message);
        sendTodb(roomId, message, sender);
        room.forEach(client => {
            if (client !== sender && client.readyState === WebSocket.OPEN) {
                client.send(payload);
            }
        })
    }
}

const wss = new WebSocketServer({ port: PORT })
const roomManager = new RoomManager();

async function sendTodb(roomId: string, message: ServerMessage, ws: AuthenticatedWebSocket) {
    try {
        const send = await db.chat.create({
            data: {
                roomId: Number(roomId),
                message: message.message,
                userId: ws.userId
            }
        })
    } catch (error) {
        sendError(ws, "error while db")
    }
}

function verifyToken(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        return decoded?.id || null
    } catch (error) {
        return null;
    }
}

function sendError(ws: WebSocket, message: string): void {
    if (ws.readyState === WebSocket.OPEN) {
        const error: ErrorMessage = { type: "error", message }
        ws.send(JSON.stringify(error));
    }
}

wss.on("connection", (ws: AuthenticatedWebSocket, request) => {
    const url = new URL(request.url ?? "", `http://${request.headers.host}`)
    const token = url.searchParams.get("token");

    if (!token) {
        sendError(ws, "Authentication required")
        ws.close(1008, "Missing token")
        return;
    }

    const userId = verifyToken(token);
    if (!userId) {
        sendError(ws, "Invalid token");
        ws.close(1008, "Invalid authentication")
        return;
    }

    ws.userId = userId;
    ws.rooms = new Set();

    ws.on("message", (rawData: RawData) => {
        let message: ClientMessage;
        try {
            message = JSON.parse(rawData.toString())
        } catch (error) {
            sendError(ws, "Invalid JSON")
            return;
        }

        if (!message.type || typeof message.type !== "string") {
            sendError(ws, "Invalid message format")
            return;
        }

        try {
            switch (message.type) {
                case "join_room": {
                    const { roomId } = message as JoinRoomMessage;
                    if (!roomId || typeof roomId !== "string") {
                        sendError(ws, "Invalid roomId")
                        return;
                    }
                    roomManager.join(roomId, ws);
                    break;
                }
                case "leave_room": {
                    const { roomId } = message as LeaveRoomMessage;
                    if (!roomId || typeof roomId !== "string") {
                        sendError(ws, "Invalid roomId")
                        return;
                    }
                    roomManager.leave(roomId, ws);
                    break;
                }
                case "chat": {
                    const { roomId, message: msg } = message as ChatRoomMessage;
                    if (!roomId || !msg || typeof roomId !== "string" || typeof msg !== "string") {
                        sendError(ws, "Invalid Chat message format")
                        return;
                    }
                    if (!ws.rooms.has(roomId)) {
                        sendError(ws, "Must join room first")
                        return;
                    }
                    const chatMessage: ServerChatMessage = {
                        type: "chat",
                        roomId,
                        message: msg,
                        userId: ws.userId,
                        timestamp: Date.now()
                    }
                    roomManager.broadcast(roomId, chatMessage, ws)
                    break;
                }
                default:
                    sendError(ws, `Unknown type ${message}`);
                    break;
            }
        } catch (error) {
            sendError(ws, "Internal server")
        }
    })

    ws.on("close", () => {
        roomManager.leaveAll(ws);
    })

    ws.on("error", (error) => {
        console.error(`WebSocket error for user ${ws.userId}:`, error);
    })
})