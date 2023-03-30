export type UserAccountCreationInput = {
    username: string
    password: string
    email: string
    phoneNumber: number
    name: string
    address: string
    isBusinessAccount: boolean
}

export type SignInForm = {
    username: string
    password: string
}

export type UserAccountReturnInfo = {
    accountId: number
    username: string
    email: string
    phoneNumber: number
    name: string
    address: string
    isBusinessAccount: boolean
}

export type FailedLoginReturn = {
    status: number
    error: string
    message: string
}

export type UserAccountUpdateForm = {
    username: string
    password: string
    email: string
    phoneNumber: number
    name: string
    address: string
    isBusinessAccount: boolean
}


const url = "http://127.0.0.1:8080/";

export async function verifyUserAccount(login:SignInForm):Promise<UserAccountReturnInfo | FailedLoginReturn>{
    const httpResponse = await fetch(url+"login", {
        method: "PATCH",
        body:JSON.stringify(login),
        headers:{
            "Content-Type":"application/json"
        }
    });
    const returnUser:UserAccountReturnInfo = await httpResponse.json();
    return returnUser;
}

export async function getByUsername(username:string):Promise<UserAccountReturnInfo | FailedLoginReturn>{
    const httpResponse = await fetch(url+"userAccount/"+username);
    const returnUser:UserAccountReturnInfo = await httpResponse.json();
    return returnUser;
}

export async function getAllUsers():Promise<UserAccountReturnInfo[]>{
    const httpResponse = await fetch(url+"userAccount");
    const returnUser:UserAccountReturnInfo[] = await httpResponse.json();
    return returnUser;
}

