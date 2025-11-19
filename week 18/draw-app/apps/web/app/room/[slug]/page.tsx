import axios from "axios"
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../components/ChatRoom";
async function getRoom(slug: string) {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
  const data = response.data;
  return data.room.id; 
}
export default async function ({ params }: {
  params: {
    slug: string
  }
}) {
  const roomName =(await params).slug;
  const roomId = await getRoom(roomName);
  return <ChatRoom id={roomId}/>
}