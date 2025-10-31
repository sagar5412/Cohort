import axios from "axios";

async function getUserData() {
  const response = await axios.get("http://localhost:3000/api/user");
  return response.data;
}
export default async function Home() {
  const postDetails = await getUserData();
  return (
    <div>
      <h1>{postDetails.email}</h1>
      <h1>{postDetails.name}</h1>
    </div>
  );
}
