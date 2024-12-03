import HomePage from "./pages/HomePage/HomePage.jsx";
import {animated, useSpring} from "@react-spring/web";
import "./App.css"
import Battlefield from "./component/battlefield/Battlefield.jsx";
import Message from "./component/chatbox/Message.jsx";
import MessageList from "./component/chatbox/MessageList.jsx";
import ChatBox from "./component/chatbox/ChatBox.jsx";
import Register from "./component/login/Register.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./component/login/Login.jsx";

function App() {
    const fade = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 800}
    });

    return (
        <animated.div style={fade}>
            {/*<HomePage/>*/}
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/register" element={<Register />}/>
                <Route path="/about" element={<HomePage/>}/>
                <Route path="/support" element={<HomePage/>}/>
                <Route path="/more" element={<HomePage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/play" element={<Battlefield/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/chat" element={<ChatBox/>}/>
            </Routes>
        </animated.div>
    )
}

export default App
