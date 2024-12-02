import {useState} from 'react';
import axios from 'axios'

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/register', {name, email, password})
            .then(result => console.log(result))
            .catch(error => console.error(error));
    }
    return (
        <div>
            <h2>Register</h2>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="email" onChange={(e) => setName(e.target.value)}/>
                <br/>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;