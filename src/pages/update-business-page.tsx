import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { BusinessForm, businessForm } from "../requests/types";
import { getBusiness } from "../requests/user-requests";


export function UpdateBusinessPage(){
    const router = useNavigate();
    const {id} = useParams();
    const Id = Number(id);
    const {isLoading, isError, data} = useQuery(["businesscache",Id], ()=>getBusiness(Id));
    
    if(isLoading){
        return <p>LOADING</p>
    }

    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }
     
    return<>
        <h1>update</h1>
    </>
}