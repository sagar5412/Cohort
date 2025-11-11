import { PrismaClient } from "@repo/db/client";

export default async function Home() {
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst();
  return <div>{JSON.stringify(user)}</div>;
}
