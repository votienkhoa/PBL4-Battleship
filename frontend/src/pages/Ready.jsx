import styled from "@emotion/styled";
import Battlefield from "../component/battlefield/Battlefield.jsx";
import BattlefieldBoard from "../component/battlefield/BattlefieldBoard.jsx";
import {useEffect, useState} from "react";
import {useSocket} from "../context/SocketContext.jsx";
import usePlayer from "../hooks/usePlayer.jsx";

const StyledContainer = styled.div`
    margin-top: 20vh;
    display: flex;
    justify-content: center;
    margin-bottom: 0;
`;
const EnemyField = styled.div`
    pointer-events: none;
    margin-left: 80px;
`;
const MyField = styled.div`
    margin-right: 80px;
`;
const PlayerNameBox = styled.div`
    width: 200px;
    height: 69px;
    min-height: 60px;
    background-color: rgba(0, 0, 0, 0.5); 
    color: white;
    text-align: center;
    line-height:34px;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 14px; 
    font-weight: bold;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease; 

    &:hover {
        background-color: rgba(0, 0, 0, 0.7); 
        transform: scale(1.1);
    }
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
const dimBoard = {
    opacity: 0.7,
    filter: 'grayscale(100%)'
}
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
function Ready() {
    const socket = useSocket();
    const [isReady, setReady] = useState(false);
    const [isEnemyReady, setEnemyReady] = useState(false);
    const [isFull, setFull] = useState(false);
    const [enemy, setEnemy] = useState(null);
    const {name, rating} = usePlayer()
    const RatingValue = styled.span`
        font-size: 14px;
        font-weight: bold;
        color: ${() => ratingColor(rating)};
        margin-left: 5px;
    `;
    useEffect(() => {
        socket.emit('enemy ready status')
        socket.emit('room info')
        socket.on('room info', (numPlayers) => {
            console.log(numPlayers);
            if (numPlayers === 2) {
                setFull(true);
            } else {
                setFull(false);
            }
        })
        socket.on('enemy ready', (status) => {
            setEnemyReady(status);
        })
        socket.on('enemy joined', () => setFull(true))

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
                    <PlayerNameBox>
                        <div>player: {name}</div>
                        <div>rating: <RatingValue>{rating}</RatingValue></div>
                    </PlayerNameBox>
                    <Battlefield isReady={isReady}/>
                    <h1 style={{marginBottom: '0'}}>{isReady ? "Ready" : null}</h1>
                </MyField>
                <EnemyField style={!isFull ? dimBoard : null}>
                    <PlayerNameBox>
                        <div>player: Khoa</div>
                        <div>rating: <RatingValue>1200</RatingValue></div>
                    </PlayerNameBox>
                    <BattlefieldBoard/>
                    <h1 style={{minHeight:'20px'}}>{isEnemyReady ? "Ready" : null}</h1>
                </EnemyField>
            </StyledContainer>
            <StyledButton type='ready' onClick= {() => setReady(true)}>
                <ButtonText>READY</ButtonText>
            </StyledButton>
            <StyledButton type='leave'>
                <ButtonText>LEAVE</ButtonText>
            </StyledButton>
        </>
    );
}

export default Ready;