import { Request, Response } from "express";
import { TLogin } from "../interfaces/login.interfaces";
import { createTokenService } from "../services/login/createToken.service";

const createTokenController = async (req: Request, res: Response): Promise<Response> => {

    const loginData: TLogin = req.body

    const token = await createTokenService(loginData)

    return res. json({ token })
}


export { createTokenController }