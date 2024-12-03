import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login', {email, password})
            .then(result => {
                console.log(result.data);
                if (result.data === "Success"){
                    navigate("/play");
                }
            })
            .catch(error => console.error(error));
    }
    return (
        <div>
            <h2>Login</h2>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;