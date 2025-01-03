import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const usePlayer = () => {
    const [name, setName] = useState("")
    const [rating, setRating] = useState(0)
    const navigate = useNavigate()

    const token = localStorage.getItem('site')

    useEffect(() => {
        const myInfo = async () => {
            try {
                const response = await axios.get('http://localhost:3000/myInfo', {
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
            myInfo()
        } else {
            navigate('/login')
        }

    }, [navigate, token]);

    const getPlayerInfo = async (playerId) => {
        try{
            const response = await axios.get(`http://localhost:3000/playerInfo/${playerId}`)
            console.log(response.data)
            return response.data
        }catch (err) {
            console.log("API call error:", err);
        }
    }
    return { name, rating, getPlayerInfo };
}

export default usePlayer;
