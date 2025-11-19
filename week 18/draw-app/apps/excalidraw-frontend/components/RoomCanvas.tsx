"use client";

import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import { BACKEND_URL, WS_URL } from "@/app/config";
import axios from "axios";

export function RoomCanvas({ slug }: { slug: string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [roomId, setRoomId] = useState<string | null>(null);

    useEffect(() => {
        const getRoomId = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
                setRoomId(response.data.room.id);
            } catch (e) {
                console.error(e);
            }
        };
        getRoomId();
    }, [slug]);

    useEffect(() => {
        if (roomId) {
            const token = localStorage.getItem("token");
            const ws = new WebSocket(`${WS_URL}?token=${token}`);

            ws.onopen = () => {
                setSocket(ws);
                ws.send(
                    JSON.stringify({
                        type: "join_room",
                        roomId: `${roomId}`,
                    })
                );
            };

            return () => {
                ws.close();
            };
        }
    }, [roomId]);

    if (!socket || !roomId) {
        return (
            <div className="flex h-screen items-center justify-center">
                Connecting to server...
            </div>
        );
    }

    return <Canvas roomId={roomId} socket={socket} />;
}
