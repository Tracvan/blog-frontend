import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from './components/post/Post';
import Master from './pages/Master/Master';
import RegisterForm from './components/register/RegisterForm';
import UserList from './components/UserList/UserList';
import LoginForm from './components/LoginForm/LoginForm';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Master />} />
                <Route path="/posts" element={<Post />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/user-list" element={<UserList />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;