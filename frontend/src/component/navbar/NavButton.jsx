import PropTypes from "prop-types";
import './css/NavButton.css'

function NavButton({name = "Unnamed", isActive, isNav}) {
    return (
        <button className={`navbar-button ${isActive ? 'active' : ''} ${isNav ? '' : 'notnav'}`}>
            <p>{name}</p>
        </button>
    );
}
NavButton.propTypes = {
    name: PropTypes.string,
    isActive: PropTypes.bool,
    isNav: PropTypes.bool
}
export default NavButton;