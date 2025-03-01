import styled from "@emotion/styled";
import { animated, useSpring } from "@react-spring/web";
import { Navigate, Route, Routes } from "react-router-dom";

import backgroundImage from "./assets/homepage-background.jpeg";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Lobby from "./pages/Lobby.jsx";
import Game from "./pages/Game.jsx";

import PrivateRoute from "./component/PrivateRoute.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import { SocketProvider } from './context/SocketContext.jsx';


function App() {
    const fade = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 800}
    });
    const GlobalStyle = styled.div`
        box-sizing: border-box;
        background-image: url(${backgroundImage});
        background-size: cover;
        height: 100vh;
    `;

    return (
        <SocketProvider>
            <AuthProvider>
                <animated.div style={fade}>
                    <GlobalStyle>
                        <Routes>
                            <Route path="/" element={<Navigate to="/home" replace/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/about" element={<HomePage/>}/>
                            <Route path="/support" element={<HomePage/>}/>
                            <Route path="/more" element={<HomePage/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/home" element={<HomePage/>}/>
                            <Route element={<PrivateRoute/>}>
                                <Route path="/lobby" element={<Lobby/>}/>
                                <Route path="/game" element={<Game/>}/>
                            </Route>
                        </Routes>
                    </GlobalStyle>
                </animated.div>
            </AuthProvider>
        </SocketProvider>
    )
}

export default App
