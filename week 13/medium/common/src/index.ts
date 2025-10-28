import { email, z } from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
});

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export const createBlogInput = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
});

export const updateBlogInput = z.object({
    id: z.string().uuid(),
    title: z.string().min(3).optional(),
    content: z.string().min(10).optional()
});


export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
