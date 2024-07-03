import React, { useState } from 'react';
import './ChangePasswordForm.css'; // Import file CSS cho RegisterForm

function ChangePasswordForm() {
    const [formData, setFormData] = useState({
        currentpassword: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        currentpassword: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let currentpasswordError = errors.currentpassword;
        let passwordError = errors.password;
        let confirmPasswordError = errors.confirmPassword;

        switch (name) {
            case 'currentpassword':
                currentpasswordError = value.length >= 6 && value.length <= 8
                    ? ''
                    : 'Current password is invalid';
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
            currentpassword: currentpasswordError,
            password: passwordError,
            confirmPassword: confirmPasswordError
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            console.log('Submitted data:', formData);
            // Thêm xử lý gửi dữ liệu tới server ở đây
        }
    };

    const validateForm = () => {
        return !errors.currentpassword && !errors.password && !errors.confirmPassword;
    };

    return (
        <div className="container">
            <div className="register-container">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Change Password</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Current password</label>
                        <input type="password" name="currentpassword" value={formData.currentpassword} onChange={handleChange} required placeholder="••••••••" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                        {errors.currentpassword && <p className="text-red-500 text-sm mt-1">{errors.currentpassword}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Your new password</label>
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
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset password</button>
                </form>

            </div>
        </div>
    );
}

export default ChangePasswordForm;
