// src/components/Navbar.js
import NavButton from "./NavButton.jsx";
import {NavLink} from "react-router-dom";
import "./css/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/">
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
        </nav>
    );
}

export default Navbar;
