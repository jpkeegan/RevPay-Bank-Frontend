import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { BusinessLoanForm, createBusinessLoan } from "../requests/business-loan-requests"


export function CreateBusinessLoanPage() {

    const navigate = useNavigate();
    useEffect(()=>{

        const accountIDCheck = localStorage.getItem("accountId");
          if(!accountIDCheck){
            alert("You have to sign in.")
            navigate("/")
          }else{
            //Else is technically not necessary, but I use it to load local storage.
          }
        });

    const [form, setForm] = useState<BusinessLoanForm>({
        amount: 0,
        summary: "",
        businessId: -1
    });

    async function buttonHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const newBusinessLoan = await createBusinessLoan(form);
        console.log(newBusinessLoan);
        navigate("/");
    }


    return <>
    
        <h2>Business Loan Creation Page</h2>

        <form onSubmit={(e: FormEvent<HTMLFormElement>) => buttonHandler(e)}>

            <label htmlFor="amount">Amount ($)</label>
            <input id="amount" required type="text" placeholder="50000" onChange={e => setForm({...form, amount: Number(e.target.value)})} />

            <label htmlFor="summary">Summary</label>
            <input id="summary" required type="text" placeholder="Need money for renovations" onChange={e => setForm({...form, summary: e.target.value})} />

            <label htmlFor="businessId">Business ID</label>
            <input id="businessId" required type="text" placeholder="5" onChange={e => setForm({...form, businessId: Number(e.target.value)})} />

            <button type="submit">Complete Loan Form</button>

        </form>

    </>
}