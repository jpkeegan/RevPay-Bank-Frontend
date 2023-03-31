import { useNavigate } from "react-router"
import { deleteBankAccount } from "../requests/bank-account-requests"
import { BankAccount } from "../requests/bank-account-requests"

type BankAccountsListProps = {
    bankAccounts: BankAccount[]
}

export function BankAccountsList(props: BankAccountsListProps) {

    const navigate = useNavigate();

    async function deleteButton(id: number) {
        await deleteBankAccount(id);
        navigate('/home');
    }

    return <>
    
        <ul>

            {props.bankAccounts.map(ba => <li key={ba.bankAccountId}>
                Bank Account ID: {ba.bankAccountId}<br/>
                Routing Number: {ba.routingNumber}<br/>
                Account Number: {ba.accountNumber}<br/>
                Balance: {ba.balance}<br/>
                Account ID: {ba.accountId}<br/>
                <button onClick={()=>deleteButton(ba.bankAccountId)} >Delete</button>
                </li>)}

        </ul>
    
    </>

}