import { useNavigate } from "react-router-dom";
import { userRegistrationReducer } from "../reducers/user-registration-reducer";
import { useEffect, useReducer, useState } from "react";
import { initialState } from "./personal-account-registration-page";
import { SignInForm } from "./sign-in-page";
import { PasswordChange, UserAccountReturnInfo, updatePassword, verifyUserAccount } from "../requests/user-account-requests";


export function PasswordResetPage() {

    const navigation = useNavigate();
    const [trackerState, dispatch] = useReducer(userRegistrationReducer, initialState);
    const [oldPassword, setOldPassword] = useState("");
    useEffect(() => {

        const accountIDCheck = localStorage.getItem("accountId");
        if (!accountIDCheck) {
            alert("You have to sign in.")
            navigation("/")
        } else {
            //Else is technically not necessary, but I use it to load local storage.
        }
    });

    const username = localStorage.getItem("username");
    const accountId = localStorage.getItem("accountId");

    function handleSetPassword(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({ type: "SET_PASSWORD", payload: event.target.value });
    }
    function handleSetConfirmPassword(event:React.ChangeEvent<HTMLInputElement>){
        dispatch({type: "SET_CONFIRM_PASSWORD", payload: event.target.value});
    }

    async function handlePasswordSubmit() {
        if (username) {
            const loginVerification: SignInForm = {
                username: username,
                password: oldPassword
            }
            let verifiedUser = await verifyUserAccount(loginVerification)
            if ("error" in verifiedUser) {
                alert("Password is incorrect");
                return;
            }
        }
        handlePasswordChange();
    }

    async function handlePasswordChange() {
        let specialCharacterBool = false;
        let plength = trackerState.confirmedPassword.length;

        if (trackerState.confirmedPassword !== trackerState.userInfo.password){
            alert("Password does not match Confirmed");
            return;
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
        if (username) {
            const newPassword: PasswordChange = {
                username: username,
                oldPassword: oldPassword, 
                password: trackerState.userInfo.password
            }

            if (accountId) {
                await updatePassword(Number(accountId), newPassword);
            }

            alert("Password Successfully Updated");
            navigation("/home");
        }
    }

    return <>
        <h2>Confirm Password Change</h2>

        <label htmlFor="password">New Password </label>
        <input type="password" onChange={handleSetPassword} id="password" required />
        <br /><br />

        <label htmlFor="passwordConfirm">Confirm Password </label>
        <input type="password" id="passwordConfirm" onChange={handleSetConfirmPassword} required />
        <br /><br />

        <label htmlFor="oldPassword">Enter old password to confirm changes </label>
        <input type="password" id="oldPassword" onChange={e => setOldPassword(e.target.value)}required />
        <br /><br />
        <button onClick={handlePasswordSubmit}>Confirm</button>
    </>
}