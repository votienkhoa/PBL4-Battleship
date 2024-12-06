import {useEffect, useState} from 'react';
import { useSocket } from '../../context/SocketContext.jsx';
import {useNavigate} from "react-router-dom";


function Lobby() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [roomID, setRoomID] = useState("");

    useEffect(() => {
        if (!socket) return;
        socket.on("room created", (ID) =>{
            console.log(ID);
            navigate('/game');
        })
        socket.on('room joined', () => {
            navigate('/game');
        });

        socket.on('error', (error) => {
            console.log(error);
        });
        return () => {
            socket.off("room created");
            socket.off('success');
            socket.off('error');
        };
    }, [navigate, socket]);

    const createRoom = () => {
        socket.emit("create room");
    }
    const joinRoom = (ID) => {
        socket.emit("join room", ID);
    }
    return (
        <>
            <button onClick={createRoom}>Create Room</button>
            <br/>
            <input type="text" onChange={(e) => setRoomID(e.target.value)}/>
            <button onClick={() => joinRoom(roomID)}>Join Room</button>
        </>
    );
}

export default Lobby;