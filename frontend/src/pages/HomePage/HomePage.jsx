import './HomePage.css'
import {animated, useSpring} from "@react-spring/web";
import NavBar from "../../component/navbar/NavBar.jsx";
import NavButton from "../../component/navbar/NavButton.jsx";
import {Link} from "react-router-dom";
import LoginModal from "../../component/login/LoginModal.jsx";
import {useState} from "react";
function HomePage(){
    const description = "\"BattlefieldDnd\" reimagines the classic strategy game in a futuristic setting! Lead your fleet across new battlegrounds, using tactics and intuition to locate and sink enemy ships. Prepare for intense showdowns and become the ultimate commander."
    const springs = useSpring({
        from: { y: -200 },
        to: { y: 0 },
        config: {tension: 100}
    })
    const [isLoginOpen, setLoginOpen] = useState(false);

    const handleOpenLogin = () => setLoginOpen(true);
    const handleCloseLogin = () => setLoginOpen(false);
    return(

        <>
            <div className="homepage-container">
                <NavBar/>
                <animated.div className="homepage-description" style={springs}>
                    <h1>BATTLESHIP</h1>
                    <p>{description.toUpperCase()}</p>
                    <br/>
                    {/*<Link to="/login">*/}
                    {/*    <NavButton name="Play" notNav={true} isActive={true}/>*/}
                    {/*</Link>*/}
                    <button onClick={handleOpenLogin}>Play</button>
                </animated.div>
            </div>
            <LoginModal open={isLoginOpen} onClose={handleCloseLogin} />
        </>
    )
}

export default HomePage;