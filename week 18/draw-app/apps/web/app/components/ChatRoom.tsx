import axios from "axios"
import { BACKEND_URL } from "../config"
import { DisplayChat } from "./DisplayChat";

async function getChat(id:string) {
    const response = await axios.get(`${BACKEND_URL}/chat/${id}`)
    return response.data.messages;
}

export async function ChatRoom({ id }: {
    id: string
}) {
    const chats = await getChat(id);
 return <DisplayChat messages={chats} id={id}/>
}