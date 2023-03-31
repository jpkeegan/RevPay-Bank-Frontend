import { useNavigate } from "react-router";
import { NavBar } from "../components/nav-bar";


export function HomePage(){
    const router = useNavigate();
    return <>
        <NavBar left={[{text:"Home",callback:()=>{router("/home")}}]}
        right={[
        {text:"Add Business",callback:()=>{router("/business/new")}},
        {text:"Business Loan",callback:()=>{router("/loan")}},
        {text:"Wallet",callback:()=>{router("/wallet")}},
        {text:"Log Out",callback:()=>{router("/logout")}}]} />
        <h1>homepage</h1>
    </>
}