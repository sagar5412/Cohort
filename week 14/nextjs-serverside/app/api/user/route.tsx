import { NextRequest } from "next/server";
import prisma from "../../db/index"


export function GET() {
  return Response.json({
    email: "sagar@gmail.com",
    name: "sagar",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
      },
    });
    return Response.json({
      msg: "User created",
      id: user.id,
    });
  } catch (error) {
    console.log(error);
  }
}
