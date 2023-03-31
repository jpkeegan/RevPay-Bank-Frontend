import { type } from "os"
import { UserForm } from "../pages/personal-account-registration-page";


export type RegistrationState ={
    userInfo:UserForm
    confirmedPassword: string
}

export type SetUsernameAction = {type:"SET_USERNAME", payload: string};
export type SetPasswordAction = {type:"SET_PASSWORD", payload:string};
export type SetConfirmPasswordAction = {type:"SET_CONFIRM_PASSWORD", payload:string};
export type SetEmailAction = {type: "SET_EMAIL", payload: string};
export type SetPhoneNumberAction = {type: "SET_PHONE_NUMBER", payload: number};
export type SetNameAction = {type: "SET_NAME", payload: string};
export type SetAddressAction = {type: "SET_ADDRESS", payload: string};
export type SetBusinessAccountAction = {type: "SET_BUSINESS_ACCOUNT", payload: boolean};

export type UserAccountInfoAction = SetUsernameAction | SetPasswordAction | SetConfirmPasswordAction | SetEmailAction | SetPhoneNumberAction | SetNameAction | SetAddressAction | SetBusinessAccountAction

export function userRegistrationReducer(state:RegistrationState, action: UserAccountInfoAction):RegistrationState{
    const nextState: RegistrationState = JSON.parse(JSON.stringify(state));

    switch(action.type){
        case "SET_USERNAME": {
            nextState.userInfo.username = action.payload;
            return nextState;
        }
        case "SET_PASSWORD": {
            nextState.userInfo.password = action.payload;
            return nextState;
        }
        case "SET_CONFIRM_PASSWORD": {
            nextState.confirmedPassword = action.payload;
            return nextState;
        }
        case "SET_EMAIL": {
            nextState.userInfo.email = action.payload;
            return nextState;
        }
        case "SET_PHONE_NUMBER": {
            nextState.userInfo.phoneNumber = action.payload;

            return nextState;
        }
        case "SET_NAME": {
            nextState.userInfo.name = action.payload;
            return nextState;
        }
        case "SET_ADDRESS": {
            nextState.userInfo.address = action.payload;
            return nextState;
        }
        case "SET_BUSINESS_ACCOUNT": {
            nextState.userInfo.businessAccount = action.payload;
            return nextState;
        }
    }
}