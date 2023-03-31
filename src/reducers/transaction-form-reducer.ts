export type TransactionFormState = {
    transactionId: string,
    amount: string,
    send: boolean,
    accountId: string,
    accountEmail: string,
    dateTime: string
}

export type UpdateTransactionId = {type: "UPDATE_TRANSACTION_ID", payload:string}
export type UpdateAmount = {type: "UPDATE_AMOUNT", payload:string}
export type UpdateSend = {type: "UPDATE_SEND", payload:boolean}
export type UpdateAccountId = {type: "UPDATE_ACCOUNT_ID", payload: string}
export type UpdateAccountEmail = {type: "UPDATE_ACCOUNT_EMAIL", payload: string}
export type UpdateDateTime = {type: "UPDATE_DATE_TIME", payload: string}

export type TransactionFormActions = UpdateTransactionId | UpdateAmount | UpdateSend | UpdateAccountId | UpdateAccountEmail | UpdateDateTime

export function TransactionFormReducer(state: TransactionFormState, action: TransactionFormActions):TransactionFormState{

    const nextState: TransactionFormState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case "UPDATE_TRANSACTION_ID":{
            nextState.transactionId = action.payload;
            return nextState
        }
        case "UPDATE_AMOUNT":{
            nextState.amount = action.payload;
            return nextState
        }
        case "UPDATE_SEND":{
            nextState.send = action.payload;
            return nextState
        }
        case "UPDATE_ACCOUNT_ID":{
            nextState.accountId = action.payload;
            return nextState
        }
        case "UPDATE_ACCOUNT_EMAIL":{
            nextState.accountEmail = action.payload;
            return nextState
        }
        case "UPDATE_DATE_TIME":{
            nextState.dateTime = action.payload;
            return nextState
        }
        
        
        default:{
            return nextState
        }
        
    }
}