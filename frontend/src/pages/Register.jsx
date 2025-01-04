import {useState} from 'react';
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom";
import BlurOverlay from "../component/BlurOverlay.jsx";
import {ErrorMessage, FormContainer, FormWrapper, Input, Label, Title, Button, StyledLink} from "../component/StyledForm.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/register`, {name, email, password})
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
                        <StyledLink>
                            Already have an account? <Link to="/login">Login now</Link>
                        </StyledLink>
                    </form>
                </FormWrapper>
            </FormContainer>
        </BlurOverlay>
    );
}

export default Register;