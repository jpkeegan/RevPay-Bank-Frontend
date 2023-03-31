import { useState } from "react";
import ".././styles/home-page-styles.css";

type FormProps = {
    def: string;
    initState: string;
    handler: any;
    buttonText: string;
}

export function Form(props: FormProps) {

    const inputDefs = JSON.parse(props.def);

    const [form, setForm] = useState<any>({ ...JSON.parse(props.initState) })

    const inputFields = () => {
        const fields = [];
        for (let key in inputDefs) {
            fields.push(
                <fieldset className="fieldSetStyle">
                    <legend>{key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^[a-z]/, c => c.toLocaleUpperCase())}</legend>
                    {getInputs(inputDefs[key])}
                </fieldset>
            )
        }
        return fields;
    };

    function getInputs(inputobject: any) {
        const inputs = [];
        for (let key in inputobject) {
            inputs.push(<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <label className="labelStyle" htmlFor={key} >{key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^[a-z]/, c => c.toLocaleUpperCase())}</label>
                <input className="formInputs"
                    size={40} id={key} key={key}
                    value={form[key]}
                    type={(key === "password") ? "password" : (inputobject[key] === "date") ? "datetime-local" : typeof (inputobject[key])}
                    placeholder={inputobject[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })} />
            </div>
            )
        }
        return inputs
    }



    const newForm = inputFields();

    return <>
        <div style={{ justifyContent: 'center' }}>
            {newForm}
            <button className="formBtn" onClick={() => { props.handler(form) }}>{props.buttonText}</button>
        </div>

    </>
}