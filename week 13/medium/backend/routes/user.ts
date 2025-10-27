import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings: {
        PRISMA_ACCELERATE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post("/signup", async (c) => {
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
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ user, token: jwt });
    } catch (e:any) {
        console.error("Signup error:", e);
        return c.json({ error: e.message }, 500);
    }
});

userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:
            c.env?.PRISMA_ACCELERATE_URL || process.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password,
        },
    });

    if (!user || user.password !== body.password) {
        return c.text("Invalid credentials", 403);
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ user, token: jwt });
});