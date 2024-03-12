import { prisma } from "../config/database";
import { NewTransaction, UpdateTransaction } from "../protocols";

async function getTransactions(userId:number) {
    return await prisma.transaction.findMany({
        where:{ 
            userId
        }
    })
}

async function newTransaction(data:NewTransaction) {
    return await prisma.transaction.create({
        data
    })
}

async function filterTransaction(userId:number,newYear:string,newMonth:string) {
    return await prisma.$queryRaw`
        SELECT * 
        FROM "Transaction" 
        WHERE EXTRACT(YEAR FROM "createdAt")=${Number(newYear)}
        AND EXTRACT(MONTH FROM "createdAt")=${Number(newMonth)}
        AND "userId" = ${Number(userId)}
    `
}

async function updateTransaction(data:UpdateTransaction){
    return await prisma.transaction.update({
        where:{
            userId:data.userId,
            id:data.id
        },
        data:{
            amount:data.amount,
            description:data.description
        }
    })
}
const transactionRepository = {
    getTransactions,
    newTransaction,
    filterTransaction,
    updateTransaction
}
export default transactionRepository;
