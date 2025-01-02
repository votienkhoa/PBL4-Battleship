import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const usePlayer = () => {
    const [name, setName] = useState("")
    const [rating, setRating] = useState(0)
    const navigate = useNavigate()

    const token = localStorage.getItem('site')

    useEffect(() => {
        const playerInfo = async () => {
            try {
                const response = await axios.get('http://localhost:3000/playerInfo', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setName(response.data.name)
                    setRating(response.data.rating)
                } else {
                    console.log(response.status)
                    navigate('/login');
                    localStorage.removeItem('site');
                }
            } catch (err) {
                console.log("API call error:", err);
                console.log(err.response.status)
                navigate('/login');
            }
        }

        if (token) {
            playerInfo()
        } else {
            navigate('/login')
        }

    }, [navigate, token]);

    return { name, rating };
}

export default usePlayer;
