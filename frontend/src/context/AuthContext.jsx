import {useContext, createContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const verifyUser = async () => {
            if (token){
                try{
                    const response = await axios.get(`${BACKEND_URL}/myInfo`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    console.log("verify called")
                    setUser(response.data)
                } catch (err){
                    console.error(err);
                    setError("The session has expired, please log in again!");
                    logout();
                } finally {
                    setLoading(false)
                }
            }
            else setLoading(false)
        }
        verifyUser();
    }, [navigate, token]);
    const login = async (data) => {
        try{
            const response = await axios.post(`${BACKEND_URL}/login`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const res = response.data;
            if (res.userId){
                console.log("userid: " + res.userId)
                setUser({id: res.userId, rating: res.rating})
                setToken(res.accessToken);
                setError(null);
                localStorage.setItem("site", res.accessToken);
                navigate("/lobby");
            }
            else{
                console.log(res);
                setError(res);
            }
        } catch (err){
            console.error(err);
            setError(err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại!");
        }
    }
    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
    };
    return (
        <AuthContext.Provider value={{user, token,error, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext)