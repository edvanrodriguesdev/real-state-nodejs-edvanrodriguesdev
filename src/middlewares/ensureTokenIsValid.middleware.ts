import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";
import 'dotenv/config'


const ensureTokenIsValidMiddleware = (req: Request, res: Response, next: NextFunction) => {

    let token: string | undefined = req.headers.authorization

    if(!token) {
        throw new AppError('Missing bearer token', 401)
    }

    token = token.split(" ")[1]

    verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
        if(error) throw new AppError(error.message, 401)

        res.locals.userId = decoded.sub
        res.locals.userPermission = decoded.admin

        return next()
    })
}


export { ensureTokenIsValidMiddleware }