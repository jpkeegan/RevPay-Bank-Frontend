import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddMoneyWalletBankAccountsList } from "../components/add-money-wallet-bank-account-list";
import { NavBar } from "../components/nav-bar";
import { BankAccount, getAllBankAccounts } from "../requests/bank-account-requests";
import { getWalletByAccountId, Wallet } from "../requests/wallet-requests";

export function AddMoneyToWalletPage(){
    const accountId = Number(localStorage.getItem("accountId"));
    const router = useNavigate();
    const [wallet, setWallet] = useState<Wallet>({
        walletId: 0,
        balance: 0,
        accountId: 0
    });
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    useEffect(()=>{
        if(!accountId){
            alert("You have to sign in.")
            router("/")
          }
        (async ()=>{
            const allBankAccounts = await getAllBankAccounts();
            const pulledWallet = await getWalletByAccountId(accountId);
            setBankAccounts(allBankAccounts.filter(ba=> ba.accountId == Number(accountId)));
            setWallet(pulledWallet);
        })();
    }, [])
    return(
        <>
            <NavBar left={[{text:"Home",callback:()=>{router("/home")}}]}
            right={[
            {text:"Wallet",callback:()=>{router("/wallet")}},
            {text:"Log Out",callback:()=>{router("/logout")}}]} />
            <AddMoneyWalletBankAccountsList bankAccounts={bankAccounts} wallet={wallet}/>
        </>
    );
}