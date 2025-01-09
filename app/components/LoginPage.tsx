import { useState } from "react";
import { login } from "../firebase/controller";
// import successMsg 

export default function LoginPage() {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false)
    const loginAccount = async (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)
        if (!user) {
            clearForm()
            console.log('Input Username.')
            return false
        }
        // else {
        if (!pass) {
            clearForm()
            console.log('Input Password.')
            return false
        }
        // else
        // await login('bell', 'password')
        await login(user, pass).then((response) => {
            // console.log(response)
            // console.log(!response ? 'No Response' : response)
            if (response && response.status == 'success') {
                console.log('Successful LogIn.')
                // window.location.reload();
            } else {
                console.log('Failed to Login.')
            }

        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            clearForm()
            // window.location.reload();
        })
        // }
    }
    return (
        <main>
            <div>
                <form onSubmit={loginAccount}>
                    Username
                    <input type="text" onChange={(e) => { setUser(e.target.value) }} value={user} name="" id="user" />
                    Password
                    <input type="password" onChange={(e) => { setPass(e.target.value) }} value={pass} name="" id="pass" />
                    <button disabled={loading}>{loading ? 'Loading' : 'Submit'}</button>
                </form>
                {/* <button onClick={setCookie}>Set Cookie</button>
                <button onClick={updateCookie}>update Cookie</button>
                <button onClick={destroyToken}>delete Cookie</button> */}
            </div>
        </main>
    )

    function clearForm() {
        setUser('')
        setPass('')
        setLoading(false)
    }
}
