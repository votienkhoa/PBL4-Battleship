import styled from "@emotion/styled";
import BattlefieldBoard from "../component/battlefield/BattlefieldBoard.jsx";
import ChatBox from "../component/chatbox/ChatBox.jsx";
import {useEffect} from "react";
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
    useEffect(() => {
        socket.on('shoot', (position) => {
            console.log(position);
        })
        return () => {
            socket.off('shoot');
        };
    }, [socket]);
    return (
        <>
            <h1>Game Start</h1>
            <MyField>
                <BattlefieldBoard/>
            </MyField>
            <EnemyField>
                <BattlefieldBoard/>
            </EnemyField>
            <StyledChatBox>
                <ChatBox/>
            </StyledChatBox>
        </>
    );
}

export default Play;