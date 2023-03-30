import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/nav-bar";
import { addBankAccount } from "../requests/bank-account-requests";
import ".././styles/home-page-styles.css";

export type BankAccountInfo = {
    routingNumber: number,
    accountNumber: number,
}

export function BankAccountForm() {
    const router = useNavigate();

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
        <NavBar left={[{ text: "Home", callback: () => { router("/") } }]}
            right={[]} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit}>
                <fieldset className="fieldSetStyle">
                    <legend>Link a Bank Account</legend>
                    <label htmlFor="routingNumber" className="labelStyle">Routing Number</label>
                    <input type="number" id="routingNumber" name="routingNumber" value={bankAccount.routingNumber} onChange={handleInputChange} className="formInputs" required />
                    <label htmlFor="accountNumber" className="labelStyle">Account Number</label>
                    <input type="number" id="accountNumber" name="accountNumber" value={bankAccount.accountNumber} onChange={handleInputChange} className="formInputs" required />

                </fieldset>
                <button type="submit" className="formBtn">Add</button>
            </form>
        </div>
    </>
}



