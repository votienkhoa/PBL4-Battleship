import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Backdrop } from '@mui/material';
import styled from '@emotion/styled';

// Container cho Modal
const ModalContainer = styled(Box)`
    background-color: white;
    border-radius: 8px;
    padding: 24px;
    max-width: 400px;
    margin: auto;
    outline: none;
`;

// Nút Đăng nhập
const StyledButton = styled(Button)`
    margin-top: 16px;
    background-color: #B846FF;
    &:hover {
        background-color: #A12FD8;
    }
`;

function Login({ open, onClose }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <ModalContainer>
                    <Typography variant="h6" textAlign="center" marginBottom={2}>
                        Register
                    </Typography>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <StyledButton
                        variant="contained"
                        fullWidth
                        onClick={handleLogin}
                    >
                        Register
                    </StyledButton>
                </ModalContainer>
            </Box>
        </Modal>
    );
}

export default Login;
