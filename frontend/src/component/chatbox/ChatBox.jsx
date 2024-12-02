import React, {useState} from 'react';
import styled from "@emotion/styled";
import MessageList from "./MessageList.jsx";
import InputForm from "./InputForm.jsx";

const ContainerStyled = styled.div`
    margin: 100px;
    padding: 8px;
    width: 400px;
    height: 600px;
    border: 2px solid palevioletred;
    border-radius: 5px;
`;
const FormStyled = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

function ChatBox() {
    const [messages, setMessages] = useState([
        { id: 1, displayName: "Dung", createdAt: "1:30pm", text: "cccc" },
        { id: 2, displayName: "Khoa", createdAt: "1:28pm", text: "cc" }
    ])
    const sendMessage = (message) => {
        const newMessage = {
            id: messages.length + 1,
            displayName: "You",
            createdAt: new Date().toLocaleTimeString(),
            text: message
        }
        setMessages([...messages, newMessage]);
    }
    return (
        <ContainerStyled>
            <FormStyled>
                <MessageList messages={messages}/>
                <InputForm onSend={sendMessage}/>
            </FormStyled>
        </ContainerStyled>
    );
}

export default ChatBox;