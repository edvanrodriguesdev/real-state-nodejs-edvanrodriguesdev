import { Repository } from "typeorm"
import { TUsersResponse } from "../../interfaces/users.interfaces"
import { User } from "../../entities"
import { AppDataSource } from "../../data-source"
import { usersResponseSchema } from "../../schemas/users.schemas"


const listUsersService = async (): Promise<TUsersResponse> => {

    const usersRepository: Repository<User> = AppDataSource.getRepository(User)

    const findUsers: Array<User> = await usersRepository.find({
        withDeleted: true
    })

    const users = usersResponseSchema.parse(findUsers)

    return users
}

export { listUsersService }