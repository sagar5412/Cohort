import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        PRISMA_ACCELERATE_URL: string;
        JWT_SECRET: string;
    },
    Variables: { id: string; }
}>();

blogRouter.use("/*", async (c, next) => {
    const header = c.req.header("Authorization");
    const token = header?.split(" ")[1];
    if (!token) {
        return c.text("Unauthorized: Token not provided", 401);
    }
    try {
        const prisma = new PrismaClient({
            datasourceUrl:
                c.env?.PRISMA_ACCELERATE_URL || process.env.PRISMA_ACCELERATE_URL,
        }).$extends(withAccelerate());
        const response = await verify(token, c.env.JWT_SECRET) as { id: string };
        if (!response) {
            return c.text("Unauthorized", 401);
        }
        c.set("id", response.id);
        await next();
    } catch (e) {
        return c.text("Unauthorized: Invalid token", 401);
    }
});

blogRouter.post("/", async (c) => {
    const userId = c.get("id");
    const prisma = new PrismaClient({
        datasourceUrl:
            c.env?.PRISMA_ACCELERATE_URL || process.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId,
        }
    });
    return c.json({
        id: post.id,
    });
})

blogRouter.put("/", async (c) => {
    const userId = c.get("id");
    const prisma = new PrismaClient({
        datasourceUrl:
            c.env?.PRISMA_ACCELERATE_URL || process.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    prisma.post.update({
        where: {
            id: body.id,
            authorId: userId,
        },
        data: {
            title: body.title,
            content: body.content,
        }
    });

    return c.text("Post updated");
});

blogRouter.get("/:id", async (c) => {
    const userId = c.get("id");
    const prisma = new PrismaClient({
        datasourceUrl:
            c.env?.PRISMA_ACCELERATE_URL || process.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());
    const { id } = c.req.param();
    const post = await prisma.post.findUnique({
        where: {
            id: id,
        }
    });
    return c.json({ post, id });
});

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:
            c.env?.PRISMA_ACCELERATE_URL || process.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());
    const posts = await prisma.post.findMany();
    return c.json({ posts });
});

