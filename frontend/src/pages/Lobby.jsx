import {useEffect, useState} from 'react';
import { useSocket } from '../context/SocketContext.jsx';
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";

const Heading = styled.h1`
    font-size: 2rem;
    color: red;
    margin-bottom: 1rem;
    text-align: center;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1rem;
    &:hover {
        background-color: #0056b3;
    }
`;
const Input = styled.input`
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 1rem;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
`;

function Lobby() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [roomID, setRoomID] = useState("");
    const [error, setError] = useState("");

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
        <Container>
            <Heading>{error}</Heading>
            <Button onClick={createRoom}>Create Room</Button>
            <Input
                type="text"
                placeholder="Enter Room ID"
                onChange={(e) => setRoomID(e.target.value)}
            />
            <Button onClick={() => joinRoom(roomID)}>Join Room</Button>
        </Container>
    );
}

export default Lobby;