import { BankAccountInfo } from "../pages/bank-account-form";


export type BankAccount = {
    bankAccountId: number,
    routingNumber: number,
    accountNumber: number,
    accountId: number,
    balance: number
}

export const url = "http://127.0.0.1:8080";

export async function addBankAccount(bankAccount: BankAccountInfo): Promise<BankAccount> {
    const response = await fetch(`${url}/bankAccounts`, {
        method: "POST",
        body: JSON.stringify(bankAccount),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const newBankAccount: BankAccount = await response.json();
    return newBankAccount;
}

export async function updateBankAccount(bankAccount: BankAccount): Promise <BankAccount> {
    const response = await fetch(`${url}/bankAccounts/${bankAccount.bankAccountId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bankAccount)
    });
    
    const updatedBankAccount: BankAccount = await response.json();
    return updatedBankAccount;
}

export async function getBankAccountById(id: number): Promise<BankAccount> {
    const response = await fetch(`${url}/bankAccounts/${id}`);
    const retrievedBankAccount: BankAccount = await response.json();
    return retrievedBankAccount;
}

export async function deleteBankAccount(id: number): Promise<void> {
    await fetch(`${url}/bankAccounts/${id}`, {
        method: 'DELETE'
    });
}

export async function getAllBankAccounts(): Promise<BankAccount[]> {
    const httpResponse = await fetch(url + "/bankAccounts");
    const bankAccounts: BankAccount[] = await httpResponse.json();
    return bankAccounts;
}