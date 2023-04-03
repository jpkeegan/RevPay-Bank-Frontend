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
    console.log(data);
    return<>
        <NavBar left={[
            {text:"Home",callback:()=>{router("/home")}},
            { text: "Log Out", callback: () => { router("/logout") } }
        ]}
        right={[
            { text: "Apply for Loan", callback: () => { router("/loan") } },
            {text:"Wallet Balance:"+data?.wallet.balance,callback:()=>{router("/wallet")}},
            {text:"Update",callback:()=>{router("/business/"+id)}}
            ]} />
        <div>
            <h1>{data?.name}</h1>
            <div>Address: {data?.address}</div>
            <div>Email: {data?.email}</div>
            <div>
                {/* {data?.transactions.map(t=><div><h3>{t.accountEmail}</h3><h3>{t.amount}</h3><h3>{t.dateTime}</h3></div>
                    )} */}
            </div>
        </div>
        
    </>
}