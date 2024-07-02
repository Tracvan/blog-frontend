import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from './components/post/Post';
import Master from './pages/Master/Master';
import RegisterForm from './components/register/RegisterForm';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Master />} />
                <Route path="/posts" element={<Post />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
