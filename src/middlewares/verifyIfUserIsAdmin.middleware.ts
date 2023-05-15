import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";


const verifyIfUserIsAdminMiddleware = (req: Request, res: Response, next: NextFunction): void => {

    const userId: number = parseInt(req.params.id)
    
    const id = res.locals.userId

    const userAdmin = res.locals.userPermission

    if (!userAdmin && userId != id) {
            throw new AppError('Insufficient permission', 403)
        }
    
        const { admin, ...userData } = req.body

        req.body = {
            ...userData
        }

    return next()
}


export { verifyIfUserIsAdminMiddleware }