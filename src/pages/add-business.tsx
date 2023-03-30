import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../components/checkbox";
import { Form } from "../components/form-comp";
import { NavBar } from "../components/nav-bar";
import { BusinessEntity, BusinessForm, businessForm, businessFormDef, CompsCheckedState } from "../requests/types";
import { insertBusinessAccount } from "../requests/user-requests";


const initState:CompsCheckedState = {
    compsChecked:[{id:1,checked:false,about:"Non Profit?"}]
}

export function AddBusinessPage(){
    const [bools, setBools] = useState(initState);
    const router = useNavigate();
    const createMutation = useMutation(insertBusinessAccount, {
        onSuccess: () => console.log("success") 
    });
    function submitBusiness(form:BusinessForm){
        const newBusiness:BusinessEntity = {address:form.address,email:form.email,name:form.name,
            password:form.password,phone_number:form.phoneNumber,username:form.username,
            bin:form.bin,ein:form.ein,isBusinessAccount:true,isForProfit:!bools.compsChecked[0].checked};
        console.log(bools.compsChecked[0].checked)
        createMutation.mutate(newBusiness);
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