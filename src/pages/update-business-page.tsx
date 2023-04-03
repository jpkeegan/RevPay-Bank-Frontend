import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox } from "../components/checkbox";
import { NavBar } from "../components/nav-bar";
import { Form } from "../components/form-comp";
import { BusinessDetails, BusinessEntity, BusinessForm, businessForm, businessFormDef, businessUpdateDef, CompsCheckedState } from "../requests/types";
import { getByUsername, FailedLoginReturn } from "../requests/user-account-requests";
import { getBusiness, insertBusinessAccount, updateBusinessAccount } from "../requests/user-requests";


export function UpdateBusinessPage(){
    const router = useNavigate();
    const {id} = useParams();
    const Id = Number(id);
    const {isLoading, isError, data} = useQuery(["businesscache",Id], ()=>getBusiness(Id));
    const updateMutation = useMutation(updateBusinessAccount, {
        onSuccess: () => {
            console.log("success")
            router("/home")
        } 
    });
    const [bool, setBool] = useState(!data?.forProfit);
    if(isLoading){
        return <p>LOADING</p>
    }

    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }
    function submitBusiness(form:BusinessForm){
        const submitForm:BusinessDetails = {
            businessId: data!.businessId,
            bin: form.bin,
            ein: form.ein,
            forProfit: !bool,
            accountId: data!.accountId
        };
        console.log(submitForm)
        updateMutation.mutate(submitForm)
    }

    function updateCheckStatus(){
        setBool(!bool);
    }
 
    return<>
        <NavBar left={[{text:"Home",callback:()=>{router("/home")}}]}
        right={[{text:"Upadate Account Info",callback:()=>{router("/settings")}}]} />
        <Form def={businessUpdateDef} initState={JSON.stringify(data!)} handler={submitBusiness} buttonText={"Submit"}/>
        <Checkbox key={data?.ein} isChecked={bool} label={"Non Profit"} checkHandler={updateCheckStatus} index={1}/>
        
    </>
}