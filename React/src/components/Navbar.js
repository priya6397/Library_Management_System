import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaHome } from 'react-icons/fa';

 
const NavBar = () => {
  return (
   
      <nav className="navbar navbar-expand-lg  navbar-dark bg-primary">
        <div className='container'>
       
    <Link className="navbar-brand" href="/">LIBRARY MANAGEMENT SYSTEM</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" >
      <ul className="navbar-nav mr-auto ">
        <li className="nav-item ">
            {/* <FaHome /> */}
            <NavLink className="nav-link " aria-current="page" exact to="/"><FaHome /> Home</NavLink>
        </li>
        <li className="nav-item ">
          <NavLink className="nav-link" aria-current="page" exact to="/About">About</NavLink>
        </li>
       
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/Contact">Contact</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/AddCity">Add City</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/AddLibrary">Add Library</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/AddBooks">Add Book</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/AddUser">Add User</NavLink>
        </li>
      </ul>
    </div>
    {/* <Link className="btn btn-outline-light" to="/users/add"> */}
    
  <DropdownButton id="dropdown-basic-button" title="STORE"> 
      {/* <Dropdown.Item href="#/action-1">City List</Dropdown.Item>
      <Dropdown.Item href="#/action-2">All Libraries</Dropdown.Item>  */}
      <NavLink className="nav-link" exact to="/City" component={RouterLink} style={{paddingLeft: '40px'}}>
              City List
      </NavLink>
      <NavLink className="nav-link" exact to="/Library" component={RouterLink} style={{paddingLeft: '40px'}}>
            Library List
      </NavLink>
      <NavLink className="nav-link" exact to="/Books" component={RouterLink} style={{paddingLeft: '40px'}}>
            Books List
      </NavLink>
      <NavLink className="nav-link" exact to="/Users" component={RouterLink} style={{paddingLeft: '40px'}}>
            Users List
      </NavLink>
    </DropdownButton>
{/* </Link> */}
  </div>
</nav>
   
  )
}
 
export default NavBar
 