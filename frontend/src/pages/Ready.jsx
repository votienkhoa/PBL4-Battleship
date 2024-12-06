import styled from "@emotion/styled";
import Battlefield from "../component/battlefield/Battlefield.jsx";
import BattlefieldBoard from "../component/battlefield/BattlefieldBoard.jsx";
import ChatBox from "../component/chatbox/ChatBox.jsx";
import {useState} from "react";

const MyField = styled.div`
    position: absolute;
    top: 130px;
    left: 150px;
`;
const EnemyField = styled.div`
    pointer-events: none;
    filter: brightness(0.8);
    position: absolute;
    top: 130px;
    left: 850px;
`;
function Ready() {
    const [isReady, setReady] = useState(false);
    const onReady = () => {
        console.log("ready");
        setReady(true);
    };
    return (
        <>
            <button onClick={onReady}>ready</button>
            <MyField>
                <Battlefield isReady={isReady}/>
            </MyField>
            <EnemyField>
                <BattlefieldBoard/>
            </EnemyField>
        </>
    );
}

export default Ready;