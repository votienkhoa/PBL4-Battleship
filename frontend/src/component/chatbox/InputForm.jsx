import {TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/SendRounded';
import styled from "@emotion/styled";
import {useState} from "react";

const Container = styled.div`
        display: flex;
        align-items: center;
    `;
const sendStyled = {
    "&:hover" : {
        cursor: "pointer"
    },
    marginLeft: '10px',
    fontSize: '30px'
}

// eslint-disable-next-line react/prop-types
function InputForm({onSend}) {
    const [message, setMessage] = useState("")
    const handleSend = () => {
        if (message.trim() === "") return;
        onSend(message);
        setMessage("")  // Clear the input field after sending the message)
    }
    return (
        <Container>
            <TextField
                value={message}
                size="small"
                fullWidth={true}
                multiline={true}
                maxRows={4}
                onChange={(e) => setMessage(e.target.value)}
                color = "primary"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        color: 'lightgrey'
                    },
                }}
            />
            <SendIcon fontSize="medium" onClick={() => handleSend()} sx={sendStyled}/>
        </Container>
    );
}

export default InputForm;