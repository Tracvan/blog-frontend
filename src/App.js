import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import UserList from './components/user/userlist/UserList';
import DefaultLayout from "./layout/DefaultLayout";
import "./css/style.css"
import LoginForm from "./components/LoginForm/LoginForm";
import Post from './components/post/Post';
import RegisterForm from './components/register/RegisterForm';
import ChangePassword from './components/changepassword/ChangePasswordForm';
import GetPasswordForm from './components/getpassword/GetPasswordForm';
import UserDetail from './components/user/userdetail/UserDetail';


function App() {
    const [loading, setLoading] = useState(true);
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <Routes>
            <Route path={"/login"} element={<LoginForm/>}/>
            <Route path="/register" element={<RegisterForm />} />
            <Route path={"/admin"} element={<DefaultLayout/>}>
                <Route path="users" element={<UserList />} />
                <Route path="posts" element={<Post />} />
                <Route path="changepassword" element={<ChangePassword />} />
                <Route path="getpassword" element={<GetPasswordForm />} />
                <Route path="user/:id" element={<UserDetail />} />
            </Route>
        </Routes>
    );
}

export default App;
