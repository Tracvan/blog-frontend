import React, {useEffect, useState} from 'react';
import {Outlet, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import UserList from './components/user/userlist/UserList';
import DefaultLayout from "./layout/DefaultLayout";
import "./css/style.css"
import LoginForm from "./components/LoginForm/LoginForm";
import Post from './components/post/Post';
import RegisterForm from './components/register/RegisterForm';
import ChangePassword from './components/changepassword/ChangePasswordForm';
import GetPasswordForm from './components/getpassword/GetPasswordForm';
import UserDetail from './components/user/userdetail/UserDetail';
import AccessDenied from "./components/error/AccessDenied";
import BlogPost from "./components/post/BlogPost";
import Test from "./components/post/Test";
import UserProfile from "./components/user/UserProfile/UserProfile";
import UpdateProfile from "./components/user/UserProfile/UpdateProfile";
import MyPost from "./components/post/MyPost";
import Wrapper from "./components/post/Wrapper";

function App() {
    const [loading, setLoading] = useState(true);
    const {pathname} = useLocation();
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    // if (token === null) {
    //     navigate('/login')
    // }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {

        setTimeout(() => setLoading(false), 1000);
    }, []);


    return (
        <Routes>
            <Route path={"/login"} element={<LoginForm/>}/>
            <Route path="/register" element={<RegisterForm/>}/>

            <Route path={"/admin"} element={<DefaultLayout/>}>
                <Route path="users" element={<UserList/>}/>
                <Route path="user/:id" element={<UserDetail/>}/>
            </Route>
            <Route path={"/changepassword"} element={<ChangePassword/>}/>
            <Route path={"/getpassword"} element={<GetPasswordForm/>}/>
            <Route path={"/access-denined"} element={<AccessDenied/>}/>

            <Route path={"/users"} element={<DefaultLayout/>}>
                <Route path="mypost" element={<MyPost/>}/>
            </Route>


            <Route path={"/"} element={<DefaultLayout/>}>
                <Route path="/profile/:id" element={<UserProfile/>}/>
                <Route path={"/update/:id"} element={<UpdateProfile/>}/>
                <Route path="posts/:id" element={<BlogPost/>}/>
                <Route path="posts" element={<Post/>}/>

            </Route>
            <Route path={'/test'} element={<Test/>}/>
        </Routes>
    )
}

export default App;