import { Repository } from "typeorm"
import { User } from "../../entities"
import { AppDataSource } from "../../data-source"


const deleteUserService = async (userId: number): Promise<void> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: {
            id: userId
        }
    })

    await userRepository.softRemove(user!)

}

export { deleteUserService }