import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { usersRequestSchema, usersUpdateRequestSchema } from "../schemas/users.schemas";
import { ensureEmailIsNotUsedMiddleware } from "../middlewares/ensureEmailIsNotUsed.middleware";
import { 
    createUserController, 
    deleteUserController, 
    listUsersController, 
    updateUserController 
} from "../controllers/users.controllers";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { verifyIfUserIsAdminMiddleware } from "../middlewares/verifyIfUserIsAdmin.middleware";


const userRoutes: Router = Router()

userRoutes.post('', 
ensureDataIsValidMiddleware(usersRequestSchema), 
ensureEmailIsNotUsedMiddleware, 
createUserController)

userRoutes.get('', ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, listUsersController)

userRoutes.patch('/:id', 
ensureUserExistsMiddleware,
ensureTokenIsValidMiddleware,
verifyIfUserIsAdminMiddleware,
ensureDataIsValidMiddleware(usersUpdateRequestSchema),
ensureEmailIsNotUsedMiddleware,
updateUserController)

userRoutes.delete('/:id', 
ensureUserExistsMiddleware, 
ensureTokenIsValidMiddleware, 
ensureIsAdminMiddleware,
deleteUserController)


export { userRoutes }