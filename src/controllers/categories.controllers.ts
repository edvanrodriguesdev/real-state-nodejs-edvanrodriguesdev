import { Request, Response } from "express";
import { createCategoryService } from "../services/categories/createCategory.service";
import { TCategories, TCategoriesRequest } from "../interfaces/categories.interfaces";
import { listCategoriesService } from "../services/categories/listCategories.service";
import { listRealEstateByCategoryService } from "../services/categories/listRealEstateByCategory.service";



const createCategoryController = async(req: Request, res: Response): Promise<Response> => {

    const categoryData: TCategoriesRequest = req.body
    
    const newCategory = await createCategoryService(categoryData)

    return res.status(201).json(newCategory)
}

const listCategoriesController = async(req: Request, res: Response): Promise<Response> => {

    const categories: Array<TCategories> = await listCategoriesService()

    return res.status(200).json(categories)
}

const listRealEstateByCategoryController = async(req: Request, res: Response): Promise<Response> => {

    const categoryId: number = parseInt(req.params.id)

    const realEstate = await listRealEstateByCategoryService(categoryId)

    return res.status(200).json(realEstate)
}


export { createCategoryController, listCategoriesController, listRealEstateByCategoryController }