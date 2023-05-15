import { Router } from "express";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { categoriesRequestSchema } from "../schemas/categories.schemas";
import { 
    createCategoryController, 
    listCategoriesController, 
    listRealEstateByCategoryController 
} from "../controllers/categories.controllers";


const categoriesRoutes: Router = Router()

categoriesRoutes.post('', 
ensureTokenIsValidMiddleware, 
ensureIsAdminMiddleware, 
ensureDataIsValidMiddleware(categoriesRequestSchema), 
createCategoryController)

categoriesRoutes.get('', listCategoriesController)

categoriesRoutes.get('/:id/realEstate', listRealEstateByCategoryController)


export { categoriesRoutes }
