import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationState, userRegistrationReducer } from "../reducers/user-registration-reducer";
import { createUserAccount, getAllUsernames, UserAccountReturnInfo } from "../requests/user-account-requests";

export type UserForm = {
    username: string
    password: string
    email: string
    phoneNumber: number
    name: string
    address: string
    businessAccount: boolean
}


export const initialState: RegistrationState ={
    confirmedPassword: "",
    userInfo:{
        username: "",
        password: "",
        email: "",
        phoneNumber: 0,
        name: "",
        address:"",
        businessAccount: false
    }
}

export function PersonalRegistrationPage(){
    const navigation = useNavigate();
    const[trackerState, dispatch] = useReducer(userRegistrationReducer, initialState); 

    function handleSetUsername(event:React.ChangeEvent<HTMLInputElement>){
        dispatch({type: "SET_USERNAME", payload: event.target.value});
    }
    function handleSetPassword(event:React.ChangeEvent<HTMLInputElement>){
        dispatch({type: "SET_PASSWORD" , payload: event.target.value});
    }
    function handleSetConfirmPassword(event:React.ChangeEvent<HTMLInputElement>){
        dispatch({type: "SET_CONFIRM_PASSWORD", payload: event.target.value});
    }
    function handleSetEmail(event:React.ChangeEvent<HTMLInputElement>){
        dispatch({type: "SET_EMAIL", payload: event.target.value});
    }
    function handleSetPhoneNumber(event:React.ChangeEvent<HTMLInputElement>){
        dispatch({type: "SET_PHONE_NUMBER", payload: Number(event.target.value)});
    }
    function handleSetName(event:React.ChangeEvent<HTMLInputElement>){
        dispatch({type: "SET_NAME", payload: event.target.value});
    }
    function handleSetAddress(event:React.ChangeEvent<HTMLInputElement>){
        dispatch({type: "SET_ADDRESS", payload: event.target.value});
    }

    async function handleRegistrationParametersAction(){
        console.log(trackerState);
        let specialCharacterBool = false;
        let plength = trackerState.confirmedPassword.length;
        let existingUsers = await getAllUsernames();
        if(trackerState.userInfo.username.indexOf(' ') >= 0){
            alert("Cant have spaces in username.");
            return;
        }

        if (trackerState.userInfo.username.length <= 3){
            alert("Username should be more than 3 characters");
            return;
        }
        if (trackerState.confirmedPassword !== trackerState.userInfo.password){
            alert("Password does not match Confirmed");
            return;
        }
        for(const user of existingUsers){
            if (user.username === trackerState.userInfo.username){
                alert("Username Already Exists.");
                return;
            }
        }
        if(plength < 8){
            alert("Your password isn't long enough \nMust contain at least 8 characters.");
            return
        }
        for (const char of trackerState.confirmedPassword){
            if (!(char.match(/[a-z]/i))){
                specialCharacterBool = true;
                break;
            }
        }
        if(!specialCharacterBool){
            alert("Your password MUST contain: \n1 number.\n OR\n1 Special Character");
            return;
        }
        handleRegistrationAction();
    }   

    async function handleRegistrationAction(){
        const newUser: UserForm = {
            username: trackerState.userInfo.username,
            password: trackerState.userInfo.password,
            email: trackerState.userInfo.email,
            phoneNumber: trackerState.userInfo.phoneNumber,
            name: trackerState.userInfo.name,
            address:trackerState.userInfo.address,
            businessAccount: trackerState.userInfo.businessAccount
        }

        const returnedUser:UserAccountReturnInfo = await createUserAccount(newUser);
        localStorage.setItem("accountId",String(returnedUser.accountId));
        localStorage.setItem("username",String(returnedUser.username));
        localStorage.setItem("businessAccount",String(returnedUser.businessAccount));

        alert("Registration Successful!!!");
        navigation("/");
    }

    return <>
        <h1>Registration Page</h1>
        <fieldset>
            <label htmlFor="username">USERNAME: </label>
            <input type="text" placeholder="Username" onChange={handleSetUsername} /> <br />

            <label htmlFor="password">PASSWORD: </label>
            <input type="password" placeholder="Password" required onChange={handleSetPassword} /> <br />

            <label htmlFor="confirmpassword">CONFIRM PASSWORD: </label>
            <input type="password" placeholder="Confirm Password" onChange={handleSetConfirmPassword}/><br />
            
            <label htmlFor="fname">E-Mail Address: </label>
            <input type="text" placeholder="E-Mail Address" onChange={handleSetEmail} /> <br />

            <label htmlFor="lname">Phone Number: </label>
            <input type="tel" placeholder="Phone Number" onChange={handleSetPhoneNumber}/> <br />

            <label htmlFor="fname">Name: </label>
            <input type="text" placeholder="name@place.com" onChange={handleSetName} /> <br />

            <label htmlFor="lname">Address: </label>
            <input type="text" placeholder="123 Anywhere St." onChange={handleSetAddress}/> <br />

         </fieldset>

         <button onClick={handleRegistrationParametersAction}>REGISTER</button>

    </>
}