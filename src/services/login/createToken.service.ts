import { Repository } from "typeorm";
import { TLogin } from "../../interfaces/login.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import 'dotenv/config'


const createTokenService = async(loginData: TLogin): Promise<string> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({
            email: loginData.email
    })

    if(!user) {
        throw new AppError('Invalid credentials', 401)
    }

    const passwordMatch = await compare(loginData.password, user.password)

    if(!passwordMatch) {
        throw new AppError('Invalid credentials', 401)
    }

    const token = sign(
        {
            admin: user.admin
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject: user.id.toString()
        }
    )

    return token
}


export { createTokenService }