import { Router } from "express";
import { getAllTransactions, putTransaction,newTransaction,getTransactionbyMonth } from "../controllers/transaction-controller";
import { authenticateToken } from "../middlewares/auth-middleware";

const transactionRouter = Router();
transactionRouter
    .all("/*", authenticateToken)    
    .get("/", getAllTransactions)
    .post("/", newTransaction)
    .get("/:month", getTransactionbyMonth)
    .put("/",putTransaction)
export {transactionRouter}
