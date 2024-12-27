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
    backdrop-filter: blur(6px);
    height: 100%;
    width: 100%;
`

function Game() {
    const socket = useSocket();
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
            socket.off("roomID");
            socket.off("game start");
        }
    }, [socket]);
    const [isStart, setStart] = useState(false);
    const [roomID, setRoomID] = useState("")

    socket.emit('roomID');
    return (
        <Wrapper>
            <BlurBackground>
                <h2 style={{margin: '0'}}>Room ID: {roomID}</h2>
                {isStart ? (<Play/>) : (<Ready/>)}
            </BlurBackground>
        </Wrapper>
    );

}

export default Game;