import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const PrivateRoute = () => {
    const { token, user, loading } = useAuth();
    if (loading){
        return <div>Loading...</div>
    }
    if (!token || !user) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

export default PrivateRoute;
