import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from './components/post/Post';
import Master from './pages/Master/Master';
import RegisterForm from './components/register/RegisterForm';
import ChangePassword from './components/changepassword/ChangePasswordForm';
import GetPasswordForm from './components/getpassword/GetPasswordForm';
import LoginForm from './components/LoginForm/LoginForm';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Master />} />
                <Route path="/posts" element={<Post />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/getpassword" element={<GetPasswordForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;