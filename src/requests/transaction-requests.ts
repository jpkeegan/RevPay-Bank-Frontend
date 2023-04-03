import { TransactionFormState } from "../reducers/transaction-form-reducer";
const url = "http://127.0.0.1:8080/";
export async function createTransaction(params:TransactionFormState):Promise<TransactionFormState> {
    const httpResponse = await fetch(url+ "transaction", {
        method:"POST",
        body:JSON.stringify(params),
        headers:{"Content-Type":"application/json"}
    });
    const transaction = await httpResponse.json();
    return transaction;
}

export async function getAllTransactions():Promise<TransactionFormState[]> {
    const httpResponse = await fetch(url+"transaction", {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    });
    const transactions : TransactionFormState[] = await httpResponse.json();
    return transactions;
}

//This will get all transactions related to the user
export async function getAllUserTransactions(params:number):Promise<TransactionFormState[]> {
    const httpResponse = await fetch(url+ "transaction/account/" + params, {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    });
    const transactions : TransactionFormState[] = await httpResponse.json();
    return transactions;
}

export async function getTransactionById(params:number):Promise<TransactionFormState[]> {
    const httpResponse = await fetch(url+ "transaction/" + params, {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    });
    const transactions : TransactionFormState[] = await httpResponse.json();
    return transactions;
}

export async function editTransaction(params:TransactionFormState):Promise<TransactionFormState> {
    const httpResponse = await fetch(url+ "transaction", {
        method:"PUT",
        body:JSON.stringify(params),
        headers:{"Content-Type":"application/json"}
    });
    const transaction : TransactionFormState = await httpResponse.json();
    return transaction;
}

export async function deleteTransaction(params:number):Promise<boolean> {
    const httpResponse = await fetch(url + "transaction/" + params, {
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    });
    const transaction : boolean = await httpResponse.json();
    return transaction;
}