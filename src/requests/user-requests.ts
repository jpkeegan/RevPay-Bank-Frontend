import { BusinessDetails, BusinessEntity, UserAccount } from "./types"

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