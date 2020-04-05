import React from 'react';
import Login from './login-user.component';
import Register from './create-user.component';
import ExerciseList from './exercise-list.component';
import CreateExercise from './create-exercise.component'
import { Nav, NavItem, NavLink } from 'reactstrap';
import './navbar.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
    const Navbar = (props) => {

    
      return (
        <div>
            <h1 className="header">Exercise Tracker</h1>
        <Nav className="navbar">
          <NavItem>
            <NavLink href="/exercises">Exercise List</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/create">Create Exercise</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/edit-exercise">Edit Exercise</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="/Login">Logout</NavLink>
          </NavItem>
        </Nav>

      </div>
      )
      
    };
  export default Navbar;