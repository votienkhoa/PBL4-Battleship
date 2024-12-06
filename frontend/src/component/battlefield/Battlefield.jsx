import BattlefieldDnd from "./BattlefieldDnd.jsx";
import BattlefieldBoard from "./BattlefieldBoard.jsx";

// eslint-disable-next-line react/prop-types
function Battlefield({isReady}) {
    return (
        <>
            <BattlefieldDnd isReady={isReady}/>
            <BattlefieldBoard/>
        </>
    );
}

export default Battlefield;