import {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {useSocket} from "../context/SocketContext.jsx"
import Ready from "./Ready.jsx";
import Play from "./Play.jsx";
import backgroundImage from "../assets/homepage-background.jpeg"

const Wrapper = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
    height: 100vh;
`;
const BlurBackground = styled.div`
    position: relative;
    backdrop-filter: blur(6px);
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    padding: 20px
`
const RoomIDWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 13%;
    width: 13%;
    //margin: 20px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
    
    border: 2px solid rgba(170, 11, 214, 0.8);
    border-radius: 10px;
    background-color: rgba(0,0,0, 0.4);
    box-shadow: 0 4px 15px 2px rgba(0, 0, 0, 0.5);
`;


function Game() {
    const socket = useSocket();
    const [isStart, setStart] = useState(false)
    const [roomID, setRoomID] = useState("")
    useEffect(() => {
        if (!socket) return;
        socket.on("game start", () => {
            setStart(true);
        });
        socket.on("roomID", (ID) => {
            setRoomID(ID);
        })
        return () => {
            console.log("unmounted");
            socket.emit('leave room', roomID);
            socket.off("roomID");
            socket.off("game start");
        }
    }, [roomID, socket]);


    socket.emit('roomID');
    return (
        <Wrapper>
            <BlurBackground>
                <RoomIDWrapper>ROOM ID: {roomID}</RoomIDWrapper>
                {isStart ? (<Play/>) : (<Ready/>)}
            </BlurBackground>
        </Wrapper>
    );

}

export default Game;