import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NavBar } from "../components/nav-bar";
import { TransactionList } from "../components/transaction-list-component";
import { TransactionReturnInfo, getAllTransactions, getAllUserTransactions, getAllUserTransactionsByTimeRange } from "../requests/transaction-requests";
import { BusinessLoansList } from "../components/business-loans-list";
import { renderToString } from 'react-dom/server';
import jsPDF from "jspdf";



export function HomePage() {
    const router = useNavigate();
    let accountId = Number(localStorage.getItem("accountId"));
    let listCallBool = false;
    const [time, setTime] = useState(0);
    const [list, setList] = useState<TransactionReturnInfo[]>([{transactionId: "",
    amount: "",
    send: false,
    accountId: "",
    senderAccountId: accountId,
    accountEmail: "",
    dateTime: ""}]);
    useEffect(()=>{

        const accountIDCheck = localStorage.getItem("accountId");
          if(!accountIDCheck){
            alert("You have to sign in.")
            router("/")
          }
    });

    const initialStateTransaction: TransactionReturnInfo[] = [
        {
            transactionId: "",
            amount: "",
            send: false,
            accountId: "",
            senderAccountId: accountId,
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
    
    function handleDateTimeAction(event:React.ChangeEvent<HTMLInputElement>){
        let unixEpochDate = +new Date(event.target.value);
        setTime(unixEpochDate);
        
    }

    async function handleListPopulate(){
        const transactionList: TransactionReturnInfo[] = await getAllUserTransactionsByTimeRange(accountId,time);
        if(transactionList){
            setList(transactionList);
            listCallBool = true;
        }
        
    }

    function handleCreatePDF(exportList: TransactionReturnInfo[]){
        const string = renderToString(<TransactionList transactionArray={exportList} />);
        const pdf = new jsPDF({
            orientation: 'l',
            format: "a4",
            unit: "px"
          });

        pdf.html(string,{
            async callback(pdf) {
                pdf.save("transactions.pdf");
              }
        });
    }


    const isBusinessAccount = localStorage.getItem("businessAccount") === "true";

    return <>
        <NavBar left={[{ text: "Home", callback: () => { router("/home") } }]}
            right={[
                ...(localStorage.getItem("businessAccount")=='true' ? [{text:"My Business",callback:()=>router("/businesses/"+localStorage.getItem("accountId"))}]:[]),
                ...(localStorage.getItem("businessAccount")=='true' ? [{ text: "Business Loan", callback: () => { router("/loan") } }]:[]),
                { text: "Wallet", callback: () => { router("/wallet") } },
                { text: "Settings", callback: () => { router("/settings") } },
                { text: "Log Out", callback: () => { router("/logout") } },
            ]} />
        <h1>homepage</h1>
        <button onClick={()=>router("/transaction")}>Pay/Request</button>
        <h1 className="transaction-list-header">List Transactions</h1>
        <TransactionList transactionArray={data}/>
        <button onClick={()=>handleCreatePDF(data)}>Save as PDF</button><br /><br /><br />
        <label htmlFor="month">List Transactions based on Date</label><br />
        <input type="month" id="month" min="2000-01" onChange={handleDateTimeAction} /><br/><br/><br/>
        <button onClick={handleListPopulate}>List</button>
        <h1 className="transaction-list-header">Transaction List by Date</h1>
        <TransactionList transactionArray={list}/>  
        <button onClick={()=>handleCreatePDF(list)}>Save as PDF</button>
        <div>
        {isBusinessAccount? <h1>Business Loans List:</h1>:<></>}
        {isBusinessAccount && <BusinessLoansList/>}
        </div>

    </>
}