import { z } from 'zod'


const categoriesSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().max(45)
})

const categoriesRequestSchema = categoriesSchema.omit({
    id: true
})

const listAllCategoriesSchema = categoriesSchema.array()


export { categoriesSchema, categoriesRequestSchema, listAllCategoriesSchema }