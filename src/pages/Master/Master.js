import React from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";
import UserList from "../../components/userlist/UserList";

const Master = () => {
    return (
        <>
            <div>
                <Header />
                <div className="container mx-auto px-4 mt-4">
                    <div className="row">
                        <div className="col">
                            <Outlet />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    );
};

export default Master;
