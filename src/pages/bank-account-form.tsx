import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/nav-bar";
import { addBankAccount } from "../requests/bank-account-requests";

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
        <div style={formDiv}>
            <form onSubmit={handleSubmit}>
                <fieldset style={fieldSetStyle}>
                    <legend>Link a Bank Account</legend>
                    <label htmlFor="routingNumber" style={{ margin: "5px" }}>Routing Number</label>
                    <input type="number" id="routingNumber" name="routingNumber" value={bankAccount.routingNumber} onChange={handleInputChange} style={formInputs} required />
                    <br />
                    <label htmlFor="accountNumber" style={{ margin: "5px" }}>Account Number</label>
                    <input type="number" id="accountNumber" name="accountNumber" value={bankAccount.accountNumber} onChange={handleInputChange} style={formInputs} required />

                </fieldset>
                <button type="submit" style={formBtn}>Add</button>
            </form>
        </div>
    </>
}


const formDiv: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}

const formInputs: React.CSSProperties = {
    margin: "5px",
    marginTop: "5px",
    borderRadius: "10px",
    height: "30px"
}

const formBtn: React.CSSProperties = {
    width: "15%",
    marginTop: "5px",
    borderRadius: "10px",
    padding: "3px",
    backgroundColor:"transparent",
    borderColor:"white",
    textShadow:"2px 2px 5px white",
    fontSize:"18px"
}

const fieldSetStyle: React.CSSProperties = {
    width: "80%",
    display: "block",
    marginTop: "25px",
    textShadow: "2px 2px 5px white",
    fontSize: "32px",
    borderRadius: "10px"
}




