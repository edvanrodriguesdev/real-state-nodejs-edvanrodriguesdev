import { Request, Response } from "express";
import { TUsersRequest, TUsersResponse, TUsersUpdate } from "../interfaces/users.interfaces";
import { createUserService } from "../services/users/createUser.service";
import { listUsersService } from "../services/users/listUsers.service";
import { updateUserService } from "../services/users/updateUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";


const createUserController = async (req: Request, res: Response): Promise<Response> => {

    const userData: TUsersRequest = req.body

    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)
}

const listUsersController = async (req: Request, res: Response): Promise<Response> => {

    const users: TUsersResponse = await listUsersService()

    return res.status(200).json(users)
}

const updateUserController = async (req: Request, res: Response): Promise<Response> => {

    const userData: TUsersUpdate = req.body

    const userId: number = parseInt(req.params.id)
    

    const newUserData = await updateUserService(userData, userId)

    return res.json(newUserData)
}

const deleteUserController = async (req: Request, res: Response): Promise<Response> => {

    const userId: number = parseInt(req.params.id)

    await deleteUserService(userId)

    return res.status(204).send()
}


export { createUserController, listUsersController, updateUserController, deleteUserController }