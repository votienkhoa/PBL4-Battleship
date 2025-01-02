import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const PrivateRoute = () => {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

export default PrivateRoute;
