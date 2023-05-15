import { Repository } from "typeorm"
import { TResponseUsers, TUsers, TUsersUpdate, TUsersUpdateRequest } from "../../interfaces/users.interfaces"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { responseUserSchema } from "../../schemas/users.schemas"


const updateUserService = async (userData: TUsersUpdate, userId: number): Promise<TResponseUsers> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const oldUserData: User | null = await userRepository.findOneBy({
        id: userId
    })

    const updatedUserData: User = userRepository.create({
        ...oldUserData,
        ...userData
    })

    await userRepository.save(updatedUserData)

    const returnUser: TResponseUsers = responseUserSchema.parse(updatedUserData)

    return returnUser
}


export { updateUserService }