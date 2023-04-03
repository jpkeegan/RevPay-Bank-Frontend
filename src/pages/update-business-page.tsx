import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox } from "../components/checkbox";
import { NavBar } from "../components/nav-bar";
import { Form } from "../components/form-comp";
import { BusinessEntity, BusinessForm, businessForm, businessFormDef, businessUpdateDef, CompsCheckedState } from "../requests/types";
import { getByUsername, FailedLoginReturn } from "../requests/user-account-requests";
import { getBusiness, insertBusinessAccount, updateBusinessAccount } from "../requests/user-requests";


export function UpdateBusinessPage(){
    const router = useNavigate();
    const {id} = useParams();
    const Id = Number(id);
    const {isLoading, isError, data} = useQuery(["businesscache",Id], ()=>getBusiness(Id));
    const createMutation = useMutation(updateBusinessAccount, {
        onSuccess: () => {
            console.log("success")
            router("/home")
        } 
    });
    const [bool, setBool] = useState(!data?.isForProfit);
    if(isLoading){
        return <p>LOADING</p>
    }

    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }
    console.log(data)
    async function submitBusiness(form:BusinessForm){
        const checkUser = async function(){
            const result = await getByUsername(form.username)
                if((result as FailedLoginReturn).status){
                    console.log((result as FailedLoginReturn).status)
                    return true
                }
        }
        
        if(localStorage.getItem("username")==form.username || await checkUser()){
            const newBusiness:BusinessEntity = {address:form.address,email:form.email,name:form.name,
            password:form.password,phone_number:form.phoneNumber,username:form.username,
            bin:form.bin,ein:form.ein,businessAccount:true,isForProfit:!bool};
            //createMutation.mutate(newBusiness);
        }else{
            alert("Sorry name already in use. Please try another")
        }
    }

    function updateCheckStatus(){
        setBool(!bool);
    }
 
    return<>
        <NavBar left={[{text:"Home",callback:()=>{router("/home")}}]}
        right={[]} />
        <Form def={businessUpdateDef} initState={JSON.stringify(data!)} handler={submitBusiness} buttonText={"Submit"}/>
        <Checkbox key={data?.ein} isChecked={bool} label={"Non Profit"} checkHandler={updateCheckStatus} index={1}/>
        
    </>
}