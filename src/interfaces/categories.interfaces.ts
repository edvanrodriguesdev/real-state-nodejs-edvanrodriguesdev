import { z } from "zod";
import { categoriesSchema, categoriesRequestSchema, listAllCategoriesSchema } from "../schemas/categories.schemas";


type TCategories = z.infer<typeof categoriesSchema>
type TCategoriesRequest = z.infer<typeof categoriesRequestSchema>
type TAllCategories = z.infer<typeof listAllCategoriesSchema>


export { TCategories, TCategoriesRequest, TAllCategories }