import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../components/nav-bar"
import { getBusiness } from "../requests/user-requests";


export function BusinessPage(){
    const router = useNavigate();
    const {id} = useParams();
    const Id = Number(id);
    const queryClient = useQueryClient();
    const {isLoading, isError, data} = useQuery(["businesscache",Id], ()=>getBusiness(Id));

    if(isLoading){
        return <p>LOADING</p>
    }

    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }
    
    return<>
        <NavBar left={[{text:"Home",callback:()=>{router("/home")}}]}
        right={[]} />
        <div>
            <h1>business page</h1>
            <div>{data?.name}</div>
            <div>{data?.username}</div>
        </div>
        
    </>
}