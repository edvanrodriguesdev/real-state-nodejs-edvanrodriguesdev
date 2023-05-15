import { z } from "zod";
import { responseUserSchema, usersRequestSchema, usersResponseSchema, usersSchema, usersUpdateRequestSchema } from "../schemas/users.schemas";
import { DeepPartial } from "typeorm";


type TUsers = z.infer<typeof usersSchema>
type TUsersRequest = z.infer<typeof usersRequestSchema>
type TResponseUsers = z.infer<typeof responseUserSchema>
type TUsersUpdateRequest = z.infer<typeof usersUpdateRequestSchema>
type TUsersUpdate = DeepPartial<TUsersRequest>
type TUsersResponse = z.infer<typeof usersResponseSchema>



export { TUsers, TUsersRequest, TUsersUpdateRequest, TUsersResponse, TResponseUsers, TUsersUpdate }