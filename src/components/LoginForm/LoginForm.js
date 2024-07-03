import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
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
                "username": formData.username,
                "password": formData.password
            });
            console.log('Login successful', response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/users');
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="container">
            <div className="login-form">
                <h2 className="text-center text-gray-900">Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
                            value={formData.username}
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
                    <a href="#" className="block mt-4 text-center text-blue-600 hover:underline">Forgot password?</a>
                </form>

                <p className="mt-4 text-center text-gray-600">Register to an existing account? <a href="/register"
                                                                                                  className="text-blue-600 hover:underline">Register
                    here.</a></p>
                <div className="social-login">
                    <button className="btn-social" onClick={() => alert('Login with Google')}>
                        <img src="https://getnet.mx/media/popup/CHROME.png" alt="Google logo"/>
                    </button>
                    <button className="btn-social" onClick={() => alert('Login with Facebook')}>
                        <img src="https://image.makewebeasy.net/makeweb/m_750x0/5Re2KiBcb/CUSTOMER/facebook.png?v=202012190947" alt="Facebook logo"/>
                    </button><button className="btn-social" onClick={() => alert('Login with Facebook')}>
                        <img src="https://www.pngitem.com/pimgs/m/488-4889569_tiktok-tik-tok-logo-png-transparent-png.png" alt="Facebook logo"/>
                    </button>
                </div>


                {error && <p className="mt-4 text-center text-red-600">{error}</p>}
                <p className="mt-4 text-center text-gray-600">Register to an existing account? <a href="/register" className="text-blue-600 hover:underline">Register here.</a></p>

            </div>
        </div>
    );
};

export default LoginForm;