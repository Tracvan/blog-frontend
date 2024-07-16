
import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
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
import UserProfile from "./components/user/UserProfile/UserProfile";
import UpdateProfile from "./components/user/UserProfile/UpdateProfile";
import PostEdit from "./components/PostForm/PostEdit";
import PostForm from "./components/PostForm/PostForm";

function App() {
    const [loading, setLoading] = useState(true);
    const [showPostForm, setShowPostForm] = useState(false);
    const { pathname } = useLocation();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            navigate('/login');
        }
    }, [navigate, token]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const handleOpenPostForm = () => {
        setShowPostForm(true);
    };

    const handleClosePostForm = () => {
        setShowPostForm(false);
    };

    if (loading) {
        return <div>Loading...</div>; // Or your loading spinner
    }


    return (
        <>
            {showPostForm && <PostForm handleClose={handleClosePostForm} />}
            <div className={showPostForm ? "opacity-50" : ""}>
            <Routes>
                <Route path={"/login"} element={<LoginForm/>}/>
                <Route path="/register" element={<RegisterForm />} />

                <Route path={"/admin"} element={<DefaultLayout/>}>
                    <Route path="users" element={<UserList />} />
                    <Route path="user/:id" element={<UserDetail />} />
                </Route>
                <Route path="user/" element={<DefaultLayout />}>
                    <Route path="profile/:id" element={<UserProfile />} />
                    <Route path="update/:id" element={<UpdateProfile />} />
                    <Route path=":id" element={<UserDetail />} />


                </Route>
                <Route path={"/changepassword"} element={<ChangePassword />} />
                <Route path={"/getpassword"} element={<GetPasswordForm />} />
                <Route path={"/access-denined"} element={<AccessDenied />} />

                <Route path={"/"} element={<DefaultLayout/>}>
                    <Route path="posts" element={<Post />} />
                    <Route path="posts/:id" element={<BlogPost />} />
                    <Route path="posts/:id/edit" element={<PostEdit />} />
                </Route>

            </Routes>
                <button
                    onClick={handleOpenPostForm}
                    className="fixed bottom-5 right-5 p-3 bg-blue-600 text-white rounded-full shadow-lg"
                >
                    + Create Post
                </button>
        </div>
        </>
    )
}

export default App;