import { useEffect, useState } from "react"
import { BankAccount, getAllBankAccounts } from "../requests/bank-account-requests"
import { BankAccountsList } from "../components/bank-account-list";
import { NavBar } from "../components/nav-bar";
import { useNavigate } from "react-router";


export function WalletPage() {

    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    const accountId = localStorage.getItem("accountId");
    const router = useNavigate();

    useEffect(()=>{
        (async ()=>{
            const allBankAccounts = await getAllBankAccounts();
            setBankAccounts(allBankAccounts.filter(ba=> ba.accountId == Number(accountId)));
        })();
    }, [])

    function addBankButton() {
        router("/bankAccount/add");
    }

    return <>

        <NavBar left={[{text:"Home",callback:()=>{router("/home")}}]}
            right={[
            {text:"Add Business",callback:()=>{router("/business/new")}},
            {text:"Business Loan",callback:()=>{router("/loan")}},
            {text:"Wallet",callback:()=>{router("/wallet")}},
            {text:"Log Out",callback:()=>{router("/logout")}}]} />
    
        <h3>Wallet Page!</h3>
        <h4>Current RevPay Wallet Balance: $__.__</h4>
        <button>Add Money to RevPay Wallet</button>

        <h5>Banks List:</h5>
        <BankAccountsList bankAccounts={bankAccounts} />
        <button onClick={addBankButton}>Add Bank</button>

        <h5>Cards List:</h5>

        <button>Add Card</button>
    
    </>

}