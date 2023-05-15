import { Repository } from "typeorm";
import { TSchedulesRequest } from "../../interfaces/schedules.interfaces";
import { RealEstate, Schedule, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";


const createScheduleService = async (scheduleData: TSchedulesRequest, userId: number): Promise<void> => {

    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const userFind: User | null = await userRepository.findOneBy({
        id: userId
    })

    if (!userFind) {
        throw new AppError('User not found', 404)
    }

    let realEstateFind: RealEstate | null

    if (scheduleData.realEstateId) {
        realEstateFind = await realEstateRepository.findOneBy({
            id: scheduleData.realEstateId
        })

        if (!realEstateFind) {
            throw new AppError('RealEstate not found', 404)
        }
    }

    const schedule: Schedule = scheduleRepository.create({
        ...scheduleData,
        realEstate: realEstateFind!,
        user: userFind!
    })

    await scheduleRepository.save(schedule)

}


export { createScheduleService }