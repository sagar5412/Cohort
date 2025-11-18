import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config"

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export function middleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"] ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (decoded && decoded.id) {
            req.userId = decoded.id;
            next();
        } else {
            return res.status(401).json({ message: "Invalid token payload" });
        }
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}