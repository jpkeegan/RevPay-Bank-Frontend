import { TransactionFormState } from "../reducers/transaction-form-reducer";
import { getAllTransactions, getAllUserTransactions, getTransactionById } from "./transaction-requests";
import { BusinessDetails, BusinessEntity, BusinessInfo, UserAccount } from "./types"
import { UserAccountUpdate } from "./user-account-requests";
import { addWallet, getWalletByAccountId, Wallet } from "./wallet-requests";

const url:string = "http://127.0.0.1:8080"

export async function insertBusinessAccount(params:BusinessEntity):Promise<UserAccount>{
    console.log(params.isForProfit)
    const account:UserAccount = {accountId:-1, username:params.username, password:params.password,email:params.email,
        phoneNumber:params.phone_number,name:params.name,address:params.address,businessAccount:true}
    const httpResponse = await fetch(url+"/userAccount",{
        method:"POST",
        body:JSON.stringify(account),
        headers:{"Content-Type":"application/json"}
    });
    const newAccount:UserAccount = await httpResponse.json();
    const busDetail:BusinessDetails = {businessId:-1,bin:params.bin,
        ein:params.ein,isForProfit:params.isForProfit,accountId:newAccount.accountId}
    const newBusDetail:BusinessDetails = await insertBusiness(busDetail);
    await addWallet({balance:0,accountId:newAccount.accountId});
    return newAccount
}

export async function insertBusiness(params:BusinessDetails):Promise<BusinessDetails>{
    const httpResponse = await fetch(url+"/businesses",{
        method:"POST",
        body:JSON.stringify(params),
        headers:{"Content-Type":"application/json"}
    });
    const busDetail:BusinessDetails = await httpResponse.json();
    return busDetail
}

export async function updateBusinessAccount(params:BusinessInfo):Promise<UserAccount>{
    console.log(params.isForProfit)
    const account:UserAccountUpdate = {
        username: params.username,
        password: "",
        email: "",
        phoneNumber: 0,
        name: "",
        address: "",
        businessAccount: false,
        oldUsername: ""
    }
    const httpResponse = await fetch(url+"/userAccount",{
        method:"POST",
        body:JSON.stringify(account),
        headers:{"Content-Type":"application/json"}
    });
    const newAccount:UserAccount = await httpResponse.json();
    const busDetail:BusinessDetails = {businessId:-1,bin:params.bin,
        ein:params.ein,isForProfit:params.isForProfit,accountId:newAccount.accountId}
    const newBusDetail:BusinessDetails = await insertBusiness(busDetail);
    await addWallet({balance:0,accountId:newAccount.accountId});
    return newAccount
}

export async function getBusiness(params:number):Promise<BusinessInfo>{
    const httpResponse = await fetch(url+"/userAccount/"+params);
    const httpResponse2 = await fetch(url+"/businesses/account/"+params);
    const account:UserAccount = await httpResponse.json();
    const business:BusinessDetails = await httpResponse2.json();
    const wallet:Wallet = await getWalletByAccountId(params);
    //const trans:TransactionFormState[] = await getAllUserTransactions(params);
    console.log("reply is"+business.isForProfit)
    const businessInfo:BusinessInfo = {
        businessId: business.businessId,
        accountId: business.accountId,
        address: account.address,
        email: account.email,
        businessAccount: true,
        name: account.name,
        phone_number: account.phoneNumber,
        username: account.username,
        bin: business.bin,
        ein: business.ein,
        isForProfit: business.isForProfit,
        wallet: wallet,
        //transactions: trans.filter(t=>t.accountId===business.accountId.toString())
    }
    return businessInfo
}