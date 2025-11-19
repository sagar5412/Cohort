"use client";

import { useEffect, useRef, useState } from "react";
import { BACKEND_URL, WS_URL } from "@/app/config";
import axios from "axios";

type Shape = {
    type: "rect" | "circle";
    x: number;
    y: number;
    width: number;
    height: number;
};

export function Canvas({
    roomId,
    socket,
}: {
    roomId: string;
    socket: WebSocket;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [selectedTool, setSelectedTool] = useState<"rect" | "circle">("circle");

    useEffect(() => {
        async function getExistingShapes() {
            const response = await axios.get(`${BACKEND_URL}/chat/${roomId}`);
            const messages = response.data.messages;
            const shapes = messages.map((x: { message: string }) => {
                const messageData = JSON.parse(x.message);
                return messageData;
            });
            setShapes(shapes);
        }
        getExistingShapes();
    }, [roomId]);

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.type === "chat") {
                    const parsedShape = JSON.parse(message.message);
                    setShapes((existingShapes) => [...existingShapes, parsedShape]);
                }
            };
        }
    }, [socket]);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                shapes.map((shape) => {
                    if (shape.type === "rect") {
                        ctx.strokeStyle = "rgba(255, 255, 255)";
                        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
                    } else if (shape.type === "circle") {
                        ctx.beginPath();
                        ctx.arc(
                            shape.x + shape.width / 2,
                            shape.y + shape.height / 2,
                            Math.abs(shape.width) / 2,
                            0,
                            2 * Math.PI
                        );
                        ctx.stroke();
                        ctx.closePath();
                    }
                });
            }
        }
    }, [shapes]);

    return (
        <div className="h-screen w-screen overflow-hidden bg-black">
            <div className="fixed top-4 left-1/2 -translate-x-1/2 flex gap-2 bg-gray-800 p-2 rounded-lg">
                <button
                    className={`p-2 rounded ${selectedTool === "rect" ? "bg-blue-600" : "bg-gray-700"
                        } text-white`}
                    onClick={() => setSelectedTool("rect")}
                >
                    Rectangle
                </button>
                <button
                    className={`p-2 rounded ${selectedTool === "circle" ? "bg-blue-600" : "bg-gray-700"
                        } text-white`}
                    onClick={() => setSelectedTool("circle")}
                >
                    Circle
                </button>
            </div>
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={(e) => {
                    const startX = e.clientX;
                    const startY = e.clientY;
                    let currentShape: Shape | null = null;

                    const onMouseMove = (e: MouseEvent) => {
                        const width = e.clientX - startX;
                        const height = e.clientY - startY;
                        currentShape = {
                            type: selectedTool,
                            x: startX,
                            y: startY,
                            width,
                            height,
                        };
                        // Optimistic update for smooth drawing
                        const canvas = canvasRef.current;
                        if (canvas) {
                            const ctx = canvas.getContext("2d");
                            if (ctx) {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                // Redraw existing shapes
                                shapes.forEach((shape) => {
                                    if (shape.type === "rect") {
                                        ctx.strokeStyle = "rgba(255, 255, 255)";
                                        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
                                    } else if (shape.type === "circle") {
                                        ctx.beginPath();
                                        ctx.arc(
                                            shape.x + shape.width / 2,
                                            shape.y + shape.height / 2,
                                            Math.abs(shape.width) / 2,
                                            0,
                                            2 * Math.PI
                                        );
                                        ctx.stroke();
                                        ctx.closePath();
                                    }
                                });
                                // Draw current shape being dragged
                                if (currentShape) {
                                    if (currentShape.type === "rect") {
                                        ctx.strokeStyle = "rgba(255, 255, 255)";
                                        ctx.strokeRect(
                                            currentShape.x,
                                            currentShape.y,
                                            currentShape.width,
                                            currentShape.height
                                        );
                                    } else if (currentShape.type === "circle") {
                                        ctx.beginPath();
                                        ctx.arc(
                                            currentShape.x + currentShape.width / 2,
                                            currentShape.y + currentShape.height / 2,
                                            Math.abs(currentShape.width) / 2,
                                            0,
                                            2 * Math.PI
                                        );
                                        ctx.stroke();
                                        ctx.closePath();
                                    }
                                }
                            }
                        }
                    };

                    const onMouseUp = () => {
                        window.removeEventListener("mousemove", onMouseMove);
                        window.removeEventListener("mouseup", onMouseUp);
                        if (currentShape) {
                            setShapes((prev) => [...prev, currentShape!]);
                            socket.send(
                                JSON.stringify({
                                    type: "chat",
                                    message: JSON.stringify(currentShape),
                                    roomId: String(roomId),
                                })
                            );
                        }
                    };

                    window.addEventListener("mousemove", onMouseMove);
                    window.addEventListener("mouseup", onMouseUp);
                }}
            />
        </div>
    );
}
