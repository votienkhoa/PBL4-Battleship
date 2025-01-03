import {useContext, createContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    useEffect(() => {
        const verifyUser = async () => {
            if (token){
                try{
                    const response = await axios.get("http://localhost:3000/myInfo", {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    console.log("verify called")
                    console.log(response.data)
                    setUser(response.data)
                } catch (err){
                    console.log(err)
                    navigate('/login');
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
            const response = await axios.post("http://localhost:3000/login", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const res = response.data;
            console.log(res);
            if (res){
                console.log("userid: " + res.userId)
                setUser({id: res.userId, rating: res.rating})
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
        <AuthContext.Provider value={{user, token, loading, login}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext)