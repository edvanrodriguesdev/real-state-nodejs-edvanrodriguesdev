import { Request, Response } from "express";
import { TSchedulesRequest } from "../interfaces/schedules.interfaces";
import { createScheduleService } from "../services/schedules/createSchedule.service";
import { RealEstate } from "../entities";
import { listRealEstateSchedulesService } from "../services/schedules/listRealEstateSchedules.service";


const createScheduleController = async (req: Request, res: Response): Promise<Response> => {

    const scheduleData: TSchedulesRequest = req.body

    const userId: number = parseInt(req.params.id)

    await createScheduleService(scheduleData, userId)

    return res.status(201).json({
         message: "Schedule created" 
        })
}

const listRealEstateSchedulesController = async (req: Request, res: Response): Promise<Response> => {

    const realEstateId: number = parseInt(req.params.id)

    const schedules: RealEstate = await listRealEstateSchedulesService(realEstateId)

    return res.status(200).json(schedules)
}


export { createScheduleController, listRealEstateSchedulesController }