import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TCategoriesRequest } from "../../interfaces/categories.interfaces";
import { categoriesSchema } from "../../schemas/categories.schemas";
import { AppError } from "../../errors";


const createCategoryService = async (categoryData: TCategoriesRequest) => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const verifyIfCategoryExists = await categoryRepository.findOneBy({
        name: categoryData.name
    })

    if (verifyIfCategoryExists) {
        throw new AppError('Category already exists', 409)
    }

    const category = categoryRepository.create(categoryData)

    await categoryRepository.save(category)

    const newCategory = categoriesSchema.parse(category)

    return newCategory
}

export { createCategoryService }