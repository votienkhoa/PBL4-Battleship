import {useContext, createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const login = async (data) => {
        try{
            const response = await axios.post("http://localhost:3000/login", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const res = response.data;
            console.log(res);
            if (res){
                setUser({id: res.userId, rating: res.rating})
                console.log(res.accessToken)
                setUser(res.user);
                setToken(res.accessToken);
                localStorage.setItem("site", res.accessToken);
                navigate("/lobby");
                return;
            }
            throw new Error(res.message);
        } catch (err){
            console.error(err);
        }
    }
    return (
        <AuthContext.Provider value={{user, token, login}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext)