import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Cookies from 'js-cookie';


const Admin = ({ children }) => {

    let isAuthenticated = Cookies.get("role")  === "1";
    

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
};
export default Admin;