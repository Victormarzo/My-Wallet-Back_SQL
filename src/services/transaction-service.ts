import { NewTransaction, UpdateTransaction } from "../protocols"
import transactionRepository from "../repositories/transaction-repository"

export async function getTransactions(userId:number) {
    const transactions =  await transactionRepository.getTransactions(userId);
    const total = getTotal(transactions)
    const transactionTotal = {
        total,
        transactions
    }
    return transactionTotal;
}

function getTotal (transactionList:NewTransaction[]){
    let total = 0, operation = ''
    transactionList.forEach((transaction)=>{
        if(transaction.operation === "POSITIVE"){
            total+=Number(transaction.amount)
        }else {
            total-=Number(transaction.amount)
        }
    })
    if (total >=0) operation = "POSITIVE"
    else {
        operation = "NEGATIVE"
    }
    total=Math.abs(total)
    const result= {sum:total.toString(),
    operation}
    return result
}

export async function newTransaction (transaction:NewTransaction){
    const newT = await transactionRepository.newTransaction(transaction);
    console.log(newT)
    //return (newT);
}

export async function filterTransactions(userId:number,month:string) {
    const newYear = `20${month[3]}${month[4]}`
    const newMonth = `${month[0]}${month[1]}`
    const filteredTransaction = await transactionRepository.filterTransaction(userId,newYear,newMonth)
    const total=getTotal(filteredTransaction as NewTransaction[])
    const transactionTotal = {
        total,
        transaction:filteredTransaction
    }
    return transactionTotal;
}


export async function editTransaction(body:UpdateTransaction) {
    const updateT = await transactionRepository.updateTransaction(body);
    return (updateT);
}


export async function deleteTransaction(userId:number, id:number){
    const deleteT = await transactionRepository.removeTransaction(userId,id)
    return (deleteT);
}

const transactionService ={
    getTransactions,
    newTransaction,
    filterTransactions,
    editTransaction,
    deleteTransaction
}
export default transactionService;
