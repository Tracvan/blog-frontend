import React, { useState } from 'react';
import './ChangePasswordForm.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getToken } from 'firebase/app-check';

function ChangePasswordForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
            case 'currentPassword':
                newErrors.currentPassword = value.length >= 6 && value.length <= 8
                    ? ''
                    : 'Current password is invalid';
                break;
            case 'newPassword':
                newErrors.newPassword = value.length >= 6 && value.length <= 8
                    ? ''
                    : 'Password must be 6-8 characters';
                newErrors.confirmPassword = value === formData.confirmPassword
                    ? ''
                    : 'Passwords do not match';
                break;
            case 'confirmPassword':
                newErrors.confirmPassword = value === formData.newPassword
                    ? ''
                    : 'Passwords do not match';
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const validateForm = () => {
        return !errors.currentPassword && !errors.newPassword && !errors.confirmPassword &&
            formData.currentPassword && formData.newPassword && formData.confirmPassword;
    };
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        // Xử lý trường hợp không có token, ví dụ: chuyển hướng đến trang đăng nhập
        navigate('/login');
        return;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put('http://localhost:8080/api/update-password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            console.log("Password has been changed")
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            })
            setMessage({ text: "Your password has been changed", type: "" })
            setTimeout(() => {
                navigate("/login")
            }, 3000)

        }
        catch (error) {
            console.log(error)
            console.log(token)

        }
    };

    return (
        <div className="container">
            <div className="register-container">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Change Password</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="currentPassword" className="block text-gray-700 font-semibold mb-2">Current password</label>
                        <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} required placeholder="••••••••" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                        {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">Your new password</label>
                        <input type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} required placeholder="••••••••" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                        {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Confirm password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="••••••••" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                    {message.text && <p className={`text-sm mb-4 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>{message.text}</p>}
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Change password</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordForm;