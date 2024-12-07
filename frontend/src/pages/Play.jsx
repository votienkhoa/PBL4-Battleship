import styled from "@emotion/styled";
import BattlefieldBoard from "../component/battlefield/BattlefieldBoard.jsx";
import ChatBox from "../component/chatbox/ChatBox.jsx";
import {useEffect, useState} from "react";
import {useSocket} from "../context/SocketContext.jsx"

const EnemyField = styled.div`
    position: absolute;
    top: 130px;
    left: 850px;
`;
const MyField = styled.div`
    pointer-events: none;
    position: absolute;
    top: 130px;
    left: 150px;
`;
const StyledChatBox = styled.div`
    position: absolute;
    top: 490px;
    left: 30px;
`;
function Play() {
    const socket = useSocket();
    const [myBoard, setMyBoard] = useState(Array(10).fill(Array(10).fill(null)));
    const [enemyBoard, setEnemyBoard] = useState(Array(10).fill(Array(10).fill(null)));
    console.table(myBoard)
    console.table(enemyBoard);
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

        return () => {
            socket.off('self');
            socket.off('enemy');
        };
    }, [socket]);
    return (
        <>
            <h1>Game Start</h1>
            <MyField>
                <BattlefieldBoard board={myBoard}/>
            </MyField>
            <EnemyField>
                <BattlefieldBoard board={enemyBoard}/>
            </EnemyField>
            <StyledChatBox>
                <ChatBox/>
            </StyledChatBox>
        </>
    );
}

export default Play;