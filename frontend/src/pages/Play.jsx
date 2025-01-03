import styled from "@emotion/styled";
import BattlefieldBoard from "../component/battlefield/BattlefieldBoard.jsx";
import ChatBox from "../component/chatbox/ChatBox.jsx";
import {useEffect, useState} from "react";
import {useSocket} from "../context/SocketContext.jsx"
import {useNavigate} from "react-router-dom";
import usePlayer from "../hooks/usePlayer.jsx";
import PlayerBox from "../component/PlayerBox.jsx";

const StyledContainer = styled.div`
    margin-top: 20vh;
    display: flex;
    justify-content: center;
`;
const EnemyField = styled.div`
    margin-left: 110px;
`;
const MyField = styled.div`
    pointer-events: none;
    margin-right: 110px;
`;
const LeaveButton = styled.div`
    width: 30px;
    height: 30px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #B846FF;
    color: white;
    border-radius: 5px;
    cursor: pointer;
`;
const StyledChatBox = styled.div`
    position: absolute;
    bottom: 20px;
    left: 20px;
`;
const StyledNotificationWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate(-50%);
    color: whitesmoke;
    letter-spacing: 1px;
    
    //margin: 20px auto;
    background-color: rgba(0, 0, 0, 0.25);
    height: 50px;
    width: 400px;
    text-align: center;
    border-radius: 7px;
    border: 1px solid #B846FF;
    padding-top: 20px;
`
const dimBoard = {
    pointerEvents: 'none',
    filter: 'brightness(0.8)',
    opacity: '0.6'
}
function Play() {
    const navigate = useNavigate();
    const socket = useSocket();
    const player = usePlayer();
    const [myBoard, setMyBoard] = useState(Array(10).fill(Array(10).fill(null)));
    const [enemyBoard, setEnemyBoard] = useState(Array(10).fill(Array(10).fill(null)));
    const {name, rating} = usePlayer()
    const [enemy, setEnemy] = useState({name: '', rating: 0})
    const [turn, setTurn] = useState(false);
    useEffect(() => {
        socket.emit('enemy info')
        socket.on('enemy info', async (enemyID) => {
            const enemyInfo = await player.getPlayerInfo(enemyID)
            setEnemy(enemyInfo)
        })
        socket.on("self", (data) => {
            console.log(data);
            setMyBoard(currentBoard => {
                const newBoard = JSON.parse(JSON.stringify(currentBoard))
                newBoard[data.position.i][data.position.j] = data.status;
                return [...newBoard];
            });
        })
        socket.on("enemy", (data) => {
            console.log(data);
            setEnemyBoard(currentBoard => {
                const newBoard = JSON.parse(JSON.stringify(currentBoard))
                newBoard[data.position.i][data.position.j] = data.status;
                return [...newBoard];
            });
        })
        socket.on("self sunk", (data) => {
            console.log(data);
            const ship = data.position;
            setMyBoard(currentBoard => {
                const newBoard = JSON.parse(JSON.stringify(currentBoard))
                for (let i = 0;  i < ship.h; i++){
                    newBoard[ship.y + i][ship.x] = data.status;
                }
                for (let i = 0;  i < ship.w; i++){
                    newBoard[ship.y][ship.x + i] = data.status;
                }
                return [...newBoard];
            });
        })
        socket.on("enemy sunk", (data) => {
            const ship = data.position;
            setEnemyBoard(currentBoard => {
                const newBoard = JSON.parse(JSON.stringify(currentBoard))
                for (let i = 0;  i < ship.h; i++){
                    newBoard[ship.y + i][ship.x] = data.status;
                }
                for (let i = 0;  i < ship.w; i++){
                    newBoard[ship.y][ship.x + i] = data.status;
                }
                return [...newBoard];
            });
        })
        socket.on('game over', (data) => {
            if (data.winner === socket.id) alert("You are the winner!!");
            else alert("You lost!!");
            navigate('/lobby');
        })
        socket.on('opponent disconnected', () => {
            alert("opponent disconnected!!!")
            navigate('/lobby')
        })
        socket.on("turn", (data) => {
            setTurn(data);
        })

        return () => {
            socket.off('turn');
            socket.off('self');
            socket.off('enemy');
            socket.off('opponent disconnected');
            socket.off('game over');
        };
    }, [navigate, socket]);

    socket.emit('turn');
    return (
        <div>
            <StyledNotificationWrapper>
                <h2 style={{margin: 'auto'}}>{turn ? "YOUR TURN" : "OPPONENT TURN"}</h2>
            </StyledNotificationWrapper>
            <LeaveButton onClick={() => {
                socket.disconnect();
                navigate('/lobby');
            }}>Leave</LeaveButton>
            <StyledContainer>
                <MyField style={!turn ? null : dimBoard}>
                    <PlayerBox name={name} rating={rating}/>
                    <BattlefieldBoard board={myBoard}/>
                </MyField>
                <EnemyField style={turn ? null : dimBoard}>
                    <PlayerBox name={enemy.name} rating={enemy.rating}/>
                    <BattlefieldBoard board={enemyBoard}/>
                </EnemyField>
            </StyledContainer>
            <StyledChatBox>
                <ChatBox/>
            </StyledChatBox>
        </div>
    );
}

export default Play;