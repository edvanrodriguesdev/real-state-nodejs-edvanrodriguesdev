import { Router } from "express";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { createRealEstateSchema } from "../schemas/realEstate.schemas";
import { createRealEstateController, listRealEstateController } from "../controllers/realEstate.controllers";


const realEstateRoutes: Router = Router()

realEstateRoutes.post('', 
ensureTokenIsValidMiddleware, 
ensureIsAdminMiddleware, 
ensureDataIsValidMiddleware(createRealEstateSchema), 
createRealEstateController)

realEstateRoutes. get('', listRealEstateController)


export { realEstateRoutes }