import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";


const ensureEmailIsNotUsedMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const email: string = req.body.email

    if (email) {
        const verifyEmail: User | null = await userRepository.findOne({
            where: {
                email: email
            },
            withDeleted: true
        })

        if (verifyEmail) {
            throw new AppError('Email already exists', 409)
        }
    }

    return next()
}


export { ensureEmailIsNotUsedMiddleware }