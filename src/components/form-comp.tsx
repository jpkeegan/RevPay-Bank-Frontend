import { useState } from "react";

type FormProps = {
    def:string;
    initState:string;
    handler:any;
    buttonText:string;
}

export function Form(props:FormProps){
    
    const inputDefs = JSON.parse(props.def);

    const [form,setForm] = useState<any>({...JSON.parse(props.initState)})

    const inputFields = ()=> {
        const fields = [];
        for(let key in inputDefs){
            fields.push(
                <fieldset style={{width:"50%", display:"block",marginTop:"25px",textShadow:"2px 2px 5px white",fontSize:"32px",borderRadius:"10px"}}>
                    <legend >{key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^[a-z]/, c=>c.toLocaleUpperCase())}</legend>
                    {getInputs(inputDefs[key])}
                </fieldset>
            )
        }
        return fields;
    };

    function getInputs(inputobject: any){
        const inputs = [];
        for(let key in inputobject){
            inputs.push(<div style={{display:"flex", justifyContent:"center"}}>
                <label style={{margin:"5px"}} htmlFor={key} >{key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^[a-z]/, c=>c.toLocaleUpperCase())}</label>
                <input style={{margin:"5px",marginTop:"5px",borderRadius:"10px"}} 
                        size={40} id={key} key={key} 
                        value={form[key]} 
                        type={(key==="password") ? "password":(inputobject[key]==="date") ? "datetime-local":typeof(inputobject[key])} 
                        placeholder={inputobject[key]} 
                        onChange={e=>setForm({...form, [key]:e.target.value})}/>
                </div>
            )
        }
        return inputs
    }



    const newForm = inputFields();

    return <>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            {newForm}
            <button style={{width:"15%",marginTop:"5px",borderRadius:"10px",padding:"3px",backgroundColor:"transparent",borderColor:"white",textShadow:"2px 2px 5px white",fontSize:"18px"}} onClick={()=>{props.handler(form)}}>{props.buttonText}</button>
        </div>
        
        </>
}