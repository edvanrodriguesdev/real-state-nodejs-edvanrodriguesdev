import { z } from "zod";
import { realEstateSchema } from "./realEstate.schemas";
import { usersSchema } from "./users.schemas";


const schedulesSchema = z.object({
    id: z.number().int().positive(),
    date: z.date().or(z.string()),
    hour: z.string(),
    realEstate: realEstateSchema,
    user: usersSchema
})

const createScheduleSchema = schedulesSchema.omit({
    id: true,
    realEstate: true,
    user: true
    
}).extend({
    realEstateId: z.number().int().positive()
})


export { schedulesSchema, createScheduleSchema }