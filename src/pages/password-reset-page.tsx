

export function PasswordResetPage() {


    return <>
        <h2>Confirm Password Change</h2>

        <label htmlFor="password">New Password </label>
        <input type="password" id="password" />
        <br /><br />
        
        <label htmlFor="passwordConfirm">Confirm Password </label>
        <input type="password" id="passwordConfirm" />
        <br /><br />

        <label htmlFor="oldPassword">Enter old password to confirm changes </label>
        <input type="password" id="oldPassword"/>
        <br /><br />
        <button>Confirm</button>
    </>
}