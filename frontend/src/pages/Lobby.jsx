import {useEffect, useState} from 'react';
import { useSocket } from '../context/SocketContext.jsx';
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import backgroundImage from "../assets/homepage-background.jpeg"

const Wrapper = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
    height: 100vh;
    margin: 0;
`;
const BlurBackground = styled.div`
    backdrop-filter: blur(6px);
    height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
`

const Button = styled.button`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    background-color: #B846FF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1rem;
    &:hover {
        filter: brightness(0.8);
    }
    &:active {
        filter: brightness(0.7);
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
    justify-content: center;
    align-items: center;
    height: 40%;
    padding-bottom: 100px;
    width: 400px;
    margin: auto;
    border: 2px solid rgba(170, 11, 214, 0.8);
    border-radius: 10px;
    background-color: rgba(0,0,0, 0.4);
    box-shadow: 0 4px 15px 2px rgba(0, 0, 0, 0.5);
`;
const ErrorMessage = styled.p`
    color: red;
    font-size: 1.1rem;
    min-height: 1.4rem;
    margin-bottom: 0;
    margin-top: 1.5rem;
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
            setError(error)
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
        if (!ID){
            setError("Room ID cannot be empty!")
            return;
        }
        socket.emit("join room", ID);
    }
    return (
        <Wrapper>
            <BlurBackground>
                <Container>
                    <Button onClick={createRoom}>Create Room</Button>
                    <Input
                        type="text"
                        placeholder="Enter Room ID"
                        onChange={(e) => setRoomID(e.target.value)}
                    />
                    <Button onClick={() => joinRoom(roomID)}>Join Room</Button>
                    <ErrorMessage>{error}</ErrorMessage>
                </Container>
            </BlurBackground>
        </Wrapper>

    );
}

export default Lobby;