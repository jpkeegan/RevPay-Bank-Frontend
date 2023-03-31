import { useNavigate } from "react-router";
import { NavBar } from "../components/nav-bar";


export function HomePage(){
    const router = useNavigate();
    return <>
        <NavBar left={[{text:"Home",callback:()=>{router("/")}},{text:"login",callback:()=>{router("/login")}}]}
        right={[
        {text:"Add Business",callback:()=>{router("/business/new")}},
        {text:"Business Loan",callback:()=>{router("/loan")}},
        {text:"Wallet",callback:()=>{router("/wallet")}}]} />
        <h1>homepage</h1>
    </>
}