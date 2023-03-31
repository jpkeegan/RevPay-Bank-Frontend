import { BusinessLoan } from "../requests/business-loan-requests"

type BusinessLoansListProps = {
    businessLoans: BusinessLoan[]
}

export function BusinessLoansList(props: BusinessLoansListProps) {

    return <>
    
        <ul>

            {props.businessLoans.map(bl => <li key={bl.loanId}>
                Loan ID: {bl.loanId}<br/>
                Amount: ${bl.amount}<br/>
                Summary: {bl.summary}<br/>
                Business ID: {bl.businessId}<br/>
                </li>)}

        </ul>
    
    </>

}