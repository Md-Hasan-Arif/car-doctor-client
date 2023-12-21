import { Outlet } from "react-router-dom";
import Footer from "../Pages/Home/Shared Items/Footer";
import Navbar from "../Pages/Home/Shared Items/Navbar";


const Main = () => {
    return (
        <div className="container mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;