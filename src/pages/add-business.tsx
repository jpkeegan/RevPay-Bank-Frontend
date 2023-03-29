import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../components/checkbox";
import { Form } from "../components/form-comp";
import { NavBar } from "../components/nav-bar";
import { BusinessForm, businessForm, businessFormDef, CompsCheckedState } from "../requests/types";


const initState:CompsCheckedState = {
    compsChecked:[{id:1,checked:true,about:"Business?"},{id:2,checked:false,about:"Non Profit?"}]
}

export function AddBusinessPage(){
    const [bools, setBools] = useState(initState);
    const router = useNavigate();
    function submitBusiness(form:BusinessForm){
        console.log(form);
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