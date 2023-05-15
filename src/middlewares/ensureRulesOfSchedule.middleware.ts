import { NextFunction, Request, Response } from "express"
import { Repository } from "typeorm"
import { Schedule } from "../entities"
import { AppDataSource } from "../data-source"
import { AppError } from "../errors"


const ensureRulesOfScheduleMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const scheduleData = req.body

    const userId = res.locals.userId

    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)

    const scheduleMadeByHour: Schedule | null = await scheduleRepository.createQueryBuilder("schedulesData")
    .where("schedulesData.date = :date", {
        date: scheduleData.date
    }).andWhere("schedulesData.realEstate = :estate", {
        estate: scheduleData.realEstateId
    }).andWhere("schedulesData.hour = :hour", {
        hour: scheduleData.hour
    }).getOne()

    if (scheduleMadeByHour) {
        throw new AppError('Schedule to this real estate at this date and time already exists', 409)
    }

    const scheduleMadeByUser: Schedule | null = await scheduleRepository.createQueryBuilder("scheduleData")
    .where("scheduleData.date = :date", {
        date: scheduleData.date
    }).andWhere("scheduleData.hour = :hour", {
        hour: scheduleData.hour
    }).andWhere("scheduleData.userId = :id", {
        id: userId
    }).getOne()

    if (scheduleMadeByUser) {
        throw new AppError('User schedule to this real estate at this date and time already exists', 409)
    }

    const scheduleMadeByRealEstate: Schedule | null = await scheduleRepository.createQueryBuilder("scheduleData")
    .where("scheduleData.userId = :id", {
        id: userId
    }).andWhere("scheduleData.realEstate = :estate", {
        estate: scheduleData.realEstateId
    }).getOne()

    if (scheduleMadeByRealEstate) {
        throw new AppError('User schedule to this real estate already exists', 409)
    }

    const [hour] = scheduleData.hour.split(":")

    if(Number(hour) < 8 || Number(hour) > 18) {
        throw new AppError('Invalid hour, available times are 8AM to 18PM', 400)
    }

    const isABussinessDay: Date = new Date(scheduleData.date)

    const getTheDay = isABussinessDay.getDay()


    if (getTheDay === 0 || getTheDay === 6) {
        throw new AppError('Invalid date, work days are monday to friday', 400)
    }

    return next()
}


export { ensureRulesOfScheduleMiddleware }