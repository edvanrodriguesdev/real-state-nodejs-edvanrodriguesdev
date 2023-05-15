import { z } from "zod";
import { createRealEstateSchema, realEstateSchema, returnAllRealEstateSchema } from "../schemas/realEstate.schemas";


type TRealEstate = z.infer<typeof realEstateSchema>
type TReturnRealEstate = z.infer<typeof createRealEstateSchema>
type TReturnAllRealEstate = z.infer<typeof returnAllRealEstateSchema>


export { TRealEstate, TReturnRealEstate, TReturnAllRealEstate }