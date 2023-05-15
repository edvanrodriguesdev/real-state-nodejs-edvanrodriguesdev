import { Repository } from "typeorm"
import { RealEstate } from "../../entities"
import { AppDataSource } from "../../data-source"


const listRealEstateService = async () => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const findRealEstates: Array<RealEstate> = await realEstateRepository.find({
        relations: {
            address: true
        }
    })

    return findRealEstates
}


export { listRealEstateService }