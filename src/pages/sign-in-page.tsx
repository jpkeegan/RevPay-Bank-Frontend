import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getByUsername, verifyUserAccount } from "../requests/user-account-requests";



export type SignInForm ={
    username: string
    password: string
}

export function SignInPage(){
  const navigation = useNavigate();
  let existingUsernameBool = false;
    
  const[form,setForm] = useState<SignInForm>({username:"", password:""})

  async function handleUsernameVerification(){
    let results = await verifyUserAccount(form); 
    if( "error" in results){
      let usernameChecker = await getByUsername(form.username);
        if ("error" in usernameChecker){
          existingUsernameBool = true;
        }
      if(existingUsernameBool){
        window.alert("Incorrect Sign-In.\nUsername does not exist.\nCreate a User by clicking SIGN UP");
      }
      else{
        window.alert("Incorrect Sign-In.\nPassword is Incorrect");
      }
    }
    else{
      localStorage.setItem("accountId",String(results.accountId));
      localStorage.setItem("username",String(results.username)); 
      navigation("/");
    }
  }


  return <>
    <fieldset>
      <h1>Sign-In-Page</h1>
      <label htmlFor="username">USERNAME: </label>
      <input type="text" placeholder="username" onChange={e => setForm({...form, username:e.target.value})} />
      <br />

      <label htmlFor="password">PASSWORD: </label>
      <input type="password" placeholder="password" onChange={e => setForm({...form, password:e.target.value})} />
      <br /><br />


      <button onClick={handleUsernameVerification} >SIGN IN</button>
      <br /><br />

      <label htmlFor="NewUser">New User? </label>
      <Link to="/registration">SIGN UP for a Personal Account</Link>

      <Link to="/business/new">SIGN UP for a Business Account</Link>

    </fieldset>
  </>
}