import { useState } from "react";
import { FaAccusoft } from "react-icons/fa";
import {  Navigate } from "react-router-dom";
import { useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";
import './index.css'

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isChecked, setChecked] = useState(false)
    const [isValid , setValid] = useState(true)
    const history = useNavigate()

    const token = Cookies.get('jwt_token')

    if(token !== undefined ){
        return <Navigate to="/" />
    }
    


    const changeUsername = event => {  
        setUsername(event.target.value)
    }
    const changePassword = event => {
        setPassword(event.target.value)
    }

    const handleChange = event => {
        if (event.target.checked){
            setChecked(true)
        }
        else{
            setChecked(false)
        }
    }

    const onSuccessSubmit = jwtToken => {

        
        if(isChecked){
            Cookies.set('jwt_token', jwtToken , {
                expires: 30
            })
            Cookies.set('user_id', username , {
                expires: 30
            })
        }
        else{
            Cookies.set('jwt_token', jwtToken , {
                expires: 1/24
            })
            Cookies.set('user_id', username , {
                expires: 1/24
            })
        }
        history('/')
        
       
    }

    const onLogin = async event => {
        event.preventDefault()
        const userDetails = {username , password}
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Add this header
              },
            body: JSON.stringify(userDetails)
        }

        const url = 'http://localhost:8080/login'
        const response = await fetch(url, options)
        
        if (response.ok){
            const data = await response.json()
            console.log(data)
            onSuccessSubmit(data.token)
        }
        else{
            setValid(false)
        }
        


    }


    return (
        
        <div className="homepage">
            <div className="login-form-container">
                <div className="login-header">
                    <FaAccusoft className="fa-icon-logo" />
                    <p className="login-text">HRMS Login Portal</p>
                </div>
                <form className="login-form" onSubmit={onLogin}>
                    <label htmlFor="username" className="label-name">
                        USERNAME
                    </label>
                    <div className="username-container">
                        <input
                            className="username-input"
                            value={username}
                            type="text"
                            id="username"
                            onChange={changeUsername}
                        />
                    </div>
                    <label htmlFor="password" className="label-password">
                        PASSWORD
                    </label>
                    <div className="password-container">
                        <input
                            className="username-input"
                            value={password}
                            type="password"
                            id="password"
                            onChange={changePassword}
                        />
                    </div>
                    <label>
                        <input
                            type="checkbox"
                            onChange={handleChange}
                        />
                        Remember Me
                    </label>
                    <div>
                        <button type="submit" className="login-btn">
                            Sing in
                        </button>
                        {!isValid && <label className="incorrect-warning">Username or password incorrect</label>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login 