import { UserAccountCreationInput } from "../requests/user-account-requests"


export type RegistrationState ={
    userInfo:UserAccountCreationInput
    confirmedPassword: string
}
// username: string
// password: string
// email: string
// phoneNumber: number
// name: string
// address: string
// businessAccount: boolean