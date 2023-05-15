import { z } from 'zod'
import { addressSchema, completeAddressSchema } from './address.schemas'
import { categoriesSchema } from './categories.schemas'


const realEstateSchema = z.object({
    id: z.number().int().positive(),
    value: z.number().int().positive().or(z.string()),
    size: z.number().int().positive(),
    address: completeAddressSchema,
    category: categoriesSchema,
    sold: z.boolean().default(false),
    createdAt: z.date().or(z.string()),
    updatedAt: z.date().or(z.string())
})

const createRealEstateSchema = realEstateSchema.omit({
    id: true,
    category: true,
    createdAt: true,
    updatedAt: true
}).extend({
    address: addressSchema,
    categoryId: z.number().int().positive()
})

const returnAllRealEstateSchema = realEstateSchema.array()


export { realEstateSchema, createRealEstateSchema, returnAllRealEstateSchema }