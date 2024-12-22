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
`
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
    align-items: center;
`;

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
        <Wrapper>
            <BlurBackground>
                <Container>
                    <Button style={{marginTop: '200px'}} onClick={createRoom}>Create Room</Button>
                    <Input
                        type="text"
                        placeholder="Enter Room ID"
                        onChange={(e) => setRoomID(e.target.value)}
                    />
                    <Button onClick={() => joinRoom(roomID)}>Join Room</Button>
                </Container>
            </BlurBackground>
        </Wrapper>

    );
}

export default Lobby;