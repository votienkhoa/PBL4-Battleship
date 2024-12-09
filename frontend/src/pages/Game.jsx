import {useEffect, useState} from "react";
import {useSocket} from "../context/SocketContext.jsx"
import Ready from "./Ready.jsx";
import Play from "./Play.jsx";

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
            socket.off("room status");
            socket.off("game start");
        }
    }, [socket]);
    const [isStart, setStart] = useState(false);
    const [roomID, setRoomID] = useState("")

    socket.emit('roomID');
    return (
        <>
            <h2>Room ID: {roomID}</h2>
            {isStart ? (<Play/>) : (<Ready/>)}
        </>
    );

}

export default Game;