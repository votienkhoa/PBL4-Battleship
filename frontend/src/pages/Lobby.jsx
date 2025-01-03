import {useEffect, useState} from 'react';
import {useSocket} from '../context/SocketContext.jsx';
import {useNavigate} from "react-router-dom";
import usePlayer from "../hooks/usePlayer"
import styled from "@emotion/styled";
import BlurOverlay from "../component/BlurOverlay.jsx";
import {useAuth} from "../context/AuthContext.jsx";

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
`
const Input = styled.input`
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 1rem;
`
const ActionWrapper = styled.div`
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
`
const ActionContainer = styled.div`
    height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
`
const ErrorMessage = styled.p`
    color: red;
    font-size: 1.1rem;
    min-height: 1.4rem;
    margin-bottom: 0;
    margin-top: 1.5rem;
`
const PlayerInfoWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 20%;
    width: 13%;
    min-height: 190px;

    color: white;
    font-size: 18px;
    letter-spacing: 1px;
    
    border: 2px solid rgba(170, 11, 214, 0.8);
    border-radius: 10px;
    background-color: rgba(0,0,0, 0.4);
    box-shadow: 0 4px 15px 2px rgba(0, 0, 0, 0.5);
`
const InfoLabel = styled.div`
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    margin: 5px 0;
`
const InfoValue = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #f8f8f8;
    margin: 5px 0;
`
const ratingColor = (rati) => {
    const rating = Number(rati)
    return  rating >= 2400 ? 'red' :
            rating >= 2200 ? 'orange' :
            rating >= 2000 ? 'yellow' :
            rating >= 1800 ? 'purple' :
            rating >= 1600 ? 'blue' :
            rating >= 1400 ? 'cyan' :
            rating >= 1200 ? 'green' : 'gray';
}
function Lobby() {
    const navigate = useNavigate();
    const socket = useSocket();
    const auth = useAuth();
    const [roomID, setRoomID] = useState("");
    const [error, setError] = useState("");
    const {name, rating} = usePlayer();
    const RatingValue = styled.div`
        font-size: 16px;
        font-weight: bold;
        color: ${() => ratingColor(rating)};
        margin: 5px 0;
    `;
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
        socket.emit("create room", auth.user.id);
        console.log(socket);
    }
    const joinRoom = (ID) => {
        if (!ID){
            setError("Room ID cannot be empty!")
            return;
        }
        console.log(auth.user);
        socket.emit("join room", {ID: ID, playerID: auth.user.id});
    }
    return (
        <BlurOverlay>
            <PlayerInfoWrapper>
                <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                    PLAYER INFO
                </div>
                <InfoLabel>Name:</InfoLabel>
                <InfoValue>{name}</InfoValue>
                <InfoLabel>Rating:</InfoLabel>
                <RatingValue>{rating}</RatingValue>
            </PlayerInfoWrapper>
            <ActionContainer>
                <ActionWrapper>
                    <Button onClick={createRoom}>Create Room</Button>
                    <Input
                        type="text"
                        placeholder="Enter Room ID"
                        onChange={(e) => setRoomID(e.target.value)}
                    />
                    <Button onClick={() => joinRoom(roomID)}>Join Room</Button>
                    <ErrorMessage>{error}</ErrorMessage>
                </ActionWrapper>
            </ActionContainer>
        </BlurOverlay>
    );
}

export default Lobby;