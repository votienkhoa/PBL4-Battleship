import styled from "@emotion/styled";
import Battlefield from "../component/battlefield/Battlefield.jsx";
import BattlefieldBoard from "../component/battlefield/BattlefieldBoard.jsx";
import {useEffect, useState} from "react";
import {useSocket} from "../context/SocketContext.jsx";

const StyledContainer = styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: center;
`;
const EnemyField = styled.div`
    pointer-events: none;
    margin-left: 80px;
`;
const MyField = styled.div`
    margin-right: 80px;
`;
const ReadyButton = styled.button`
    display: block;
    transform: skew(-25deg);
    background-color: #B846FF;
    border-style: none;
    text-align: center;
    width: 140px;
    height: 45px;
    padding: 0;
    margin: 5px auto;
    &:hover{
        cursor: pointer;
        filter: brightness(0.9);
        box-shadow: 0 0 20px 3px rgba(251,28,122,0.5);
    }
    &:active{
        filter: brightness(0.8);
    }
`;
const LeaveButton = styled.button`
    display: block;
    transform: skew(-25deg);
    background-color: #FF4C4C;
    border-style: none;
    text-align: center;
    width: 140px;
    height: 45px;
    padding: 0;
    margin: 17px auto 0;

    &:hover {
        cursor: pointer;
        filter: brightness(0.9);
        box-shadow: 0 0 20px 3px rgba(251, 28, 122, 0.5);
    }

    &:active {
        filter: brightness(0.8);
    }
`;

const ButtonText = styled.p`
    color: white;
    font-family: 'Inter', sans-serif;
    font-style: italic;
    font-weight: 600;
    font-size: 15px;
    margin: 0;
    letter-spacing: 3px;
    transform: skew(20deg);
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
            <StyledContainer>
                <MyField>
                    <Battlefield isReady={isReady}/>
                    <h1 style={{marginBottom: '0'}}>{isReady ? "Ready" : null}</h1>
                </MyField>
                <EnemyField>
                    <BattlefieldBoard/>
                    <h1>{isEnemyReady ? "Ready" : null}</h1>
                </EnemyField>
            </StyledContainer>
            <ReadyButton onClick={onReady}>
                <ButtonText>READY</ButtonText>
            </ReadyButton>
            <LeaveButton>
                <ButtonText>LEAVE</ButtonText>
            </LeaveButton>
        </>
    );
}

export default Ready;