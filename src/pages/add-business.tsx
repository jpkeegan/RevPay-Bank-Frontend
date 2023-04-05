import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../components/checkbox";
import { Form } from "../components/form-comp";
import { NavBar } from "../components/nav-bar";
import { BusinessEntity, BusinessForm, businessForm, businessFormDef, CompsCheckedState } from "../requests/types";
import { FailedLoginReturn, getByUsername } from "../requests/user-account-requests";
import { insertBusinessAccount } from "../requests/user-requests";


const initState:CompsCheckedState = {
    compsChecked:[{id:1,checked:false,about:"Non Profit?"}]
}


export function AddBusinessPage(){
    
    const [bools, setBools] = useState(initState);
    const router = useNavigate();

    const createMutation = useMutation(insertBusinessAccount, {
        onSuccess: (data) => {
            console.log("success")
            localStorage.setItem("accountId",String(data.accountId));
            localStorage.setItem("username",String(data.username));
            localStorage.setItem("businessAccount",String(data.businessAccount));
            localStorage.setItem('businessId',String(data.businessId));
            router("/home")
        } 
    });
    async function submitBusiness(form:BusinessForm){
        const checkUser = async function(){
            const result = await getByUsername(form.username)
                if((result as FailedLoginReturn).status){
                    console.log((result as FailedLoginReturn).status)
                    return true
                }
        }
        if(await checkUser()){
            const newBusiness:BusinessEntity = {address:form.address,email:form.email,name:form.name,
            password:form.password,phone_number:form.phoneNumber,username:form.username,
            bin:form.bin,ein:form.ein,businessAccount:true,isForProfit:!bools.compsChecked[0].checked};
            console.log("all is well")
            createMutation.mutate(newBusiness);
        }else{
            alert("Sorry name already in use. Please try another")
        }
    }

    function updateCheckStatus(index:number){
        const newBools:CompsCheckedState = JSON.parse(JSON.stringify(bools));
        newBools.compsChecked[index-1].checked = !newBools.compsChecked[index-1].checked;
        setBools(newBools);
    }

    return<>
        <NavBar left={[{text:"Home",callback:()=>{router("/")}}]}
        right={[]} />
        <Form def={businessFormDef} initState={businessForm} handler={submitBusiness} buttonText={"Submit"}/>
        {bools.compsChecked.map(c=><Checkbox key={c.about} isChecked={c.checked} label={c.about} checkHandler={()=>{updateCheckStatus(c.id)}} index={c.id}/>)}
        
    </>
}