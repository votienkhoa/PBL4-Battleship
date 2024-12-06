import Battlefield from "../component/battlefield/Battlefield.jsx";
import BattlefieldBoard from "../component/battlefield/BattlefieldBoard.jsx";
import {useEffect, useState} from "react";
import {useSocket} from "../context/SocketContext.jsx"
import styled from "@emotion/styled";
import Ready from "./Ready.jsx";
import Play from "./Play.jsx";

function Game() {
    const socket = useSocket();
    useEffect(() => {
        if (!socket) return;
        socket.on("room status", (status) => {
            setStatus(status);
        });
        socket.on("game start", () => {
            setStart(true);
        });
        return () => {
            socket.off("room status");
            socket.off("game start");
        }
    }, [socket]);

    const [status, setStatus] = useState("");
    const [isStart, setStart] = useState(false);
    return (
        <>
            <h1>{status}</h1>
            {isStart ? (<Play/>) : (<Ready/>)}
        </>
    );

}

export default Game;