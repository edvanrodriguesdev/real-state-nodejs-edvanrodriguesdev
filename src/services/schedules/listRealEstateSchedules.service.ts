import { Repository } from "typeorm"
import { RealEstate } from "../../entities"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors"


const listRealEstateSchedulesService = async (realEstateId: number): Promise<RealEstate> => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource. getRepository(RealEstate)

    const realEstateSchedules = await realEstateRepository.createQueryBuilder("realEstate")
    .innerJoinAndSelect("realEstate.address", "address")
    .leftJoinAndSelect("realEstate.schedules", "schedule")
    .leftJoinAndSelect("schedule.user", "user.id")
    .leftJoinAndSelect("realEstate.category", "category")
    .where("realEstate.id = :id", { id: realEstateId })
    .getOne()

    if (!realEstateSchedules) {
        throw new AppError('RealEstate not found', 404)
    }
 
    return realEstateSchedules    
}

export { listRealEstateSchedulesService }