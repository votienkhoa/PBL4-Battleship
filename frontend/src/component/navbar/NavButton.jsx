import React from 'react';
import PropTypes from "prop-types";
import './css/NavButton.css'

function NavButton(props) {
    return (
        <button className={`navbar-button ${props.isActive ? 'active' : ''}`}>
            <p>{props.name}</p>
        </button>
    );
}
NavButton.propTypes = {
    name: PropTypes.string,
    isActive: PropTypes.bool
}
NavButton.defaultProps = {
    name: "Unnamed"
}
export default NavButton;