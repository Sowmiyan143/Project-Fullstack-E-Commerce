

import { useState,useRef } from 'react';
import image from '../images/image1.png'
function Account () {

    const [isLogin, setIsLogin] = useState(true);
    const loginFormRef = useRef(null);
    const regFormRef = useRef(null);
    const indicatorRef = useRef(null);


    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    });


    const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            alert("Login successful!");
            window.location.href="/home"
        } else {
            alert("Login failed: " + JSON.stringify(data));
        }
    };


    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...registerData,
            password2: registerData.password,
            first_name: "",
            last_name: ""
        };

        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! You can now log in.");
            handleToggle('login');
        } else {
            alert("Registration failed: " + JSON.stringify(data));
        }
    };


    const handleToggle = (type) =>{
        setIsLogin(type === 'login')

        if (type === 'login'){
            loginFormRef.current.style.transform = 'translateX(300px)'
            regFormRef.current.style.transform = 'translateX(300px)'
            indicatorRef.current.style.transform = 'translateX(0px)'
        }else{
            loginFormRef.current.style.transform = 'translateX(0px)'
            regFormRef.current.style.transform = 'translateX(0px)'
            indicatorRef.current.style.transform = 'translateX(100px)'
        }
    }


    return(
    <div className="account-page">
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <img src={image} width="100%" alt=""/>
                </div>
                <div className="col-2">
                    <div className="form-container">
                        <div className="form-btn">
                            <span onClick={()=>{handleToggle('login')}}>Login</span>
                            <span onClick={()=>{handleToggle('register')}}>Register</span>
                            <hr id="Indicator" ref={indicatorRef}/>
                        </div>

                        <form id="LoginForm" ref={loginFormRef} onSubmit={handleLoginSubmit}>
                            <input type="text"placeholder="Username" name="username" onChange={handleLoginChange}/>
                            <input type="password" placeholder="password" name="password"  onChange={handleLoginChange}/> 
                            <button type="submit" className="btn">Login</button>
                            <a href="">Forgot password</a>
                        </form>

                        <form id="RegForm" ref={regFormRef} onSubmit={handleRegisterSubmit}>
                            <input type="text"placeholder="Username"  name="username" onChange={handleRegisterChange}/>
                            <input type="email" placeholder="Email" name="email" onChange={handleRegisterChange} /> 
                            <input type="password" placeholder="Password" name="password" onChange={handleRegisterChange} /> 
                            <button type="submit" className="btn" >Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Account;