// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import PropTypes from "prop-types";

function BattlefieldCell(props) {
    return (
        <div className={`battlefield-cell ${props.posX} ${props.posY}`} onClick={props.onCellClick}>
            <p>{props.value}</p>
        </div>
    );
}
BattlefieldCell.propTypes = {
    posX: PropTypes.number.isRequired,
    posY: PropTypes.number.isRequired,
    value: PropTypes.string,
};

export default BattlefieldCell;