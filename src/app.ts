import express, {Express} from "express";
import cors from "cors";
import { connectDb,disconnectDb } from "./config/database";
import { userRouter } from "./routers/user-router";
import { transactionRouter } from "./routers/transaction-router";
import { handleApplicationErrors } from "./middlewares/error-handling-middleware";
import dotenv from "dotenv";

dotenv.config();

const app = express ();
app
    .use(cors())
    .use(express.json())
    .get('/health', (req, res) =>res.send("It's ok!"))
    .use("/user", userRouter)
    .use("/transaction", transactionRouter)
    .use(handleApplicationErrors)

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
}
export async function close(): Promise <void> {
    await disconnectDb();
}
export default app;