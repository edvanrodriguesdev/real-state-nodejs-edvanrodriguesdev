import { z } from "zod";


const usersSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().max(45),
    email: z.string().email().max(45),
    admin: z.boolean().default(false),
    password: z.string(),
    createdAt: z.date().or(z.string()),
    updatedAt: z.date().or(z.string()),
    deletedAt: z.date().or(z.string()).nullish()
})

const usersRequestSchema = usersSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true
})

const responseUserSchema = usersSchema.omit({
    password: true
})

const usersUpdateRequestSchema = usersRequestSchema.partial()

const usersResponseSchema = z.array(responseUserSchema)


export { 
    usersSchema, 
    usersRequestSchema, 
    usersUpdateRequestSchema, 
    usersResponseSchema, 
    responseUserSchema 
}