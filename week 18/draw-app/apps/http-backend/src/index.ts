import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { middleware } from "./middleware.js";
import { JWT_SECRET } from "@repo/backend-common/config"
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types"
import db from "@repo/db/client"
import cors from "cors"
const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", async (req: express.Request, res: express.Response) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.json({
            msg: "Incorrect inputs"
        })
    }

    try {
        const findEmail = await db.user.findFirst({
            where: {
                email: parsedData.data.email
            }
        })
        if (findEmail) {
            return res.status(403).json({
                msg: "email already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
        const user = await db.user.create({
            data: {
                email: parsedData.data.email,
                name: parsedData.data.name,
                password: hashedPassword
            }
        })
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        return res.status(200).json({
            msg: "succesfully created account",
            token
        })
    } catch (error) {
        return res.status(411).json({
            msg: "user already exists"
        })
    }
})

app.post("/signin", async (req, res) => {
    const data = SigninSchema.safeParse(req.body);
    if (!data.success) {
        return res.json({
            msg: "Incorrect inputs"
        })
    }
    const { email, password } = req.body;
    try {
        const existingUser = await db.user.findFirst({
            where: {
                email
            }
        })
        if (!existingUser) {
            return res.status(403).json({
                msg: "email didn't exist, signup!"
            })
        }
        const hashedPassword = existingUser.password;
        const matchPassword = await bcrypt.compare(password, hashedPassword);
        if (!matchPassword) {
            return res.status(401).json({
                message: "invalid credentials",
            });
        }

        const token = jwt.sign({ id: existingUser.id }, JWT_SECRET);
        res.status(200).json({
            token
        })

    } catch (error) {

    }
})

app.post("/room", middleware, async (req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.json({
            msg: "Incorrect inputs"
        })
    }
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const userId = req.userId;
        const room = await db.room.create({
            data: {
                slug: parsedData.data.roomName,
                adminId: userId
            }
        })

        return res.status(200).json({
            roomId: room.id
        })
    } catch (error) {
        return res.json({
            msg: "Room already exists"
        })
    }
})

app.get("/chat/:roomId", async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        const messages = await db.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        })
        res.status(200).json({
            messages
        })
    } catch (error) {
        res.json({
            msg: "error"
        })
    }
})

app.get("/room/:slug", async (req, res) => {
    try {
        const slug = req.params.slug;
        const room = await db.room.findFirst({
            where: {
                slug
            }
        })
        return res.json({
            room
        })
    } catch (error) {
        return res.json({
            error
        })
    }

})

app.listen(3001);