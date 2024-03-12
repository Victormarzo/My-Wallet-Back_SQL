import { Response , Request } from "express";
import httpStatus from "http-status";
import transactionService from "../services/transaction-service";

export async function getAllTransactions(req:Request, res:Response) {
    const{userId}=res.locals;
    try {
        const transactions = await transactionService.getTransactions(userId)
        return res.status(httpStatus.OK).send(transactions)
        } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
}

export async function newTransaction(req:Request, res:Response){
    const {userId}=res.locals
    const {operation,amount,description}= req.body
    const body = {operation,amount,description, userId }
    try{
        await transactionService.newTransaction(body); 
        return res.sendStatus(httpStatus.CREATED);
    }catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
}
 export async function getTransactionbyMonth(req:Request, res:Response) {
    const month= req.params.month
    const {userId}=res.locals
    try {
        const filtered=await transactionService.filterTransactions(userId,month)
        return res.status(httpStatus.OK).send(filtered)
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
 }

export async function putTransaction(req:Request, res:Response) {
    const {body} = req
    const {userId}=res.locals
    try {
        await transactionService.editTransaction({...body,userId})
        return res.sendStatus(httpStatus.OK)
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
    
}