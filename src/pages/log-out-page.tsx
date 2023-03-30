import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export function LogOut(){
    const navigation = useNavigate();

    useEffect( ()=>{
        setTimeout(()=>{
            localStorage.clear();
            navigation("/");
        }, 3000);
    });

    return <>
        <h1>You have successfully been logged out!</h1>
    </>
}