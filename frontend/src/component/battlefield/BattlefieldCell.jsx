import PropTypes from "prop-types";
import Wave from '../../assets/wave.svg'
import Fire from '../../assets/fire.svg'
import styled from "@emotion/styled";

const StyledCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        box-shadow:0 0 0 1px rgb(170, 11, 214) inset;
        background-color: rgba(184, 70, 255,0.1);
    }
`;
function BattlefieldCell(props) {
    const icon = (value) => {
        if (value === 'hit') return Fire;
        else if (value === 'miss') return Wave;
        else return null;
    }
    return (
        // eslint-disable-next-line react/prop-types
        <StyledCell className={`battlefield-cell ${props.posX} ${props.posY}`} onClick={props.onCellClick}>
            {icon(props.value) && <img src={icon(props.value)} alt="icon" />}
        </StyledCell>
    );
}
BattlefieldCell.propTypes = {
    posX: PropTypes.number.isRequired,
    posY: PropTypes.number.isRequired,
    value: PropTypes.string,
};

export default BattlefieldCell;