import {useSocket} from '../../context/SocketContext.jsx'
import PropTypes from "prop-types";
const hit = {
    backgroundColor: 'red'
}
const miss = {
    backgroundColor: 'blue'
}
const cellStyle = (stat) => {
    if (stat === 'miss') return miss;
    else if (stat === 'hit') return hit;
    else return null;
}

function BattlefieldCell(props) {
    return (
        // eslint-disable-next-line react/prop-types
        <div className={`battlefield-cell ${props.posX} ${props.posY}`} onClick={props.onCellClick} style={cellStyle(props.value)}>

        </div>
    );
}
BattlefieldCell.propTypes = {
    posX: PropTypes.number.isRequired,
    posY: PropTypes.number.isRequired,
    value: PropTypes.string,
};

export default BattlefieldCell;