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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        validateField(name, value);
    };
    const [message, setMessage] = useState('');

    const validateField = (name, value) => {
        let emailError = errors.email;
        let userNameError = errors.username;


        switch (name) {
            case 'email':
                emailError = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                    ? ''
                    : 'Email is invalid';
                break;
            case 'userName':
                userNameError = value.length >= 6 && value.length <= 8
                    ? ''
                    : 'Username should longer then 6 and less than 8 characters';
                break;
            default:
                break;
        }

        setErrors({
            email: emailError,
            userName: userNameError
        });
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.get('http://localhost:8080/api/users/' + formData.userName, {
                    username: formData.userName,
                    email: formData.email,
                }).then(response => {
                    if (response.data.email === formData.email) {
                        axios.get('http://localhost:8080/api/users/changepw/' + formData.userName);
                        navigate("/login")
                    }

                })
            } catch (error) {
                console.log("error")
            }
        }
    };

    const validateForm = () => {
        return !errors.email;
    };

    return (
        <>
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
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send me temporary password</button>

                    </form>
                </div>
            </div>
        </>
    )
}
export default GetPasswordForm