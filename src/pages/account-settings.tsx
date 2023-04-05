import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../components/nav-bar";
import { userRegistrationReducer } from "../reducers/user-registration-reducer";
import { getAllUsernames, getByUsername, SignInForm, updateUserAccount, UserAccountReturnInfo, UserAccountUpdate, verifyUserAccount } from "../requests/user-account-requests";
import { initialState } from "./personal-account-registration-page";

export function AccountSettings() {

    const initialStateUser: UserAccountReturnInfo = {
        accountId: 0,
        username: "",
        email: "",
        phoneNumber: 0,
        name: "",
        address: "",
        businessAccount: true,
    }
    const navigation = useNavigate();
    const [trackerState, dispatch] = useReducer(userRegistrationReducer, initialState);
    const [userDetails, setUserDetails] = useState(initialStateUser);
    const accountId = localStorage.getItem("accountId");
    const username = localStorage.getItem("username");

    useEffect(() => {

        

        async function fetchData() {
            const response = await getByUsername(username as string);
            setUserDetails(response as UserAccountReturnInfo);
        }

        fetchData();
        const accountIDCheck = localStorage.getItem("accountId");
        if (!accountIDCheck) {
            alert("You have to sign in.")
            navigation("/")
        } else {
            //Else is technically not necessary, but I use it to load local storage.
        }
    }, []);
    


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
        existingUsers = existingUsers.filter(user => user.username !== username);
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
        navigation("/home");
    }

    return <>
        <NavBar left={[{ text: "Home", callback: () => { navigation("/home") } }]}
            right={[]} />
        <h1>Update User Information</h1>
        <fieldset>
            <label htmlFor="username">Username: </label>
            <input type="text" placeholder={userDetails.username} onChange={handleSetUsername} required/> <br />

            <label htmlFor="fname">E-Mail Address: </label>
            <input type="text" placeholder={userDetails.email} onChange={handleSetEmail} required/> <br />

            <label htmlFor="lname">Phone Number: </label>
            <input type="tel" placeholder={(userDetails.phoneNumber !== null) ? userDetails.phoneNumber.toString() : "0"} onChange={handleSetPhoneNumber} required /> <br />

            <label htmlFor="fname">Name: </label>
            <input type="text" placeholder={userDetails.name} onChange={handleSetName} required /> <br />

            <label htmlFor="lname">Address: </label>
            <input type="text" placeholder={userDetails.address} onChange={handleSetAddress} required /> <br />

        </fieldset>
        <br />
        <label htmlFor="password">Confirm your password: </label>
        <input type="password" placeholder="Password" onChange={handleSetPassword} required/> <br />
        <br />
        <button onClick={handleVerifyAccountSettings}>Update Account</button>

        <br /><br />
        <Link to='/passwordreset'>Change Password</Link>

    </>
}

