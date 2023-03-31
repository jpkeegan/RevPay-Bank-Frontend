import { BankAccount } from "../requests/bank-account-requests"

type BankAccountsListProps = {
    bankAccounts: BankAccount[]
}

export function BankAccountsList(props: BankAccountsListProps) {

    return <>
    
        <ul>

            {props.bankAccounts.map(ba => <li key={ba.accountId}>
                Bank Account ID: {ba.accountId}<br/>
                Routing Number: {ba.routingNumber}<br/>
                Account Number: {ba.accountNumber}<br/>
                Balance: {ba.balance}<br/>
                Account ID: {ba.accountId}</li>)}

        </ul>
    
    </>

}