import { useNavigate } from "react-router";
import { NavBar } from "../components/nav-bar";


export function HomePage(){
    const router = useNavigate();
    return <>
        <NavBar left={[{text:"Home",callback:()=>{router("/")}}]}
        right={[
        {text:"Add Business",callback:()=>{router("/business/new")}},
        {text:"Business Loan",callback:()=>{router("/loan")}}]} />
        <h1>homepage</h1>
    </>
}