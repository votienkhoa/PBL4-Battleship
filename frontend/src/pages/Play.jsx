import styled from "@emotion/styled";
import BattlefieldBoard from "../component/battlefield/BattlefieldBoard.jsx";
import ChatBox from "../component/chatbox/ChatBox.jsx";
import {useEffect, useState} from "react";
import {useSocket} from "../context/SocketContext.jsx"
import {useNavigate} from "react-router-dom";

const StyledContainer = styled.div`
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
const dimBoard = {
    pointerEvents: 'none',
    opacity: '0.3'
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
        socket.on('opponent disconnected', () => {
            alert("opponent disconnected!!!")
            navigate('/lobby')
        })
        socket.on("turn", (data) => {
            setTurn(data);
        })

        return () => {
            socket.off('self');
            socket.off('enemy');
            socket.off('opponent disconnected');
        };
    }, [navigate, socket]);

    socket.emit('turn');
    return (
        <>
            <h1>{turn ? "Your turn" : "Opponent turn"}</h1>
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
        </>
    );
}

export default Play;