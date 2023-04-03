import { useState } from "react"
import { useNavigate } from "react-router"
import { deleteBankAccount } from "../requests/bank-account-requests"
import { BankAccount, updateBankAccount } from "../requests/bank-account-requests"
import { updateWallet, Wallet } from "../requests/wallet-requests"

type BankAccountsListProps = {
    bankAccounts: BankAccount[]
    wallet: Wallet
}

export function AddMoneyWalletBankAccountsList(props: BankAccountsListProps) {

    const navigate = useNavigate();
    const [amount, setAmount] = useState("");

    async function handleAddButton(bankaccount: BankAccount, wallet: Wallet) {
        if ((bankaccount.balance - Number(amount)) < 0) {
            window.alert("Account balance Overdraft: Try another amount")
            return
        }
        const newWalletForm : Wallet = {
            walletId: wallet.accountId,
            balance: wallet.balance + Number(amount),
            accountId: wallet.accountId
        };

        const newBankAccount: BankAccount = {
            bankAccountId: bankaccount.bankAccountId,
            routingNumber: bankaccount.routingNumber,
            accountNumber: bankaccount.accountNumber,
            accountId: bankaccount.accountId,
            balance: (bankaccount.balance - Number(amount))
        }

        await updateWallet(newWalletForm);
        await updateBankAccount(newBankAccount);
        
        navigate('/wallet');
    }

    return <>
        <table>
            <tr>
                <th>BankAccount ID</th>
                <th>routing number</th>
                <th>account number</th>
                <th>balance</th>
                <th>Amount to Add</th>
                <th>Add?</th>
                
            </tr>
            {props.bankAccounts.map(
                (item) =>   <tr key={item.bankAccountId}> 
                                <th>{item.bankAccountId}</th>
                                <th>{item.routingNumber}</th>
                                <th>{item.accountNumber}</th>
                                <th>{item.balance}</th>
                                <th><input onChange={(e)=>setAmount(e.target.value)}></input></th> 
                                <th><button onClick={()=>handleAddButton(item,props.wallet)}>add</button></th>
                            </tr>
                )}
        </table>


        
    
    </>

}