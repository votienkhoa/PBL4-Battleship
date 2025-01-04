import {useState} from 'react';
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import BlurOverlay from "../BlurOverlay.jsx";

const FormWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60%;
    width: 400px;
    margin: auto;
    padding-bottom: 20px;
    border: 2px solid rgba(170, 11, 214, 0.8);
    border-radius: 10px;
    background-color: rgba(0,0,0, 0.4);
    box-shadow: 0 4px 15px 2px rgba(0, 0, 0, 0.5);
`
const FormContainer = styled.div`
    height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
`
const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 2px solid transparent;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    &::placeholder {
        color: #b0b0b0; 
        opacity: 0.5;
    }
    &:focus {
        border: 2px solid #aa0bd6;
    }
`;
const Label = styled.label`
    display: block;
    font-size: 14px;
    color: #f5f5f5;
    text-align: left;
    margin-top: 10px;
`;
const Button = styled.button`
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(135deg, #aa0bd6, #6d0eaa);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;
const Title = styled.h2`
    text-align: center;
    color: #fff;
    margin-bottom: 20px;
    font-size: 25px;
`;
const ErrorMessage = styled.p`
    text-align: center;
    color: red;
    font-size: 1.1rem;
    min-height: 1.4rem;
    margin-bottom: 0;
    margin-top: 1.5rem;
`

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', {name, email, password})
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again!');
        }
    }
    return (
        <BlurOverlay>
            <FormContainer>
                <FormWrapper>
                    <form onSubmit={handleSubmit}>
                        <Title>Register</Title>
                        <ErrorMessage>{error}</ErrorMessage>
                        <Label>Email</Label>
                        <Input
                            type="text"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="Enter your email"
                            required
                        />
                        <Label>Username</Label>
                        <Input
                            type="text"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           placeholder="Enter your username"
                            required
                        />
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                        <Button type="submit">Register</Button>
                    </form>
                </FormWrapper>
            </FormContainer>
        </BlurOverlay>
    );
}

export default Register;