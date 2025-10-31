import prisma from "../app/db/index"
async function getUserData() {
  const data = prisma.user.findFirst({});

  return data;
}
export default async function Home() {
  const postDetails = await getUserData();
  return (
    <div>
      <h1>{postDetails?.email}</h1>
      <h1>{postDetails?.password}</h1>
    </div>
  );
}