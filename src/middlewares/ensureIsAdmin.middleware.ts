import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";


const ensureIsAdminMiddleware = (req: Request, res: Response, next: NextFunction): void => {

    const admin = res.locals.userPermission

    if (!admin) {
        throw new AppError('Insufficient permission', 403)
    }

    return next()
}


export { ensureIsAdminMiddleware }