import './HomePage.css'
import {animated, useSpring} from "@react-spring/web";
import NavBar from "../../component/navbar/NavBar.jsx";
import NavButton from "../../component/navbar/NavButton.jsx";
import {Link} from "react-router-dom";
function HomePage(){
    const description = "\"BattlefieldDnd\" reimagines the classic strategy game in a futuristic setting! Lead your fleet across new battlegrounds, using tactics and intuition to locate and sink enemy ships. Prepare for intense showdowns and become the ultimate commander."
    const springs = useSpring({
        from: { y: -200 },
        to: { y: 0 },
        config: {tension: 100}
    })
    return(

        <>
            <div className="homepage-container">
                <NavBar/>
                <animated.div className="homepage-description" style={springs}>
                    <h1>BATTLESHIP</h1>
                    <p>{description.toUpperCase()}</p>
                    <br/>
                    <Link to="/lobby">
                        <NavButton name="Play" notNav={true} isActive={true}/>
                    </Link>
                </animated.div>
            </div>
        </>
    )
}

export default HomePage;