import { BusinessLoan } from "../requests/business-loan-requests";


export function BusinessLoanList(props:{loanList:BusinessLoan[]}){

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return <>
        <h1>Business Loans</h1>
        <table className="transaction-list-table">
                    <tr className="transaction-list-table-headers">
                        <th>Summary</th>
                        <th>Amount</th>
                    </tr>
                    {props.loanList.map(
                        (item) =>   <tr className="transaction-list-table-items"key={item.businessId}> 
                                        <th>{item.summary}</th>
                                        <th>{USDollar.format(Number(item.amount))}</th>
                                        
                                    </tr>
                        )}
                </table>
    </>
}