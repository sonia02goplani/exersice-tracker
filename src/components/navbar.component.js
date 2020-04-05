import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './navbar.css';

const Navbar = (props) => {


    return (
        <div>
            <h1 className="header">Exercise Tracker</h1>
            <Nav className="navbar">
                <NavItem className="navItem">
                    <NavLink href="/exerciseTracker">Exercise List</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/create">Create Exercise</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/login">Logout</NavLink>
                </NavItem>
            </Nav>

        </div>
    )

};
export default Navbar;