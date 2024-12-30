import { useState } from "react";
import { login } from "../firebase/controller";

export default function LoginPage() {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false)

    const loginAccount = async (event) => {
        event.preventDefault();
        setLoading(true)
        if (!user)
            console.log('Input Username')
        else {
            if (!pass)
                console.log('Input Password')
            else
                // login('bell', 'password')
                await login(user, pass).then((response) => {
                    response.forEach((items) => {
                        console.log(items)
                    });
                }).catch((error) => {
                    console.log(error)
                }).finally(() => {
                    setUser('')
                    setPass('')
                    setLoading(false)
                    // window.location.reload();
                })
        }
    }
    return (
        <main>
            <div>
                <form>
                    Username
                    <input type="text" onChange={(e) => { setUser(e.target.value) }} value={user} name="" id="user" />
                    Password
                    <input type="password" onChange={(e) => { setPass(e.target.value) }} value={pass} name="" id="pass" />
                    <button onClick={loginAccount} disabled={loading}>{loading ? 'Loading' : 'Submit'}</button>
                </form>
                {/* <button onClick={setCookie}>Set Cookie</button>
                <button onClick={updateCookie}>update Cookie</button>
                <button onClick={destroyToken}>delete Cookie</button> */}
            </div>
        </main>
    )
}