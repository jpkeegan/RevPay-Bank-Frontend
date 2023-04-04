import { TransactionFormState } from "../reducers/transaction-form-reducer";
import { connectUrl } from "./types";

export type TransactionReturnInfo = {
    transactionId: string
    amount: string
    send: boolean
    accountId: string
    senderAccountId: number
    accountEmail: string
    dateTime: string
}


const url = connectUrl;
export async function createTransaction(params:TransactionFormState):Promise<TransactionReturnInfo> {
    const httpResponse = await fetch(url+ "/transaction", {
        method:"POST",
        body:JSON.stringify(params),
        headers:{"Content-Type":"application/json"}
    });
    const transaction:TransactionReturnInfo = await httpResponse.json();
    return transaction;
}

export async function getAllTransactions():Promise<TransactionReturnInfo[]> {
    const httpResponse = await fetch(url+"/transaction", {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    });
    const transactions : TransactionReturnInfo[] = await httpResponse.json();
    return transactions;
}

//This will get all transactions related to the user
export async function getAllUserTransactions(params:number):Promise<TransactionReturnInfo[]> {
    const httpResponse = await fetch(url+ "/transaction/account/" + params, {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    });
    const transactions : TransactionReturnInfo[] = await httpResponse.json();
    return transactions;
}

//This will get all transactions related to the user within a month
export async function getAllUserTransactionsByTimeRange(time:number,id:number):Promise<TransactionReturnInfo[]> {
    const httpResponse = await fetch(url+ "/transaction/date/" +id+"/" +time, {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    });
    const transactions : TransactionReturnInfo[] = await httpResponse.json();
    return transactions;
}

export async function getTransactionById(params:number):Promise<TransactionReturnInfo[]> {
    const httpResponse = await fetch(url+ "/transaction/" + params, {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    });
    const transactions : TransactionReturnInfo[] = await httpResponse.json();
    return transactions;
}

export async function editTransaction(params:TransactionFormState):Promise<TransactionReturnInfo> {
    const httpResponse = await fetch(url+ "/transaction", {
        method:"PUT",
        body:JSON.stringify(params),
        headers:{"Content-Type":"application/json"}
    });
    const transaction : TransactionReturnInfo = await httpResponse.json();
    return transaction;
}

export async function deleteTransaction(params:number):Promise<boolean> {
    const httpResponse = await fetch(url + "/transaction/" + params, {
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    });
    const transaction : boolean = await httpResponse.json();
    return transaction;
}