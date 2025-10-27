import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { authMiddleware } from "../src/middleware/auth";

export const blogRouter = new Hono<{
    Bindings: {
        PRISMA_ACCELERATE_URL: string;
        JWT_SECRET: string;
    },
    Variables: { id: string; }
}>();

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:
            c.env?.PRISMA_ACCELERATE_URL || process.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                authorId: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        console.log("Fetched posts:", posts);
        console.log("Number of posts:", posts.length);
        return c.json({ posts });
    } catch (error: any) {
        console.error("Error fetching posts:", error);
        return c.json({ error: "Failed to fetch posts", details: error.message }, 500);
    }
});

blogRouter.post("/",authMiddleware, async (c) => {
    const userId = c.get("id");
    const prisma = new PrismaClient({
        datasourceUrl:
            c.env?.PRISMA_ACCELERATE_URL || process.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try {
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
    } catch (error) {
        console.error("Error creating post:", error);
        return c.json({ error: "Failed to create post" }, 500);
    }
})

blogRouter.put("/",authMiddleware, async (c) => {
    const userId = c.get("id");
    const prisma = new PrismaClient({
        datasourceUrl:
            c.env?.PRISMA_ACCELERATE_URL || process.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try {
        await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId,
            },
            data: {
                title: body.title || undefined,
                content: body.content || undefined,
            }
        });
        return c.json({ msg: "Post updated" });
    } catch (error) {
        console.error("Error updating post:", error);
        return c.json({ error: "Failed to update post" }, 500);
    }
});

blogRouter.get("/:id",authMiddleware, async (c) => {
    const userId = c.get("id");
    const prisma = new PrismaClient({
        datasourceUrl:
            c.env?.PRISMA_ACCELERATE_URL || process.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());
    const { id } = c.req.param();
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            }
        });
        return c.json({ post });
    } catch (error) {
        console.error("Error fetching post:", error);
        return c.json({ error: "Failed to fetch post" }, 500);
    }
});
