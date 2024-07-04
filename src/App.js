// src/App.jsx
import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import UserList from './components/user/userlist/UserList';
import Loader from "./common/Loader";
import DefaultLayout from "./layout/DefaultLayout";
import "./css/style.css"
import LoginForm from "./components/LoginForm/LoginForm";
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
            <Route path={"/admin"} element={<DefaultLayout/>}>
                <Route path="users" element={<UserList />} />
            </Route>
        </Routes>
    )
}

export default App;
