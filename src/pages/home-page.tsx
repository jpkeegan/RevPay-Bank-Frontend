import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NavBar } from "../components/nav-bar";
import { TransactionList } from "../components/transaction-list-component";
import { TransactionFormState } from "../reducers/transaction-form-reducer";
import { getAllTransactions } from "../requests/transaction-requests";


export function HomePage(){
    const router = useNavigate();

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
    return <>
        <NavBar left={[{text:"Home",callback:()=>{router("/home")}}]}
        right={[
        {text:"Add Business",callback:()=>{router("/business/new")}},
        {text:"Business Loan",callback:()=>{router("/loan")}},
        {text:"Wallet",callback:()=>{router("/wallet")}},
        {text:"Log Out",callback:()=>{router("/logout")}}]} />
        <h1>homepage</h1>
        <button onClick={()=>router("/transaction")}>Pay/Request</button>
        <TransactionList transactionArray={data}/>
    </>
}