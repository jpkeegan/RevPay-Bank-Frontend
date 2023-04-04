import { useEffect, useState } from "react"
import { BankAccount, getAllBankAccounts } from "../requests/bank-account-requests"
import { BankAccountsList } from "../components/bank-account-list";
import { NavBar } from "../components/nav-bar";
import { useNavigate } from "react-router";
import { Wallet, getWalletByAccountId } from "../requests/wallet-requests";
import {CardManagement} from "../components/add-card"
//import '../components/styles.css';


export function WalletPage() {

    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    const [wallet, setWallet] = useState<Wallet>({
        walletId: 0,
        balance: 0,
        accountId: 0
    });

    const accountId = Number(localStorage.getItem("accountId"));
    const router = useNavigate();

    const [showCardManagement, setShowCardManagement] = useState(false);

    const handleAddCardClick = () => {
      setShowCardManagement(true);
    };
    
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
    }, [accountId])

    function addBankButton() {
        router("/bankAccount/add");
    }

    return <>

        <NavBar left={[{text:"Home",callback:()=>{router("/home")}}]}
            right={[
                ...(localStorage.getItem("businessAccount")=='true' ? [{ text: "Business Loan", callback: () => { router("/loan") } }]:[]),
            {text:"Wallet",callback:()=>{router("/wallet")}},
            {text:"Log Out",callback:()=>{router("/logout")}}]} />
    
        <h3>Wallet Page!</h3>
        <h4>Current RevPay Wallet Balance: ${wallet.balance}</h4>

        <button onClick={()=>router("/wallet/add")}>Add Money to RevPay Wallet</button>

        <h5>Banks List:</h5>
        <BankAccountsList bankAccounts={bankAccounts} />
        <button onClick={addBankButton}>Add Bank</button>

        <h5>Cards List:</h5>

        <div>

      {showCardManagement ?(
        <CardManagement />
      ):(
        <button onClick={handleAddCardClick}> Manage Cards</button>
      )}
    </div>
    
    </>

}