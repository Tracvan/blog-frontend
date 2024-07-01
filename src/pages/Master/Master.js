import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { Outlet } from "react-router-dom"
function Master() {
    return (
        <>
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Outlet />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    )
}
export default Master