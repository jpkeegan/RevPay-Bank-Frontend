
import { TransactionFormState } from "../transaction-form-reducer";


export function TransactionList(Props:{transactionArray: TransactionFormState[]}){

    function convertDate(date :number){
        return new Date(date * 1000).toLocaleDateString()
    }
    
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
                        <th>AccountId</th>
                        <th>Account Email</th>
                        <th>Date</th>
                    </tr>
                    {Props.transactionArray.map(
                        (item) =>   <tr className="transaction-list-table-items"key={item.transactionId}> 
                                        <th>{item.transactionId}</th>
                                        <th>{item.amount}</th>
                                        <th>{item.send}</th>
                                        <th>{item.accountId}</th>
                                        <th>{item.accountEmail}</th> 
                                        <th>{convertDate(item.dateTime)}</th>
                                    </tr>
                        )}
                </table>
                    
            </div>
    );
}