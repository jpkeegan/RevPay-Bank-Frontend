
import { TransactionFormState } from "../reducers/transaction-form-reducer";
import { TransactionReturnInfo } from "../requests/transaction-requests";


export function TransactionList(Props:{transactionArray: TransactionReturnInfo[]}){
    // basically takes in transaction list as props and spreads them out on a table

    // converts date in props which is a number to a string to make it look nice
    function convertDate(date :number){
        return new Date(date).toLocaleDateString()
    }

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    
    return(
            <div className="transaction-list-container">
                <div className="transaction-list-header-container">
                    <h1 className="transaction-list-header">Transaction List</h1>
                </div>

                <table className="transaction-list-table">
                    <tr className="transaction-list-table-headers">
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Sent?</th>
                        <th>With Account Id</th>
                        <th>With Account Email</th>
                        <th>Date</th>
                    </tr>
                    {Props.transactionArray.map(
                        (item) =>   <tr className="transaction-list-table-items"key={item.transactionId}> 
                                        <th>{item.transactionId}</th>
                                        <th>{USDollar.format(Number(item.amount))}</th>
                                        <th>{item.send ? "Paid" : "Requested"}</th>
                                        <th>{item.accountId}</th>
                                        <th>{item.accountEmail}</th> 
                                        <th>{convertDate(Number(item.dateTime))}</th>
                                    </tr>
                        )}
                </table>
                    
            </div>
    );
}