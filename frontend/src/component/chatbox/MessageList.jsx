import Message from "./Message.jsx";
import styled from "@emotion/styled";

const ContainerStyled = styled.div`
    width: 100%;
`;
// eslint-disable-next-line react/prop-types
function MessageList({messages}) {

    return (
        <ContainerStyled>
            {/* eslint-disable-next-line react/prop-types */}
            {messages.map((msg) => (
                <Message
                    key={msg.id}
                    displayName={msg.displayName}
                    createdAt={msg.createdAt}
                    text={msg.text}
                />
            ))}
        </ContainerStyled>
    );
}

export default MessageList;