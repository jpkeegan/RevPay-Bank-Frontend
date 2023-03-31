import { useEffect, useState } from "react"
import { BankAccount, getAllBankAccounts } from "../requests/bank-account-requests"
import { async } from "q";
import { BankAccountsList } from "../components/bank-account-list";


export function WalletPage() {

    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    const accountId = localStorage.getItem("accountId");

    useEffect(()=>{
        (async ()=>{
            const allBankAccounts = await getAllBankAccounts();
            setBankAccounts(allBankAccounts.filter(ba=> ba.accountId == Number(accountId)));
        })();
    }, [])

    return <>
    
        <h3>Wallet Page!</h3>
        <h4>Current RevPay Wallet Balance: $__.__</h4>
        <button>Add Money to RevPay Wallet</button>

        <h5>Banks List:</h5>
        <BankAccountsList bankAccounts={bankAccounts} />
        <button >Add Bank</button>

        <h5>Cards List:</h5>

        <button>Add Card</button>
    
    </>

}