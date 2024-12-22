import {useEffect, useState} from 'react';
import {useSocket} from '../../context/SocketContext.jsx'
import styled from "@emotion/styled";
import MessageList from "./MessageList.jsx";
import InputForm from "./InputForm.jsx";


const ContainerStyled = styled.div`
    padding: 8px;
    width: 400px;
    height: 250px;
    border: 2px solid rgba(170, 11, 214, 0.8);
    border-radius: 10px;
    background-color: rgba(0,0,0, 0.2);
`;
const FormStyled = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;


function ChatBox() {
    const socket = useSocket();
    const [messages, setMessages] = useState([
        { id: 1, displayName: "Dung", createdAt: "1:30pm", text: "hi" },
        { id: 2, displayName: "Khoa", createdAt: "1:28pm", text: "hello" }
    ])
    //--------------------------------------
    useEffect(() => {
        socket.on("send chat", (data) => {
            const newMessage = {
                id: messages.length + 1,
                displayName: data.displayName,
                createdAt: data.createdAt,
                text: data.text
            }
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
        return () => {
            socket.off("send chat");
        }
    }, []);
    //---------------------------------------
    const sendMessage = (message) => {
        const newMessage = {
            id: messages.length + 1,
            displayName: "You",
            createdAt: new Date().toLocaleTimeString(),
            text: message
        }
        socket.emit("send chat", newMessage);
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