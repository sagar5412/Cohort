import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import type { Context, Next } from "hono";

export const authMiddleware = async (c: Context, next: Next) => {
  const header = c.req.header("Authorization");
  const token = header?.split(" ")[1];

  if (!token) {
    return c.text("Unauthorized: Token not provided", 401);
  }

  try {
    const response = await verify(token, c.env.JWT_SECRET) as { id: string };
    if (!response) {
      return c.text("Unauthorized", 401);
    }

    c.set("id", response.id);
    await next();
  } catch (e) {
    return c.text("Unauthorized: Invalid token", 401);
  }
};