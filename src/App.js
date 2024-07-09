
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
import { storage } from './firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid'

function App() {
    const [loading, setLoading] = useState(true);
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);


    const [img, setImg] = useState(null);
    const [imgList, setImgList] = useState([])
    const imgRef = ref(storage, "images/");
    const uploadImage = () => {
        if (img == null) return;
        const imgRef = ref(storage, 'images/' + img.name + v4());
        uploadBytes(imgRef, img).then(() => {
            alert('Image uploaded')
        })
    };
    useEffect(() => {
        listAll(imgRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImgList((prev) => [...prev, url])
                })
            })
        })
    });



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

    )
}

export default App;