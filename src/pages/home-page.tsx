import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NavBar } from "../components/nav-bar";
import { TransactionList } from "../components/transaction-list-component";
import { TransactionFormState } from "../reducers/transaction-form-reducer";
import { getAllTransactions } from "../requests/transaction-requests";
import { BusinessLoansList } from "../components/business-loans-list";


export function HomePage() {
    const router = useNavigate();
    useEffect(()=>{

        const accountIDCheck = localStorage.getItem("accountId");
          if(!accountIDCheck){
            alert("You have to sign in.")
            router("/")
          }else{
            //Else is technically not necessary, but I use it to load local storage.
          }
        });

    const initialStateTransaction: TransactionFormState[] = [
        {
            transactionId: "",
            amount: "",
            send: false,
            accountId: "",
            accountEmail: "",
            dateTime: ""
        }
    ]
    const [data, setData] = useState(initialStateTransaction);
    useEffect(() => {
        

        async function fetchData() {
            const response = await getAllTransactions();
            setData(response)
        }

        fetchData();
      }, []);

    const isBusinessAccount = localStorage.getItem("businessAccount") === "true";
    return <>
        <NavBar left={[{ text: "Home", callback: () => { router("/home") } }]}
            right={[
                { text: "Add Business", callback: () => { router("/business/new") } },
                { text: "Business Loan", callback: () => { router("/loan") } },
                { text: "Wallet", callback: () => { router("/wallet") } },
                { text: "Settings", callback: () => { router("/settings") } },
                { text: "Log Out", callback: () => { router("/logout") } },
            ]} />
        <h1>homepage</h1>
        <button onClick={()=>router("/transaction")}>Pay/Request</button>
        <TransactionList transactionArray={data}/>
        
        <div>
        {isBusinessAccount && <BusinessLoansList/>}
        </div>
    </>
}