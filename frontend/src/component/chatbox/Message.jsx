import {Avatar, Typography} from "@mui/material";
import styled from '@emotion/styled';
import "@fontsource/montserrat/300.css"

// eslint-disable-next-line react/prop-types
function Message({text, displayName, createdAt, photoURL}) {
    const nameStyled = {
        marginLeft: '10px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: 'lightgrey',
        fontFamily: 'Montserrat,serif'
    }
    const textStyled = {
        color: 'lightgrey',
        marginLeft: '10px',
        marginTop: '3px',
        fontSize: '16px',
        fontFamily: 'Montserrat,serif'
    }
    const timeStyled = {
        marginTop: '4px',
        marginLeft: '10px',
        fontSize: '10px',
        color: 'gray',
    }
    const Container = styled.div`
        margin-left: 10px;
        margin-bottom: 10px;
        font-family: Montserrat,serif;
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