import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();
    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDM5NzM2LTZiNTktNDRhZS04ZTA5LTU4MGFiY2RhODZjOCIsImlhdCI6MTc2MzQ1OTYwNn0.sbMBojUroxlvAF1T1jKUqot15Wd7lGiEsUb1KrfqO8k`)
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, [])
    return {
        socket,
        loading
    }
}