export type TransactionFormState = {
    amount: string,
    send: boolean,
    accountId: string,
    senderAccountId: number,
    accountEmail: string,
    dateTime: string
}

export type UpdateAmount = {type: "UPDATE_AMOUNT", payload:string}
export type UpdateSend = {type: "UPDATE_SEND", payload:boolean}
export type UpdateAccountId = {type: "UPDATE_ACCOUNT_ID", payload: string}
export type UpdateAccountEmail = {type: "UPDATE_ACCOUNT_EMAIL", payload: string}
export type UpdateDateTime = {type: "UPDATE_DATE_TIME", payload: string}

export type TransactionFormActions = UpdateAmount | UpdateSend | UpdateAccountId | UpdateAccountEmail | UpdateDateTime

export function TransactionFormReducer(state: TransactionFormState, action: TransactionFormActions):TransactionFormState{

    const nextState: TransactionFormState = JSON.parse(JSON.stringify(state));
    switch(action.type){
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