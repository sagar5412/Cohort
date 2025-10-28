import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import * as bcrypt from "bcryptjs";
import { signupInput, signinInput } from "@sagargk/medium-common-project";

export const userRouter = new Hono<{
    Bindings: {
        PRISMA_ACCELERATE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:
            c.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        return c.json({ error: "Invalid input" }, 411);
    }
    try {
        const hashPassword = await bcrypt.hash(body.password, 10);
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashPassword,
                name: body.name || null
            },
        });
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token: jwt });
    } catch (e: any) {
        if (e.code === "P2002") {
            return c.json({ error: "Email already exists" }, 409);
        }
        return c.json({ error: e }, 500);
    } finally {
        await prisma.$disconnect();
    }
});

userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:
            c.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        return c.json({ error: "Invalid input" }, 411);
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            },
        });

        if (!user) {
            return c.json({ error: "Invalid credentials" }, 403);
        }

        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if (!isPasswordValid) {
            return c.json({ error: "Invalid credentials" }, 403);
        }

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token: jwt });
    } catch (e: any) {
        return c.json({ error: "Failed to sign in" }, 500);
    } finally {
        await prisma.$disconnect();
    }
});

userRouter.get("/health", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate());

    try {
        await prisma.$queryRaw`SELECT 1`;
        return c.text("DB OK");
    } catch (e: any) {
        return c.json({ error: "DB Connection failed", details: e.message }, 500);
    } finally {
        await prisma.$disconnect();
    }
});