import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
const LoginForm = () => {
    const navigate = useNavigate();
    const [accountStatus, setAccountStatus] = useState(true)
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                "usernameOrEmail": formData.usernameOrEmail,
                "password": formData.password
            });
            const status = response.data.message
            if(status !== "Active"){
                alert("Your account is being locked, Please contact to admin for detail")
                navigate("/login")
            }else {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('authorize', response.data.authorize)
                if (localStorage.getItem('authorize') === "ROLE_ADMIN") {
                    navigate('/admin/users')
                } else {
                    navigate('/posts')
                }
                ;
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };
    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    return (
        <div className="container">
            <div className="login-form">
                <h2 className="text-center text-gray-900">Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            placeholder="username or email"
                            type="text"
                            id="username"
                            name="usernameOrEmail"
                            className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
                            value={formData.usernameOrEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-4 checkbox-group">
                        <input type="checkbox" id="rememberMe" name="rememberMe"/>
                        <label htmlFor="rememberMe" className="text-gray-700">Remember password</label>
                    </div>
                    <button type="submit"
                            className="w-full px-5 py-2.5 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-3 focus:ring-blue-300 font-medium">Log
                        in
                    </button>

                    <a href="http://localhost:3000/getpassword"
                       className="block mt-4 text-center text-blue-600 hover:underline">Forgot password?</a>

                </form>

                <p className="mt-4 text-center text-gray-600">Register to an existing account? <a href="/register" className="text-blue-600 hover:underline">Register
                    here.</a></p>
                <div className="social-login">
                    <button onClick={onSignIn} className="btn-social" >
                        <img src="https://getnet.mx/media/popup/CHROME.png" alt="Google logo"/>
                    </button>
                    <button  className="btn-social" onClick={() => alert('Login with Facebook')}>
                        <img
                            src="https://image.makewebeasy.net/makeweb/m_750x0/5Re2KiBcb/CUSTOMER/facebook.png?v=202012190947"
                            alt="Facebook logo"/>
                    </button>
                    <button className="btn-social" onClick={() => alert('Login with Facebook')}>
                        <img
                            src="https://www.pngitem.com/pimgs/m/488-4889569_tiktok-tik-tok-logo-png-transparent-png.png"
                            alt="Facebook logo"/>
                    </button>
                </div>


                {error && <p className="mt-4 text-center text-red-600">{error}</p>}
                <p className="mt-4 text-center text-gray-600">Register to an existing account? <a href="/register"
                                                                                                  className="text-blue-600 hover:underline">Register
                    here.</a></p>
            </div>
        </div>
    );
};

export default LoginForm;