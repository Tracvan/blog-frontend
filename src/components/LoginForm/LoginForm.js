import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();



        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="container">
            <div className="login-form">
                <h2 className="text-center text-gray-900">Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
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
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
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
            </div>
        </div>
    );
};

export default LoginForm;