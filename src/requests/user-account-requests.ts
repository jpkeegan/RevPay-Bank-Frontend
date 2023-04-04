import { UserForm } from "../pages/personal-account-registration-page"
import { connectUrl } from "./types"

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
    businessAccount: boolean
}

export type FailedLoginReturn = {
    status: number
    error: string
    message: string
}

export type UserAccountUpdate = {
    username: string
    password: string
    email: string
    phoneNumber: number
    name: string
    address: string
    businessAccount: boolean
    oldUsername: string
}

export type FailedUserAccountUpdate = {
    message: string
}

export type Username = {
    username: string
}

const url = connectUrl;

export async function verifyUserAccount(login: SignInForm): Promise<UserAccountReturnInfo | FailedLoginReturn> {
    const httpResponse = await fetch(url + "/login", {
        method: "PATCH",
        body: JSON.stringify(login),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const returnUser: UserAccountReturnInfo = await httpResponse.json();
    return returnUser;
}

export async function createUserAccount(user: UserForm): Promise<UserAccountReturnInfo> {
    const httpResponse = await fetch(url + "/userAccount", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const newUser: UserAccountReturnInfo = await httpResponse.json();
    return newUser;
}

export async function getByUsername(username: string): Promise<UserAccountReturnInfo | FailedLoginReturn> {
    const httpResponse = await fetch(url + "/userAccount/" + username);
    const returnUser: UserAccountReturnInfo = await httpResponse.json();
    return returnUser;
}

export async function getAllUsers(): Promise<UserAccountReturnInfo[]> {
    const httpResponse = await fetch(url + "/userAccount");
    const returnUser: UserAccountReturnInfo[] = await httpResponse.json();
    return returnUser;
}

export async function getAllUsernames(): Promise<Username[]> {
    const httpResponse = await fetch(url + "/userAccount");
    const returnUser: Username[] = await httpResponse.json();
    return returnUser;
}

export async function updateUserAccount(id: number, user: UserAccountUpdate): Promise<UserAccountReturnInfo> {
    const httpResponse = await fetch(url+`/userAccount/${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const updatedUser: UserAccountReturnInfo = await httpResponse.json();
    return updatedUser;
}

