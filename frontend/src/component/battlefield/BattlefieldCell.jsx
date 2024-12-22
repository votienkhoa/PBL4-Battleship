import PropTypes from "prop-types";
import Wave from '../../assets/wave.svg'
import Fire from '../../assets/fire.svg'
import Explode from '../../assets/explosion.png'
import styled from "@emotion/styled";

const StyledCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        box-shadow:0 0 0 1px rgb(170, 11, 214) inset;
        background-color: #F8ECFF;
    }
`;
function BattlefieldCell(props) {
    const icon = (value) => {
        if (value === 'hit') return Fire;
        else if (value === 'miss') return Wave;
        else if (value === 'sunk') return Explode;
        else return null;
    }
    const style = (value) => {
        if (value === 'hit') return { backgroundColor: '#FAFAD2' };
        else if (value === 'miss') return { backgroundColor: '#F2F4F8' };
        else if (value === 'sunk') return {backgroundColor: '#FFC0C0' };
        return {};
    }
    return (
        // eslint-disable-next-line react/prop-types
        <StyledCell className={`battlefield-cell ${props.posX} ${props.posY}`} onClick={props.onCellClick} style={style(props.value)}>
            {icon(props.value) && <img src={icon(props.value)} alt="icon" width={24} height={24} />}
        </StyledCell>
    );
}
BattlefieldCell.propTypes = {
    posX: PropTypes.number.isRequired,
    posY: PropTypes.number.isRequired,
    value: PropTypes.string,
};

export default BattlefieldCell;