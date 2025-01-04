import {useState} from "react";
import { Link } from "react-router-dom"
import {useAuth} from "../context/AuthContext.jsx";
import BlurOverlay from "../component/BlurOverlay.jsx";
import {ErrorMessage, FormContainer, FormWrapper, Input, Label, Title, Button, StyledLink} from "../component/StyledForm.jsx";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email: email, password: password });
    };

    return (
        <BlurOverlay>
            <FormContainer>
                <FormWrapper>
                    <form onSubmit={handleSubmit}>
                        <Title>Login</Title>
                        <ErrorMessage>{error}</ErrorMessage>
                        <Label>Email</Label>
                        <Input type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        <Button type="submit">Login</Button>
                        <StyledLink>
                            Don&#39;t have an account? <Link to="/register">Register here</Link>
                        </StyledLink>
                    </form>
                </FormWrapper>
            </FormContainer>
        </BlurOverlay>
    );
}

export default Login;