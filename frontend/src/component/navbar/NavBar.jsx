import NavButton from "./NavButton.jsx";
import {NavLink} from "react-router-dom";
import styled from "@emotion/styled";

const StyledNavbar = styled.nav`
    display: flex;
    justify-content: center;
    padding: 35px;
`;

function Navbar() {
    return (
        <StyledNavbar>
            <NavLink to="/home">
                {({isActive}) => (
                    <NavButton name="HOME" isActive={isActive}/>
                )}
            </NavLink>
            <NavLink to="/about">
                {({isActive}) => (
                    <NavButton name="ABOUT" isActive={isActive}/>
                )}
            </NavLink>
            <NavLink to="/support">
                {({isActive}) => (
                    <NavButton name="SUPPORT" isActive={isActive}/>
                )}
            </NavLink>
            <NavLink to="/more">
                {({isActive}) => (
                    <NavButton name="MORE" isActive={isActive}/>
                )}
            </NavLink>
        </StyledNavbar>
    );
}

export default Navbar;
