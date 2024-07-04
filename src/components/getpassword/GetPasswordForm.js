import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GetPasswordForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        userName: '',
        email: ''
    });

    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setMessage({ text: '', type: '' })

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let emailError = errors.email;
        let userNameError = errors.userName;

        switch (name) {
            case 'email':
                emailError = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                    ? ''
                    : 'Email is invalid';
                break;
            case 'userName':
                userNameError = value.length >= 6 && value.length <= 8
                    ? ''
                    : 'Username should be between 6 and 8 characters';
                break;
            default:
                break;
        }

        setErrors({
            ...errors,
            email: emailError,
            userName: userNameError
        });
    };

    const validateForm = () => {
        return !errors.email && !errors.userName && formData.userName && formData.email;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.get('http://localhost:8080/api/users/' + formData.userName);
                if (response.data.email === formData.email) {
                    setFormData({ userName: '', email: '' });
                    setMessage({ text: "We have sent a temporary password to your email. Please check your inbox", type: 'success' });
                    await axios.get('http://localhost:8080/api/users/changepw/' + formData.userName);
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                } else {
                    setMessage({ text: 'Email does not match the username.', type: 'error' });
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setMessage({ text: 'User not found. Please check your username.', type: 'error' });
                } else {
                    setMessage({ text: 'Something went wrong. Please try again.', type: 'error' });
                }
            }
        } else {
            setMessage({ text: 'Please correct the errors in the form.', type: 'error' });
        }
    };

    return (
        <div className="container">
            <div className="register-container">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Get Temporary Password</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="userName" className="block text-gray-700 font-semibold mb-2">User Name</label>
                        <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} required placeholder="codegym" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                        {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email </label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="abc@codegym.com.vn" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    {message.text && <p className={`text-sm mb-4 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>{message.text}</p>}
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send me temporary password</button>
                </form>
            </div>
        </div>
    );
}

export default GetPasswordForm;