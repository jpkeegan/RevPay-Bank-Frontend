

type CheckboxProps={
    isChecked:boolean
    label:string 
    checkHandler:any 
    index:number
}

export function Checkbox(props:CheckboxProps){
    return<>
    <div style={{border:"1px solid antiquewhite", borderRadius:"10px", padding:"5px", margin:"5px", fontSize:"18px", textShadow:"2px 2px 5px white"}}>
      <input type="checkbox" id={`checkbox-${props.index}`} checked={props.isChecked} onChange={props.checkHandler}/>
      <label htmlFor={`checkbox-${props.index}`}>{props.label}</label>
    </div>
    </>
}