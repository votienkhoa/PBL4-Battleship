import {Avatar, Typography} from "@mui/material";
import styled from '@emotion/styled';

// eslint-disable-next-line react/prop-types
function Message({text, displayName, createdAt, photoURL}) {
    const nameStyled = {
        marginLeft: '10px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: 'black',
    }
    const textStyled = {
        marginLeft: '10px',
        fontSize: '16px',
        color: 'black',
    }
    const timeStyled = {
        marginLeft: '10px',
        fontSize: '12px',
        color: 'gray',
    }
    const Container = styled.div`
        margin-left: 10px;
        margin-bottom: 10px;
    `;


    return (
        <Container>
            <div style={{display: 'flex'}}>
                <Avatar src={photoURL} sx={{height: '30px', width:'30px'}}>K</Avatar>
                <Typography variant="h6" sx={nameStyled}>{displayName}</Typography>
                <Typography variant="body2" sx={timeStyled}>{createdAt}</Typography>
            </div>
            <div>
                <Typography variant="body1" sx={textStyled}>{text}</Typography>
            </div>
        </Container>
    );
}

export default Message;