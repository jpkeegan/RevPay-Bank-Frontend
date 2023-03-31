import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { NavBar } from "../components/nav-bar";
import { TransactionFormReducer, TransactionFormState } from "../reducers/transaction-form-reducer";
import { createTransaction } from "../requests/transaction-requests";
import { getAllUsers, UserAccountReturnInfo } from "../requests/user-account-requests";


export function PayRequestPage(){

    // initial state of user list
    const initialStateUser: UserAccountReturnInfo[] = [
        {
            accountId: 0,
            username: "",
            email: "",
            phoneNumber: 0,
            name: "",
            address: "",
            businessAccount: false
        }
    ]
    // initial state of transaction to be created
    const initialStateTransaction: TransactionFormState = {
        transactionId: "",
        amount: "",
        send: false,
        accountId: "",
        accountEmail: "",
        dateTime: ""
    }

    const router = useNavigate();
    const [data, setData] = useState(initialStateUser);
    const [amount, setAmount] = useState("");
    //ended up not using the reducer
    // const [FormState, dispatchForm] = useReducer(TransactionFormReducer, initialStateTransaction);
    const [transaction, setTransaction] = useState(initialStateTransaction);
    useEffect(() => {
        
        // useeffect to get all users at intial render
        async function fetchData() {
            const response = await getAllUsers();
            setData(response)
        }

        fetchData();
      }, []);
    // event handler for pay button
    function handlePay(data: UserAccountReturnInfo, amount: string){
        //form
        const finalStateTransaction: TransactionFormState = {
            transactionId: Math.floor(Math.random()*1000).toString(),
            amount: amount,
            send: true,// difference
            accountId: data.accountId.toString(),
            accountEmail: data.email,
            dateTime: Date.now().toString()
        }

        
        createTransaction(finalStateTransaction);
        router("/home");
    }
    // event handler for request payment
    function handleRequest(data: UserAccountReturnInfo){
        const finalStateTransaction: TransactionFormState = {
            transactionId: Math.floor(Math.random()*1000).toString(),
            amount: amount,
            send: false,//difference
            accountId: data.accountId.toString(),
            accountEmail: data.email,
            dateTime: Date.now().toString()
        }

        createTransaction(finalStateTransaction);
        router("/home");
    }
    return(
        <div className="container">
            <div className="nav-bar-container">
                    <NavBar left={[{text:"Home",callback:()=>{router("/home")}}]}
                right={[
                {text:"Add Business",callback:()=>{router("/business/new")}},
                {text:"Business Loan",callback:()=>{router("/loan")}}]} />
            </div>
            
            <div className="pay-request-list-container">
                <table className="pay-request-list-table">
                    <tr className="pay-request-list-table-headers">
                        <th>Username</th>
                        <th>Email</th>
                        <th>Pay?</th>
                        <th>Request Money?</th>
                        <th>Amount</th>
                        
                    </tr>
                    {data.map( //list out from getAll Users
                        (item) =>   <tr className="pay-request-list-table-items"key={item.accountId}> 
                                        <th>{item.username}</th>
                                        <th>{item.email}</th>
                                        <th><button onClick={()=>handlePay(item,amount)}>Pay</button></th>
                                        <th><button onClick={()=>handleRequest(item)}>Request Money</button></th>
                                        {/* usestate to set the amount of money */}
                                        <th><input onChange={(e)=> setAmount(e.target.value)}></input></th>
                                    </tr>
                        )}
                </table>
            </div>
            
        </div>
    );
        
        
}