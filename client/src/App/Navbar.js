import React from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect, useRouteMatch } from "react-router-dom";
import { useLoggedInStatus } from "../Hook/User";
import { userLoggedIn } from "../redux/actions/global";

const NavLink = ({ label, to, isExact }) => {
  const dispatch = useDispatch();
  const match = useRouteMatch({
    path: to, exact: isExact
  });

  const onClick = e => {
    if (to === '/signout') {
      e.preventDefault();

      dispatch(userLoggedIn({
        success: false, profile: {} 
      }));

      <Redirect to="/signin" />
    }
  }

  return (
    <li className="nav-item">
      <Link to={to} onClick={onClick} className={"nav-link" + (match ? " active" : "")}>{label}</Link>
    </li>
  )
}

const Navbar = () => {
  const userIsLoggedIn = useLoggedInStatus();

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">ChessBox</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <NavLink isExact={true} to="/" label="Home" />
            { !userIsLoggedIn ? <NavLink to="/signin" label="Signin" /> : null }
            { !userIsLoggedIn ? <NavLink to="/signup" label="Signup" /> : null }
            {  userIsLoggedIn ? <NavLink to="/profile" label="Profile" /> : null }
            {  userIsLoggedIn ? <NavLink to="/signout" label="Signout" /> : null }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;