import { Repository } from "typeorm"
import { TAllCategories } from "../../interfaces/categories.interfaces"
import { Category } from "../../entities"
import { AppDataSource } from "../../data-source"
import { listAllCategoriesSchema } from "../../schemas/categories.schemas"


const listCategoriesService = async (): Promise<TAllCategories> => {

    const categoriesRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const findCategories: Array<Category> = await categoriesRepository.find()

    const categories = listAllCategoriesSchema.parse(findCategories)

    return categories
}


export { listCategoriesService }