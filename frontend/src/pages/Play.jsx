import styled from "@emotion/styled";
import BattlefieldBoard from "../component/battlefield/BattlefieldBoard.jsx";
import ChatBox from "../component/chatbox/ChatBox.jsx";
import {useEffect, useState} from "react";
import {useSocket} from "../context/SocketContext.jsx"
import {useNavigate} from "react-router-dom";

const StyledContainer = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: center;
`;
const EnemyField = styled.div`
    margin-left: 80px;
`;
const MyField = styled.div`
    pointer-events: none;
    margin-right: 80px;
`;
const StyledChatBox = styled.div`
    position: absolute;
    top: 490px;
    left: 30px;
`;
const StyledNotificationWrapper = styled.div`
    color: whitesmoke;
    letter-spacing: 1px;
    
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.15);
    height: 50px;
    width: 400px;
    text-align: center;
    border-radius: 7px;
    border: 1px solid #B846FF;
    padding-top: 20px;
`
const dimBoard = {
    pointerEvents: 'none',
    opacity: '0.6'
}
function Play() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [myBoard, setMyBoard] = useState(Array(10).fill(Array(10).fill(null)));
    const [enemyBoard, setEnemyBoard] = useState(Array(10).fill(Array(10).fill(null)));
    const [turn, setTurn] = useState(false);
    useEffect(() => {
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
            <StyledContainer>
                <MyField style={!turn ? null : dimBoard}>
                    <BattlefieldBoard board={myBoard}/>
                </MyField>
                <EnemyField style={turn ? null : dimBoard}>
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