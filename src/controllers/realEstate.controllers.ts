import { Request, Response } from "express";
import { TReturnRealEstate } from "../interfaces/realEstate.interfaces";
import { createRealEstateService } from "../services/realEstate/createRealEstate.service";
import { listRealEstateService } from "../services/realEstate/listRealEstate.service";


const createRealEstateController = async (req: Request, res: Response): Promise<Response> => {

    const realEstateData: TReturnRealEstate = req.body

    const newRealEstate = await createRealEstateService(realEstateData)

    return res.status(201).json(newRealEstate)
}

const listRealEstateController = async (req: Request, res: Response): Promise<Response> => {

    const listRealEstate = await listRealEstateService()

    return res.status(200).json(listRealEstate)
}


export { createRealEstateController, listRealEstateController }