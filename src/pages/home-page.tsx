import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NavBar } from "../components/nav-bar";
import { TransactionList } from "../components/transaction-list-component";
import { TransactionFormState } from "../reducers/transaction-form-reducer";
import { BusinessLoansList } from "../components/business-loans-list";
import { getAllTransactions, getAllUserTransactions } from "../requests/transaction-requests";


export function HomePage() {
    const router = useNavigate();
    let accountId = 0;
    useEffect(()=>{

        const accountIDCheck = localStorage.getItem("accountId");
          if(!accountIDCheck){
            alert("You have to sign in.")
            router("/")
          }else{
            accountId = Number(accountIDCheck);

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
            const response = await getAllUserTransactions(accountId);
            setData(response)
        }

        fetchData();
      }, []);

    const isBusinessAccount = localStorage.getItem("businessAccount") === "true";
    return <>
        <NavBar left={[{ text: "Home", callback: () => { router("/home") } }]}
            right={[
                ...(localStorage.getItem("businessAccount")?[{text:"My Business",callback:()=>router("/businesses/"+localStorage.getItem("accountId"))}]:[]),
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