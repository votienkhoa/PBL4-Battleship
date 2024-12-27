import HomePage from "./pages/HomePage/HomePage.jsx";
import {animated, useSpring} from "@react-spring/web";
import "./App.css"
import ChatBox from "./component/chatbox/ChatBox.jsx";
import Register from "./component/login/Register.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {SocketProvider} from './context/SocketContext.jsx';
import Login from "./component/login/Login.jsx";
import Lobby from "./pages/Lobby.jsx";
import Game from "./pages/Game.jsx";
import LoginModal from "./component/login/LoginModal.jsx";

function App() {
    const fade = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 800}
    });

    return (
        <SocketProvider>
            <animated.div style={fade}>
                <Routes>
                    <Route path="/" element={<Navigate to="/lobby" replace/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/about" element={<HomePage/>}/>
                    <Route path="/support" element={<HomePage/>}/>
                    <Route path="/more" element={<HomePage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/chat" element={<ChatBox/>}/>
                    <Route path="/lobby" element={<Lobby/>}/>
                    <Route path="/game" element={<Game/>}/>
                </Routes>
            </animated.div>
        </SocketProvider>
    )
}

export default App
