import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    PRISMA_ACCELERATE_URL: string;
  };
}>();

// ✅ Prisma Accelerate client — use PRISMA_ACCELERATE_URL for edge performance

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl:
      c.env?.PRISMA_ACCELERATE_URL || process.env.PRISMA_ACCELERATE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    return c.text("jwt here");
  } catch (e) {
    console.error(e);
    return c.text("Error creating user", 403);
  }
});

app.post("/api/v1/signin", (c) => {
  return c.text("create blog route");
});

app.get("/api/v1/blog/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text(`get blog route for ${id}`);
});

app.post("/api/v1/blog", (c) => {
  return c.text("create blog route");
});

app.put("/api/v1/blog", (c) => {
  return c.text("update blog route");
});

export default app;
