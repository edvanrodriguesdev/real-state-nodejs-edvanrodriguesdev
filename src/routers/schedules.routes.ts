import { Router } from "express";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { createScheduleSchema } from "../schemas/schedules.schemas";
import { 
    createScheduleController, 
    listRealEstateSchedulesController 
} from "../controllers/schedules.controllers";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureRulesOfScheduleMiddleware } from "../middlewares/ensureRulesOfSchedule.middleware";


const schedulesRoutes: Router = Router()

schedulesRoutes.post('', 
ensureTokenIsValidMiddleware, 
ensureDataIsValidMiddleware(createScheduleSchema),
ensureRulesOfScheduleMiddleware,
createScheduleController)

schedulesRoutes.get('/realEstate/:id', 
ensureTokenIsValidMiddleware, 
ensureIsAdminMiddleware, 
listRealEstateSchedulesController)


export { schedulesRoutes }