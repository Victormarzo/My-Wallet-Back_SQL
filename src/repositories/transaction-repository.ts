import { prisma } from "../config/database";
import { NewTransaction, UpdateTransaction } from "../protocols";

async function getTransactions(userId:number) {
    return await prisma.transaction.findMany({
        where:{ 
            userId
        }
        ,orderBy:{
            date:'desc'
        }
    })
}

async function newTransaction(data:NewTransaction) {
    return await prisma.transaction.create({
        data
    })
}

async function filterTransaction(userId:number,newYear:string,newMonth:string) {
    return await prisma.transaction.findMany({
        where:{
            date:{
                startsWith:`${newYear}-${newMonth}`
            },
            userId
        },orderBy:{
            date:'desc'
        }
    })
}

async function updateTransaction(data:UpdateTransaction){
    return await prisma.transaction.update({
        where:{
            userId:data.userId,
            id:data.id
        },
        data:{
            amount:data.amount,
            description:data.description,
            date:data.date
        }
    })
}

async function removeTransaction(userId:number, id:number){
    return await prisma.transaction.delete({
        where:{
            userId,
            id
        }
    })
}

const transactionRepository = {
    getTransactions,
    newTransaction,
    filterTransaction,
    updateTransaction,
    removeTransaction
}
export default transactionRepository;
