import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { NavBar } from "../components/nav-bar";
import { TransactionFormReducer, TransactionFormState } from "../reducers/transaction-form-reducer";
import { TransactionReturnInfo, createTransaction } from "../requests/transaction-requests";
import { getAllUsers, UserAccountReturnInfo } from "../requests/user-account-requests";
import ".././styles/home-page-styles.css";


export function PayRequestPage() {

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
        amount: "",
        send: false,
        accountId: "",
        senderAccountId:0,
        accountEmail: "",
        dateTime: ""
    }

    const router = useNavigate();
    const [data, setData] = useState(initialStateUser);
    const [amount, setAmount] = useState("");
    const [search, setSearch] = useState("");
    let accountId:number = Number(localStorage.getItem("accountId"));

    //ended up not using the reducer
    // const [FormState, dispatchForm] = useReducer(TransactionFormReducer, initialStateTransaction);
    const [transaction, setTransaction] = useState(initialStateTransaction);
    useEffect(() => {
        const accountIDCheck = localStorage.getItem("accountId");
        if (!accountIDCheck) {
            alert("You have to sign in.")
            router("/")
        }
        // useeffect to get all users at intial render
        async function fetchData() {
            const response = await getAllUsers();
            setData(response)
        }

        fetchData();
    }, []);
    // event handler for pay button
    async function handlePay(data: UserAccountReturnInfo) {
        //form
        console.log(accountId);
        const finalStateTransaction: TransactionFormState = {
            amount: amount,
            send: true,// difference
            accountId: data.accountId.toString(),
            senderAccountId: accountId,
            accountEmail: data.email,
            dateTime: Date.now().toString()
        }


        const returnedTransaction:TransactionReturnInfo = await createTransaction(finalStateTransaction);
        if(returnedTransaction){
            router("/home");
        }
    }
    // event handler for request payment
    async function handleRequest(data: UserAccountReturnInfo) {
        const finalStateTransaction: TransactionFormState = {
            amount: amount,
            send: false,//difference
            accountId: data.accountId.toString(),
            senderAccountId: accountId,
            accountEmail: data.email,
            dateTime: Date.now().toString()
        }
        const returnedTransaction:TransactionReturnInfo = await createTransaction(finalStateTransaction);
        if(returnedTransaction){
            router("/home");
        }
        
    }

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value.toLowerCase());
    }

    return <>
        
        <div className="nav-bar-container">
        <NavBar left={[{text:"Home",callback:()=>{router("/home")}}]}
        right={[]} />
            {/* <NavBar left={[{ text: "Home", callback: () => { router("/home") } }]}
                right={[
                    { text: "Add Business", callback: () => { router("/business/new") } },
                    { text: "Business Loan", callback: () => { router("/loan") } }]} /> */}
        </div>

        <div className="centeredDiv" style={{ marginTop: '100px' }}>
            <h2>Search a user by username, email address or phone number:</h2>
            <input className="formInputs" type="text" onChange={handleSearch} value={search || ''} placeholder="example@email.com" required />
            <br />

            <div className="pay-request-list-container">
                {search.length !== 0 && data.length !== 0 &&
                    <table className="pay-request-list-table">
                        <tr className="pay-request-list-table-headers">
                            <th style={{ textAlign: 'center', padding: '8px' }}>User</th>
                            <th style={{ textAlign: 'center', padding: '8px' }}>Request Type</th>
                            <th style={{ textAlign: 'center', padding: '8px' }}>Amount</th>

                        </tr>
                        {data.filter(
                            (user) =>
                                user.username.toLowerCase().includes(search) ||
                                user.email.includes(search) ||
                                user.phoneNumber.toString().includes(search)).map(
                                    (user) =>
                                        <tr className="pay-request-list-table-items" key={user.accountId}>
                                            <td style={{ textAlign: 'center', padding: '8px'  }}>{user.name}</td>
                                            <td style={{ textAlign: 'center', padding: '8px'  }}>
                                                <button style={{ marginRight: '10px' }} onClick={() => handlePay(user)}>Pay</button>
                                                <button onClick={() => handleRequest(user)}>Request</button>
                                            </td>
                                            {/* usestate to set the amount of money */}
                                            <td style={{ textAlign: 'center', padding: '8px'  }}><input onChange={(e) => setAmount(e.target.value)}></input></td>
                                        </tr>
                                )}
                    </table>
                }
            </div>

        </div>
    </>
}

