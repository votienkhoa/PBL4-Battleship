import styled from "@emotion/styled";
import Battlefield from "../component/battlefield/Battlefield.jsx";
import BattlefieldBoard from "../component/battlefield/BattlefieldBoard.jsx";
import {useEffect, useState} from "react";
import {useSocket} from "../context/SocketContext.jsx";
import usePlayer from "../hooks/usePlayer.jsx";
import {useNavigate} from "react-router-dom";
import PlayerBox from "../component/PlayerBox.jsx";

const StyledContainer = styled.div`
    margin-top: 20vh;
    display: flex;
    justify-content: center;
    margin-bottom: 0;
`;
const EnemyField = styled.div`
    pointer-events: none;
    margin-left: 110px;
`;
const MyField = styled.div`
    margin-right: 110px;
`;
const StyledButton = styled.button`
    display: block;
    transform: skew(-25deg);
    background-color: ${(props) => (props.type === 'ready') ? '#B846FF' : '#FF4C4C'};
    border-style: none;
    text-align: center;
    width: 140px;
    height: 45px;
    padding: 0;
    margin: ${(props) => (props.type === 'leave') ? '20px' : '10px'} auto 10px;

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
const ReadyText = styled.h1`
    background: linear-gradient(90deg, #ff7eb3, #ff758c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; 
    min-height: 20px;
    margin-bottom: 0;
`;
const dimBoard = {
    opacity: 0.7,
    filter: 'grayscale(100%)'
}
function Ready() {
    const socket = useSocket();
    const player = usePlayer();
    const navigate = useNavigate();
    const [isReady, setReady] = useState(false);
    const [isEnemyReady, setEnemyReady] = useState(false);
    const [isFull, setFull] = useState(false);
    const [enemy, setEnemy] = useState({name: '', rating: 0});
    const {name, rating} = usePlayer()
    const leaveRoom = () => {
        socket.emit('leave room');
        navigate('/lobby')
    }
    useEffect(() => {
        socket.emit('enemy ready status')
        //-------------------------------------------------------
        socket.emit('room info')
        socket.on('room info', (numPlayers) => {
            if (numPlayers === 2) {
                setFull(true);
            } else {
                setFull(false);
            }
            socket.emit('enemy info')
        })
        //-------------------------------------------------------
        socket.on('enemy info', async (enemyID) => {
            console.log(enemyID)
            const enemyInfo = await player.getPlayerInfo(enemyID)
            setEnemy(enemyInfo)
        })
        //-------------------------------------------------------
        socket.on('enemy ready', (status) => {
            setEnemyReady(status);
        })
        //-------------------------------------------------------
        socket.on('enemy joined', () => {
            socket.emit('enemy info')
            setFull(true)
        })
        //-------------------------------------------------------
        socket.on('enemy leave', () => {
            setFull(false)
            setEnemy({name: '', rating: 0});
            setEnemyReady(false);
        })
        //-------------------------------------------------------
        return () => {
            socket.off('room info');
            socket.off("enemy ready");
            socket.off("enemy joined");
        }
    }, [socket]);
    return (
        <>
            <StyledContainer>
                <MyField>
                    <PlayerBox name={name} rating={rating}/>
                    <Battlefield isReady={isReady}/>
                    <ReadyText>{isReady ? "Ready" : null}</ReadyText>
                </MyField>
                <EnemyField style={!isFull ? dimBoard : null}>
                    <PlayerBox name={enemy.name} rating={enemy.rating}/>
                    <BattlefieldBoard/>
                    <ReadyText>{isEnemyReady ? "Ready" : null}</ReadyText>
                </EnemyField>
            </StyledContainer>
            <StyledButton type='ready' onClick= {() => setReady(true)}>
                <ButtonText>READY</ButtonText>
            </StyledButton>
            <StyledButton type='leave' onClick={leaveRoom}>
                <ButtonText>LEAVE</ButtonText>
            </StyledButton>
        </>
    );
}

export default Ready;