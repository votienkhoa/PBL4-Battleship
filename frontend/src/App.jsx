import HomePage from "./pages/HomePage/HomePage.jsx";
import {animated, useSpring} from "@react-spring/web";
import "./App.css"
import Battlefield from "./component/battlefield/Battlefield.jsx";

function App() {
    const fade = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {duration: 800}
    });

    return (
        <animated.div style={fade}>
            <Battlefield/>
        </animated.div>
    )
}

export default App
