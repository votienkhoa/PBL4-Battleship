import HomePage from "./pages/HomePage/HomePage.jsx";
import {animated, useSpring} from "@react-spring/web";
import "./App.css"
import Battlefield from "./component/battlefield/Battlefield.jsx";
import Message from "./component/chatbox/Message.jsx";
import MessageList from "./component/chatbox/MessageList.jsx";
import ChatBox from "./component/chatbox/ChatBox.jsx";
import Register from "./component/login/Register.jsx";
import {Route, Routes} from "react-router-dom";

function App() {
    const fade = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 800}
    });

    return (
        <animated.div style={fade}>
            <Routes>
                <Route path="/register" element={<Register />}/>
            </Routes>
        </animated.div>
    )
}

export default App
