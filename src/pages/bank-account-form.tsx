import { FormEvent, useState } from "react";
import { addBankAccount } from "../requests/bank-account-requests";

export type BankAccountInfo = {
    routingNumber: number,
    accountNumber: number,
}

export function BankAccountForm() {

    const [bankAccount, setBankAccount] = useState<BankAccountInfo>({ routingNumber: 0, accountNumber: 0 });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setBankAccount(prevState => ({
            ...prevState,
            [name]: Number(value)
        }));
    }


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await addBankAccount(bankAccount);
        setBankAccount({ routingNumber: 0, accountNumber: 0 })
        alert('Bank account successfully linked')
    }

    return <>

        <form onSubmit={handleSubmit}>
            <h1>Link a Bank Account</h1>
            <label htmlFor="routingNumber">Routing Number</label>
            <input type="number" id="routingNumber" name="routingNumber" value={bankAccount.routingNumber} onChange={handleInputChange} required/>
            <label htmlFor="accountNumber">Account Number</label>
            <input type="number" id="accountNumber" name="accountNumber" value={bankAccount.accountNumber} onChange={handleInputChange} required/>
            <button type="submit">Add</button>
        </form>

    </>
}

