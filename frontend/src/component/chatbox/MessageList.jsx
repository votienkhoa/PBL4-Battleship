import Message from "./Message.jsx";
import styled from "@emotion/styled";

const ContainerStyled = styled.div`
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    /* Tùy chỉnh scrollbar */
    &::-webkit-scrollbar {
        width: 10px; /* Độ rộng của scrollbar */
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #a30ecf, #6b00b3);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #c00ffa, #7c00e1); /* Màu khi hover thanh cuộn */
    }

    &::-webkit-scrollbar-button {
        display: none; /* Ẩn nút trên/dưới của scrollbar */
    }
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