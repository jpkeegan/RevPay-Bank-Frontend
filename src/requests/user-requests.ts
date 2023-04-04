import { TransactionFormState } from "../reducers/transaction-form-reducer";
import { BusinessLoan, getLoansByBusinessId } from "./business-loan-requests";
import { TransactionReturnInfo, getAllTransactions, getAllUserTransactions, getTransactionById } from "./transaction-requests";
import { BusinessAccount, BusinessDetails, BusinessEntity, BusinessInfo, connectUrl, UserAccount } from "./types"
import { UserAccountUpdate } from "./user-account-requests";
import { addWallet, getWalletByAccountId, Wallet } from "./wallet-requests";

const url:string = connectUrl

export async function insertBusinessAccount(params:BusinessEntity):Promise<BusinessAccount>{
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
        ein:params.ein,forProfit:params.isForProfit,accountId:newAccount.accountId}
    const newBusDetail:BusinessDetails = await insertBusiness(busDetail);
    await addWallet({balance:0,accountId:newAccount.accountId});
    const business:BusinessAccount = {
        accountId: newAccount.accountId,
        username: newAccount.username,
        password: newAccount.password,
        email: newAccount.email,
        phoneNumber: newAccount.phoneNumber,
        name: newAccount.name,
        address: newAccount.address,
        businessAccount: true,
        businessId: newBusDetail.businessId
    };
    return business
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

export async function updateBusinessAccount(params:BusinessDetails):Promise<BusinessDetails>{
    const httpResponse = await fetch(url+"/businesses",{
        method:"PUT",
        body:JSON.stringify(params),
        headers:{"Content-Type":"application/json"}
    });
    const newBusDetail:BusinessDetails = await httpResponse.json();
    return newBusDetail
}

export async function getBusiness(params:number):Promise<BusinessInfo>{
    const httpResponse = await fetch(url+"/userAccount/"+params);
    const httpResponse2 = await fetch(url+"/businesses/account/"+params);
    const account:UserAccount = await httpResponse.json();
    const business:BusinessDetails = await httpResponse2.json();
    const wallet:Wallet = await getWalletByAccountId(params);
    const loans:BusinessLoan[] = await getLoansByBusinessId(business.businessId);
    const trans:TransactionReturnInfo[] = await getAllUserTransactions(params);
    console.log("reply is"+business.forProfit)
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
        forProfit: business.forProfit,
        wallet: wallet,
        transactions: trans,
        loans: loans
    }
    return businessInfo
}