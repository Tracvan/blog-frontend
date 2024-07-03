import React, { useState } from 'react';
import './RegisterForm.css';
import axios from 'axios';

function RegisterForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let emailError = errors.email;
        let passwordError = errors.password;
        let confirmPasswordError = errors.confirmPassword;

        switch (name) {
            case 'email':
                emailError = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                    ? ''
                    : 'Email is invalid';
                break;
            case 'password':
                passwordError = value.length >= 6 && value.length <= 8
                    ? ''
                    : 'Password must be 6-8 characters';
                confirmPasswordError = value === formData.confirmPassword
                    ? ''
                    : 'Passwords do not match';
                break;
            case 'confirmPassword':
                confirmPasswordError = value === formData.password
                    ? ''
                    : 'Passwords do not match';
                break;
            default:
                break;
        }

        setErrors({
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:8080/api/auth/register', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }).then(response => {
                    console.log(response.data)})
                setMessage(response.data.message);
            } catch (error) {
                setMessage(error.response.data.message || 'Registration failed!');
            }
        }
    };

    const validateForm = () => {
        return !errors.email && !errors.password && !errors.confirmPassword;
    };

    return (
        <div className="container">
            <div className="register-container">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create an account</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">User Name</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required placeholder="Nguyen Van A" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Your email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@gmail.com" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Your password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Confirm password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="••••••••" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                    <div className="flex items-start mb-4">
                        <div className="flex items-center h-5">
                            <input id="terms" type="checkbox" name="terms" required className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                        </div>
                        <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900"> I accept the Terms and Conditions </label>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create account</button>
                </form>
                {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
                <p className="mt-4 text-center text-gray-600">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login here.</a></p>
            </div>
        </div>
    );
}

export default RegisterForm;
