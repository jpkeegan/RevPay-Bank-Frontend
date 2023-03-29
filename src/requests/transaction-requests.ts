import { TransactionFormState } from "../transaction-form-reducer";

export async function createTransaction(params:TransactionFormState):Promise<TransactionFormState> {
    const httpResponse = await fetch("http://localhost:8080/transaction", {
        method:"POST",
        body:JSON.stringify(params),
        headers:{"Content-Type":"application/json"}
    });
    const transaction = await httpResponse.json();
    return transaction;
}

export async function getAllTransactions():Promise<TransactionFormState[]> {
    const httpResponse = await fetch("http://localhost:8080/transaction", {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    });
    const transactions : TransactionFormState[] = await httpResponse.json();
    return transactions;
}

export async function getTransactionById(params:number):Promise<TransactionFormState[]> {
    const httpResponse = await fetch("http://localhost:8080/transaction/" + params, {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    });
    const transactions : TransactionFormState[] = await httpResponse.json();
    return transactions;
}

export async function editTransaction(params:TransactionFormState):Promise<TransactionFormState> {
    const httpResponse = await fetch("http://localhost:8080/transaction", {
        method:"PUT",
        body:JSON.stringify(params),
        headers:{"Content-Type":"application/json"}
    });
    const transaction : TransactionFormState = await httpResponse.json();
    return transaction;
}

export async function deleteTransaction(params:number):Promise<boolean> {
    const httpResponse = await fetch("http://localhost:8080/transaction/" + params, {
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    });
    const transaction : boolean = await httpResponse.json();
    return transaction;
}