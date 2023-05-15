import { Repository } from "typeorm"
import { TRealEstate, TReturnRealEstate } from "../../interfaces/realEstate.interfaces"
import { Address, Category, RealEstate } from "../../entities"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors"
import { completeAddressSchema } from "../../schemas/address.schemas"
import { realEstateSchema } from "../../schemas/realEstate.schemas"


const createRealEstateService = async (realEstateData: TReturnRealEstate): Promise<TRealEstate> => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)

    if (realEstateData.address.number) {
        const addressWithNumber: Address | null = await addressRepository.findOne({
            where: {
                street: realEstateData.address.street,
                zipCode: realEstateData.address.zipCode,
                number: realEstateData.address.number,
                city: realEstateData.address.city,
                state: realEstateData.address.state
            }
        })
        if (addressWithNumber) {
            throw new AppError('Address already exists', 409)
        }
    }

    if (!realEstateData.address.number) {
        const addressWithNumber: Address | null = await addressRepository.findOne({
            where: {
                street: realEstateData.address.street,
                zipCode: realEstateData.address.zipCode,
                city: realEstateData.address.city,
                state: realEstateData.address.state
            }
        })
        if (addressWithNumber) {
            throw new AppError('Address already exists', 409)
        }
    }

    const insertAddress = completeAddressSchema.parse(realEstateData.address)

    const address: Address = addressRepository.create(insertAddress)

    await addressRepository.save(address)

    const category: Category | null = await categoryRepository.findOneBy({
        id: realEstateData.categoryId
    })

    if (!address) {
        throw new AppError('Address not found', 404)
    }

    if (!category) {
        throw new AppError('Category not found', 404)
    }

    const completeRealEstate: RealEstate = realEstateRepository.create({
       ...realEstateData,
       address: address!,
       category: category!,
    })

    await realEstateRepository.save(completeRealEstate)

    const realEstate = realEstateSchema.parse(completeRealEstate)

    return realEstate
}


export { createRealEstateService }