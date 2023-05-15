import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TUsersRequest } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";
import { hash, hashSync } from "bcryptjs";
import { TResponseUsers } from "../../interfaces/users.interfaces";


const createUserService = async (userData: TUsersRequest): Promise<TResponseUsers> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    userData.password = await hash(userData.password, 10)

    const user: User = userRepository.create(userData)

    await userRepository.save(user)

    const newUser: TResponseUsers = responseUserSchema.parse(user)

    return newUser
}


export { createUserService }