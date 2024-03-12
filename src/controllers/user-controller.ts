import { Request,Response } from "express";
import userService from "../services/user-service";
import httpStatus from "http-status";

export async function createUser (req:Request, res:Response){
    const {email, password, name} = req.body
    try {
        const user = await userService.createUser({email,password,name})
        return res.status(httpStatus.CREATED).send({id:user.id,email:user.email})
    } catch (error) {
        return res.sendStatus(httpStatus.CONFLICT)
    }
}

export async function signIn(req:Request, res:Response) {
    const {email, password} = req.body;
    try {
        const session = await userService.signIn({email, password});
        return res.status(httpStatus.OK).send(session);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
}

export async function logOut(req:Request, res:Response) {
    const {userId} = res.locals;
    const {token} = res.locals
    try {
        await userService.logUserOut (userId,token)
        return res.sendStatus(httpStatus.OK)
    }
    catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
}