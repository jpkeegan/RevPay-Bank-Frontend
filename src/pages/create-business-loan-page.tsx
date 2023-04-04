import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/nav-bar";
import { BusinessLoanForm, createBusinessLoan } from "../requests/business-loan-requests"


export function CreateBusinessLoanPage() {

    const navigate = useNavigate();
    const localBusinessId: number = Number(localStorage.getItem("businessId"));
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
        businessId: localBusinessId
    });

    async function buttonHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setForm({...form, businessId: localBusinessId});
        const newBusinessLoan = await createBusinessLoan(form);
        console.log(newBusinessLoan);
        navigate("/home");
    }


    return <>
      <NavBar left={[{text:"Home",callback:()=>{navigate("/home")}}]}
        right={[]} />
        <h2>Business Loan Creation Page</h2>

        <form onSubmit={(e: FormEvent<HTMLFormElement>) => buttonHandler(e)}>

            <label htmlFor="amount">Amount ($)</label> <br/>
            <input id="amount" required type="text" placeholder="50000" onChange={e => setForm({...form, amount: Number(e.target.value)})} />
            <br/>
            <label htmlFor="summary">Summary</label> <br/>
            <input id="summary" required type="text" placeholder="Need money for renovations" onChange={e => setForm({...form, summary: e.target.value})} />
            <br/>
            <button type="submit">Complete Loan Form</button>

        </form>

    </>
}