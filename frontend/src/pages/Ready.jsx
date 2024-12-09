import styled from "@emotion/styled";
import Battlefield from "../component/battlefield/Battlefield.jsx";
import BattlefieldBoard from "../component/battlefield/BattlefieldBoard.jsx";
import {useEffect, useState} from "react";
import {useSocket} from "../context/SocketContext.jsx";

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const EnemyField = styled.div`
    margin-left: 80px;
`;
const MyField = styled.div`
    margin-right: 80px;
`;
function Ready() {
    const socket = useSocket();
    const [isReady, setReady] = useState(false);
    const [isEnemyReady, setEnemyReady] = useState(false);
    useEffect(() => {
        socket.on('enemy ready', () => {
            setEnemyReady(true);
        })
    }, [socket]);
    const onReady = () => {
        console.log("ready");
        setReady(true);
    };
    return (
        <>
            <button onClick={onReady}>ready</button>
            <StyledContainer>
                <MyField>
                    <Battlefield isReady={isReady}/>
                    <h1>{isReady ? "Ready" : null}</h1>
                </MyField>
                <EnemyField>
                    <BattlefieldBoard/>
                    <h1>{isEnemyReady ? "Ready" : null}</h1>
                </EnemyField>
            </StyledContainer>
        </>
    );
}

export default Ready;