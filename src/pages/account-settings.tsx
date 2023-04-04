import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/nav-bar";
import { userRegistrationReducer } from "../reducers/user-registration-reducer";
import { getAllUsernames, SignInForm, updateUserAccount, UserAccountReturnInfo, UserAccountUpdate, verifyUserAccount } from "../requests/user-account-requests";
import { initialState } from "./personal-account-registration-page";

export function AccountSettings() {

    const navigation = useNavigate();
    const [trackerState, dispatch] = useReducer(userRegistrationReducer, initialState);
    useEffect(()=>{

        const accountIDCheck = localStorage.getItem("accountId");
          if(!accountIDCheck){
            alert("You have to sign in.")
            navigation("/")
          }else{
            //Else is technically not necessary, but I use it to load local storage.
          }
        });
    const accountId = localStorage.getItem("accountId");
    const username = localStorage.getItem("username");


    function handleSetUsername(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({ type: "SET_USERNAME", payload: event.target.value });
    }
    function handleSetPassword(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({ type: "SET_PASSWORD", payload: event.target.value });
    }
    function handleSetEmail(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({ type: "SET_EMAIL", payload: event.target.value });
    }
    function handleSetPhoneNumber(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({ type: "SET_PHONE_NUMBER", payload: Number(event.target.value) });
    }
    function handleSetName(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({ type: "SET_NAME", payload: event.target.value });
    }
    function handleSetAddress(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({ type: "SET_ADDRESS", payload: event.target.value });
    }

    async function handleVerifyAccountSettings() {
        console.log(trackerState);
        let existingUsers = await getAllUsernames();
        if (trackerState.userInfo.username.indexOf(' ') >= 0) {
            alert("Cant have spaces in username.");
            return;
        }

        if (trackerState.userInfo.username.length <= 3) {
            alert("Username should be more than 3 characters.");
            return;
        }

        for (const user of existingUsers) {
            if (user.username === trackerState.userInfo.username) {
                alert("Username Already Exists.");
                return;
            }
        }
        if (username) {
            const loginVerification: SignInForm = {
                username: username,
                password: trackerState.userInfo.password
            }
            let verifiedUser = await verifyUserAccount(loginVerification)
            if ("error" in verifiedUser) {
                alert("Password is incorrect");
                return;
            }
        }
        handleAccountUpdate();
    }

    async function handleAccountUpdate() {
        const updatedUser: UserAccountUpdate = {
            username: trackerState.userInfo.username,
            email: trackerState.userInfo.email,
            phoneNumber: trackerState.userInfo.phoneNumber,
            name: trackerState.userInfo.name,
            address: trackerState.userInfo.address,
            businessAccount: trackerState.userInfo.businessAccount,
            password: trackerState.userInfo.password,
            oldUsername: username as string
        }

        if (accountId) {
            const returnedUser: UserAccountReturnInfo = await updateUserAccount(Number(accountId), updatedUser);
            localStorage.setItem("username", String(returnedUser.username));
        }

        alert("Account Successfully Updated!!!");
        navigation("/");
    }

    return <>
        <NavBar left={[{text:"Home",callback:()=>{navigation("/home")}}]}
        right={[]} />
        <h1>Registration Page</h1>
        <fieldset>
            <label htmlFor="username">Change USERNAME: </label>
            <input type="text" placeholder="Username" onChange={handleSetUsername} /> <br />

            <label htmlFor="fname">Change E-Mail Address: </label>
            <input type="text" placeholder="E-Mail Address" onChange={handleSetEmail} /> <br />

            <label htmlFor="lname">Change Phone Number: </label>
            <input type="tel" placeholder="Phone Number" onChange={handleSetPhoneNumber} /> <br />

            <label htmlFor="fname"> Change Name: </label>
            <input type="text" placeholder="name@place.com" onChange={handleSetName} /> <br />

            <label htmlFor="lname"> Change Address: </label>
            <input type="text" placeholder="123 Anywhere St." onChange={handleSetAddress} /> <br />

        </fieldset>

        <label htmlFor="password">Confirm your password: </label>
        <input type="password" placeholder="Password" required onChange={handleSetPassword} /> <br />

        <button onClick={handleVerifyAccountSettings}>Update Account</button>

    </>
}

