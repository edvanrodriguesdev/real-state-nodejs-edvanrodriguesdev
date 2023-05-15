import { z } from "zod";
import { createScheduleSchema, schedulesSchema } from "../schemas/schedules.schemas";


type TSchedules = z.infer<typeof schedulesSchema>
type TSchedulesRequest = z.infer<typeof createScheduleSchema>


export { TSchedules, TSchedulesRequest }